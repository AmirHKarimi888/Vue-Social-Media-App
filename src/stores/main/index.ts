import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { Dashboard, Feed, LogIn } from "../../components";
import { useUsersStore } from "../userManagement";

export const useMainStore = defineStore("main", () => {
    const mainDisplay = shallowRef(useUsersStore().isLoggedIn ? Dashboard : LogIn);
    const dashboardMainDisplay = shallowRef(Feed);
    const isDark = ref(localStorage.getItem("theme") === "dark" ? true : false);
    const drawerView = ref(false);

    const toggleTheme = () => {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else if (localStorage.getItem("theme") === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }
    
    const toggleDrawer = () => drawerView.value = !drawerView.value;

    return { mainDisplay, dashboardMainDisplay, isDark, drawerView, toggleTheme, toggleDrawer };
})