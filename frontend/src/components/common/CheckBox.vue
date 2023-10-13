<template>
	<label class="label__wrapper">
		<div class="box"></div>
		<input v-model="computedValue" type="checkbox" class="inside__input" />
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
	padding: 0 2rem;
	gap: 0.25rem;
	input[type='checkbox'] {
		display: none;
	}
	.box {
		cursor: pointer;
		background: url('@/assets/icons/unchecked.svg');
		vertical-align: middle;
		width: 1.5rem;
		height: 1.5rem;
	}
	&:has(> input:checked) .box {
		background: url('@/assets/icons/checked.svg');
	}
	.label__text {
		cursor: pointer;
		&.checked {
			text-decoration: line-through;
		}

		&:hover &::after {
			content: '';
		}
	}

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
		display: inline-block;
		background-image: url('@/assets/icons/delete_icon.svg');
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
		position: absolute;
		right: -1rem;
		opacity: 0;
		// padding: 1.5rem;

		&:hover {
			opacity: 1;
		}
		&:active {
			transform: scale(1.05);
		}
	}
	&:hover .delete__icon {
		opacity: 1;
	}
}
</style>
