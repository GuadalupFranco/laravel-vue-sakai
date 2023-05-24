<template>
    <div class="min-h-screen flex flex-column sm:justify-content-center align-items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
            <slot name="logo" />
        </div>
        <div class="w-full sm:max-w-28rem mt-6 px-6 py-4 bg-white shadow-2 overflow-hidden sm:border-round-lg">
            <slot />
        </div>
    </div>
</template>
