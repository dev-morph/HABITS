<template>
	<div>
		Login Component
		<button>
			<img src="../assets/kakao_login/ko/kakao_login_medium_narrow.png" />
		</button>
		<router-link to="/about">here</router-link>
		<button to="/oauth/kakao/redirect" @click="handleLogin">
			<img src="../assets/kakao_login/ko/kakao_login_medium_wide.png" />
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	setup() {
		const REST_API_KEY = '575390a4143a27e118615cdc0cbe00c8';
		const REDIRECT_URI = 'http://localhost:8080/oauth/kakao/redirect';
		function handleLogin() {
			window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
		}
		return {
			handleLogin,
		};
	},
});
</script>

<style lang="scss" scoped></style>
