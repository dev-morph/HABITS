<template>
	<div class="my__info__wrapper">
		<div class="avatar">
			<img src="habit_nobackground.png" alt="" />
		</div>
		<div class="info__wrapper">
			<div class="name">
				<span>{{ userStore.getUserInfo.name }}</span>
			</div>
			<div class="email">
				<i class="email__icon"></i>
				<span>{{ userStore.getUserInfo.email }}</span>
			</div>
		</div>

		<button class="edit__btn">Edit profile</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from '@/store/user';

export default defineComponent({
	name: 'MyInfo',
	components: {},
	setup() {
		const userStore = useUserStore();

		onMounted(() => {
			userStore.setUserInfo();
		});
		return {
			userStore,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.my__info__wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	.avatar {
		background-color: white;
		border-radius: 50%;
		width: 20rem;
		height: 20rem;
	}

	.info__wrapper {
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;

		.name {
			font-weight: 700;
		}

		.email {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 1.5rem;
			.email__icon {
				width: 1.5rem;
				height: 1.5rem;
				display: inline-block;
				background-image: url('@/assets/icons/email_icon.svg');
			}
		}
	}
	.edit__btn {
		font-size: 1.25rem;
		padding: 0.5rem 3rem;
		border: 1px solid rgb(83, 83, 83);
		border-radius: 0.5rem;

		&:hover {
			background-color: rgba(66, 66, 66, 0.2);
		}
		&:active {
			transform: scale(1.02);
		}
	}
}
</style>
