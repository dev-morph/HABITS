<template>
	<div class="my__info__wrapper">
		<div class="avatar">
			<img src="habit_nobackground.png" alt="" />
		</div>
		<div class="info__wrapper">
			<div class="name">
				<span :class="editMode && 'inactive'">{{ userStore.userInfo.username }}</span>
				<input
					ref="nameInput"
					class="inactive__input"
					:class="editMode && 'active__input'"
					type="text"
					v-model="userInfo.username"
					v-focus
					@keypress.enter="saveInfoHandler"
				/>
			</div>
			<div class="email">
				<i class="email__icon"></i>
				<span>{{ userStore.userInfo.email }}</span>
				<!-- <input disabled class="inactive__input" :class="editMode && 'active__input'" type="text" v-model="userInfo.email" /> -->
			</div>
		</div>

		<div class="btn__wrapper">
			<button v-if="!editMode" class="my__info__btn" @click="editModeOpenHandler">Edit profile</button>
			<div v-else class="btn__wrapper">
				<button class="my__info__btn" @click="saveInfoHandler">Save profile</button>
				<button class="my__info__btn" @click="cancleHandler">Cancle</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { updateUserInfo } from '@/api/userApi';

export default defineComponent({
	name: 'MyInfo',
	components: {},
	setup() {
		const userStore = useUserStore();
		const nameInput = ref();
		const userInfo = reactive({
			username: '',
			email: '',
		});
		const editMode = ref(false);

		function editModeOpenHandler() {
			editMode.value = true;
			nameInput.value.focus();
		}
		function editModeOffHandler() {
			editMode.value = false;
		}

		async function saveInfoHandler() {
			if (userInfo.username.length === 0 || userInfo.email.length === 0) {
				return;
			}
			await updateUserInfo(userInfo);
			userStore.getUserInfo();
			editModeOffHandler();
		}

		function cancleHandler() {
			userInfo.email = userStore.userInfo.email;
			userInfo.username = userStore.userInfo.username;
			editModeOffHandler();
		}

		function inputHandler(event: Event, to: string) {
			const target = event.target as HTMLInputElement;

			if (to === 'name') {
				userInfo.username = target.value;
				// userStore.setUserName(target.value);
			} else if (to === 'email') {
				userInfo.email = target.value;
				// userStore.setUserEmail(target.value);
			}
		}

		onMounted(async () => {
			await userStore.getUserInfo();
			userInfo.email = userStore.userInfo.email;
			userInfo.username = userStore.userInfo.username;
		});
		return {
			//variables,
			userStore,
			nameInput,
			userInfo,
			editMode,
			//functions,
			editModeOpenHandler,
			saveInfoHandler,
			cancleHandler,
			inputHandler,
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
	font-size: 2rem;
	.inactive {
		display: none !important;
		opacity: 0;
	}
	.avatar {
		background-color: white;
		border-radius: 50%;
		width: 20rem;
		height: 20rem;
	}

	.info__wrapper {
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

		.inactive__input {
			opacity: 0;
			height: 1.75rem;
			width: 0;
			padding: 0 0px;
			font-size: 1.5rem;
			overflow: hidden;
			border: none;
			background-color: transparent;

			outline: none;
			text-align: center;
			transition: all 0.5s ease;
			&.active__input {
				opacity: 1;
				height: 1.75rem;
				width: 250px;
				border: none;
				padding: 0 8px;
				border-bottom: 2px solid white;
			}
		}
	}

	.btn__wrapper {
		display: flex;
		gap: 1rem;
		.my__info__btn {
			font-size: 1.25rem;
			padding: 0.5rem 3rem;
			border: 1px solid rgb(83, 83, 83);
			border-radius: 0.5rem;
			background-color: rgba(66, 66, 66, 0.5);

			&:hover {
				background-color: rgba(66, 66, 66, 0.7);
			}
			&:active {
				transform: scale(1.02);
			}
		}
	}
}
</style>
