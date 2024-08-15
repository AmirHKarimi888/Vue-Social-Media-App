<template>
    <div>

        <div class="bg-zinc-100 border border-zinc-300">
            <div class="mx-auto flex items-center gap-7 pl-5 py-5">
                <img class="w-[30%] aspect-square rounded-full bg-slate-500 shadow-lg"
                    :src="selectedUser?.avatar ?  `${VITE_PB_URL_USERS}/${selectedUser?.id}/${selectedUser?.avatar}` : selectedUser?.alternativeAvatar"
                    alt="avatar" />

                <span class="flex flex-col font-bold gap-1">
                    {{ selectedUser?.username }}
                    <span class="text-xs text-zinc-500 flex items-center gap-1">
                        {{ selectedUser?.email }}
                    </span>
    
                    <div class="flex mt-2 gap-2 text-xs">
                        <span>{{ selectedUserFeatures?.followings?.length }} followings</span>
                        <span>{{ selectedUserFeatures?.followers?.length }} followers</span>
                        <span>{{ selectedUserFeatures?.posts?.length }} posts</span>
                    </div>
                </span>
            </div>
        </div>

        <div v-if="usePostsStore().allPostsPending" class="w-full mt-40 grid justify-center items-center">
            <Spinner />
        </div>
        <ul v-else class="mt-2 w-full grid grid-cols-3 gap-2">
            <Posts />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { Posts } from '.';
import { usePostsStore } from '../stores/postManagement';
import { Spinner } from './icons';
import { useUsersStore } from '../stores/userManagement';
import { storeToRefs } from 'pinia';
import { VITE_PB_URL_USERS } from '../pocketbase';

const userStore = useUsersStore();

const { selectedUser, selectedUserFeatures } = storeToRefs(userStore);

const { getUserPosts } = usePostsStore();

onBeforeMount(async () => {
    if (!useUsersStore().selectedUser) {
        usePostsStore().allPostsPending = true;
        await getUserPosts(selectedUser.value?.id)
            .then(() => usePostsStore().allPostsPending = false)
    }
})
</script>

<style scoped></style>