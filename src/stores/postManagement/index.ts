import { defineStore } from "pinia";
import { ref } from "vue";
import { useUsersStore } from "../userManagement";
import { pb } from "../../pocketbase";

export const usePostsStore = defineStore("posts", () => {

    const posts = ref<any[]>([]);
    const allPostsPending = ref(false);
    const { updateLoggedInUserFeaturesPosts } = useUsersStore();

    const selectedPost = ref<any>({});
    const selectedPostView = ref(false);
    const selectedPostPending = ref(false);
    
    const createPostsView = ref(false);

    const getOwnPosts = async () => {
        const id = useUsersStore().loggedInUser?.id
        posts.value = await pb.collection('posts').getFullList({
            filter: "author = " + "'" + id + "'" + "",
            sort: "-created"
        })
        //return posts.value;
    }

    const createPosts = async (data: any) => {

        const { title, description, files, status } = data;

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
            comments: [],
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

    const likePost = async (post: any) => {
        try {
            let likes = [];
            if (post?.likes.includes(useUsersStore().loggedInUser?.id)) {
                likes = post?.likes.filter((like: any) => like !== useUsersStore().loggedInUser?.id);
            } else {
                likes = [...post?.likes, useUsersStore().loggedInUser?.id]
            }
            await pb.collection("posts").update(post?.id, {
                likes: likes
            })
        } catch (err: any) {
            alert(err?.message);
        }
    }

    const bookmarkPost = async (post: any) => {
        try {
            let bookmarks = [];
            if (useUsersStore().loggedInUserFeatures?.bookmarks.includes(post?.id)) {
                bookmarks = useUsersStore().loggedInUserFeatures?.bookmarks.filter((bookmark: any) => bookmark !== post?.id);
            } else {
                bookmarks = [...useUsersStore().loggedInUserFeatures?.bookmarks, post?.id]
            }
            await pb.collection("users_features").update(useUsersStore().loggedInUserFeatures?.id, {
                bookmarks: bookmarks
            })
        } catch (err: any) {
            alert(err?.message);
        }
    }

    return { posts, allPostsPending, selectedPost, selectedPostView, selectedPostPending, createPostsView, getOwnPosts, getPost, createPosts, likePost, bookmarkPost };
})