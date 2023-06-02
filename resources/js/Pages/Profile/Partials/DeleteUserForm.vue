<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionSection from '@/Components/ActionSection.vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
    //setTimeout(() => passwordInput.value.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
};
</script>

<template>
    <ActionSection>
        <template #title>
            <div class="px-3 pt-3 text-color">
                Delete Account
            </div>
        </template>

        <template #description>
            <div class="px-3 text-color-secondary">
                Permanently delete your account.
            </div>
        </template>

        <template #content>
            <div class="max-w-xl text-sm text-color-secondary">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </div>

            <div class="mt-5">
                <Button type="submit" severity="danger" label="ELIMINAR CUENTA" class="font-semibold"
                    @click="confirmUserDeletion" />
            </div>

            <!-- Delete Account Confirmation Modal -->
            <Dialog v-model:visible="confirmingUserDeletion" modal header="Delete Account" :style="{ width: '50vw' }">
                Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                <div class="flex mt-4">
                    <Password id="password" ref="passwordInput" v-model="form.password" class="flex"
                            :class="{ 'p-invalid': form.errors.password }" :feedback="false" toggleMask required 
                            @keyup.enter="deleteUser"/>
                    <small id="password-error" class="text-sm text-red-600 mt-2" v-if="form.errors.password">
                        {{ form.errors.password }}
                    </small>
                </div>
                <template #footer>
                    <div class="flex flex-wrap justify-content-end row-gap-2">
                        <Button severity="secondary" label="CANCELAR" class="font-semibold" @click="closeModal"/>
                        <Button severity="danger" label="ELIMINAR CUENTA" class="font-semibold ml-3"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                            @click="deleteUser"/>
                    </div>
                </template>
            </Dialog>
        </template>
    </ActionSection>
</template>
