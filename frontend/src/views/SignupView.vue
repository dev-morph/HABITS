<template>
    <Signup />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Signup from '@/components/greetings/Signup.vue'

export default defineComponent({
    name: 'SignupView',
    components: {
        Signup
    }
})
</script>

<style lang="scss" scoped></style>
