<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
    <div class="app-wrapper">
        <header>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
.app-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

main {
    height: calc(100% - 48px);
}
</style>