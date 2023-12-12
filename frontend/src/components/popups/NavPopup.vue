<template>
    <Popup :target="'UserInfo'">
        <ul class="popup__list__wrapper">
            <li
                v-for="(item, index) in mypageList"
                :key="index"
                class="list__item"
                @click="navHandler(item.to)"
            >
                {{ item.title }}
            </li>
        </ul>
    </Popup>
</template>

<script setup lang="ts">
import Popup from '@/components/common/Popup.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePopupStore } from '@/store/popup'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const popupStore = usePopupStore()
const router = useRouter()
const mypageList = ref([
    { title: '마이 페이지', to: '/mypage' },
    // { title: '캘린더 페이지', to: '/calendar' },
    // { title: '루틴 설정', to: '/routine' },
    // { title: '테마 설정', to: '/theme' },
    { title: '로그아웃', to: '/logout' }
])

async function navHandler(to: string) {
    if (to === '/logout') {
        await userStore.clearUserInfo()
        userStore.setBg()
        to = '/login'
    }
    popupStore.closePopup()
    router.push(to)
}
</script>

<style lang="scss" scoped>
.popup__list__wrapper {
    width: 100%;
    height: 100%;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .list__item {
        width: 100%;
        cursor: pointer;
        text-align: center;

        &:hover {
            text-shadow: 0 0 12px rgb(99, 99, 99);
            transform: scale(1.05);
        }
    }
}
</style>
