<template>
    <NavBar />
    <Drawer />

    <div id="Dashboard" class="mx-auto w-full h-screen grid grid-cols-4 gap-2 p-2 absolute top-16 lg:top-0 box-border">
        <div class="lg:col-span-1 md:col-span-1 md:block sm:hidden max-sm:hidden">
            <div class="h-full grid gap-2 grid-rows-3">
                <div class="profile row-span-1 border border-gray-300 rounded-md box-border grid items-center bg dark-border">
                    <Profile />
                </div>
    
                <div class="setting row-span-2 border border-gray-300 rounded-md">
                    <LogOutBtn />
                    <ThemeSwitch />
                </div>
            </div>
        </div>

        <div class="lg:col-span-2 md:col-span-3 sm:col-span-4 max-sm:col-span-4 grid gap-2">
            <div class="posts border border-gray-300 rounded-md overflow-auto">

            </div>
        </div>

        <div class="lg:col-span-1 lg:block md:hidden sm:hidden max-sm:hidden border border-gray-300 rounded-md">
            <div class="search">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CreatePosts, Drawer, NavBar, Profile } from '.';
import { LogOutBtn, ThemeSwitch } from './icons';

</script>

<style scoped>

</style>