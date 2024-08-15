<template>
    <div v-if="useUsersStore().usersPending" class="flex justify-center my-20">
        <Spinner />
    </div>
    <ul v-else class="grid mt-5">
        <UserItem />
    </ul>
</template>

<script setup lang="ts">
import { UserItem } from '.';
import { useUsersStore } from '../stores/userManagement';
import { Spinner } from './icons';


</script>

<style scoped>

</style>