import { Dashboard } from "../components";
import { pb } from "../pocketbase"
import { useMainStore } from "../stores/main";
import { useUsersStore } from "../stores/userManagement";

export default function () {

    const logIn = async (data: any) => {

        const { updateLoggedInUser } = useUsersStore();
        const { switchDisplay } = useMainStore();

        const { email, password } = data;

        try {
            await pb.collection("users").authWithPassword(email, password)
            .then(() => pb.authStore.exportToCookie())
            .then(() => updateLoggedInUser())
            .then(() => switchDisplay(Dashboard))
        } catch (error: any) {
            alert(error.message);
        }
    }

    const googleLogIn = async () => {
        try {
            await pb.collection('users').authWithOAuth2Code("google", "googleAuth", "googleAuth", "http://127.0.0.1:8090/api/oauth2-redirect")
        } catch (error: any) {
            alert(error.message);
        }
    }

    return { logIn, googleLogIn };
}