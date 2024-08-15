<template>
    <Drawer v-model:visible="useMainStore().drawerView" class="bg-zinc-100 dark:bg-zinc-800">
        <div class="mb-10">
            <Profile v-if="useUsersStore().isLoggedIn"/>
        </div>
        <Options />
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import { useMainStore } from '../stores/main';
import { Options, Profile } from '.';
import { useUsersStore } from '../stores/userManagement';
</script>

<style scoped>

</style>