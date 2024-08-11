<template>
    <NavBar />
    <Drawer />

    <div id="Dashboard" class="mx-auto w-full h-screen grid grid-cols-4 gap-2 p-2 absolute top-16 lg:top-0 box-border">
        <div class="lg:col-span-1 md:col-span-1 md:block sm:hidden max-sm:hidden box-border">
            <div class="h-full grid gap-2 grid-rows-3">
                <div
                    class="profile row-span-1 border border-gray-300 rounded-md box-border grid items-center bg dark-border">
                    <Profile />
                </div>

                <div class="options row-span-2 border border-gray-300 rounded-md dark-border box-border">
                    <Options />
                </div>
            </div>
        </div>

        <div class="lg:col-span-2 md:col-span-3 sm:col-span-4 max-sm:col-span-4 grid gap-2 box-border">
            <div class="posts rounded-md overflow-auto">
                <component :is="useMainStore().dashboardMainDisplay"></component>
            </div>
        </div>

        <div class="lg:col-span-1 lg:block md:hidden sm:hidden max-sm:hidden border border-gray-300 rounded-md">
            <div class="search">

            </div>
        </div>

        <div @click.self="closePostModal()" v-if="usePostsStore().selectedPostView"
            class="z-50 fixed top-0 left-0 w-full h-screen grid justify-center items-center bg-zinc-900/50">
            <div id="Post"
                class="mx-auto bg-zinc-100 dark:bg-zinc-900 lg:w-[70%] md:w-[80%] sm:w-[90%] max-sm:w-[95%] h-[80%] box-border overflow-hidden py-5">
                <Post />
            </div>
        </div>
        <div v-if="usePostsStore().selectedPostPending"
            class="z-50 fixed top-0 left-0 w-full h-screen grid justify-center items-center bg-zinc-900/50">
            <SpinnerLg />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Drawer, NavBar, Options, Post, Profile } from '.';
import { usePostsStore } from '../stores/postManagement';
import { SpinnerLg } from './icons';
import { useMainStore } from '../stores/main';


const closePostModal = () => {
    usePostsStore().selectedPostView = false;
}
</script>

<style scoped></style>