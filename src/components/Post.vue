<template>
    <div class="grid items-center box-border py-5 gap-y-2">
        
        <div class="px-10 flex justify-between items-center mb-1">
            <div class="flex items-center gap-3">
                <img class="w-12 h-12 aspect-square rounded-full bg-slate-500 shadow-lg" :src="useUsersStore().selectedUser?.avatar ? useUsersStore().selectedUser?.avatar : useUsersStore().selectedUser?.alternativeAvatar" alt="avatar"/>
                <span class="flex flex-col">
                    {{ useUsersStore().selectedUser?.username }}
                    <span class="text-xs">created at: {{ usePostsStore().selectedPost?.created.split(".")[0] }}</span>
                    <span class="text-xs">updated at: {{ usePostsStore().selectedPost?.updated.split(".")[0] }}</span>
                </span>
            </div>

            <div>
                <span class="cursor-pointer" @click="emit('close')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
                </span>
            </div>
        </div>


        <div class="h-full flex max-sm:flex-col justify-center items-start gap-y-5 box-border">
            <div class="sm:w-[60%] flex items-start">
                <Carousel id="PostCarousel" :value="usePostsStore().selectedPost?.media" :numVisible="1" :numScroll="1" :showIndicators="false">
                    <template #item="slotProps">
                        <img v-if="slotProps.data.toLowerCase().includes('.jpg') || slotProps.data.toLowerCase().includes('.jpeg') || slotProps.data.toLowerCase().includes('.png') || slotProps.data.toLowerCase().includes('.gif') || slotProps.data.toLowerCase().includes('.webp')" :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`" class="mx-auto w-full aspect-[1]" alt="image">
                        <video v-else class="w-full aspect-square" controls>
                            <source :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`" type="video/mp4">
                        </video>
                    </template>
                </Carousel>
            </div>
    
            <div class="sm:h-[300px] max-sm:h-[150px] sm:w-[40%] flex flex-col flex-initial box-border text-sm">
                <div class="box-border overflow-auto pt-2 max-sm:px-6">
                    {{ usePostsStore().selectedPost?.description }}
                </div>
            </div>
        </div>


        <div class="flex justify-between px-6 mt-2 text-zinc-800 dark:text-white">
            <div class="flex gap-4">
                <span @click="likeSelectedPost(usePostsStore().selectedPost)" class="cursor-pointer flex items-center gap-1">
                    {{ usePostsStore().selectedPost?.likes.length }}
                    <svg v-if="usePostsStore().selectedPost?.likes.includes(useUsersStore().loggedInUser?.id)" class="text-red-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"/></svg>
                </span>
                <!-- <span class="cursor-pointer flex items-center gap-1">
                    {{ usePostsStore().selectedPost?.comments.length }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM18 14H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
                </span> -->
            </div>

            <div>
                <span @click="bookmarkSelectedPost(usePostsStore().selectedPost)" class="cursor-pointer">
                    <svg v-if="useUsersStore().loggedInUserFeatures?.bookmarks.includes(usePostsStore().selectedPost?.id)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2m0 15l-5-2.18L7 18V5h10z"/></svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { VITE_PB_URL_POSTS } from '../pocketbase';
import { usePostsStore } from '../stores/postManagement';
import { onBeforeMount, onMounted } from 'vue';
import { useUsersStore } from '../stores/userManagement';

const emit = defineEmits(['close']);

const { getPost, likePost, bookmarkPost } = usePostsStore();
const { getLoggedInUserFeatures, getUser } = useUsersStore();

onBeforeMount(async () => {
    await getUser(usePostsStore().selectedPost?.author);
})

onMounted(() => {
    const carouselButtons = document.querySelectorAll("#PostCarousel button");
    //const carouselMainView = document.querySelector("#PostCarousel .p-carousel-viewport");
    const touchPad = document.querySelector("#PostCarousel .p-carousel-viewport");

    const setNavigatorBtnsClass = () => {
        carouselButtons[0].classList.add("relative", "left-10", "z-10", "col-span-1", "bg-zinc-300/30", "w-7", "h-7", "text-xs");
        carouselButtons[1].classList.add("relative", "right-10", "z-10", "col-span-1", "bg-zinc-300/30", "w-7", "h-7", "text-xs");
    }

    setNavigatorBtnsClass();

    carouselButtons[0].addEventListener("click", setNavigatorBtnsClass);
    carouselButtons[1].addEventListener("click", setNavigatorBtnsClass);
    
    touchPad?.addEventListener("touchstart", setNavigatorBtnsClass);
    touchPad?.addEventListener("touchmove", setNavigatorBtnsClass);
    touchPad?.addEventListener("touchend", setNavigatorBtnsClass);
})

const likeSelectedPost = async (post: any) => {
    await likePost(post)
    .then(async () => await getPost(post?.id));
}

const bookmarkSelectedPost = async (post: any) => {
    await bookmarkPost(post)
    .then(async () => await getLoggedInUserFeatures());
}
</script>

<style scoped>

</style>