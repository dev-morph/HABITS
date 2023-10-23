<template>
	<div id="home">
		<greeting v-if="userStore.userInfo.username" :name="userStore.userInfo.username" />
		<section class="events__wrapper">
			<todo-list v-if="userStore.userInfo.email && !calendarMode" :email="userStore.userInfo.email" />
			<monthly-todo v-else />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Greeting from '@/components/Greeting.vue';
import TodoList from '@/components/TodoList.vue';
import { useUserStore } from '@/store/user';
import MonthlyTodo from '@/components/todos/MonthlyTodo.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
		TodoList,
		MonthlyTodo,
	},
	setup() {
		const userStore = useUserStore();
		const calendarMode = ref(true);

		onMounted(() => {
			userStore.getUserInfo();
		});
		return {
			//variables,
			userStore,
			calendarMode,
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
