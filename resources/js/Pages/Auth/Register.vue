<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <form @submit.prevent="submit">
            <div>
                <div class="flex flex-column gap-2">
                    <label for="name" class="text-sm font-semibold">Nombre</label>
                    <InputText id="name" v-model="form.name" :class="{ 'p-invalid': form.errors.name }" required />
                    <small id="name-error" class="text-sm text-red-600" v-if="form.errors.name">
                        {{ form.errors.name }}
                    </small>
                </div>
            </div>

            <div class="mt-4">
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

            <div class="mt-4">
                <div class="flex flex-column">
                    <label for="password-confirmation" class="text-sm font-semibold">Confirmar contraseña</label>
                    <div class="p-inputgroup mt-2">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <Password id="password-confirmation" v-model="form.password" class="flex bg-red-200"
                            :class="{ 'p-invalid': form.errors.password }" :feedback="false" toggleMask required />
                    </div>
                    <small id="password-error" class="text-sm text-red-600" v-if="form.errors.password">
                        {{ form.errors.password }}
                    </small>
                </div>
            </div>

            <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
                <InputLabel for="terms">
                    <div class="flex align-items-center">
                        <Checkbox id="terms" v-model:checked="form.terms" name="terms" required />

                        <div class="ml-2">
                            I agree to the <a target="_blank" :href="appRoute('terms.show')" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Terms of Service</a> and <a target="_blank" :href="appRoute('policy.show')" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Privacy Policy</a>
                        </div>
                    </div>
                    <InputError class="mt-2" :message="form.errors.terms" />
                </InputLabel>
            </div>

            <div class="flex items-center justify-end mt-4">
                <Link :href="appRoute('login')" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    ¿Ya estás registrado?
                </Link>

                <Button type="submit" label="Registrarse" :disabled="form.processing" class="ml-4"
                    :class="{ 'opacity-25': form.processing }" />
            </div>
        </form>
    </AuthenticationCard>
</template>
