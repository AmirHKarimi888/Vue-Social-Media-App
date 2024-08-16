<template>
    <div class="h-full overflow-y-auto bg-zinc-100 dark:bg-zinc-800 rounded-md">
        <ul class="space-y-2 font-medium mt-5">
            <li class="cursor-pointer px-2" @click="dashboardMainDisplay = Feed">
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                    <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/>
                   </svg>
                   <span class="flex-1 ms-3 whitespace-nowrap">Feed</span>
                </a>
            </li>
            <li class="cursor-pointer px-2" @click="dashboardMainDisplay = Explore">
                <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                  <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path fill="currentColor" d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1s1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m2.19 12.19L6 18l3.81-8.19L18 6z"/>
                 </svg>
                 <span class="flex-1 ms-3 whitespace-nowrap">Explore</span>
                </a>
             </li>
           <li v-if="isLoggedIn" class="cursor-pointer px-2" @click="dashboardMainDisplay = PostManagement">
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                 <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                 </svg>
                 <span class="ms-3">Management</span>
              </a>
           </li>
           <li v-if="isLoggedIn" class="cursor-pointer px-2" @click="dashboardMainDisplay = Bookmarks">
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap">Bookmarks</span>
              </a>
           </li>
           <!-- <li class="cursor-pointer px-2">
              <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                 <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"/>
                 </svg>
                 <span class="flex-1 ms-3 whitespace-nowrap">Notifications</span>
                 <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
              </a>
           </li> -->
           <!-- <li class="cursor-pointer px-2">
            <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
              <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6"/>
             </svg>
             <span class="flex-1 ms-3 whitespace-nowrap">Setting</span>
            </a>
         </li> -->
         <ConfirmPopup group="headless" class="border border-gray-300 dark:border-zinc-800">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="rounded p-4">
                    <span>{{ message.message }}</span>
                    <div class="flex items-center gap-2 mt-4">
                        <Button class="border border-red-600 p-1 text-red-600 hover:bg-red-600 hover:text-white duration-100" label="Yes" @click="acceptCallback" size="small"></Button>
                        <Button class="border border-green-600 p-1 text-green-600 hover:bg-green-600 hover:text-white duration-100" label="Cancel" outlined @click="rejectCallback" severity="secondary" size="small" text></Button>
                    </div>
                </div>
            </template>
        </ConfirmPopup>
         <Button v-if="isLoggedIn" class="cursor-pointer px-2" @click="requireConfirmation($event)">
            <a class="flex items-center p-2 text-red-600 hover:text-red-500 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 group">
              <svg class="w-5 h-5 text-red-600 transition duration-75 dark:group-hover:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/>
             </svg>
             <span class="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </a>
         </Button>
         <li v-if="!isLoggedIn" class="cursor-pointer px-2" @click="mainDisplay = LogIn">
            <a class="flex items-center p-2 text-green-600 hover:text-green-500 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 group">
              <svg class="w-5 h-5 text-green-600 transition duration-75 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/>
             </svg>
             <span class="flex-1 ms-3 whitespace-nowrap">Log In</span>
            </a>
         </li>
           <li class="cursor-pointer px-2">
            <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path fill="currentColor" d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56"/>
               </svg>
               <span class="flex-1 ms-3 whitespace-nowrap mr-2">Dark Mode</span>
               <ThemeSwitch />
            </a>
         </li>
        </ul>
     </div>     
</template>

<script setup lang="ts">
import ConfirmPopup from 'primevue/confirmpopup';
import Button from 'primevue/button';
import { ThemeSwitch } from './icons';
import { useConfirm } from "primevue/useconfirm";
import useLogout from '../composables/useLogout';
import { Bookmarks, Explore, Feed, LogIn, PostManagement } from '.';
import { useMainStore } from '../stores/main';
import { useUsersStore } from '../stores/userManagement';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const usersStore = useUsersStore();

const { dashboardMainDisplay, mainDisplay } = storeToRefs(mainStore);

const { isLoggedIn } = storeToRefs(usersStore);

const confirm = useConfirm();
const logOut = useLogout();

const requireConfirmation = (event: any) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Are you sure do you want to log out?',
        accept: () => {
            logOut();
        },
        reject: () => {
            null;
        }
    });
}

</script>

<style scoped>

</style>