<template>
    <div>
        <my-info />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyInfo from '@/components/mypage/MyInfo.vue'

export default defineComponent({
    name: 'MyPageView',
    components: {
        MyInfo
    },
    props: {},
    setup() {
        return {}
    },
    methods: {}
})
</script>

<style lang="scss" scoped></style>
