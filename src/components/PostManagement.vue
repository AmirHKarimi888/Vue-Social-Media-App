<template>
    <div class="h-screen overflow-auto">
        <div class="bg-zinc-100 dark:bg-zinc-800 text-gray-500 dark:text-white border dark:border-zinc-800 border-zinc-300 rounded-md">

            <div class="p-5 text-zinc-700 dark:text-white">
                <div id="PostTitle">
                    <label class="font-semibold text-sm pb-1 block">Create a new post</label>
                    <input type="text"
                         @click="createPostsView = true"
                        class="rounded-lg cursor-pointer px-3 py-2 mt-1 text-sm w-full bg-zinc-50 dark:bg-zinc-700 border border-zinc-400 dark-border"
                        required />
                </div>
            </div>

            <div v-if="createPostsView" @click.self="createPostsView = false"
                class="z-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-zinc-900/50">
                <div
                    class="p-3 bg-zinc-100 dark:bg-zinc-900 lg:w-[60%] md:w-[70%] sm:w-[90%] max-sm:w-[95%] max-h-[80%] box-border overflow-auto rounded-md border border-zinc-300 dark:border-zinc-900">
                    <CreatePosts />
                </div>
            </div>
        </div>

        <div v-if="allPostsPending" class="w-full mt-40 grid justify-center items-center">
            <Spinner />
        </div>
        <ul v-else class="mt-2 w-full grid grid-cols-3 gap-2">
            <Posts />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { CreatePosts, Posts } from '.';
import { usePostsStore } from '../stores/postManagement';
import { Spinner } from './icons';
import { storeToRefs } from 'pinia';

const postsStore = usePostsStore();

const { createPostsView, allPostsPending } = storeToRefs(postsStore);
const { getOwnPosts } = usePostsStore();

onBeforeMount(async () => {
    allPostsPending.value = true;
    await getOwnPosts()
        .then(() => allPostsPending.value = false)
})
</script>

<style scoped></style>