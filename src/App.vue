<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostsStore } from './stores/postManagement';
import { storeToRefs } from 'pinia';
import { useUsersStore } from './stores/userManagement';

const postsStore = usePostsStore();
const usersStore = useUsersStore();

const { selectedPostView } = storeToRefs(postsStore);
const { openPostModal } = postsStore;

const {  } = storeToRefs(usersStore);
const { openUserDisplay } = usersStore;

onMounted(async () => {
  "theme" in localStorage ? null : localStorage.setItem("theme", "light");

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  }


  if (location.hash.startsWith("#posts") && !selectedPostView.value) {
    await openPostModal(location.hash.replace("#posts/", ""));

  } else if (location.hash.startsWith("#users/")) {
    await openUserDisplay(null, location.hash.replace("#users/", ""));
  }

})
</script>

<template>
  <div id="App">
    <header>

    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>