<template>
    <Drawer v-model:visible="useMainStore().drawerView">
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ratione cupiditate id quis fuga, earum mollitia eum explicabo labore dolore illo maxime est nam ipsa magni similique eos pariatur nostrum!
        </div>
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import { useMainStore } from '../stores/main';

</script>

<style scoped>

</style>