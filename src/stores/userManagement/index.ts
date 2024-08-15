import { defineStore } from "pinia";
import { ref } from "vue";
import { pb } from "../../pocketbase";

export const useUsersStore = defineStore("users", () => {
    const isLoggedIn = ref(pb.authStore.isValid);
    const loggedInUser = ref(pb.authStore.model);
    const loggedInUserFeatures = ref<any>();

    const users = ref<any[]>([]);

    const usersPending = ref(false);

    const searchView = ref(false);

    const selectedUser = ref<any>({});

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

    return { isLoggedIn, loggedInUser, loggedInUserFeatures, selectedUser, users, usersPending, searchView, updateLoggedInUser, getLoggedInUserFeatures, updateLoggedInUserFeaturesPosts, getUser, getSearchingUsers };
})