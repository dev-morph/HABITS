<template>
    <div class="grid__wrapper">
        <div class="config__menu__wrapper">
            <div
                class="config__menu"
                :class="selectedMenu === item && 'selected'"
                v-for="(item, index) in configMenuList"
                :key="index"
                @click="handleNav(item)"
            >
                {{ item }}
            </div>
        </div>
        <div class="config__detail__wrapper">
            <div class="config__detail__container">
                <div class="thumbnail__list" v-if="selectedMenu === '테마설정'">
                    <BgThumbnail
                        v-for="theme in themeList"
                        :key="theme.id"
                        :url="theme.background_path"
                        @click="bgHandler(theme)"
                    />
                </div>
                <div class="extra__config" v-else>TBD</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import BgThumbnail from '@/components/configs/include/BgThumbnail.vue'
import { onBeforeMount, ref } from 'vue'
import { updateUserInfo } from '@/api/userApi'
import { findAllThemes } from '@/api/themeApi'
import { useUserStore } from '@/store/user'

import type { Ref } from 'vue'
import type { ThemeType, UpdateUserType, UserInfoType } from '@/types/types'

const userStore = useUserStore()
const configMenuList = ref(['테마설정'])
const selectedMenu = ref('테마설정')
const themeList: Ref<ThemeType[]> = ref([])

function handleNav(menu: string) {
    selectedMenu.value = menu
}

async function bgHandler(theme: ThemeType) {
    userStore.setBg(theme)
    updateUserTheme(theme.id)
}

async function updateUserTheme(themeId: number) {
    const stringifiedUser = localStorage.getItem('user')
    if (stringifiedUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { theme, ...userInfo } = JSON.parse(stringifiedUser) as UserInfoType
        const updateDto = {} as UpdateUserType
        updateDto.email = userInfo.email
        updateDto.username = userInfo.username
        updateDto.theme_id = themeId

        try {
            await updateUserInfo(updateDto)
            await userStore.getUserInfo()
        } catch (error) {
            console.log('failed to set bg')
        }
    }
}

onBeforeMount(async () => {
    const { data } = await findAllThemes()
    themeList.value = data
})
</script>

<style lang="scss" scoped>
.grid__wrapper {
    --config-nav-width: 150px;
    --config-main-width: 520px;
    --config-height: 520px;

    display: flex;

    overflow: auto;
    // overflow-x: hidden;
    // overflow-y: auto;
    text-align: left;

    width: 720px;
    max-width: calc(100vw - 10px * 2);
    .config__menu__wrapper {
        width: var(--config-nav-width);
        height: var(--config-height);
        border-right: 1px solid var(--border--color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 1rem;
        gap: 0.5rem;
        flex: 0 0 var(--config-nav-width);

        .config__menu {
            cursor: pointer;
            color: var(--text--inactive);
            font-weight: var(--ff-nav-weight);

            &.selected {
                color: var(--text--primary);
                transform: scale(1.05);
            }
            &:hover {
                transform: scale(1.05);
                color: var(--text--primary);
            }
        }
    }

    .config__detail__wrapper {
        height: 100%;
        width: var(--config-main-width);
        display: flex;
        flex-direction: column;
        flex-shrink: 1;

        .thumbnail__list {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(4, 1fr);
            padding: 1rem;
        }
    }
}
</style>
