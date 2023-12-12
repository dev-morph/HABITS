<template>
    <div>
        <button to="/oauth/kakao/redirect" @click="handleLogin">
            <img src="../assets/kakao_login/ko/kakao_login_medium_wide.png" />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY
        const REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI
        function handleLogin() {
            window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=account_email,gender`
        }
        return {
            handleLogin
        }
    }
})
</script>

<style lang="scss" scoped></style>
