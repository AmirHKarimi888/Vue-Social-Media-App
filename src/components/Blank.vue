<template>
    <div v-if="allPostsPending" class="w-full mt-40 grid justify-center items-center">
        <Spinner />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/postManagement';
import { Spinner } from './icons';

const postsStore = usePostsStore();

const { allPostsPending } = storeToRefs(postsStore);
</script>

<style scoped>

</style>