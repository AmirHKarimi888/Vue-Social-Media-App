<template>
    <div class="grid gap-2 h-screen overflow-auto">
        <div class="bg-zinc-100 dark:bg-black border border-zinc-300 dark-border rounded-md">
            <CreatePosts />
        </div>
        <ul class="w-full grid grid-cols-3 gap-2">
            <Posts />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { CreatePosts, Posts } from '.';


</script>

<style scoped>

</style>