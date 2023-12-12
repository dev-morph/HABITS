<template>
    <div id="app">
        <!-- <ThemeLayer /> -->
        <div id="content__layer">
            <navbar />
            <router-view />
            <NavPopup />
            <ConfigPopup />
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/nav/Navbar.vue'
import NavPopup from '@/components/popups/NavPopup.vue'
import ConfigPopup from '@/components/popups/ConfigPopup.vue'
import ThemeLayer from '@/components/common/ThemeLayer.vue'
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

onBeforeMount(async () => {
    const mode = import.meta.env.MODE

    if (mode === 'production') {
        console.log('PRODUCTION MODE')
        window.console.log = function () {}
        window.console.warn = function () {}
        window.console.error = function () {}
    }
    await userStore.getUserInfo()
    userStore.setBg()
})
</script>

<style lang="scss">
@import url('./styles/variables.scss');
#app {
    width: 100%;
    height: 100%;
    background-image: var(--bg-image-url);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    text-shadow: var(--text-shadow);
    color: var(--text--primary);

    #content__layer {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
}
</style>
