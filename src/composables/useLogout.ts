import { LogIn } from "../components";
import { pb } from "../pocketbase"
import { useMainStore } from "../stores/main";
import { useUsersStore } from "../stores/userManagement";

export default function () {

    const logOut = () => {
        pb.authStore.clear();
        useMainStore().mainDisplay = LogIn;
        useUsersStore().loggedInUser = {};
        useUsersStore().loggedInUserFeatures = {};
        useUsersStore().isLoggedIn = false;
    }

    return logOut;
}