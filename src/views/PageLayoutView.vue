<script setup lang="ts">
import AppRightPanel from '@/components/AppRightPanel/AppRightPanel.vue';
import CanvasTable from '@/components/CanvasTable.vue';
import MaterialRenderer from '@/components/MaterialRenderer.vue';
</script>

<template>
  <div class="layout">
    <!-- <PluginDemo /> -->
    <AppRightPanel />
    <!-- <MaterialRenderer /> -->
    <!-- <CanvasTable /> -->
  </div>
</template>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  display: flex
}

* {
  padding: 0;
  margin: 0;
}
</style>