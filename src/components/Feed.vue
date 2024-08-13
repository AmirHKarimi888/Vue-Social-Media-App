<template>
    <div>
        <!-- <div v-if="usePostsStore().allPostsPending" class="w-full mt-40 grid justify-center items-center">
            <SpinnerLg />
        </div> -->
        <ul class="mt-2 w-full grid grid-cols-3 gap-2">
            <Posts />
            <Button @click="loadMore">More</Button>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { usePostsStore } from '../stores/postManagement';
import { Posts } from '.';
import { SpinnerLg } from './icons';
import Button from 'primevue/button';

let pageNum = 1;

onBeforeMount(async () => {
    usePostsStore().previouslyLoadedPosts = [];
    usePostsStore().posts = [];
    await usePostsStore().getFeedPosts(pageNum, 5)
    .then(() => console.log(usePostsStore().posts))
})

const loadMore = async () => {
    pageNum ++;
    await usePostsStore().getFeedPosts(pageNum, 5);
}
</script>

<style scoped>

</style>