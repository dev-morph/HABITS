<template>
	<div>
		<Transition name="display">
			<div class="greeting__wrapper" v-if="now">
				<div class="clock">{{ now }}</div>
				<div class="greeting__phrase">{{ greetingPhrases }}, {{ name }}.</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
interface GreetingProps {
	name: string;
}

import { onMounted, onUnmounted, ref, computed, toRefs } from 'vue';
import dayjs from 'dayjs';

const props = defineProps<GreetingProps>();
const { name } = toRefs(props);
const now = ref();
const hour = ref();
const timeCheckInterval = ref();
const greetingPhrases = computed(() => {
	if (hour.value > 3 && hour.value < 12) {
		return 'Good morning';
	} else if (hour.value >= 12 && hour.value < 18) {
		return 'Good afternoon';
	} else if (hour.value >= 18 && hour.value < 21) {
		return 'Good evening';
	} else {
		return 'Good night';
	}
});
function getRealTime() {
	const n = dayjs();
	now.value = n.format('HH:mm');
	hour.value = n.get('hour');
}
onMounted(() => {
	//초기 빠른 로딩을 위해 interval 세팅 이전 함수 호출
	getRealTime();
	timeCheckInterval.value = setInterval(getRealTime, 1000);
});
onUnmounted(() => {
	clearInterval(timeCheckInterval.value);
});
</script>

<style lang="scss" scoped>
.greeting__wrapper {
	width: 100%;
	height: 100%;
	// background-color: red;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0;

	.clock {
		height: fit-content;
		font-size: 10rem;
		font-weight: 600;
		letter-spacing: 0;
		line-height: 100%;
		letter-spacing: -5px;
	}
	.greeting__phrase {
		font-size: 2.5rem;
		font-weight: 600;
	}
}
</style>
