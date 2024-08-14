<template>
    <span class="cursor-pointer">
        <svg v-if="loggedInUserFeatures?.bookmarks.includes(post?.id)"
            xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
                d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2m0 15l-5-2.18L7 18V5h10z" />
        </svg>
    </span>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/userManagement';

defineProps({
    post: Object
})

const usersStore = useUsersStore();

const { loggedInUserFeatures } = storeToRefs(usersStore);

</script>

<style scoped>

</style>