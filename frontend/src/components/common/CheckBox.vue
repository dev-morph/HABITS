<template>
	<!-- <img src="@/assets/icons/checked.png" /> -->
	<label class="label__wrapper">
		<div class="box"></div>
		<input v-model="computedValue" type="checkbox" class="inside__input" />
		<span class="label__text" :class="computedValue && 'checked'">{{ label }}</span>
	</label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'Checkbox',
	props: {
		value: Boolean,
		id: Number,
		label: String,
	},

	setup: (props, { emit }) => {
		const computedValue = computed({
			get() {
				return props.value;
			},
			set(value) {
				emit('updateTodoState', value, props.id);
			},
		});
		return { computedValue };
	},
});
</script>

<style lang="scss" scoped>
.label__wrapper {
	display: flex;
	align-items: center;
	gap: 0.25rem;
	input[type='checkbox'] {
		display: none;
	}
	.box {
		background: url('@/assets/icons/unchecked.svg');
		// display: inline-block;
		vertical-align: middle;
		// position: absolute;
		// margin-left: -1.75rem;
		// transform: translate(0, -50%);
		width: 1.5rem;
		height: 1.5rem;
	}
	// .label__text::before {
	// 	content: '';
	// 	background: url('@/assets/icons/unchecked.svg');
	// 	display: inline-block;
	// 	vertical-align: middle;
	// 	// position: absolute;
	// 	// margin-left: -1.75rem;
	// 	// transform: translate(0, -50%);
	// 	width: 1.5rem;
	// 	height: 1.5rem;
	// 	// border: 1px solid black;
	// }

	&:has(> input:checked) .box {
		background: url('@/assets/icons/checked.svg');
	}
	// &:has(> input:checked) .label__text::before {
	// 	content: '';
	// 	background: url('@/assets/icons/checked.svg');
	// }
}
.label__text {
	cursor: pointer;
	&.checked {
		text-decoration: line-through;
	}
}
</style>
