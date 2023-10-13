<template>
	<div id="home">
		<greeting v-if="userStore.userInfo.username" :name="userStore.userInfo.username" />
		<todo-list v-if="userStore.userInfo.email" :email="userStore.userInfo.email" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Greeting from '@/components/Greeting.vue';
import TodoList from '@/components/TodoList.vue';
import { useUserStore } from '@/store/user';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
		TodoList,
	},
	setup() {
		const userStore = useUserStore();

		onMounted(() => {
			userStore.getUserInfo();
		});
		return {
			//variables,
			userStore,
		};
	},
});
</script>

<style lang="scss">
#home {
	width: 100%;
	height: calc(100vh - 100px);
	display: grid;
	grid-template-rows: min(55%) 45%;
}
</style>
