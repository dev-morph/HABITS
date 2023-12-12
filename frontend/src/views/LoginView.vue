<template>
    <login />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Login from '@/components/greetings/Login.vue'

export default defineComponent({
    components: { Login },
    setup() {
        return {}
    }
})
</script>

<style lang="scss" scoped></style>
