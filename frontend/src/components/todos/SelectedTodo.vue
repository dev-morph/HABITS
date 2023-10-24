<template>
	<div class="selected__todo__wrapper">
		<div class="selected__date">{{ selectedDate }}</div>
		<div class="todo__list__body">
			<li class="todo__list" v-for="(event, index) in todoList" :key="index">
				<check-box
					:value="event.is_complete"
					@updateTodoState="updateTodoState"
					@deleteTodo="deleteTodo"
					:label="event.title"
					:idx="index"
					:id="event.id"
					:fontSize="'1.3rem'"
				/>
			</li>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, Ref, ref, onMounted, watch } from 'vue';
import { FindAllTodoListsType, TodoListType, CalendarCellType } from '@/types/types';
import CheckBox from '@/components/common/CheckBox.vue';
import { findAllTodoLists, updateTodoList, deleteTodolist } from '@/api/todoListApi';

export default defineComponent({
	name: 'SelectedTodo',
	components: {
		CheckBox,
	},
	props: {
		selected: {
			type: Object as PropType<CalendarCellType>,
			required: true,
		},
	},
	setup(props) {
		const todoList: Ref<TodoListType[]> = ref([]);
		const selectedDate = computed(() => {
			return `${props.selected.year}-${props.selected.month}-${props.selected.date}`;
		});

		async function getTodoLists() {
			const query: FindAllTodoListsType = {
				due_day: selectedDate.value,
			};
			const result = await findAllTodoLists(query);
			todoList.value = result.data;
			return result;
		}

		async function updateTodoState(value: boolean, idx: number) {
			const target = todoList.value[idx];
			target.is_complete = value;
			await updateTodoList({ id: target.id, is_complete: target.is_complete });
		}

		async function deleteTodo(id: number) {
			if (id) {
				await deleteTodolist(id);
				getTodoLists();
			}
		}

		watch(props.selected, (newSelected, oldSelected) => {
			getTodoLists();
		});

		onMounted(() => {
			getTodoLists();
		});
		return {
			//variables
			selectedDate,
			todoList,
			//functions
			updateTodoState,
			deleteTodo,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.selected__todo__wrapper {
	min-width: 400px;
	grid-column: 2/3;
	height: 100%;
	// align-self: baseline;
	// display: flex;
	// flex-direction: column;
	// justify-content: baseline;
	// align-items: center;
	// display: grid;
	// grid-template-columns: repeat(1, 1fr);
	display: flex;
	flex-direction: column;
	// justify-content: center;
	align-items: center;
	// grid-template-rows: max(5.7rem) 1fr;

	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 5px;

	.selected__date {
		grid-column: 1/2;
		font-size: 1.3rem;
		font-weight: 400;
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(97, 97, 97, 0.8);
		width: 95%;
		text-align: center;
		height: 6rem;
		line-height: 6rem;
	}

	.todo__list__body {
		grid-column: 1/2;
		padding: 0.5rem 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
		align-self: baseline;
		justify-self: baseline;

		max-height: 15rem;
		overflow-y: scroll;
		.todo__list {
			display: grid;
			grid-template-columns: 1fr;
			max-width: 400px;
			& > * {
				max-width: 400px;
				grid-column: 1/2;
				min-width: 0;
			}
		}
	}
}
</style>
