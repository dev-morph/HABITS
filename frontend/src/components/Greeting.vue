<template>
	<section class="greeting__wrapper">
		<div class="greeting__logo">
			<img src="habit_nobackground.png" alt="greeting_logo" />
		</div>

		<div class="input__wrapper">
			<Transition>
				<div class="question" v-if="currentStage === 0">
					<p>What's your name?</p>
					<input
						class="user__input"
						type="text"
						v-model="userInfo.name"
						ref="nameInput"
						@keyup.enter="enterHandler(currentStage)"
						v-focus
					/>
				</div>
			</Transition>
			<Transition>
				<div class="question" v-if="currentStage === 1">
					<p>What's your email?</p>
					<input
						class="user__input"
						type="text"
						placeholder="Email"
						v-model="userInfo.email"
						ref="emailInput"
						@keyup.enter="enterHandler(currentStage)"
						v-focus
					/>
				</div>
			</Transition>
			<Transition>
				<div class="question" v-if="currentStage === 2">
					<p>Please choose a password.</p>
					<input
						class="user__input"
						type="password"
						placeholder="Password"
						v-model="userInfo.password"
						ref="passwordInput"
						@keyup.enter="enterHandler(currentStage)"
						v-focus
					/>
				</div>
			</Transition>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
	name: 'Greeting',
	setup() {
		const currentStage = ref(0);
		const nameInput = ref();
		const emailInput = ref();
		const passwordInput = ref();
		const userInfo = reactive({
			name: '',
			email: '',
			password: '',
		});
		function enterHandler(curStage: number) {
			if (curStage === 0) {
				currentStage.value++;
			} else if (curStage === 1) {
				currentStage.value++;
			} else {
				console.log(userInfo);
			}
		}
		return {
			//variables
			currentStage,
			nameInput,
			emailInput,
			passwordInput,
			userInfo,
			//functions
			enterHandler,
		};
	},
	directives: {
		focus: {
			mounted: el => el.focus(),
		},
	},
});
</script>

<style lang="scss">
.greeting__wrapper {
	display: flex;
	width: 100%;
	height: calc(100vh - 100px);
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.input__wrapper {
		height: 200px;
	}
	.greeting__logo {
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
			border-bottom: 2.5px solid black;
			outline: none;
			text-align: center;
		}
	}
}

.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-active {
	transition: opacity 0.5s ease 0.6s;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
