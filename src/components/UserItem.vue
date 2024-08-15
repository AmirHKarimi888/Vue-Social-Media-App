<template>
    <li v-for="user in users" :key="user" @click="usersStore.openUserDisplay(user)" class="p-2 cursor-pointer rounded-md hover:bg-zinc-200 hover:dark:bg-zinc-700">
        <a :href="`#${user?.id}`">
            <div class="flex items-center gap-3">
                <img class="w-12 h-12 aspect-square rounded-full bg-slate-500 shadow-lg"
                    :src="user?.avatar ?  `${VITE_PB_URL_USERS}/${user?.id}/${user?.avatar}` : user?.alternativeAvatar"
                    alt="avatar" />
                <span class="flex flex-col font-bold">
                    {{ user?.username }}
                    <span class="text-xs text-zinc-500 flex items-center gap-1">
                        {{ user?.email }}
                    </span>
                </span>
            </div>
        </a>
    </li>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { VITE_PB_URL_USERS } from '../pocketbase';
import { useUsersStore } from '../stores/userManagement';
const usersStore = useUsersStore();

const { users } = storeToRefs(usersStore);
</script>

<style scoped>

</style>