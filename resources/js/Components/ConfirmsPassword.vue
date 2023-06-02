<script setup>
import { ref, reactive, nextTick } from 'vue';

const emit = defineEmits(['confirmed']);

defineProps({
    title: {
        type: String,
        default: 'Confirmar contraseña',
    },
    content: {
        type: String,
        default: 'Por tu seguridad, por favor introduce tu contraseña para continuar.',
    },
    button: {
        type: String,
        default: 'Confirmar',
    },
});

const confirmingPassword = ref(false);

const form = reactive({
    password: '',
    error: '',
    processing: false,
});

const passwordInput = ref(null);

const startConfirmingPassword = () => {
    axios.get(route('password.confirmation')).then(response => {
        if (response.data.confirmed) {
            emit('confirmed');
        } else {
            confirmingPassword.value = true;

            //setTimeout(() => passwordInput.value.focus(), 250);
        }
    });
};

const confirmPassword = () => {
    form.processing = true;

    axios.post(route('password.confirm'), {
        password: form.password,
    }).then(() => {
        form.processing = false;

        closeModal();
        nextTick().then(() => emit('confirmed'));

    }).catch(error => {
        form.processing = false;
        form.error = error.response.data.errors.password[0];
        passwordInput.value.focus();
    });
};

const closeModal = () => {
    confirmingPassword.value = false;
    form.password = '';
    form.error = '';
};
</script>

<template>
    <span>
        <span @click="startConfirmingPassword">
            <slot />
        </span>
        <Dialog v-model:visible="confirmingPassword" modal :header="title" :style="{ width: '50vw' }">
            {{ content }}
            <div class="flex mt-4">
                <Password id="password" ref="passwordInput" v-model="form.password" class="flex"
                    :class="{ 'p-invalid': form.error }" :feedback="false" toggleMask required
                    @keyup.enter="confirmPassword" />
                <small id="password-error" class="text-sm text-red-600 mt-2" v-if="form.error">
                    {{ form.error }}
                </small>
            </div>
            <template #footer>
                <div class="flex flex-wrap justify-content-end row-gap-2">
                    <Button severity="secondary" label="Cancelar" class="font-semibold" @click="closeModal" />
                    <Button severity="primary" :label="button" class="font-semibold ml-3"
                        :class="{ 'opacity-25': form.processing }" :disabled="form.processing" @click="confirmPassword" />
                </div>
            </template>
        </Dialog>
    </span>
</template>
