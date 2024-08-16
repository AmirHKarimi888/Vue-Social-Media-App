<template>
    <form @submit.prevent="onSubmit">
        <div class="w-full p-3 text-zinc-700 dark:text-white">
            <div class="w-full cursor-pointer grid justify-end mb-3" @click="usePostsStore().createPostsView = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
                </svg>
            </div>
            
            <!-- <div id="PostTitle" class="mb-5">
                <label class="font-semibold text-sm text-gray-400 pb-1 block">Title</label>
                <input v-model="title" v-bind="titleAttrs" id="title" type="text"
                    class="rounded-lg px-3 py-2 mt-1 text-sm w-full bg-zinc-50 dark:bg-zinc-700 border border-zinc-400 dark-border"
                    required />
            </div> -->

            <div id="PostDescription" class="mb-5">
                <label class="font-semibold text-sm text-gray-400 pb-1 block">Description</label>
                <textarea v-model="description" v-bind="descriptionAttrs" id="description"
                    class="rounded-lg px-3 py-2 mt-1 text-sm w-full bg-zinc-50 dark:bg-zinc-700 border border-zinc-400 dark-border" />
            </div>

            <div id="FileUpload" class="mb-5">
                <div class="grid w-full max-w-xs items-center gap-1.5 cursor-pointer">
                    <label class="font-semibold text-sm text-gray-400 pb-1 block">Media</label>
                    <input @change="addPendingMedia" id="picture" type="file" accept="image/*, video/*"
                        class="flex h-10 w-full rounded-md border border-zinc-400 bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium dark:bg-zinc-700 dark-border cursor-pointer"
                        required />
                </div>

                <Carousel :value="filesDisplay" :numVisible="1" :numScroll="1"
                    :page="filesDisplay.length - 1">
                    <template #item="slotProps">
                        <div class="grid justify-center items-center mt-5">
                            <img v-if="slotProps.data[0]?.type.includes('image')" :src="slotProps.data[1]"
                                class=" w-full aspect-video" alt="">
                            <video v-else class="w-full aspect-video" controls>
                                <source :src="slotProps.data[1]" type="video/mp4">
                            </video>
                        </div>
                        <div class="grid justify-center cursor-pointer" @click="deletePendingMedia(slotProps.index)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
                            </svg>
                        </div>
                    </template>
                </Carousel>
            </div>

            <div id="PostStatus" class="mb-5">
                <label class="font-semibold text-sm text-gray-400 pb-1 block">Status</label>
                <ToggleSwitch class="card flex justify-center" v-model="status" />
            </div>

            <div id="CreatePost">
                <button type="submit"
                    class="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Create Post
                </button>
            </div>

            <Dialog v-model:visible="createPostPending" modal :closable="false">
                <div class="grid justify-center p-5 text-xl">
                    <SpinnerLg class="mx-auto" />
                    <div class="mt-3">Uploading</div>
                </div>
                <div class="grid justify-center">
                    <button @click="cancelUpload"
                        class="rounded-md border border-red-600 text-red-600 text-sm p-1 hover:bg-red-600 hover:text-white duration-75">Cancel</button>
                </div>
            </Dialog>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import ToggleSwitch from 'primevue/toggleswitch';
import { ref } from "vue";
import { usePostsStore } from "../stores/postManagement";
import Carousel from "primevue/carousel";
import { SpinnerLg } from "./icons";
import Dialog from "primevue/dialog";
import { storeToRefs } from "pinia";

const createPostPending = ref(false);

const postsStore = usePostsStore();

const { createPostsView } = storeToRefs(postsStore);
const { createPosts } = postsStore;

const schema = yup.object({
    // title: yup.string()
    //     .min(1, "title must be at least one characters")
    //     .required("title is required"),
})

const { handleSubmit, defineField, resetForm } = useForm({
    validationSchema: schema
});


// const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
let files: any = [];
const filesDisplay = ref<any[]>([]);
const status = ref(false);

const addPendingMedia = () => {
    const fileInputEl = document.querySelector('#FileUpload input') as any;
    let src = URL.createObjectURL(fileInputEl?.files[0]);

    files.push(fileInputEl?.files[0]);
    filesDisplay.value.push([fileInputEl?.files[0], src]);

    if (!files[0]?.type.includes("image")) {
        files.pop();
        filesDisplay.value.pop();
        alert("First file is the poster, so it should be an image of jpg (jpeg) or png format")
    }
}

const deletePendingMedia = (i: number) => {
    files = files.filter((file: any, index: any) => index !== i ? file : null);
    filesDisplay.value = filesDisplay.value.filter((file, index) => index !== i ? file : null);
}

const onSubmit = handleSubmit(async (data) => {
    createPostPending.value = true;
    data = { ...data, files: files, status: status.value };

    try {
        await createPosts(data)
        .then(() => {
            createPostPending.value = false;
            resetForm();
            status.value = false;
            files = [];
            filesDisplay.value = [];
            createPostsView.value = false;
        })
        
    } catch (err: any) {
        createPostPending.value = false;

    }
});

const cancelUpload = () => {
    window.location.reload();
}

</script>

<style scoped></style>