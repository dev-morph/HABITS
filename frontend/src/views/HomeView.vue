<template>
	<div id="home">
		<greeting v-if="user.name" :name="user.name" />
		<todo-list v-if="user.email" :email="user.email" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Greeting from '@/components/Greeting.vue';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Greeting,
		TodoList,
	},
	setup() {
		const user = ref({ name: '', email: '' });

		onMounted(() => {
			const userInfo = localStorage.getItem('user');
			if (userInfo) {
				const parsedUser = JSON.parse(userInfo);
				user.value = parsedUser;
			}
		});
		return {
			//variables,
			user,
		};
	},
});
</script>

<style lang="scss">
#home {
	width: 100%;
	height: calc(100vh - 100px);
	display: grid;
	grid-template-rows: min(55%) 45%;
}
</style>
