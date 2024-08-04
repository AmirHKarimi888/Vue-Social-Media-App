<script setup lang="ts">
import { useMainStore } from "../stores/main";

</script>

<template>
      <Suspense>
        <component :is="useMainStore().mainDisplay"></component>
      </Suspense>
</template>