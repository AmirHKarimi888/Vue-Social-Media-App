<template>
    <span
    class="cursor-pointer flex items-center gap-1">
    {{ post?.likes.length }}
    <svg v-if="post?.likes.includes(loggedInUser?.id)"
        class="text-red-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
        viewBox="0 0 24 24">
        <path fill="currentColor"
            d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="currentColor"
            d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825" />
    </svg>
</span>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/userManagement';

const usersStore = useUsersStore();

defineProps({
    post: Object
})

const { loggedInUser } = storeToRefs(usersStore);

</script>

<style scoped>

</style>