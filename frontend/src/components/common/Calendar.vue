<template>
	<div class="dp__calendar__wrapper">
		<div class="dp__month__year__row">
			<button @click="dpNavHandler(false)">&lt;</button>
			<div class="month__year__wrapper">
				<button>{{ targetDate.month }}</button>
				<button>{{ targetDate.year }}</button>
			</div>
			<button @click="dpNavHandler(true)">&gt;</button>
		</div>
		<div>
			<div class="day__of__week__row">
				<div class="day__of__week__cell">Su</div>
				<div class="day__of__week__cell">Mo</div>
				<div class="day__of__week__cell">Tu</div>
				<div class="day__of__week__cell">We</div>
				<div class="day__of__week__cell">Th</div>
				<div class="day__of__week__cell">Fr</div>
				<div class="day__of__week__cell">Sa</div>
			</div>
			<div class="calendar" ref="calendarRef">
				<div v-for="(row, index) in calendar" :key="index" class="calendar__row">
					<div v-for="cell in row" :key="cell" class="cell">{{ cell }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, computed } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
	name: 'Calendar',
	components: {},
	props: {},
	setup() {
		const calendarRef = ref();
		const today = ref(dayjs());

		const targetDate = computed(() => {
			return {
				year: today.value.get('year'),
				month: today.value.get('month') + 1,
			};
		});
		const calendar: Ref<number[][]> = ref([]);

		function getDayOfFirstDayOfMonth(yearMonth: string) {
			return dayjs(yearMonth).day();
		}
		function calculateTotalRows() {
			const lastDayOfPreviousMonth = today.value.subtract(1, 'month').daysInMonth();
			const lastDayOfThisMonth = today.value.daysInMonth();
			const dayOfFirstDay = getDayOfFirstDayOfMonth(today.value.format('YYYY-MM'));
			let start = 0;
			let row = [];
			let date = lastDayOfPreviousMonth - (dayOfFirstDay - start - 1);
			while (dayOfFirstDay - start > 0) {
				row.push(date);
				start++;
				date = lastDayOfPreviousMonth - (dayOfFirstDay - start - 1);
			}
			date = 1;
			while (row.length < 7) {
				row.push(date);
				date++;
			}
			calendar.value.push(row);
			row = [];
			while (date <= lastDayOfThisMonth) {
				row.push(date);
				date++;
				if (row.length === 7) {
					calendar.value.push(row);
					row = [];
				}
			}
			console.log('date is ', row);
			console.log('date is ', date);
			if (date >= lastDayOfThisMonth && row.length < 7) {
				date = 1;
				while (row.length < 7) {
					row.push(date);
					date++;
				}
				calendar.value.push(row);
			}
		}

		function dpNavHandler(direction: boolean) {
			if (direction) {
				today.value = today.value.add(1, 'month');
			} else {
				today.value = today.value.subtract(1, 'month');
			}
			clearCalendar();
			calculateTotalRows();
		}

		function clearCalendar() {
			calendar.value = [];
		}
		onMounted(() => {
			calculateTotalRows();
		});
		return {
			//variables
			calendarRef,
			today,
			//computed
			targetDate,
			calendar,
			//functions
			getDayOfFirstDayOfMonth,
			dpNavHandler,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.dp__calendar__wrapper {
	width: 350px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 5px;
	padding: 0.5rem 1rem;
	.dp__month__year__row {
		display: grid;
		grid-template-columns: 15% 70% 15%;
		.month__year__wrapper {
			display: flex;
			justify-content: space-around;
		}
	}
	.day__of__week__row {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		font-weight: 700;
		border-bottom: 1px solid rgba(99, 99, 99, 0.8);
		.day__of__week__cell {
			display: flex;
			justify-content: center;
			align-items: center;
			// aspect-ratio: 1/1;
		}
	}
	.calendar {
		.calendar__row {
			display: grid;
			grid-template-columns: repeat(7, 1fr);

			.cell {
				display: flex;
				justify-content: center;
				align-items: center;
				aspect-ratio: 1/1;
				cursor: pointer;
				&:hover {
					// background-color: red;
					background-color: rgba(73, 73, 73, 0.9);
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
