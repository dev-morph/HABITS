<template>
	<label class="label__wrapper">
		<div class="box"></div>
		<input v-model="computedValue" type="checkbox" class="inside__input" :class="computedValue && 'checked'" />
		<span class="label__text" :class="computedValue && 'checked'">{{ label }}</span>
		<button class="delete__icon" @click.prevent="deleteHandler"></button>
	</label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'Checkbox',
	props: {
		value: Boolean,
		id: Number,
		idx: Number,
		label: String,
	},

	setup: (props, { emit }) => {
		const computedValue = computed({
			get() {
				return props.value;
			},
			set(value) {
				emit('updateTodoState', value, props.idx);
			},
		});

		function deleteHandler() {
			if (props.id) {
				emit('deleteTodo', props.id);
			}
		}
		return {
			//variables,
			computedValue,
			//functions,
			deleteHandler,
		};
	},
});
</script>

<style lang="scss" scoped>
.label__wrapper {
	position: relative;
	display: flex;
	align-items: center;
	padding: 0 6rem;
	gap: 0.25rem;
	max-width: 750px;
	input[type='checkbox'] {
		display: none;
	}
	.box {
		cursor: pointer;
		// background: red;
		background: url('@/assets/icons/unchecked.svg');
		vertical-align: middle;
		width: 1.5rem;
		height: 1.5rem;
	}
	&:has(> input[type='checkbox']:checked) .box {
		background: url('@/assets/icons/checked.svg');
	}

	// .text__wrapper {
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	max-width: 750px;
	// 	gap: 2rem;
	.label__text {
		cursor: pointer;
		max-width: 550px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-break: break-all;
		&.checked {
			text-decoration: line-through;
		}

		&:hover &::after {
			content: '';
		}
	}
	// }

	// &:hover .label__text::after {
	// 	position: absolute;
	// 	top: 50%;
	// 	right: -1.3rem;
	// 	transform: translateY(-50%);
	// 	// display: inline-block;
	// 	content: '';
	// 	width: 1.3rem;
	// 	height: 1.3rem;
	// 	background-image: url('@/assets/icons/delete_icon.svg');
	// }

	.delete__icon {
		// display: block;
		background-image: url('@/assets/icons/delete_icon.svg');
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
		position: absolute;
		right: 1.5rem;
		opacity: 0;
		// padding: 1.5rem;
		z-index: 9999;
		// display: none;

		&:hover {
			display: block;
			opacity: 1;
		}
		&:active {
			transform: scale(1.05);
		}
	}
	&:hover .delete__icon {
		display: block;
		opacity: 1;
	}
}
</style>
