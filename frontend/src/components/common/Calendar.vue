<template>
	<div class="dp__outside__wrapper">
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
						<div
							v-for="(cell, idx) in row"
							:key="idx"
							class="cell"
							:class="{
								not__cur: cell.month !== targetDate.month,
								today: cell.month === today.get('month') + 1 && cell.date === today.get('date'),
								selected: cell.month === selected.month && cell.date === selected.date,
							}"
							@click="selectHandler(cell)"
						>
							{{ cell.date }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, computed, PropType } from 'vue';
import dayjs from 'dayjs';
import { CalendarCellType } from '@/types/types';

export default defineComponent({
	name: 'Calendar',
	components: {},
	props: {
		selected: {
			type: Object as PropType<CalendarCellType>,
			required: true,
		},
		selectHandler: {
			type: Function,
			required: true,
		},
	},
	setup(props) {
		console.log('props is ', props);
		const calendarRef = ref();
		const baseDate = ref(dayjs());
		const today = ref(dayjs());
		// const selected: CalendarCellType = reactive({
		// 	month: today.value.get('month') + 1,
		// 	date: today.value.get('date'),
		// });

		const targetDate = computed(() => {
			return {
				year: baseDate.value.get('year'),
				month: baseDate.value.get('month') + 1,
				prevYear: baseDate.value.subtract(1, 'year').get('year'),
				nextYear: baseDate.value.add(1, 'year').get('year'),
				prevMonth: baseDate.value.subtract(1, 'month').get('month') + 1,
				nextMonth: baseDate.value.add(1, 'month').get('month') + 1,
			};
		});
		const calendar: Ref<CalendarCellType[][]> = ref([]);

		function getDayOfFirstDayOfMonth(yearMonth: string) {
			return dayjs(yearMonth).day();
		}
		function generateCaledar() {
			const { firstRow, prevDate } = generateFirstRow();
			calendar.value.push(firstRow);
			generateLeftRows(prevDate);
			console.log(calendar.value);
		}

		/**
		 * 7개의
		 * @param row
		 */
		function generateFirstRow() {
			const row: CalendarCellType[] = [];
			const lastDayOfPreviousMonth = baseDate.value.subtract(1, 'month').daysInMonth();
			const dayOfFirstDay = getDayOfFirstDayOfMonth(baseDate.value.format('YYYY-MM'));
			let start = 0;
			let date = lastDayOfPreviousMonth - (dayOfFirstDay - start - 1);
			while (dayOfFirstDay - start > 0) {
				//만약 prevMonth가 1월이라면, 년도가 바뀐것
				if (targetDate.value.prevMonth === 12) {
					row.push({ year: targetDate.value.prevYear, month: targetDate.value.prevMonth, date: date });
				} else {
					row.push({ year: targetDate.value.year, month: targetDate.value.prevMonth, date: date });
				}
				start++;
				date = lastDayOfPreviousMonth - (dayOfFirstDay - start - 1);
			}
			date = 1;
			while (row.length < 7) {
				row.push({ year: targetDate.value.year, month: targetDate.value.month, date: date });
				date++;
			}
			return { firstRow: row, prevDate: date };
		}

		function generateLeftRows(prevDate: number) {
			const lastDayOfThisMonth = baseDate.value.daysInMonth();
			let row: CalendarCellType[] = [];
			let date = prevDate;
			while (date <= lastDayOfThisMonth) {
				row.push({ year: targetDate.value.year, month: targetDate.value.month, date: date });
				date++;
				if (row.length === 7) {
					calendar.value.push(row);
					row = [];
				}
			}
			if (date >= lastDayOfThisMonth && row.length < 7) {
				date = 1;
				while (row.length < 7) {
					//만약 nextMonth가 1월이라면, 년도가 바뀐것
					if (targetDate.value.nextMonth === 1) {
						row.push({ year: targetDate.value.nextYear, month: targetDate.value.nextMonth, date: date });
					} else {
						row.push({ year: targetDate.value.year, month: targetDate.value.nextMonth, date: date });
					}
					date++;
				}
				calendar.value.push(row);
			}
		}

		function dpNavHandler(direction: boolean) {
			if (direction) {
				baseDate.value = baseDate.value.add(1, 'month');
			} else {
				baseDate.value = baseDate.value.subtract(1, 'month');
			}
			clearCalendar();
			generateCaledar();
		}

		function clearCalendar() {
			calendar.value = [];
		}
		onMounted(() => {
			generateCaledar();
		});
		return {
			//variables
			calendarRef,
			baseDate,
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
.dp__outside__wrapper {
	height: 100%;
	.dp__calendar__wrapper {
		width: 350px;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		padding: 0.5rem 1rem;
		.dp__month__year__row {
			display: grid;
			grid-template-columns: 15% 70% 15%;
			padding: 1rem 0;
			font-size: 1.2rem;
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

					&.not__cur {
						color: rgb(149, 149, 149);
					}
					&.today {
						background-color: rgb(112, 112, 112);
						border-radius: 50%;
					}
					&.selected {
						background-color: rgb(152, 152, 152);
						border-radius: 50%;
						font-weight: 700;
						font-size: 1.1rem;
						color: white;
					}
				}
			}
		}
	}
}
</style>
