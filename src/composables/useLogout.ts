import { LogIn } from "../components";
import { pb } from "../pocketbase"
import { useMainStore } from "../stores/main";

export default function () {

    const logOut = () => {
        pb.authStore.clear();
        useMainStore().switchDisplay(LogIn);
    }

    return logOut;
}