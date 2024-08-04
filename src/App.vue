<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
  "theme" in localStorage ? null : localStorage.setItem("theme", "light");

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.remove("dark");
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