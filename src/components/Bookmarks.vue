<template>
    <div v-if="allPostsPending" class="w-full mt-40 grid justify-center items-center">
        <Spinner />
    </div>
    <ul v-else class="mt-2 w-full grid grid-cols-3 gap-2">
        <li v-for="post in posts" :key="post?.id" @click="openPostModal(post?.id)"
        class="aspect-square shadow-lg shadow-zinc-500 dark:border dark:shadow-none dark:border-zinc-900 cursor-pointer">
        <a :href="`#${post?.id}`">
            <img class="w-full aspect-square" :src="`${VITE_PB_URL_POSTS}/${post?.id}/${post?.poster}?thumb=100x100`"
            alt="">
        </a>
    </li>
    </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/postManagement';
import { onMounted, ref } from 'vue';
import { Spinner } from './icons';
import { VITE_PB_URL_POSTS } from '../pocketbase';

const postsStore = usePostsStore();

const { allPostsPending, posts } = storeToRefs(postsStore);
const { getBookmarks, openPostModal } = postsStore;

const showPosts = ref(false);

onMounted(async () => {
    allPostsPending.value = true;
    await getBookmarks()
        .then(() => allPostsPending.value = false)
        .then(() => showPosts.value = true);
})
</script>

<style scoped>

</style>