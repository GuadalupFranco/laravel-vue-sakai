<script setup>
import { ref } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';

const props = defineProps({
    user: Object,
});

const form = useForm({
    _method: 'PUT',
    name: props.user.name,
    email: props.user.email,
    photo: null,
});

const verificationLinkSent = ref(null);
const photoPreview = ref(null);
const photoInput = ref(null);

const updateProfileInformation = () => {
    if (photoInput.value) {
        form.photo = photoInput.value.files[0];
    }

    form.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        onSuccess: () => clearPhotoFileInput(),
    });
};

const sendEmailVerification = () => {
    verificationLinkSent.value = true;
};

const selectNewPhoto = () => {
    photoInput.value.click();
};

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (! photo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };

    reader.readAsDataURL(photo);
};

const deletePhoto = () => {
    router.delete(route('current-user-photo.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
            photoPreview.value = null;
            clearPhotoFileInput();
        },
    });
};

const clearPhotoFileInput = () => {
    if (photoInput.value?.value) {
        photoInput.value.value = null;
    }
};
</script>

<template>
    <FormSection @submitted="updateProfileInformation">
        <template #title>
            <div class="px-3 pt-3 text-color">
                Información del perfil
            </div>
        </template>

        <template #description>
            <div class="px-3 text-color-secondary">
                Actualiza la información de perfil y correo en tu cuenta.
            </div>
        </template>

        <template #form>
            <!-- Profile Photo -->
            <div v-if="$page.props.jetstream.managesProfilePhotos" class="col-span-6 sm:col-span-4">
                <!-- Profile Photo File Input -->
                <input
                    ref="photoInput"
                    type="file"
                    class="hidden"
                    @change="updatePhotoPreview"
                >

                <InputLabel for="photo" value="Photo" />

                <!-- Current Profile Photo -->
                <div v-show="! photoPreview" class="mt-2">
                    <img :src="user.profile_photo_url" :alt="user.name" class="rounded-full h-20 w-20 object-cover">
                </div>

                <!-- New Profile Photo Preview -->
                <div v-show="photoPreview" class="mt-2">
                    <span
                        class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                        :style="'background-image: url(\'' + photoPreview + '\');'"
                    />
                </div>

                <SecondaryButton class="mt-2 mr-2" type="button" @click.prevent="selectNewPhoto">
                    Select A New Photo
                </SecondaryButton>

                <SecondaryButton
                    v-if="user.profile_photo_path"
                    type="button"
                    class="mt-2"
                    @click.prevent="deletePhoto"
                >
                    Remove Photo
                </SecondaryButton>

                <InputError :message="form.errors.photo" class="mt-2" />
            </div>

            <!-- Name -->
            <div class="col-12 md:col-7 lg:col-4">
                <div class="flex flex-column gap-2">
                    <label for="name" class="text-sm font-semibold">Nombre</label>
                    <InputText id="name" v-model="form.name" :class="{ 'p-invalid': form.errors.name }" required />
                    <small id="name-error" class="text-sm text-red-600" v-if="form.errors.name">
                        {{ form.errors.name }}
                    </small>
                </div>
            </div>

            <!-- Email -->
            <div class="col-12 md:col-7 lg:col-4">
                <div class="flex flex-column gap-2">
                    <label for="name" class="text-sm font-semibold">Correo</label>
                    <InputText id="email" v-model="form.email" :class="{ 'p-invalid': form.errors.email }" required />
                    <small id="email-error" class="text-sm text-red-600" v-if="form.errors.email">
                        {{ form.errors.email }}
                    </small>
                </div>

                <div v-if="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
                    <p class="text-sm mt-2">
                        Tu correo no está verificado.

                        <Link
                            :href="appRoute('verification.send')"
                            method="post"
                            as="button"
                            class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click.prevent="sendEmailVerification"
                        >
                            Click aquí para re-enviar el correo de verificación.
                        </Link>
                    </p>

                    <div v-show="verificationLinkSent" class="mt-2 font-medium text-sm text-green-600">
                        Un nuevo link de verificación ha sido enviado a tu dirección de correo electrónico.
                    </div>
                </div>
            </div>
        </template>

        <template #actions>
            <Button v-show="form.recentlySuccessful" severity="secondary"
                label="Guardado" class="mr-3 font-semibold fadeout animation-duration-3000"/>
            <Button type="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                label="Guardar" class="font-semibold"/>
        </template>
    </FormSection>
</template>
