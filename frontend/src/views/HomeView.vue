<template>
	<div id="home">
		<greeting v-if="userStore.userInfo.username" :name="userStore.userInfo.username" />
		<section class="events__wrapper">
			<div class="todo__outside__wrapper">
				<todo-list v-if="userStore.userInfo.email && !calendarMode" :email="userStore.userInfo.email" />
				<monthly-todo v-else />
			</div>
			<div class="change__btn__wrapper">
				<button @click="calendarModeHandler"><arrow-svg :size="'3rem'" /></button>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Greeting from '@/components/Greeting.vue';
import TodoList from '@/components/TodoList.vue';
import { useUserStore } from '@/store/user';
import MonthlyTodo from '@/components/todos/MonthlyTodo.vue';
import ArrowSvg from '@/components/common/svg/ArrowSvg.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
		TodoList,
		MonthlyTodo,
		ArrowSvg,
	},
	setup() {
		const userStore = useUserStore();
		const calendarMode = ref(false);

		function calendarModeHandler() {
			calendarMode.value = !calendarMode.value;
		}

		onMounted(() => {
			userStore.getUserInfo();
		});
		return {
			//variables,
			userStore,
			calendarMode,
			//functions
			calendarModeHandler,
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

	.events__wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		.todo__outside__wrapper {
			max-width: 800px;
			min-width: 750px;
			align-self: baseline;
			// flex-grow: 0;
		}

		.change__btn__wrapper {
			display: flex;
			align-items: center;
			font-size: 3rem;
		}
	}
}
</style>
