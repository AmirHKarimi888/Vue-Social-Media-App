<template>
    <form @submit.prevent>
        <div class="mt-5 p-5">
            <div id="PostTitle" class="mb-5">
                <label class="font-semibold text-sm text-gray-400 pb-1 block">Title</label>
                <input id="title" type="text"
                    class="rounded-lg px-3 py-2 mt-1 text-sm w-full bg-zinc-50 dark:bg-zinc-700 text-white border border-zinc-300 dark-border"
                    required />
            </div>

            <div id="PostDescription" class="mb-5">
                <label class="font-semibold text-sm text-gray-400 pb-1 block">Description</label>
                <textarea id="description"
                    class="rounded-lg px-3 py-2 mt-1 text-sm w-full bg-zinc-50 dark:bg-zinc-700 text-white border border-zinc-300 dark-border"
                    required />
            </div>

            <div id="FileUpload" class="mb-5">
                <div class="grid w-full max-w-xs items-center gap-1.5 cursor-pointer">
                    <label class="font-semibold text-sm text-gray-400 pb-1 block">Media</label>
                    <input id="picture" type="file"
                        class="flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium dark:bg-zinc-700 dark-border" />
                </div>
            </div>

            <div id="PostStatus" class="mb-5">
                <label class="font-semibold text-sm text-gray-400 pb-1 block">Status</label>
                <PostStatusSwitch />
            </div>

            <div id="CreatePost">
                <button type="submit" class="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Create Post
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { PostStatusSwitch } from './icons';

</script>

<style scoped></style>