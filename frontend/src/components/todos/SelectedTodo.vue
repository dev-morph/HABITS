<template>
	<div class="selected__todo__wrapper">
		<div class="selected__date">{{ selectedDate }}</div>
		<div class="todo__list__body">
			<li v-for="(event, index) in todoList" :key="index">
				<check-box
					:value="event.is_complete"
					@updateTodoState="updateTodoState"
					@deleteTodo="deleteTodo"
					:label="event.title"
					:idx="index"
					:id="event.id"
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
	width: 100%;
	height: 100%;
	align-self: baseline;
	display: flex;
	flex-direction: column;
	justify-content: baseline;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 5px;

	.selected__date {
		font-size: 1.3rem;
		font-weight: 400;
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(97, 97, 97, 0.8);
		width: 100%;
		text-align: center;
	}

	.todo__list__body {
		padding: 0.5rem 0;
	}
}
</style>
