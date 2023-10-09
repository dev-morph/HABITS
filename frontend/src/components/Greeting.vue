<template>
	<div>
		<transition name="display">
			<div class="greeting__wrapper" v-if="now">
				<div class="clock">{{ now }}</div>
				<div class="greeting__phrase">{{ greetingPhrases }}, Zaas.</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
	name: 'greeting',
	setup() {
		const now = ref();
		const hour = ref();
		const timeCheckInterval = ref();
		const greetingPhrases = computed(() => {
			if (hour.value > 3 && hour.value < 12) {
				return 'Good morning';
			} else if (hour.value >= 12 && hour.value < 18) {
				return 'Good afternnon';
			} else if (hour.value >= 18 && hour.value < 21) {
				return 'Good evening';
			} else {
				return 'Good night';
			}
		});
		function getRealTime() {
			const n = dayjs();
			now.value = n.format('HH:mm:ss');
			hour.value = n.get('hour');
		}
		onMounted(() => {
			timeCheckInterval.value = setInterval(getRealTime, 1000);
		});
		onUnmounted(() => {
			clearInterval(timeCheckInterval.value);
		});
		return {
			//variables,
			now,
			//computed,
			greetingPhrases,
			//functions,
			getRealTime,
		};
	},
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
	}
	.greeting__phrase {
		font-size: 3rem;
		font-weight: 600;
	}
}

.display-leave-active {
	transition: opacity 0.5s ease;
}

.display-enter-active {
	transition: opacity 0.5s ease;
}
.display-enter-from,
.display-leave-to {
	opacity: 0;
}
</style>
