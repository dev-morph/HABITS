<template>
    <transition name="display">
        <div class="calendar__wrapper">
            <Calendar v-if="selected.date" :selected="selected" :selectHandler="selectHandler" />
            <SelectedTodo :selected="selected" />
        </div>
    </transition>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import dayjs from 'dayjs'
import Calendar from '@/components/common/Calendar.vue'
import SelectedTodo from '@/components/todos/SelectedTodo.vue'
import type { CalendarCellType } from '@/types/types'

const selected: CalendarCellType = reactive({
    year: dayjs().get('year'),
    month: dayjs().get('month') + 1,
    date: dayjs().get('date')
})

function selectHandler(cell: CalendarCellType) {
    selected.year = cell.year
    selected.month = cell.month
    selected.date = cell.date
}
</script>

<style lang="scss" scoped>
.calendar__wrapper {
    width: 100%;
    grid-column: 1/3;
    height: 100%;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}
</style>
