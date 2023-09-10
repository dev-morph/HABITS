<template>
	<div>hoi</div>
</template>

<script lang="ts">
import axios from 'axios';
import http from '@/api/http';
import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import axios from 'axios';

export default defineComponent({
	setup() {
		const route = useRoute();
		const router = useRouter();

		onMounted(async () => {
			const { code } = route.query;
			console.log(code);

			const result = await http.post('/auth/kakao/login', { code });
			if (result.data === 'success') {
				console.log('success');
				router.replace('/');
			}
			console.log('result is ---> ', result);

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
