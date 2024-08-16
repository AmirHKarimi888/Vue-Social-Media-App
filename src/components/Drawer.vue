<template>
    <Drawer v-model:visible="drawerView" class="bg-zinc-100 dark:bg-zinc-800">
        <div class="mb-10">
            <Profile v-if="isLoggedIn"/>
        </div>
        <Options />
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import { useMainStore } from '../stores/main';
import { Options, Profile } from '.';
import { useUsersStore } from '../stores/userManagement';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const usersStore = useUsersStore();

const { drawerView } = storeToRefs(mainStore);
const { isLoggedIn } = storeToRefs(usersStore);
</script>

<style scoped>

</style>