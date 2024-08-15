<template>
    <div v-if="usePostsStore().allPostsPending" class="w-full mt-40 grid justify-center items-center">
        <Spinner />
    </div>
    <ul v-else class="mt-2 w-full grid grid-cols-3 gap-2">
        <Posts />
    </ul>
    <Button v-if="!allPostsPending" class="text-white bg-green-500 p-1 rounded-md w-full my-5" @click="loadMore">Show More</Button>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Posts } from '.';
import { usePostsStore } from '../stores/postManagement';
import { Spinner } from './icons';
import Button from 'primevue/button';
import { storeToRefs } from 'pinia';

const postStore = usePostsStore();

const { posts, previouslyLoadedPosts, allPostsPending } = storeToRefs(postStore);
const { getNewPosts } = postStore;

let pageNum = 1;

onBeforeMount(async () => {
    allPostsPending.value = true;
    previouslyLoadedPosts.value = [];
    posts.value = [];
    await getNewPosts(pageNum, 12)
    .then(() => allPostsPending.value = false)
})

const loadMore = async () => {
    pageNum ++;
    await getNewPosts(pageNum, 6);
}
</script>

<style scoped>

</style>