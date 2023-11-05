<template>
	<div>
		<div class="themes__wrapper">
			<div class="header__wrapper">
				<div v-for="(field, idx) in headerFields" :key="idx">{{ field }}</div>
			</div>
			<ul class="theme__item__wrapper">
				<li v-for="(item, idx) in themeList" :key="idx" class="theme__item">
					<div v-for="(field, index) in headerFields" :key="index">{{ item[field] }}</div>
				</li>
			</ul>
		</div>

		<div class="theme__detail__wrapper"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { findAllThemes } from '@/api/themeApi';

export default defineComponent({
	name: 'ThemeView',
	components: {},
	// props: {},
	setup() {
		const headerFields = ['id', 'background_path', 'font_family', 'color', 'logo_color', 'popup_color'];
		const themeList = ref([]);
		onMounted(async () => {
			const { data } = await findAllThemes();
			themeList.value = data;
		});
		return {
			//variables
			headerFields,
			themeList,
		};
	},
	methods: {},
});
</script>

<style lang="scss" scoped>
.themes__wrapper {
	display: flex;
	flex-direction: column;
	text-align: center;
	.header__wrapper {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		font-weight: 700;
		border-bottom: 1px solid black;
	}

	.theme__item__wrapper {
		max-height: 450px;
		overflow-y: scroll;

		.theme__item {
			display: grid;
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
}
</style>
