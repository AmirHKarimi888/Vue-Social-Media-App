<template>
    <Drawer v-model:visible="useMainStore().drawerView" class="bg-zinc-100 dark:bg-zinc-800">
        <div class="mb-10">
            <Profile />
        </div>
        <Options />
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import { useMainStore } from '../stores/main';
import { Options, Profile } from '.';

</script>

<style scoped>

</style>