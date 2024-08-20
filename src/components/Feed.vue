<template>
    <div>
        <div v-if="allPostsPending" class="w-full mt-40 grid justify-center items-center">
            <Spinner />
        </div>
        <ul v-else class="mt-2 w-full grid grid-cols-1 gap-2 px-3">
            <FeedPosts />
            <Button v-if="posts" class="text-white bg-green-500 p-1 rounded-md mt-2 mb-5" @click="loadMore">Show More</Button>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { usePostsStore } from '../stores/postManagement';
import { FeedPosts } from '.';
import Button from 'primevue/button';
import { storeToRefs } from 'pinia';
import { Spinner } from './icons';

const postStore = usePostsStore();

const { posts, previouslyLoadedPosts, allPostsPending } = storeToRefs(postStore);
const { getFeedPosts } = postStore;

let pageNum = 1;

onBeforeMount(() => {
    allPostsPending.value = true;
    previouslyLoadedPosts.value = [];
    posts.value = [];
    getFeedPosts(pageNum, 5)
    .then(() => allPostsPending.value = false)
})

const loadMore = async () => {
    pageNum ++;
    await getFeedPosts(pageNum, 5);
}

// onMounted(() => {
//     const x = document.querySelector("#Posts") as HTMLElement;

//     document.querySelector("#Posts")?.addEventListener("scroll", () => {
//         console.log(x?.offsetHeight)
//     })
// })
</script>

<style scoped>

</style>