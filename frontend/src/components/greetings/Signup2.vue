<template>
    <div>
        <p>THIS IS SIGNUP COMPONENT</p>
        <div class="form__wrapper">
            <div>
                <label for="email">email</label>
                <input id="email" type="text" v-model="userInfo.email" />
            </div>
            <div>
                <label for="username">username</label>
                <input id="username" type="text" v-model="userInfo.username" />
            </div>
            <div>
                <label for="password">password</label>
                <input id="password" type="text" v-model="userInfo.password" />
            </div>
            <button @click="signupHandler">회원가입</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { signup } from '@/api/authApi'

export default defineComponent({
    setup() {
        const userInfo = reactive({
            email: '',
            username: '',
            password: ''
        })

        async function signupHandler() {
            const result = await signup(userInfo)
        }
        return { userInfo, signupHandler }
    }
})
</script>

<style lang="scss" scoped>
.form__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input {
        width: 150px;
    }
}
</style>
