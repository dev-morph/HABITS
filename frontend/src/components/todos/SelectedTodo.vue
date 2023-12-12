<template>
    <div class="outside__wrapper">
        <div class="selected__todo__wrapper">
            <div class="selected__date">{{ selectedDate }}</div>
            <!-- <div class="todo__list__body">
				<li class="list__wrapper" v-for="(event, index) in todoList" :key="index">
					<check-box
						:value="event.is_complete"
						@updateTodoState="updateTodoState"
						@deleteTodo="deleteTodo"
						:label="event.title"
						:idx="index"
						:id="event.id"
						:fontSize="'1.3rem'"
					/>
					<button class="delete__icon" @click.prevent="deleteTodo(event.id)">
						<delete-svg :size="'1.3rem'" />
					</button>
				</li>
			</div> -->
            <todo-molecule :selectedDate="selectedDate" :fontSize="'1.1rem'" />
        </div>
    </div>
</template>

<script setup lang="ts">
interface SelectedTodoProps {
    selected: CalendarCellType
}

import { computed, ref, toRefs, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import type { FindAllTodoListsType, TodoListType, CalendarCellType } from '@/types/types'
import { findAllTodoLists, updateTodoList, deleteTodolist } from '@/api/todoListApi'
import TodoMolecule from './TodoMolecule.vue'
import dayjs from 'dayjs'

const props = defineProps<SelectedTodoProps>()
const { selected } = toRefs(props)

const todoList: Ref<TodoListType[]> = ref([])
const selectedDate = computed(() => {
    const computedDate = dayjs(
        `${selected.value.year}-${selected.value.month}-${selected.value.date}`
    ).format('YYYY-MM-DD')
    return computedDate
})

async function getTodoLists() {
    const query: FindAllTodoListsType = {
        due_day: selectedDate.value
    }
    const result = await findAllTodoLists(query)
    todoList.value = result.data
    return result
}

async function updateTodoState(value: boolean, idx: number) {
    const target = todoList.value[idx]
    target.is_complete = value
    await updateTodoList({ id: target.id, is_complete: target.is_complete })
}

async function deleteTodo(id: number) {
    if (id) {
        await deleteTodolist(id)
        getTodoLists()
    }
}

watch(selected.value, () => {
    getTodoLists()
})

onMounted(() => {
    getTodoLists()
})
</script>

<style lang="scss" scoped>
.outside__wrapper {
    grid-column: 2/3;
    width: 100%;
    height: 100%;
    .selected__todo__wrapper {
        flex-shrink: 0;
        flex-grow: 1;
        max-width: 350px;
        max-height: 350px;
        padding: 0.5rem 1rem;

        background-color: var(--bg--dark-300);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .selected__date {
            width: 100%;
            font-size: 1.2rem;
            font-weight: 400;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(97, 97, 97, 0.8);
            width: 90%;
            text-align: center;
            // height: 6rem;
            // line-height: 6rem;
        }

        .todo__list__body {
            width: 100%;
            height: 280px;
            // max-height: 200px;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: baseline;
            padding: 1rem;
            .list__wrapper {
                max-width: 80%;
                display: flex;
                justify-content: space-between;
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
}
</style>
