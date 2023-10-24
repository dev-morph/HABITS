<template>
	<transition name="display">
		<div class="calendar__wrapper">
			<calendar v-if="selected.date" :selected="selected" :selectHandler="selectHandler" />
			<selected-todo :selected="selected" />
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import dayjs from 'dayjs';
import Calendar from '@/components/common/Calendar.vue';
import SelectedTodo from '@/components/todos/SelectedTodo.vue';
import { CalendarCellType } from '@/types/types';

export default defineComponent({
	name: 'MonthlyTodo',
	components: { Calendar, SelectedTodo },
	setup() {
		const selected: CalendarCellType = reactive({
			year: dayjs().get('year'),
			month: dayjs().get('month') + 1,
			date: dayjs().get('date'),
		});

		function selectHandler(cell: CalendarCellType) {
			selected.year = cell.year;
			selected.month = cell.month;
			selected.date = cell.date;
		}

		return {
			//variables
			selected,
			//functions
			selectHandler,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.calendar__wrapper {
	grid-column: 1/3;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem;
}
</style>
