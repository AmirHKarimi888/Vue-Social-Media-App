<template>
    <NavBar />
    <Drawer />

    <div id="Dashboard" class="mx-auto w-full h-screen grid grid-cols-4 gap-2 p-2 absolute top-16 lg:top-0 box-border">
        <div class="lg:col-span-1 md:col-span-1 md:block sm:hidden max-sm:hidden box-border">
            <div class="h-full grid gap-2 grid-rows-3">
                <div class="profile row-span-1 border border-gray-300 rounded-md box-border grid items-center bg dark-border">
                    <Profile />
                </div>
    
                <div class="options row-span-2 border border-gray-300 rounded-md dark-border box-border">
                    <Options />
                </div>
            </div>
        </div>

        <div class="lg:col-span-2 md:col-span-3 sm:col-span-4 max-sm:col-span-4 grid gap-2 box-border">
            <div class="posts rounded-md overflow-auto">
                <component :is="usePostsStore().mainDisplay"></component>
            </div>
        </div>

        <div class="lg:col-span-1 lg:block md:hidden sm:hidden max-sm:hidden border border-gray-300 rounded-md">
            <div class="search">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Drawer, NavBar, Options, Profile } from '.';
import { usePostsStore } from '../stores/postManagement';
</script>

<style scoped>

</style>