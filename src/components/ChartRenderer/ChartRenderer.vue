<script setup lang="ts">
import { ref} from 'vue'

import D3ChartRenderer from './D3ChartRenderer.vue';
import EchartRenderer from './EchartRenderer.vue';
import ZrenderChartRenderer from './ZrenderChartRenderer.vue';
type ChartType = 'echarts' | 'd3' | 'zrender'
const chartType = ref<ChartType>('echarts')
const charts = {
    echarts: EchartRenderer,
    d3: D3ChartRenderer,
    zrender: ZrenderChartRenderer
}
</script>

<template>
    <div>
        <button v-for="(item, index) in Object.keys(charts)" :key="`btn${index}`" @click="chartType = item"> {{ item
            }}</button>
    </div>
    <KeepAlive>
        <component :is="charts[chartType]" />
    </KeepAlive>
</template>

<style scoped></style>