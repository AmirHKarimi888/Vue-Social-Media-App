<template>
    <div class="post grid justify-center items-start lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 max-sm:grid-cols-1 gap-y-5 box-border h-full">
        <div class="h-full lg:col-span-2 grid items-center">
            <Carousel id="PostCarousel" :value="usePostsStore().selectedPost?.media" :numVisible="1" :numScroll="1" :showIndicators="false">
                <template #item="slotProps">
                    <img v-if="slotProps.data.toLowerCase().includes('.jpg') || slotProps.data.toLowerCase().includes('.jpeg') || slotProps.data.toLowerCase().includes('.png') || slotProps.data.toLowerCase().includes('.gif') || slotProps.data.toLowerCase().includes('.webp')" :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`" class=" w-full aspect-video" alt="">
                    <video v-else class="w-full aspect-video" controls>
                        <source :src="`${VITE_PB_URL_POSTS}/${usePostsStore().selectedPost?.id}/${slotProps.data}`" type="video/mp4">
                    </video>
                </template>
            </Carousel>
        </div>

        <div class="h-full lg:col-span-1 lg:px-0 sm:px-10 max-sm:px-10 box-border overflow-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ullam, autem animi suscipit quam quae cupiditate! Nesciunt similique sed explicabo eos sunt dolor, tempora iste aut nam porro iusto aspernatur.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae culpa recusandae impedit reprehenderit eum debitis laborum eligendi incidunt nisi! Facilis eligendi numquam voluptatum. Quidem sequi suscipit consequuntur facere, esse rerum!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, nostrum! Laudantium alias dicta ab, provident, eius possimus quod aliquam, totam voluptate at neque nobis illum veniam voluptatum quisquam voluptates illo.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas in sapiente voluptatibus blanditiis magni impedit perferendis dignissimos quidem cupiditate ipsa. Iusto ipsa sunt magni aperiam numquam accusamus voluptatum architecto animi!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quo dolorem accusantium, obcaecati magnam maxime quia quam tempore quae. Est, sit fuga quo nemo enim dignissimos quidem aliquam et magni.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur ad minima cumque ab vitae expedita obcaecati unde quaerat facilis culpa cupiditate perspiciatis perferendis harum amet, voluptatem ratione quisquam error architecto.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed temporibus, minus in consequuntur ipsa amet eius maiores animi blanditiis. Harum reprehenderit, saepe alias voluptates animi cupiditate iste molestias eius quasi!
        </div>
    </div>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { VITE_PB_URL_POSTS } from '../pocketbase';
import { usePostsStore } from '../stores/postManagement';
import { onMounted } from 'vue';

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
</script>

<style scoped>

</style>