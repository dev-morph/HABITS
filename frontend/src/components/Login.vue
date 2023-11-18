<template>
	<section class="signup__wrapper">
		<div class="signup__logo">
			<img src="habit_nobackground.png" alt="signup_logo" />
		</div>

		<div class="input__wrapper">
			<Transition name="display" mode="out-in">
				<div class="question" v-if="currentStage === 0">
					<label for="email">What's your email?</label>
					<input
						id="email"
						class="user__input"
						type="email"
						placeholder="Email"
						v-model="userInfo.email"
						ref="emailInput"
						@keypress.enter="enterHandler(currentStage)"
						v-focus
					/>
					<p class="error__msg" v-if="errorMsg.length > 0">{{ errorMsg }}</p>
				</div>
			</Transition>
			<Transition name="display" mode="out-in">
				<div class="question" v-if="currentStage === 1">
					<label for="password">Please enter password.</label>
					<input
						class="user__input"
						id="password"
						type="password"
						placeholder="Password"
						v-model="userInfo.password"
						ref="passwordInput"
						@keypress.enter="enterHandler(currentStage)"
						v-focus
					/>
					<p class="error__msg" v-if="errorMsg.length > 0">{{ errorMsg }}</p>
				</div>
			</Transition>
		</div>
		<div class="btn__wrapper">
			<Transition name="display" mode="out-in">
				<div class="prevStageBtn" v-if="currentStage >= 1" @click="goPreviousStage">&lt; Change {{ previousStage }}</div>
			</Transition>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
import { login } from '@/api/authApi';
import { AxiosError } from 'axios';
import router from '@/router';
import { useUserStore } from '@/store/user';

export default defineComponent({
	name: 'Login',
	setup() {
		const userStore = useUserStore();
		const currentStage = ref(0);
		const emailInput = ref();
		const passwordInput = ref();
		const userInfo = reactive({
			email: '',
			password: '',
		});
		const errorMsg = ref('');

		const previousStage = computed(() => {
			return currentStage.value === 1 && 'email';
		});

		async function enterHandler(curStage: number) {
			if (curStage === 0) {
				if (validateEmail(userInfo.email)) {
					stageHanlder(true);
					errorMsg.value = '';
				} else {
					errorMsg.value = `${userInfo.email}는 email 형식에 맞지 않습니다. 다시 시도해주세요.`;
				}
			} else {
				errorMsg.value = '';
				try {
					await login(userInfo);
					// const user = { username: data.username, email: data.email };
					userStore.getUserInfo();
					router.push('/home');
				} catch (error) {
					if (error instanceof AxiosError) {
						if (error.response?.status === 401) {
							errorMsg.value = '잘못된 로그인 정보입니다. 다시 로그인 해주세요.';
						}
					}
				}
			}
		}

		function stageHanlder(direction: boolean) {
			errorMsg.value = '';
			const temp = currentStage.value;
			currentStage.value = -1;
			if (direction) {
				setTimeout(() => {
					currentStage.value = temp + 1;
				}, 600);
			} else {
				setTimeout(() => {
					currentStage.value = temp - 1;
				}, 600);
			}
		}

		function goPreviousStage() {
			if (currentStage.value <= 0) return;
			stageHanlder(false);
		}
		function validateEmail(email: string) {
			let regex = new RegExp(
				// eslint-disable-next-line no-control-regex, no-useless-escape
				"([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
			);
			return regex.test(email);
		}

		function initPage() {
			(userInfo.email = ''), (userInfo.password = ''), (currentStage.value = 0);
		}

		onMounted(() => {
			initPage();
		});
		return {
			//variables
			currentStage,
			emailInput,
			passwordInput,
			userInfo,
			errorMsg,
			//computed
			previousStage,
			//functions
			enterHandler,
			goPreviousStage,
		};
	},
	// directives: {
	// 	focus: {
	// 		mounted: el => el.focus(),
	// 	},
	// },
});
</script>

<style lang="scss" scoped>
.signup__wrapper {
	display: flex;
	width: 100%;
	height: calc(100vh - 100px);
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.input__wrapper {
		height: 200px;
	}
	.signup__logo {
		img {
			width: 400px;
			height: 400px;
		}
	}

	.question {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 3rem;
		.user__input {
			border: none;
			background-color: transparent;
			border-bottom: 2.5px solid white;
			outline: none;
			text-align: center;
		}

		.error__msg {
			font-size: 1rem;
		}
	}
}
.btn__wrapper {
	height: 100px;
}
.prevStageBtn {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem 2rem;
	border: 1.5px solid white;
	border-radius: 50px;
	box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
	cursor: pointer;
	font-size: 0.9375rem;
	font-weight: 500;
	outline: 0;
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
