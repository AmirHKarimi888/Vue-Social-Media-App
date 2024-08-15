<template>
    <div class="grid items-center box-border py-5 gap-y-2">

        <div class="px-10 flex justify-between items-center mb-1">
            <div class="flex items-center gap-3">
                <img class="w-12 h-12 aspect-square rounded-full bg-slate-500 shadow-lg"
                    :src="selectedPost?.authorDetails ? selectedPost?.authorDetails?.avatar ?  `${VITE_PB_URL_USERS}/${selectedPost?.authorDetails?.id}/${selectedPost?.authorDetails?.avatar}` : selectedPost?.authorDetails?.alternativeAvatar : selectedUser?.avatar ?  `${VITE_PB_URL_USERS}/${selectedUser?.id}/${selectedUser?.avatar}` : selectedUser?.alternativeAvatar"
                    alt="avatar" />
                <span class="flex flex-col font-bold">
                    {{ selectedPost?.authorDetails ? selectedPost?.authorDetails?.username : selectedUser?.username }}
                    <span class="text-xs text-zinc-500">{{ created }}</span>
                    <span class="text-xs text-zinc-500 flex items-center gap-1">
                        {{ selectedPost?.views }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17" />
                        </svg>
                    </span>
                </span>
            </div>

            <div class="flex gap-3">
                <div class="flex gap-1">
                    <!-- <Button v-if="useUsersStore().selectedUser?.id === useUsersStore().loggedInUser?.id"
                        class="text-xs text-white p-2 bg-green-600 rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
                    </Button> -->
                    <ConfirmPopup group="headless" class="border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800">
                        <template #container="{ message, acceptCallback, rejectCallback }">
                            <div class="rounded p-4">
                                <span>{{ message.message }}</span>
                                <div class="flex items-center gap-2 mt-4">
                                    <Button
                                        class="border border-red-600 p-1 text-red-600 hover:bg-red-600 hover:text-white duration-100"
                                        label="Yes" @click="acceptCallback" size="small"></Button>
                                    <Button
                                        class="border border-green-600 p-1 text-green-600 hover:bg-green-600 hover:text-white duration-100"
                                        label="Cancel" outlined @click="rejectCallback" severity="secondary"
                                        size="small" text></Button>
                                </div>
                            </div>
                        </template>
                    </ConfirmPopup>
                    <Button v-if="useUsersStore().selectedUser?.id === useUsersStore().loggedInUser?.id"
                        @click="requireConfirmation($event)"
                        class="text-xs text-white p-2 bg-red-600 rounded-lg cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" />
                        </svg>
                    </Button>
                </div>
                <span class="cursor-pointer" @click="emit('close')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
                    </svg>
                </span>
            </div>
        </div>


        <div class="h-full flex max-sm:flex-col justify-center items-start gap-y-5 box-border">
            <div class="sm:w-[60%] flex items-start">
                <Carousel id="PostCarousel" :value="usePostsStore().selectedPost?.media" :numVisible="1" :numScroll="1"
                    :showIndicators="false">
                    <template #item="slotProps">
                        <img v-if="slotProps.data.toLowerCase().includes('.jpg') || slotProps.data.toLowerCase().includes('.jpeg') || slotProps.data.toLowerCase().includes('.png') || slotProps.data.toLowerCase().includes('.gif') || slotProps.data.toLowerCase().includes('.webp')"
                            :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`"
                            class="mx-auto w-full aspect-[1]" alt="image">
                        <video v-else class="w-full aspect-square" controls>
                            <source :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`"
                                type="video/mp4">
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
                <span @click="likeSelectedPost(usePostsStore().selectedPost)"
                    class="cursor-pointer flex items-center gap-1">
                    {{ usePostsStore().selectedPost?.likes.length }}
                    <svg v-if="usePostsStore().selectedPost?.likes.includes(useUsersStore().loggedInUser?.id)"
                        class="text-red-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                        viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825" />
                    </svg>
                </span>
                <!-- <span class="cursor-pointer flex items-center gap-1">
                    {{ usePostsStore().selectedPost?.comments.length }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM18 14H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
                </span> -->
            </div>

            <span v-if="isLoggedInErrView" class="text-red-600">
                First log in to the app!
                <span @click="useMainStore().mainDisplay = LogIn" class="text-green-600 cursor-pointer">Login</span>
            </span>

            <div>
                <span @click="bookmarkSelectedPost(usePostsStore().selectedPost)" class="cursor-pointer">
                    <svg v-if="useUsersStore().loggedInUserFeatures?.bookmarks.includes(usePostsStore().selectedPost?.id)"
                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2m0 15l-5-2.18L7 18V5h10z" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { VITE_PB_URL_POSTS, VITE_PB_URL_USERS } from '../pocketbase';
import { usePostsStore } from '../stores/postManagement';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useUsersStore } from '../stores/userManagement';
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from 'primevue/useconfirm';
import Button from 'primevue/button';
import { storeToRefs } from 'pinia';
import { useMainStore } from '../stores/main';
import { Bookmarks, LogIn } from '.';

const emit = defineEmits(['close']);

const userStore = useUsersStore();
const postStore = usePostsStore();

const { selectedPost, posts, allPostsPending } = storeToRefs(postStore);
const { likePost, viewPost, bookmarkPost, deletePost, getBookmarks } = usePostsStore();

const { selectedUser, loggedInUser } = storeToRefs(userStore);
const { getUser, getLoggedInUserFeatures } = useUsersStore();

const confirm = useConfirm();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septempber", "October", "November", "December"];

const created = computed(() => {
    let dateList = selectedPost.value?.created.split("-");
    let year = dateList[0];
    let month = months[+dateList[1] - 1];
    let day = dateList[2].split(" ")[0]
    return `${day}${+day === 1 ? 'st' : +day === 2 ? 'nd' : +day === 3 ? 'rd' : 'th'} ${month} ${year}`;
})

onBeforeMount(async () => {
    await getUser(selectedPost.value?.author);
    // if (!posts.value[0]?.authorDetails) {
    //     await getUser(selectedPost.value?.author);

    // } else {
    //     selectedPost.value = posts.value.find(p => p?.id === selectedPost.value?.id);
    //     selectedPost.value = { ...selectedPost.value, views: +selectedPost.value?.views };
    // }
})

onMounted(async () => {
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

    await viewPost(usePostsStore().selectedPost)
        .then(() => usePostsStore().selectedPost = { ...usePostsStore().selectedPost, views: +usePostsStore().selectedPost?.views + 1 })
})

const isLoggedInErrView = ref(false);

const likeSelectedPost = async (post: any) => {
    if (useUsersStore().isLoggedIn) {
        isLoggedInErrView.value = false;
        await likePost(post)
            .then(() => {

                if (selectedPost.value?.id === post?.id) {
                    if (selectedPost.value?.likes.includes(loggedInUser.value?.id)) {
                        selectedPost.value.likes = selectedPost.value?.likes.filter((like: any) => like !== loggedInUser.value?.id ? like : null);
                    } else {
                        selectedPost.value.likes = [...selectedPost.value?.likes, loggedInUser.value?.id];
                    }
                }
            })
            .then(() => {
                posts.value.filter((p: any) => {
                    if (p?.id === post?.id) {
                        p.likes = selectedPost.value?.likes;
                    }
                })
            })
    } else {
        isLoggedInErrView.value = true;
    }
}

const bookmarkSelectedPost = async (post: any) => {
    if (useUsersStore().isLoggedIn) {
        isLoggedInErrView.value = false;
        await bookmarkPost(post)
            .then(async () => await getLoggedInUserFeatures())
            .then(async () => {
                if (useMainStore().dashboardMainDisplay === Bookmarks) {
                    allPostsPending.value = true;
                    await getBookmarks()
                    .then(() => allPostsPending.value = false)
                }
            })
    } else {
        isLoggedInErrView.value = true;
    }
}

const deleteSelectedPost = async () => {
    try {
        usePostsStore().selectedPostPending = true;
        await deletePost(usePostsStore().selectedPost?.id)
            .then(() => {

                posts.value = posts.value.filter((p: any) => {
                    if (p?.id !== selectedPost.value?.id) {
                        return p;
                    }
                })

                usePostsStore().selectedPost = {};
                usePostsStore().selectedPostView = false;
                usePostsStore().selectedPostPending = false;

                usePostsStore().allPostsPending = true;

                location.hash = "";
            })
            .then(() => usePostsStore().allPostsPending = false)

    } catch (err: any) {
        usePostsStore().allPostsPending = false;
        usePostsStore().selectedPostPending = false;
    }
}

const requireConfirmation = (event: any) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Are you sure do you want to delete this post?',
        accept: async () => {
            await deleteSelectedPost()
        },
        reject: () => {
            null;
        }
    });
}
</script>

<style scoped></style>