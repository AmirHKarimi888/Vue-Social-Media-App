import { storeToRefs } from "pinia";
import { LogIn } from "../components";
import { pb } from "../pocketbase"
import { useMainStore } from "../stores/main";
import { useUsersStore } from "../stores/userManagement";

export default function () {

    const mainStore = useMainStore();
    const usersStore = useUsersStore();

    const { mainDisplay } = storeToRefs(mainStore);

    const { loggedInUser, loggedInUserFeatures, isLoggedIn } = storeToRefs(usersStore);

    const logOut = () => {
        pb.authStore.clear();
        mainDisplay.value = LogIn;
        loggedInUser.value = {};
        loggedInUserFeatures.value = {};
        isLoggedIn.value = false;
    }

    return logOut;
}