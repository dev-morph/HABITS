<template>
	<div>
		<p>THIS IS LOGIN COMPONENT</p>
		<div class="form__wrapper">
			<input type="text" v-model="userInfo.email" />
			<input type="text" v-model="userInfo.password" />
			<button @click="loginHandler">로그인</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { login } from '@/api/authApi';

export default defineComponent({
	setup() {
		const userInfo = reactive({
			email: '',
			password: '',
		});

		async function loginHandler() {
			console.log('userInfo', userInfo);
			const result = await login(userInfo);
			console.log('result is ', result);
		}
		return { userInfo, loginHandler };
	},
});
</script>

<style lang="scss" scoped>
.form__wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	input {
		width: 150px;
	}
}
</style>
