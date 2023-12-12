<template>
    <div>hoi</div>
</template>

<script lang="ts">
import http from '@/api/http'
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const route = useRoute()
        const router = useRouter()

        onMounted(async () => {
            const { code } = route.query

            const result = await http.post('/auth/kakao/login', { code })
            if (result.data === 'success') {
                router.replace('/')
            }
        })
        return {}
    }
})
</script>

<style lang="scss" scoped></style>
