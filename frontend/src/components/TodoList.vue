<template>
	<transition name="display">
		<div class="todo__list__wrapper" v-if="loaded">
			<h1 class="todo__list__header">Today</h1>
			<div class="todos__wrapper">
				<div class="todo__list__body">
					<li v-for="(event, index) in todoList" :key="index" class="list__wrapper">
						<check-box
							:value="event.is_complete"
							@updateTodoState="updateTodoState"
							@deleteTodo="deleteTodo"
							:label="event.title"
							:idx="index"
							:id="event.id"
						/>
						<button class="delete__icon" @click.prevent="deleteTodo(event.id)">
							<delete-svg :size="'1.3rem'" />
						</button>
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
					:disabled="!inputMode"
				/>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, Ref } from 'vue';
import PlusSvg from '@/components/common/svg/PlusSvg.vue';
import CheckBox from '@/components/common/CheckBox.vue';
import DeleteSvg from '@/components/common/svg/DeleteSvg.vue';
import { CreateTodoType, FindAllTodoListsType, TodoListType } from '@/types/types';
import { findAllTodoLists, createTodoList, updateTodoList, deleteTodolist } from '@/api/todoListApi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export default defineComponent({
	name: 'TodoList',
	components: {
		PlusSvg,
		CheckBox,
		DeleteSvg,
	},
	props: {
		email: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		dayjs.extend(utc);
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
				newTodoInput.value.disabled = false;
				newTodoInput.value.focus();
			} else {
				inputMode.value = false;
				resetTodo(newTodo);
			}
		}

		async function getTodoLists() {
			const query: FindAllTodoListsType = {
				// due_day: dayjs().utc().format('YYYY-MM-DD'),
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
			// newTodo.due_day = dayjs().toISOString();
			newTodo.due_day = dayjs().format('YYYY-MM-DD');
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

		async function deleteTodo(id: number) {
			if (id) {
				await deleteTodolist(id);
				getTodoLists();
			}
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
			deleteTodo,
		};
	},
});
</script>

<style lang="scss" scoped>
.todo__list__wrapper {
	min-width: 0;
	grid-column: 1/3;

	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.5rem;
	max-height: 100%;
	.todo__list__header {
		font-size: 1.5rem;
		font-weight: 600;
		text-align: center;
	}
	.todos__wrapper {
		display: flex;
		flex-direction: column;
		justify-content: baseline;
		align-items: center;
		overflow-y: scroll;

		.todo__list__body {
			width: 100%;
			font-size: 1.5rem;
			max-height: 15rem;
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
			justify-content: baseline;
			align-items: center;
			.list__wrapper {
				max-width: 80%;
				display: flex;
				justify-content: center;
				align-items: center;
				// gap: 2rem;
				position: relative;

				&:hover > .delete__icon {
					display: block;
					opacity: 1;
				}

				.delete__icon {
					position: absolute;
					right: -3rem;
					opacity: 0;
					z-index: 9999;

					&:hover {
						opacity: 1;
						transform: scale(1.05);
					}
					&:active {
						transform: scale(1.07);
					}
				}
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
				// display: none;
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
