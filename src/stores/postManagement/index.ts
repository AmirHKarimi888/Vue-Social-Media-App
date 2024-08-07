import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { Feed, PostManagement } from "../../components";
import { useUsersStore } from "../userManagement";
import { pb } from "../../pocketbase";

export const usePostsStore = defineStore("posts", () => {
    const mainDisplay = shallowRef(PostManagement);
    const posts = ref<any[]>([]);

    const { updateLoggedInUserFeaturesPosts } = useUsersStore();

    const toggleDisplay = (display: any) => {
        mainDisplay.value = display;
    }

    const getOwnPosts = async () => {
        const id = useUsersStore().loggedInUser?.id
        posts.value = await pb.collection('posts').getFullList({
            filter: "author = " + "'" + id + "'" + "",
            sort: "-created"
        })
        //return posts.value;
    }

    const createPosts = async (data: any) => {

        const { title, description, status } = data;

        const fileInputEl = document.querySelector('#FileUpload input') as any;

        const newPost = {
            title: title,
            description: description,
            contents: "",
            author: useUsersStore().loggedInUser?.id,
            authorEmail: useUsersStore().loggedInUser?.email,
            poster: fileInputEl?.files[0],
            views: 0,
            likes: [],
            status: status
        };

        try {
            //creates new post
            await pb.collection("posts").create(newPost)
            //gets own posts, updates posts at usePostsStore
            .then(async () => await getOwnPosts())
            .then(async () => {
                //updated posts are now accessible because of getting fetched before
                const lastPost = usePostsStore().posts[0];
                //post id is sent to updateLoggedInUserFeaturesPosts func to be added to the list of the user's posts
                await updateLoggedInUserFeaturesPosts(lastPost?.id)
            })
        } catch (err: any) {
            alert(err.message);
        }
    }

    return { mainDisplay, posts, toggleDisplay, getOwnPosts, createPosts };
})