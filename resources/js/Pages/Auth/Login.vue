<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from 'primevue/checkbox'

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <div class="flex flex-column gap-2">
                    <label for="email" class="text-sm font-semibold">Correo</label>
                    <InputText id="email" v-model="form.email" :class="{ 'p-invalid': form.errors.email }" required />
                    <small id="email-error" class="text-sm text-red-600" v-if="form.errors.email">
                        {{ form.errors.email }}
                    </small>
                </div>
            </div>

            <div class="mt-4">
                <div class="flex flex-column">
                    <label for="password" class="text-sm font-semibold">Contraseña</label>
                    <div class="p-inputgroup mt-2">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <Password id="password" v-model="form.password" class="flex bg-red-200"
                            :class="{ 'p-invalid': form.errors.password }" :feedback="false" toggleMask required />
                    </div>
                    <small id="password-error" class="text-sm text-red-600" v-if="form.errors.password">
                        {{ form.errors.password }}
                    </small>
                </div>
            </div>

            <div class="block mt-4">
                <div class="flex align-items-center">
                    <Checkbox id="remember" v-model="form.remember" :binary="true" />
                    <span class="ml-2 text-sm text-gray-600">Recordar</span>
                </div>
            </div>

            <div class="flex align-items-center justify-content-end mt-3">
                <Link v-if="canResetPassword" :href="appRoute('password.request')"
                    class="underline text-sm text-gray-600 hover:text-gray-900 border-round-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                ¿Olvidaste tu contraseña?
                </Link>
                
                <Link href="/register">
                    <Button label="Registrarse" class="p-button-sm ml-4" severity="secondary" />
                </Link>

                <Button type="submit" label="Iniciar sesión" :disabled="form.processing" class="ml-3 text-sm font-semibold"
                    :class="{ 'opacity-20': form.processing }" />
            </div>
        </form>
    </AuthenticationCard>
</template>