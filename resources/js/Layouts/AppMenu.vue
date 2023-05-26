<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Menú',
        items: [
            { label: 'Menú', icon: 'pi pi-fw pi-list', to: '/' },
            { label: 'Home', icon: 'pi pi-fw pi-home', to: '/home' },
            { label: 'Carreras', icon: 'pi pi-fw pi-book', to: '/carreras' },
            { label: 'Posgrado', icon: 'pi pi-fw pi-briefcase', to: '/posgrado' },
            { label: 'Noticias', icon: 'pi pi-fw pi-megaphone', to: '/noticias' },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
