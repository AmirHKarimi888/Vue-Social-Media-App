import { defineStore } from "pinia";
import { ref } from "vue";
import { useUsersStore } from "../userManagement";
import { pb } from "../../pocketbase";

export const usePostsStore = defineStore("posts", () => {

    const posts = ref<any[]>([]);
    const allPostsPending = ref(false);
    const { updateLoggedInUserFeaturesPosts } = useUsersStore();

    const previouslyLoadedPosts = ref<any[]>([]);

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

    const getFeedPosts = async (startingPostLoadLimit: number, endingPostLoadLimit: number) => {
        
        let response = await pb.collection('posts').getList(startingPostLoadLimit, endingPostLoadLimit, {
            filter: "status = " + "" + true + "" + "",
            sort: "-created"
        })

        response?.items.map(async (item: any) => {
            
            await pb.collection('users').getOne(item?.author)
            .then((data: any) => {
                response?.items.map(async (innerItem: any) => {
        
                    if (data?.id === innerItem?.author) {
                        innerItem = {...innerItem, authorDetails: data};
                        previouslyLoadedPosts.value.push(innerItem);
                        posts.value = previouslyLoadedPosts.value;
                        // posts.value = posts.value.sort((a: any, b: any) => {
                        //     return b?.views - a?.views
                        // })
                        posts.value = posts.value.sort((a: any, b: any) => {
                            return b?.likes?.length - a?.likes?.length
                        })
                    }
                })
            })
        })

        
        // posts.value = previouslyLoadedPosts.value.concat(response?.items);
        previouslyLoadedPosts.value = posts.value;
    }

    const createPosts = async (data: any) => {

        const { title, description, files, status } = data;

        const newPost = {
            title: title,
            description: !description ? "" : description,
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

        await pb.collection("posts").create(newPost)
        //gets own posts, updates posts at usePostsStore
        .then(async () => await getOwnPosts())
        .then(async () => {
            //updated posts are now accessible because of getting fetched before
            const lastPost = usePostsStore().posts[0];
            //post id is sent to updateLoggedInUserFeaturesPosts func to be added to the list of the user's posts
            await updateLoggedInUserFeaturesPosts(lastPost?.id)
        })
    }

    const getPost = async (id: string) => {
        try {
            selectedPost.value = await pb.collection('posts').getOne(id);
        } catch (err: any) {
            console.log(err?.message);
            selectedPostPending.value = false;
            selectedPostView.value = false;
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

    const viewPost = async (post: any) => {
        try {
            await pb.collection("posts").update(post?.id, {
                views: +post?.views + 1
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

    const getBookmarks = async () => {
        posts.value = [];
        await useUsersStore().getLoggedInUserFeatures()
        .then(() => {
            useUsersStore().loggedInUserFeatures?.bookmarks.map(async (bookmark: any) => {
                await pb.collection('posts').getOne(bookmark)
                .then((data) => {
                    posts.value.push(data);
                })
            })
        })
    }

    const deletePost = async (id: string) => {
        await pb.collection('posts').delete(id);
    }

    const openPostModal = async (id: string) => {
        selectedPostPending.value = true;

        await getPost(id)
        .then(() => {
            selectedPostPending.value = false;
            selectedPostView.value = true
        });
    }

    return { posts, allPostsPending, previouslyLoadedPosts, selectedPost, selectedPostView, selectedPostPending, createPostsView, getOwnPosts, getFeedPosts, getPost, getBookmarks, createPosts, likePost, viewPost, bookmarkPost, deletePost, openPostModal };
})