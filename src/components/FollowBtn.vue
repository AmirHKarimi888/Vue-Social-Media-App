<template>
    <div>
        <button v-if="!isFollowing" class="p-1 bg-green-600 text-white rounded-md font-normal text-sm cursor-pointer">Follow</button>
        <button v-else class="p-1 bg-green-800/80 text-white rounded-md font-normal text-sm cursor-pointer">Following</button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from '../stores/userManagement';
import { computed } from 'vue';

const usersStore = useUsersStore();

const { loggedInUserFeatures } = storeToRefs(usersStore);

const props = defineProps({
    selectedUser: Object
})

const isFollowing = computed(() => loggedInUserFeatures.value?.followings.includes(props.selectedUser?.id));
</script>

<style scoped>

</style>