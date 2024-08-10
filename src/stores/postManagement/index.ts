import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { Feed, PostManagement } from "../../components";
import { useUsersStore } from "../userManagement";
import { pb } from "../../pocketbase";

export const usePostsStore = defineStore("posts", () => {
    const mainDisplay = shallowRef(Feed);
    const posts = ref<any[]>([]);
    const selectedPost = ref<any>({});
    const selectedPostView = ref(false);

    const filesDisplay = ref<any[]>([]);
    let files: any[] = [];

    const activeMediaUploadingSystem = () => {
        if (document.querySelector('#FileUpload')) {

            const fileInputEl = document.querySelector('#FileUpload input') as any;
        
            fileInputEl.addEventListener("change", async () => {

                let src = URL.createObjectURL(fileInputEl?.files[0]);

                files.push(fileInputEl?.files[0]);
                filesDisplay.value.push([fileInputEl?.files[0], src]);

                if (!files[0]?.type.includes("image")) {
                    files.pop();
                    filesDisplay.value.pop();
                    alert("First file is the poster, so it should be an image of jpg (jpeg) or png format")
                }
            })
        }
    }

    setTimeout(async () => {
        if (window) {

            //Saves previous page address to be used in future loads of the page
            "initialAddress" in localStorage ? null : localStorage.setItem("initialAddress", "");

            //Determines the views by hash for the first time
            if(location.hash === "") {
                mainDisplay.value = Feed;
                localStorage.setItem("initialAddress", "");

            } else if (location.hash.includes("dashboard")) {
                mainDisplay.value = PostManagement;
                localStorage.setItem("initialAddress", "dashboard");

            } else if (location.hash.includes("posts")) {
                localStorage.getItem("initialAddress") === "dashboard" ? mainDisplay.value = PostManagement : null;
                let id = location.hash.replace("#posts/", "");
                await getPost(id)
                .then(() => selectedPostView.value = true);
            }

            
            //Uploading system gets reactivated after hash changes
            activeMediaUploadingSystem();

            //Checks hash changes after the dom is created
            window.onhashchange = async () => {

                //Changes the views after the hash changes based on it
                if(location.hash === "") {
                    mainDisplay.value = Feed;
                    localStorage.setItem("initialAddress", "");

                } else if (location.hash.includes("dashboard")) {
                    mainDisplay.value = PostManagement;
                    localStorage.setItem("initialAddress", "dashboard");

                } else if (location.hash.includes("posts")) {
                    let id = location.hash.replace("#posts/", "");
                    await getPost(id)
                    .then(() => selectedPostView.value = true);
                }
            }
        }
    })

    
    //Activates uploading system on initial rendering of whole dom
    setTimeout(async () => {
        activeMediaUploadingSystem();
    })


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

    const deletePendingMedia = (i: number) => {
        files = files.filter((file, index) => index !== i ? file : null);
        filesDisplay.value = filesDisplay.value.filter((file, index) => index !== i ? file : null);
    }

    const emptyMediaList = () => {
        files = [];
        filesDisplay.value = [];
    }

    const createPosts = async (data: any) => {

        const { title, description, status } = data;

        const newPost = {
            title: title,
            description: description,
            contents: "",
            author: useUsersStore().loggedInUser?.id,
            authorEmail: useUsersStore().loggedInUser?.email,
            poster: files[0],
            media: files,
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

    const getPost = async (id: string) => {
        try {
            selectedPost.value = await pb.collection('posts').getOne(id);
        } catch (err: any) {
            alert(err?.message);
        }
    }

    const closePostModal = () => {
        selectedPostView.value = false;
        location.hash = localStorage.getItem("initialAddress") as any;
    }

    return { mainDisplay, posts, selectedPost, filesDisplay, selectedPostView, toggleDisplay, getOwnPosts, createPosts, deletePendingMedia, emptyMediaList, closePostModal };
})