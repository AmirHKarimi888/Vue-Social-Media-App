<template>
        <div class="flex flex-col items-center">
            <img class="w-24 h-24 rounded-full shadow-lg" :src="avatar" alt="avatar"/>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ loggedInUser?.username }}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ loggedInUser?.email }}</span>
            <div class="flex gap-2 text-xs">
                <span>{{ loggedInUserFeatures?.followings.length }} followings</span>
                <span>{{ loggedInUserFeatures?.followers.length }} followers</span>
                <span>{{ loggedInUserFeatures?.posts.length }} posts</span>
            </div>
        </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../stores/main';
import { VITE_PB_URL_USERS } from '../pocketbase';

const { loggedInUser, updateLoggedInUserFeatures } = useMainStore();

const avatar = computed(() => loggedInUser?.avatar ? `${VITE_PB_URL_USERS}/${loggedInUser?.id}/${loggedInUser?.avatar}` : loggedInUser?.alternativeAvatar)

const loggedInUserFeatures = await updateLoggedInUserFeatures(loggedInUser?.id);
</script>

<style scoped>

</style>