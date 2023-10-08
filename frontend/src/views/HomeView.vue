<template>
	<Greeting />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Greeting from '@/components/Greeting.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
	},
});
</script>

<style lang="scss" scoped></style>
