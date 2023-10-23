<template>
	<div class="dp__calendar__wrapper">
		<div class="dp__month__year__row">
			<button>&lt;</button>
			<div class="month__year__wrapper">
				<button>{{ targetMonth }}</button>
				<button>{{ targetYear }}</button>
			</div>
			<button>&gt;</button>
		</div>
		<div>
			<div class="day__of__week__row">
				<div>Su</div>
				<div>Mo</div>
				<div>Tu</div>
				<div>We</div>
				<div>Th</div>
				<div>Fr</div>
				<div>Sa</div>
			</div>
			<div class="calendar" ref="calendarRef">
				<div v-for="(row, index) in calendar" :key="index" class="calendar__row">
					<div v-for="cell in row" :key="cell">{{ cell }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
	name: 'Calendar',
	components: {},
	props: {},
	setup() {
		const calendarRef = ref();
		const today = ref(dayjs('2023-06-03'));
		const targetYear = ref(today.value.get('year'));
		const targetMonth = ref(today.value.get('months'));
		const calendar: Ref<number[][]> = ref([]);
		function generateCalendar() {
			const calendarRowElement = document.createElement('div');
			calendarRowElement.classList.add('calendar__row');
			//이번 달 1일의 요일을 체크하고
			const dayOfFirstDay = getDayOfFirstDayOfMonth(today.value.format('YYYY-MM'));
			const day = dayjs('2023-06').day();
			const total = dayjs('2023-06-01').daysInMonth();
			// const dayjs('2023-06-01').day() //0=sun, 1=mon, 2=tue, ...6=sat
			console.log(dayOfFirstDay, day, total);
		}
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
			row.push(1);
			while (row.length < 7) {
				date++;
				row.push(date);
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
			console.log('row is', row);
			console.log('calendar is', calendar.value);
		}
		onMounted(() => {
			generateCalendar();
			calculateTotalRows();
		});
		return {
			//variables
			calendarRef,
			today,
			targetYear,
			targetMonth,
			calendar,
			//functions
			generateCalendar,
			getDayOfFirstDayOfMonth,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.dp__calendar__wrapper {
	width: 350px;
	background-color: rgba(0, 0, 0, 0.4);
	border-radius: 5px;
	.dp__month__year__row {
		display: grid;
		grid-template-columns: 15% 70% 15%;
		.month__year__wrapper {
			display: flex;
			justify-content: space-around;
		}
	}
	.day__of__week__row {
		display: flex;
		justify-content: space-around;
	}
	.calendar {
		.calendar__row {
			display: flex;
			justify-content: space-around;
		}
	}
}
</style>
