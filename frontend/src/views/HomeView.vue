<template>
	<div id="home">
		<greeting />
		<todo-list />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Greeting from '@/components/Greeting.vue';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
		TodoList,
	},
});
</script>

<style lang="scss">
#home {
	width: 100%;
	height: calc(100vh - 100px);
	display: grid;
	grid-template-rows: min(55%) 50%;
}
</style>
