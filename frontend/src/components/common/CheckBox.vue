<template>
	<div class="checkbox__wrapper">
		<label class="label__wrapper">
			<div class="box"></div>
			<input v-model="computedValue" type="checkbox" class="inside__input" :class="computedValue && 'checked'" />
			<span class="label__text" :class="computedValue && 'checked'">{{ label }}</span>
		</label>
		<!-- <button class="delete__icon" @click.prevent="deleteHandler">
			<delete-svg :size="'1.3rem'" />
		</button> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// import DeleteSvg from '@/components/common/svg/DeleteSvg.vue';

export default defineComponent({
	name: 'Checkbox',
	components: {
		// DeleteSvg,
	},
	props: {
		value: Boolean,
		id: Number,
		idx: Number,
		label: String,
		fontSize: {
			type: String,
			required: false,
		},
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
.checkbox__wrapper {
	flex-shrink: 1;
	flex-grow: 0;
	max-width: fit-content;
	position: relative;
	min-width: 0;
	max-width: 100%;
	.label__wrapper {
		// max-width: 100%;
		display: flex;
		align-items: center;
		gap: 0.25rem;
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
		.label__text {
			width: 100%;
			cursor: pointer;
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
		&:hover + .delete__icon {
			display: block;
			opacity: 1;
		}
	}
}
</style>
