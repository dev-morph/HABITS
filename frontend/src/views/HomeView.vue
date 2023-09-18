<template>
	<div class="home">
		<KakaoLogin />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KakaoLogin from '@/components/KakaoLogin.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		KakaoLogin,
	},
});
</script>

<style lang="scss" scoped></style>
