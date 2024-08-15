<template>
    <div id="Navbar" class="lg:hidden">
        <nav
            class="w-full h-[63px] bg-zinc-100 dark:bg-black border-b border-zinc-300 dark:border-zinc-800 fixed z-50 flex items-center">
            <span class="ml-5 text-3xl cursor-pointer hidden max-[767px]:block" @click="useMainStore().toggleDrawer">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
                </svg>
            </span>

            <form @submit.prevent @click="useUsersStore().searchView = true" class="max-w-lg mx-auto">
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

            <div v-if="useUsersStore().searchView" @click.self="useUsersStore().searchView = false"
                class="z-50 fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-zinc-900/50">
                <div
                    class="p-3 bg-zinc-100 dark:bg-zinc-900 lg:w-[60%] md:w-[70%] sm:w-[90%] max-sm:w-[95%] max-h-[80%] box-border overflow-auto rounded-md border border-zinc-300 dark:border-zinc-900">
                    <Search />
                    <Users />
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { Search, Users } from '.';
import { useMainStore } from '../stores/main';
import { useUsersStore } from '../stores/userManagement';
</script>

<style scoped></style>