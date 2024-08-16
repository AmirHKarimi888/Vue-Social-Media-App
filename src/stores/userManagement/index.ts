import { defineStore } from "pinia";
import { ref } from "vue";
import { pb } from "../../pocketbase";
import { useMainStore } from "../main";
import { Blank, User } from "../../components";
import { usePostsStore } from "../postManagement";

export const useUsersStore = defineStore("users", () => {

    const mainStore = useMainStore();
    const postsStore = usePostsStore();

    const isLoggedIn = ref(pb.authStore.isValid);

    const users = ref<any[]>([]);
    const loggedInUser = ref(pb.authStore.model);
    const loggedInUserFeatures = ref<any>();
    const selectedUser = ref<any>({});
    const selectedUserFeatures = ref<any>({});

    const usersPending = ref(false);

    const searchView = ref(false);

    const getSearchingUsers = async (input: string) => {
        users.value = await pb.collection('users').getFullList({
            filter: "username ~ " + "'" + input + "'" + " || " + "email ~ " + "'" + input + "'" + "",
        })
    }

    const updateLoggedInUser = () => {
        isLoggedIn.value = pb.authStore.isValid;
        loggedInUser.value = pb.authStore.model;
    }

    //this function is once used when Profile component is rendered
    const getLoggedInUserFeatures = async () => {
        const username = loggedInUser.value?.username;
        const email = loggedInUser.value?.email;
        //this list will include one item because of the filter
        const features = await pb.collection('users_features').getFullList({
            filter: "username = " + "'" + username + "'" + " && " + "email = " + "'" + email + "'" + ""
        })
        loggedInUserFeatures.value = features[0];
        //return features[0];
    }

    const getSelectedUserFeatures = async (username: string, email: string) => {

        const features = await pb.collection('users_features').getFullList({
            filter: "username = " + "'" + username + "'" + " && " + "email = " + "'" + email + "'" + ""
        })
        selectedUserFeatures.value = features[0];
        //return features[0];
    }

    const updateLoggedInUserFeaturesPosts = async (postId: string) => {
        try {
            await pb.collection("users_features").update(loggedInUserFeatures.value?.id, {
                posts: [...loggedInUserFeatures.value?.posts, postId]
            })
            //used to update loggedInUserFeatures reactive varieble to be updated in dom
            .then(async () => await getLoggedInUserFeatures())
        } catch (err: any) {
            alert(err?.message);
        }
    }

    const getUser = async (id: string) => {
        selectedUser.value = await pb.collection('users').getOne(id);
    }

    const openUserDisplay = async (user: any) => {
        postsStore.allPostsPending = true;
        mainStore.dashboardMainDisplay = Blank;
        postsStore.selectedPostView = false;
        selectedUser.value = user;

        await postsStore.getUserPosts(user?.id)
            .then(async () => {
                await getSelectedUserFeatures(user?.username, user?.email);
            })
            .then(() => {
                postsStore.allPostsPending = false;
                mainStore.dashboardMainDisplay = User;
                useUsersStore().searchView = false;
            })
    }

    return { isLoggedIn, loggedInUser, loggedInUserFeatures, selectedUser, selectedUserFeatures, users, usersPending, searchView, updateLoggedInUser, getLoggedInUserFeatures, updateLoggedInUserFeaturesPosts, getUser, getSearchingUsers, getSelectedUserFeatures, openUserDisplay };
})