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
import { computed, onBeforeMount } from 'vue';
import { useUsersStore } from '../stores/userManagement';
import { VITE_PB_URL_USERS } from '../pocketbase';
import { storeToRefs } from 'pinia';

const usersStore = useUsersStore();

const { loggedInUser, loggedInUserFeatures } = storeToRefs(usersStore);
const {  getLoggedInUserFeatures } = usersStore;

const avatar = computed(() => loggedInUser.value?.avatar ? `${VITE_PB_URL_USERS}/${loggedInUser.value?.id}/${loggedInUser.value?.avatar}` : loggedInUser.value?.alternativeAvatar)

onBeforeMount(() => {
    getLoggedInUserFeatures();
})
</script>

<style scoped>

</style>