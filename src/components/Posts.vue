<template>
    <Spinner v-if="spinnerView" />
    <li v-else v-for="post in usePostsStore().posts" :key="post?.id" class="aspect-square border border-zinc-300 dark-border]">
        <img class="w-full aspect-square" :src="`${VITE_PB_URL_POSTS}/${post?.id}/${post?.poster}?thumb=100x100`" alt="">
    </li>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { VITE_PB_URL_POSTS } from '../pocketbase';
import { Spinner } from './icons';
import { usePostsStore } from '../stores/postManagement';

const spinnerView = ref(true);

const { getOwnPosts } = usePostsStore();

//const posts = ref(await getOwnPosts());

onBeforeMount(async () => {
    await getOwnPosts()
    .then(() => spinnerView.value = false);
})

</script>

<style scoped>

</style>