<script setup>
import { computed, useSlots } from 'vue';
import SectionTitle from './SectionTitle.vue';

defineEmits(['submitted']);

const hasActions = computed(() => !! useSlots().actions);
</script>

<template>
    <div class="grid">
        <SectionTitle class="col-12 lg:col-4">
            <template #title>
                <slot name="title" />
            </template>
            <template #description>
                <slot name="description" />
            </template>
        </SectionTitle>

        <div class="mt-5 md:mt-0 col-12 lg:col-8">
            <form @submit.prevent="$emit('submitted')">
                <div
                    class="px-4 py-5 surface-card sm:p-6 shadow"
                    :class="hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'"
                >
                    <div class="grid">
                        <slot name="form" />
                    </div>
                </div>

                <div v-if="hasActions" class="flex align-items-center justify-content-end px-4 py-3 surface-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
                    <slot name="actions" />
                </div>
            </form>
        </div>
    </div>
</template>
