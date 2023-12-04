<template>
	<div class="theme__admin__wrapper">
		<div class="themes__wrapper">
			<div class="header__wrapper">
				<div v-for="(field, idx) in headerFields" :key="idx">{{ field }}</div>
			</div>
			<ul class="theme__item__wrapper">
				<li v-for="(item, idx) in themeList" :key="idx" class="theme__item" @click="() => (selected = item)">
					<div v-for="(field, index) in headerFields" :key="index">{{ item[field] }}</div>
				</li>
			</ul>
		</div>

		<div class="theme__detail__wrapper">
			<div>상세정보</div>
			<div v-for="(item, idx) in headerFields" :key="idx">
				<div v-if="item !== 'id'">{{ item }} : {{ selected && selected[item as keyof CreateThemeType] }}</div>
			</div>
			<div class="btn__wrapper">
				<button class="theme__btn" @click="deleteThemeHandler">테마 삭제</button>
			</div>
		</div>
		<div class="theme__form__wrapper">
			<div>테마 생성</div>
			<div v-for="(item, idx) in headerFields" :key="idx" class="input__wrapper">
				<label v-if="item !== 'id'" :for="item">{{ item }}</label>
				<input
					v-if="item !== 'id'"
					type="text"
					:id="item"
					:value="newTheme[item as keyof CreateThemeType]"
					@input="newTheme[item as keyof CreateThemeType] = ($event.target as HTMLInputElement).value"
				/>
			</div>
			<div class="btn__wrapper">
				<button class="theme__btn" @click="createThemeHandler">테마 생성</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { findAllThemes, createTheme, deleteTheme } from '@/api/themeApi';
import { CreateThemeType } from '@/types/types';

const headerFields = ['id', 'title', 'background_path', 'font_family', 'color', 'logo_color', 'popup_color'];
const themeList = ref([]);
const selected = ref({
	id: null,
	title: '',
	background_path: '',
	font_family: '',
	color: '',
	logo_color: '',
	popup_color: '',
});
const newTheme: CreateThemeType = reactive({
	title: '',
	background_path: '',
	font_family: '',
	color: '',
	logo_color: '',
	popup_color: '',
});
async function getThemeList() {
	const { data } = await findAllThemes();
	themeList.value = data;
}

async function createThemeHandler() {
	if (
		newTheme.title.trim().length === 0 ||
		newTheme.background_path.trim().length === 0 ||
		newTheme.font_family.trim().length === 0 ||
		newTheme.color.trim().length === 0 ||
		newTheme.logo_color.trim().length === 0 ||
		newTheme.popup_color.trim().length === 0
	) {
		alert('All fileds are Required.');
		return;
	}
	await createTheme(newTheme);
	await getThemeList();
	initThemeForm();
}

async function deleteThemeHandler() {
	if (selected.value.id) {
		await deleteTheme(selected.value.id);
		await getThemeList();
		initSelectedTheme();
	} else {
		alert('select theme deleted');
	}
}

function initSelectedTheme() {
	const temp = { id: null, title: '', background_path: '', font_family: '', color: '', logo_color: '', popup_color: '' };
	selected.value = temp;
}

function initThemeForm() {
	newTheme.title = '';
	newTheme.background_path = '';
	newTheme.font_family = '';
	newTheme.color = '';
	newTheme.logo_color = '';
	newTheme.popup_color = '';
}

onMounted(async () => {
	getThemeList();
});
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
// 아래방식으로 하면 안됨.
// @import '../styles/common.scss';

.theme__admin__wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-template-areas:
		'list list'
		'detail form';
	gap: 2rem;
	padding: 1rem;
	background-color: hsl(213 18% 10%/0.5);
	border: 1px solid rgb(120, 126, 135);
	border-radius: 1rem;
	.themes__wrapper {
		grid-area: list;
		// grid-column: 1/3;
		display: flex;
		flex-direction: column;
		text-align: center;
		.header__wrapper {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			font-weight: 700;
			// border-bottom: 1px solid black;
			// background-color: hsl(213 18% 12% / 1);
			background-color: rgb(55 65 81/1);
		}

		.theme__item__wrapper {
			max-height: 450px;
			overflow-y: scroll;

			.theme__item {
				display: grid;
				grid-template-columns: repeat(7, minmax(0, 1fr));
				cursor: pointer;
				&:hover {
					background-color: rgb(55 65 81/1);
				}
			}
		}
	}

	.theme__detail__wrapper {
		@extend .glass__card;
		// background-color: rgba(0, 0, 0, 0.6);
		grid-area: detail;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.theme__form__wrapper {
		@extend .glass__card;
		grid-area: form;
		display: flex;
		flex-direction: column;
		// align-items: center;
		gap: 0.25rem;

		.input__wrapper {
			display: flex;
			gap: 1rem;
			input {
				background-color: transparent;
				border: none;
				border: 1px solid rgba(255, 255, 255, 0.6);
			}
		}
	}

	.btn__wrapper {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		.theme__btn {
			width: 100%;
			background-color: hsl(213 18% 12%/1);
			border-radius: 5px;
			padding: 0.5rem 1rem;

			&:hover {
				border-color: hsl(213 18% 10%/1);
				background-color: hsl(213 18% 10%/1);
			}
		}
	}
}
</style>
