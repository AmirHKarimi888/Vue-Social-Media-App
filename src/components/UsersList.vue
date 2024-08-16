<template>
    <div v-if="usersPending" class="flex justify-center my-20">
        <Spinner />
    </div>
    <ul v-else class="grid mt-5">
        <UserItem />
    </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { UserItem } from '.';
import { useUsersStore } from '../stores/userManagement';
import { Spinner } from './icons';

const usersStore = useUsersStore();

const { usersPending } = storeToRefs(usersStore);
</script>

<style scoped>

</style>