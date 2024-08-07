import { LogIn } from "../components";
import { pb } from "../pocketbase"
import { useMainStore } from "../stores/main";

export default function () {

    const { switchDisplay } = useMainStore();

    const logOut = () => {
        pb.authStore.clear();
        switchDisplay(LogIn);
    }

    return logOut;
}