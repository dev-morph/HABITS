<template>
	<div class="todo__list__wrapper">
		<h1 class="todo__list__header">Today</h1>
		<div class="todos__wrapper">
			<div class="todo__list__body">
				<li v-for="(item, index) in todoList" :key="index">
					<input type="checkbox" />
					<ul>
						{{
							item
						}}
					</ul>
				</li>
			</div>
		</div>
		<div class="btn__wrapper">
			<button class="plus__btn">
				<PlusSvg :size="'2rem'" />
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlusSvg from '@/components/common/svg/PlusSvg.vue';
export default defineComponent({
	name: 'TodoList',
	components: { PlusSvg },
	setup() {
		const todoList = ['잠자기', '운동하기', '코딩하기', '잠자기', '운동하기', '코딩하기', '잠자기'];
		return {
			//variabels
			todoList,
		};
	},
});
</script>

<style lang="scss" scoped>
.todo__list__wrapper {
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	// display: grid;
	// grid-template-rows: minmax(20px, 90%) 10%;

	.todo__list__header {
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
	}
	.todos__wrapper {
		max-height: 75%;
		overflow: scroll;
		// background-color: red;
		display: flex;
		flex-direction: column;
		justify-content: baseline;
		align-items: center;
		// background-color: antiquewhite;

		.todo__list__body {
			font-size: 1.5rem;
			li {
				display: flex;
				justify-content: center;
			}
		}
	}
	.btn__wrapper {
		height: 15%;
		display: flex;
		justify-content: center;
		align-items: baseline;
		.plus__btn {
			border-radius: 50%;
			box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
			font-size: 50px;

			&:active {
				transform: scale(1.05);
			}
		}
	}
}
</style>
