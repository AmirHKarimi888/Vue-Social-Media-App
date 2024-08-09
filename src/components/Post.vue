<template>
    <div class="post grid items-center lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 max-sm:grid-cols-1 lg:pt-[13%]">
        <div>
            <Carousel :value="usePostsStore().selectedPost?.media" :numVisible="1" :numScroll="1">
                <template #item="slotProps">
                    <div class="grid justify-center items-center">
                        <img v-if="slotProps.data.toLowerCase().includes('.jpg') || slotProps.data.toLowerCase().includes('.jpeg') || slotProps.data.toLowerCase().includes('.png') || slotProps.data.toLowerCase().includes('.gif') || slotProps.data.toLowerCase().includes('.webp')" :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`" class=" w-full aspect-video" alt="">
                        <video v-else class="w-full aspect-video" controls>
                            <source :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`" type="video/mp4">
                        </video>
                    </div>
                </template>
            </Carousel>
        </div>

        <div>
            {{ usePostsStore().selectedPost }}
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { VITE_PB_URL_POSTS } from '../pocketbase';
import { usePostsStore } from '../stores/postManagement';


</script>

<style scoped>

</style>