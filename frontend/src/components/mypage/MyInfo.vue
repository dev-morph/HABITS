<template>
	<div class="my__info__wrapper">
		<div class="avatar">
			<img src="default_profile_image.png" alt="" />
			<label for="profile_input" class="profile__edit__btn">
				<PencilSvg :size="'2rem'" />
				<input type="file" id="profile_input" @change="e => fileUploadHandler(e as InputEvent)" />
			</label>
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
					:disabled="!editMode"
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

<script setup lang="ts">
import { onMounted, ref, Ref, reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { updateUserInfo, uploadProfileImage } from '@/api/userApi';
import PencilSvg from '../common/svg/PencilSvg.vue';

const userStore = useUserStore();
const uploadedFile: Ref<File | null> = ref(null);
const nameInput = ref();
const userInfo = reactive({
	username: '',
	email: '',
});
const editMode = ref(false);

function editModeOpenHandler() {
	editMode.value = true;
	nameInput.value.disabled = false;
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
	} else if (to === 'email') {
		userInfo.email = target.value;
	}
}

async function fileUploadHandler(e: InputEvent) {
	let files: FileList | null = null;
	const target = e.target as HTMLInputElement;
	files = target.files;
	if (files && files.length > 0) {
		uploadedFile.value = files[0];
		const formData = new FormData();
		formData.append('file', uploadedFile.value);
		formData.append('data', JSON.stringify(userStore.userInfo));
		const result = await uploadProfileImage(formData);
		console.log('result is , ', result);
	} else {
		//취소한 경우,
		uploadedFile.value = null;
	}

	console.log('uploadedFile is ---> ', uploadedFile.value);
}

onMounted(async () => {
	await userStore.getUserInfo();
	userInfo.email = userStore.userInfo.email;
	userInfo.username = userStore.userInfo.username;
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
		position: relative;
		background-color: white;
		border-radius: 50%;
		width: 20rem;
		height: 20rem;

		.profile__edit__btn {
			position: absolute;
			bottom: 7.5%;
			right: 7.5%;
			background-color: rgb(0, 0, 0);
			border-radius: 50%;
			padding: 0.5rem;

			cursor: pointer;

			input {
				display: none;
			}
		}
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
