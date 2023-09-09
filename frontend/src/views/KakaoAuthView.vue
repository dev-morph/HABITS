<template>
	<div>hoi</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import axios from 'axios';

export default defineComponent({
	setup() {
		const route = useRoute();

		onMounted(() => {
			const path = route.fullPath;
			console.log(path);

			// const REST_API_KEY = '575390a4143a27e118615cdc0cbe00c8';
			// const REDIRECT_URI = 'http://localhost:8080/oauth/kakao/redirect';
			// await axios
			// 	.get(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`)
			// 	// .get(`http://localhost:3000/auth/kakao/login`)
			// 	.then(res => {
			// 		console.log('res is ---> ', res);
			// 	})
			// 	.catch(err => {
			// 		console.log('error occured!', err);
			// 	});
		});
		return {};
	},
});
</script>

<style lang="scss" scoped></style>
