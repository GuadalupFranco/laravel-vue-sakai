<script setup>
import { Head, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';

defineProps({
    status: String,
});

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <Head title="Forgot Password" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600">
            ¿Olvidaste tu contraseña? No hay problema. Sólo déjanos saber tu correo y te enviaremos un correo con un enlace para restablecer tu contraseña que te permitirá elegir una nueva.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <div class="flex flex-column gap-2">
                    <label for="email" class="text-sm font-semibold">Correo</label>
                    <InputText id="email" v-model="form.email" 
                        class="mt-1 w-full"
                        :class="{ 'p-invalid': form.errors.email }" required />
                    <small id="email-error" class="text-sm text-red-600" v-if="form.errors.email">
                        {{ form.errors.email }}
                    </small>
                </div>
            </div>

            <div class="flex align-items-center justify-end mt-4">
                <Button type="submit" label="Email Password Reset Link" :disabled="form.processing"
                    :class="{ 'opacity-25': form.processing }" />
            </div>
        </form>
    </AuthenticationCard>
</template>
