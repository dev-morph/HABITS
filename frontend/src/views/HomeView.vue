<template>
	<div id="home">
		<greeting v-if="userStore.userInfo.username" :name="userStore.userInfo.username" />
		<section class="events__wrapper">
			<div class="todo__outside__wrapper">
				<todo-list v-if="userStore.userInfo.email && !calendarMode" :email="userStore.userInfo.email" />
				<monthly-todo v-if="calendarMode" />
			</div>
			<div class="change__btn__wrapper">
				<button @click="calendarModeHandler"><arrow-svg :size="'3rem'" /></button>
			</div>
		</section>
		<footer class="footer">
			<config-molecule />
		</footer>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Greeting from '@/components/Greeting.vue';
import TodoList from '@/components/TodoList.vue';
import { useUserStore } from '@/store/user';
import MonthlyTodo from '@/components/todos/MonthlyTodo.vue';
import ArrowSvg from '@/components/common/svg/ArrowSvg.vue';
import ConfigMolecule from '@/components/molecules/ConfigMolecule.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
		TodoList,
		MonthlyTodo,
		ArrowSvg,
		ConfigMolecule,
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
	grid-template-rows: minmax(0, 47.5%) minmax(0, 47.5%) minmax(0, 5%);

	.events__wrapper {
		max-height: 100%;
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));

		.todo__outside__wrapper {
			width: 100%;
			max-height: 100%;
			min-height: 0;
			grid-column: 2/6;
			align-self: baseline;
			justify-self: center;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		.change__btn__wrapper {
			grid-column: 6/7;
			min-width: 0;
			display: flex;
			align-items: center;
			font-size: 3rem;
		}
	}
}
</style>
