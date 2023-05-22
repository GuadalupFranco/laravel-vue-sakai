<script setup>
import Welcome from '@/Components/Welcome.vue';
</script>

<template>
    <div>
        <h2 class="font-semibold text-xl text-gray-800 line-height-2">
            Dashboard
        </h2>
        <div class="py-12">
            <div class="mx-auto">
                <div class="bg-white overflow-hidden shadow-6 sm:border-round-lg">
                    <Welcome />
                </div>
            </div>
        </div>
    </div>
</template>
