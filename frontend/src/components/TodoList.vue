<template>
	<transition name="display">
		<div class="todo__list__wrapper" v-if="loaded">
			<h1 class="todo__list__header">Today</h1>
			<div class="todos__wrapper">
				<div class="todo__list__body">
					<li v-for="(event, index) in todoList" :key="index">
						<CheckBox :value="event.is_complete" @updateTodoState="updateTodoState" :label="event.title" :id="index" />
					</li>
				</div>
			</div>
			<div class="btn__wrapper">
				<button class="plus__btn" :class="inputMode && 'inactive'" @click="inputModeHandler(true)">
					<PlusSvg :size="'2rem'" />
				</button>
				<input
					ref="newTodoInput"
					class="new__list__input"
					:class="inputMode && 'active'"
					type="text"
					v-model="newTodo.title"
					@keypress.enter="registerNewTodo"
				/>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, Ref } from 'vue';
import PlusSvg from '@/components/common/svg/PlusSvg.vue';
import CheckBox from '@/components/common/CheckBox.vue';
import { CreateTodoType, FindAllTodoListsType, TodoListType } from '@/types/types';
import { findAllTodoLists, createTodoList, updateTodoList } from '@/api/todoListApi';
import dayjs from 'dayjs';

export default defineComponent({
	name: 'TodoList',
	components: { PlusSvg, CheckBox },
	props: {
		email: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const loaded = ref(false);
		const inputMode = ref(false);
		const newTodoInput = ref();
		const newTodo: CreateTodoType = reactive({
			user_email: props.email,
			due_day: '',
			title: '',
			priority: 0,
			is_complete: false,
		});
		const todoList: Ref<TodoListType[]> = ref([]);

		function inputModeHandler(open: boolean) {
			if (open) {
				inputMode.value = true;
				newTodoInput.value.focus();
			} else {
				inputMode.value = false;
				resetTodo(newTodo);
			}
		}

		async function getTodoLists() {
			const query: FindAllTodoListsType = {
				// user_email: props.email,
				due_day: dayjs().format('YYYY-MM-DD'),
			};

			const result = await findAllTodoLists(query);
			todoList.value = result.data;
			return result;
		}

		async function registerNewTodo() {
			if (newTodo.title.length === 0 || newTodo.user_email.length === 0) {
				inputModeHandler(false);
				return;
			}
			newTodo.due_day = dayjs().toISOString();
			await createTodoList(newTodo);
			//close inputMode
			inputModeHandler(false);
			getTodoLists();
		}

		function resetTodo(todo: CreateTodoType) {
			todo.user_email = props.email;
			todo.due_day = '';
			todo.title = '';
			todo.priority = 0;
			todo.is_complete = false;
		}

		async function updateTodoState(value: boolean, idx: number) {
			const target = todoList.value[idx];
			target.is_complete = value;
			await updateTodoList({ id: target.id, is_complete: target.is_complete });
		}
		onMounted(() => {
			loaded.value = true;
			getTodoLists();
		});
		return {
			//variabels
			loaded,
			inputMode,
			todoList,
			newTodoInput,
			newTodo,
			//functions,
			inputModeHandler,
			registerNewTodo,
			updateTodoState,
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

	.todo__list__header {
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
	}
	.todos__wrapper {
		max-height: 65%;
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
		max-height: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		// flex-direction: column;
		.plus__btn {
			border-radius: 50%;
			box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
			font-size: 50px;
			&:hover {
				box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
			}
			&:active {
				transform: scale(1.05);
			}

			&.inactive {
				display: none;
				opacity: 0;
			}
		}
		.new__list__input {
			opacity: 0;
			height: 1.75rem;
			width: 0;
			padding: 0 0px;
			font-size: 1.5rem;
			overflow: hidden;
			border: none;
			background-color: transparent;

			outline: none;
			text-align: center;
			transition: all 0.5s ease;
			&.active {
				opacity: 1;
				height: 1.75rem;
				width: 180px;
				border: none;
				padding: 0 8px;
				border-bottom: 2px solid white;
			}
		}
	}
}
</style>
