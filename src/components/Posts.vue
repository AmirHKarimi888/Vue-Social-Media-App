<template>
    <li v-for="post in usePostsStore().posts" :key="post?.id" @click="openPostModal(post?.id)"
        class="aspect-square shadow-lg shadow-zinc-500 dark:border dark:shadow-none dark:border-zinc-900 cursor-pointer">
        <img class="w-full aspect-square" :src="`${VITE_PB_URL_POSTS}/${post?.id}/${post?.poster}?thumb=100x100`"
            alt="">
    </li>
</template>

<script setup lang="ts">
import { VITE_PB_URL_POSTS } from '../pocketbase';
import { usePostsStore } from '../stores/postManagement';

const { getPost } = usePostsStore();

//const posts = ref(await getOwnPosts());

const openPostModal = async (id: string) => {
    usePostsStore().selectedPostPending = true;
    await getPost(id)
        .then(() => {
            usePostsStore().selectedPostPending = false;
            usePostsStore().selectedPostView = true
        });
}
</script>

<style scoped></style>