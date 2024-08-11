<template>
    <div id="Navbar" class="lg:hidden">
        <nav class="w-full h-[63px] bg-zinc-100 dark:bg-black border-b border-zinc-300 dark-border fixed z-50 flex items-center">
            <Menu class="ml-5 text-3xl cursor-pointer hidden max-[767px]:block" @click="useMainStore().toggleDrawer" />

            <form class="max-w-lg mx-auto">
                <label for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <input type="search" id="default-search"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search" required />
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                </div>
            </form>

        </nav>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/main';
import { Menu } from './icons';
</script>

<style scoped></style>