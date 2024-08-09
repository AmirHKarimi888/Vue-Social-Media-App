<template>
    <Spinner v-if="pending" />
    <li v-else v-for="post in usePostsStore().posts" :key="post?.id" class="aspect-square shadow-lg shadow-zinc-500 dark:border dark:shadow-none dark:border-zinc-900 cursor-pointer">
        <a :href="`#posts/${post?.id}`">
            <img class="w-full aspect-square" :src="`${VITE_PB_URL_POSTS}/${post?.id}/${post?.poster}?thumb=100x100`" alt="">
        </a>
    </li>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { VITE_PB_URL_POSTS } from '../pocketbase';
import { Spinner } from './icons';
import { usePostsStore } from '../stores/postManagement';

const pending = ref(true);

const { getOwnPosts } = usePostsStore();

//const posts = ref(await getOwnPosts());

onBeforeMount(async () => {
    await getOwnPosts()
    .then(() => pending.value = false);
})

</script>

<style scoped>

</style>