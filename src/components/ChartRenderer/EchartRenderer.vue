<template>
  <div>
    <button @click="chartType = 'line'">
      line
    </button>
    <button @click="chartType = 'bar'">
      bar
    </button>
    <button @click="chartType = 'pie'">
      pie
    </button>
  </div>
  <v-chart
    class="chart"
    :option="option"
    :autoresize="true"
  />
</template>

<script setup lang="ts">
import { BarChart,LineChart, PieChart  } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { computed, provide, ref } from "vue";
import VChart, { THEME_KEY } from "vue-echarts";

import { chartTransformer } from "../../transfomers/chart";
const chartType = ref('line')
const option = computed(() => chartTransformer.transform({
  type: chartType.value,
  dimensions: [],
  measures: [120, 200, 150, 100, 70, 110, 130],
  data: {}
}))
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  GridComponent,
  BarChart
]);

provide(THEME_KEY, "dark");
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>