<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostsStore } from './stores/postManagement';
import { storeToRefs } from 'pinia';

const postsStore = usePostsStore();

const { selectedPostView } = storeToRefs(postsStore);
const { openPostModal } = postsStore;

onMounted(async () => {
  "theme" in localStorage ? null : localStorage.setItem("theme", "light");

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
  }


  if (location.hash && !selectedPostView.value) {
    await openPostModal(location.hash.replace("#", ""));
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