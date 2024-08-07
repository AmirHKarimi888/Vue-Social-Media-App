<template>
        <div class="flex flex-col items-center">
            <img class="w-24 h-24 rounded-full shadow-lg" :src="avatar" alt="avatar"/>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ loggedInUser?.username }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ loggedInUser?.email }}</span>
            <div class="flex gap-2 text-xs">
                <span>{{ useUsersStore().loggedInUserFeatures?.followings.length }} followings</span>
                <span>{{ useUsersStore().loggedInUserFeatures?.followers.length }} followers</span>
                <span>{{ useUsersStore().loggedInUserFeatures?.posts.length }} posts</span>
            </div>
        </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useUsersStore } from '../stores/userManagement';
import { VITE_PB_URL_USERS } from '../pocketbase';

const { loggedInUser, getLoggedInUserFeatures } = useUsersStore();

const avatar = computed(() => loggedInUser?.avatar ? `${VITE_PB_URL_USERS}/${loggedInUser?.id}/${loggedInUser?.avatar}` : loggedInUser?.alternativeAvatar)

onBeforeMount(async () => {
    await getLoggedInUserFeatures();
})
</script>

<style scoped>

</style>