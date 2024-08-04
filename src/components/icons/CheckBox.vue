<template>
  <div class="dark:bg-black/10">
    <label class="text-white">
      <input
        class="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
        type="checkbox"
        :checked="showPassword"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
    showPassword: Boolean
})
</script>