<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import FormSection from '@/Components/FormSection.vue';

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const updatePassword = () => {
    form.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation');
                passwordInput.value.focus();
            }

            if (form.errors.current_password) {
                form.reset('current_password');
                currentPasswordInput.value.focus();
            }
        },
    });
};
</script>

<template>
    <FormSection @submitted="updatePassword">
        <template #title>
            <div class="px-3 pt-3 text-color">
                Actualizar contraseña
            </div>
        </template>

        <template #description>
            <div class="px-3 text-color-secondary">
                Asegúrate de que tu cuenta tenga una contraseña larga y aleatoria para mantenerla segura.
            </div>
        </template>

        <template #form>
            <div class="col-11 md:col-6 lg:col-5">
                <div class="flex flex-column gap-2">
                    <label for="current_password" class="text-sm font-semibold">Contraseña actual</label>
                    <Password id="current_password" v-model="form.current_password"
                        :class="{ 'p-invalid': form.errors.current_password }" :feedback="false" toggleMask required />
                    <small id="current_password-error" class="text-sm text-red-600 mt-2"
                        v-if="form.errors.current_password">
                        {{ form.errors.current_password }}
                    </small>
                </div>
            </div>

            <div class="col-11 md:col-6 lg:col-5">
                <div class="flex flex-column gap-2">
                    <label for="password" class="text-sm font-semibold">Nueva contraseña</label>
                    <Password id="password" v-model="form.password" :class="{ 'p-invalid': form.errors.password }"
                        :feedback="false" toggleMask required />
                    <small id="password-error" class="text-sm text-red-600 mt-2" v-if="form.errors.password">
                        {{ form.errors.password }}
                    </small>
                </div>
            </div>

            <div class="col-11 md:col-6 lg:col-5">
                <div class="flex flex-column gap-2">
                    <label for="password_confirmation" class="text-sm font-semibold">Confirmar contraseña</label>
                    <Password id="password_confirmation" v-model="form.password_confirmation"
                        :class="{ 'p-invalid': form.errors.password_confirmation }" :feedback="false" toggleMask required />
                    <small id="password_confirmation-error" class="text-sm text-red-600 mt-2"
                        v-if="form.errors.password_confirmation">
                        {{ form.errors.password_confirmation }}
                    </small>
                </div>
            </div>
        </template>

        <template #actions>
            <Button v-show="form.recentlySuccessful" severity="secondary" label="Guardado"
                class="mr-3 font-semibold fadeout animation-duration-3000" />
            <Button type="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing" label="Guardar"
                class="font-semibold" />
        </template>
    </FormSection>
</template>
