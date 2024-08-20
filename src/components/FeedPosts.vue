<template>
    <li v-for="post in posts" :key="post?.id"
        class="aspect-auto shadow-lg shadow-zinc-200 border dark:shadow-none dark:border-zinc-800 p-6">
        
            <div class="flex items-center gap-3">
                <a :href="`#users/${post?.authorDetails.id}`" @click="openUserDisplay(post?.authorDetails)" class="flex justify-center items-center gap-2">

                <img class="w-12 h-12 aspect-square rounded-full bg-slate-500 shadow-lg"
                    :src="post?.authorDetails?.avatar ? `${VITE_PB_URL_USERS}/${post?.authorDetails?.id}/${post?.authorDetails?.avatar}` : post?.authorDetails?.alternativeAvatar"
                    alt="avatar" />
                <span class="flex flex-col font-bold">
                    {{ post?.authorDetails?.username }}
                    <span class="text-xs text-zinc-500">{{ created(post) }}</span>
                    <span class="text-xs text-zinc-500 flex items-center gap-1">
                        {{ post?.views }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 16q1.875 0 3.188-1.312T16.5 11.5t-1.312-3.187T12 7T8.813 8.313T7.5 11.5t1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4t6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17" />
                        </svg>
                    </span>
                </span>

                </a>

                <div>
                    <FollowBtn v-if="post?.authorDetails?.id !== loggedInUser?.id" @click="followThisUser(post?.authorDetails)" :selectedUser="post?.authorDetails" />
                </div>

            </div>

        <img :src="`${VITE_PB_URL_POSTS}/${post?.id}/${post?.poster}`"
            class="mx-auto w-full aspect-[1] my-2 border dark:border-zinc-900" alt="image">

        <div class="flex justify-between mt-2 text-zinc-800 dark:text-white">
            <div class="flex gap-4">
                <LikeBtn @click="likeSelectedPost(post)" :post="post" />
                <!-- <span class="cursor-pointer flex items-center gap-1">
                        {{ usePostsStore().selectedPost?.comments.length }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4zM18 14H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
                    </span> -->
            </div>

            <span v-if="isLoggedInErrView" class="text-red-600">
                First log in to the app!
                <span @click="mainDisplay = LogIn" class="text-green-600 cursor-pointer">Login</span>
            </span>

            <div>
                <BookmarkBtn @click="bookmarkSelectedPost(post)" :post="post" />
            </div>
        </div>

        <div class="box-border overflow-auto mt-3">
            {{ post?.description }}
        </div>

        <div class="mt-2 text-sm text-zinc-500 cursor-pointer">
            <a :href="`#posts/${post?.id}`" @click="openPost(post)">
                More
            </a>
        </div>
    </li>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { VITE_PB_URL_POSTS, VITE_PB_URL_USERS } from '../pocketbase';
import { usePostsStore } from '../stores/postManagement';
import { ref } from 'vue';
import { useUsersStore } from '../stores/userManagement';
import { BookmarkBtn, FollowBtn, LikeBtn, LogIn } from '.';
import { useMainStore } from '../stores/main';

const mainStore = useMainStore();
const postsStore = usePostsStore();
const usersStore = useUsersStore();

const { mainDisplay } = storeToRefs(mainStore);

const { isLoggedIn, loggedInUser, selectedUserFeatures } = storeToRefs(usersStore);
const { getLoggedInUserFeatures, openUserDisplay, getSelectedUserFeatures, followUser } = usersStore;

const { posts } = storeToRefs(postsStore);
const { likePost, bookmarkPost, openPostModal } = postsStore;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septempber", "October", "November", "December"];

const created = (post: any) => {
    let dateList = post?.created.split("-");
    let year = dateList[0];
    let month = months[+dateList[1] - 1];
    let day = dateList[2].split(" ")[0]
    return `${day}${+day === 1 ? 'st' : +day === 2 ? 'nd' : +day === 3 ? 'rd' : 'th'} ${month} ${year}`;
}

const isLoggedInErrView = ref(false);

const likeSelectedPost = async (post: any) => {
    if (isLoggedIn.value) {
        isLoggedInErrView.value = false;
        await likePost(post)
            .then(() => {
                posts.value.filter((p: any) => {
                    if (p?.id === post?.id) {
                        if (p?.likes.includes(loggedInUser.value?.id)) {
                            p.likes = p?.likes.filter((like: any) => like !== loggedInUser.value?.id ? like : null);
                        } else {
                            p.likes = [...p?.likes, loggedInUser.value?.id];
                        }
                    }
                })
            });
    } else {
        isLoggedInErrView.value = true;
    }
}

const bookmarkSelectedPost = async (post: any) => {
    if (isLoggedIn.value) {
        isLoggedInErrView.value = false;
        await bookmarkPost(post)
            .then(async () => await getLoggedInUserFeatures());
    } else {
        isLoggedInErrView.value = true;
    }
}

const followThisUser  = async (author: any) => {
    
    await getSelectedUserFeatures(author?.username, author?.email)
    .then(async () => {
        await followUser(author, selectedUserFeatures.value);
    })
}

const openPost = async (post: any) => {
    await openPostModal(post?.id)
        .then(() => {
            posts.value.filter((p: any) => {
                if (p?.id === post?.id) {
                    p.views = +p.views + 1
                }
            })
        })
}

</script>

<style scoped></style>