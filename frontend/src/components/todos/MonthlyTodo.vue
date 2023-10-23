<template>
	<div class="calendar__wrapper">
		<div></div>
		<Calendar />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Calendar from '@/components/common/Calendar.vue';

export default defineComponent({
	name: 'MonthlyTodo',
	components: { Calendar },
	// props: {},
	setup() {
		const date = ref();
		return {
			date,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.calendar__wrapper {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
