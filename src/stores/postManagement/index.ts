import { defineStore } from "pinia";
import { ref } from "vue";
import { useUsersStore } from "../userManagement";
import { pb } from "../../pocketbase";

export const usePostsStore = defineStore("posts", () => {

    const usersStore = useUsersStore();

    const { updateLoggedInUserFeaturesPosts } = usersStore;

    const posts = ref<any[]>([]);
    const previouslyLoadedPosts = ref<any[]>([]);
    const selectedPost = ref<any>({});

    const selectedPostView = ref(false);
    const createPostsView = ref(false);

    const allPostsPending = ref(false);
    const selectedPostPending = ref(false);

    const createPosts = async (data: any) => {

        const { description, files, status } = data;

        const newPost = {
            description: !description ? "" : description,
            contents: "",
            author: usersStore.loggedInUser?.id,
            authorEmail: usersStore.loggedInUser?.email,
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

    const getOwnPosts = async () => {
        const id = usersStore.loggedInUser?.id
        posts.value = await pb.collection('posts').getFullList({
            filter: "author = " + "'" + id + "'" + "",
            sort: "-created"
        })
        //return posts.value;
    }

    const getUserPosts = async (id: string) => {
        posts.value = await pb.collection('posts').getFullList({
            filter: "author = " + "'" + id + "'" + " && " + "status = " + "" + true + "" + "",
            sort: "-created"
        })
        //return posts.value;
    }

    const getNewPosts = async (pageNum: number, itemsPerPage: number) => {
        const response = await pb.collection('posts').getList(pageNum, itemsPerPage, {
            filter: "status = " + "" + true + "" + "",
            sort: "-created"
        }) as any
        
        posts.value = previouslyLoadedPosts.value.concat(response?.items);
        posts.value = Array.from(new Set(posts.value));
        previouslyLoadedPosts.value = posts.value;
    }

    const getFeedPosts = async (pageNum: number, itemsPerPage: number) => {
        
        const response = await pb.collection('posts').getList(pageNum, itemsPerPage, {
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

    const getBookmarks = async () => {
        posts.value = [];
        await usersStore.getLoggedInUserFeatures()
        .then(() => {
            usersStore.loggedInUserFeatures?.bookmarks.map(async (bookmark: any) => {
                await pb.collection('posts').getOne(bookmark)
                .then((data) => {
                    posts.value.push(data);
                })
            })
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
            if (post?.likes.includes(usersStore.loggedInUser?.id)) {
                likes = post?.likes.filter((like: any) => like !== usersStore.loggedInUser?.id);
            } else {
                likes = [...post?.likes, usersStore.loggedInUser?.id]
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
            if (usersStore.loggedInUserFeatures?.bookmarks.includes(post?.id)) {
                bookmarks = usersStore.loggedInUserFeatures?.bookmarks.filter((bookmark: any) => bookmark !== post?.id);
            } else {
                bookmarks = [...usersStore.loggedInUserFeatures?.bookmarks, post?.id]
            }
            await pb.collection("users_features").update(usersStore.loggedInUserFeatures?.id, {
                bookmarks: bookmarks
            })


        } catch (err: any) {
            alert(err?.message);
        }
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

    return { posts, allPostsPending, previouslyLoadedPosts, selectedPost, selectedPostView, selectedPostPending, createPostsView, getOwnPosts, getUserPosts, getFeedPosts, getPost, getBookmarks, getNewPosts, createPosts, likePost, viewPost, bookmarkPost, deletePost, openPostModal };
})