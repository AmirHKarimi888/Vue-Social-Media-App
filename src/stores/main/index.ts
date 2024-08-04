import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { Dashboard, LogIn } from "../../components";
import { pb } from "../../pocketbase";

export const useMainStore = defineStore("main", () => {
    const isLoggedIn = ref(pb.authStore.isValid);
    const loggedInUser = ref(pb.authStore.model);
    const mainDisplay = shallowRef(isLoggedIn.value ? Dashboard : LogIn);
    const isDark = ref(localStorage.getItem("theme") === "dark" ? true : false);
    const drawerView = ref(false);

    const switchDisplay = (comp: any) => {
        mainDisplay.value = comp;
    }

    const updateLoggedInUser = () => {
        isLoggedIn.value = pb.authStore.isValid;
        loggedInUser.value = pb.authStore.model;
    }

    const updateLoggedInUserFeatures = async (id: string) => {
        return await pb.collection('users_features').getOne(id);
    }

    const toggleTheme = () => {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            isDark.value = false;
        } else if (localStorage.getItem("theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            isDark.value = true;
        }
        console.log("hi")
    }
    
    const toggleDrawer = () => drawerView.value = !drawerView.value;

    return { mainDisplay, isLoggedIn, loggedInUser, isDark, drawerView, switchDisplay, updateLoggedInUser, updateLoggedInUserFeatures, toggleTheme, toggleDrawer };
})