<template>
	<Login />
	<Signup />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';

export default defineComponent({
	components: { Login, Signup },
	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped></style>
