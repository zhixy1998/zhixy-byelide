<template>
  <div>
    <button @click="chartType = 'line'">line</button>
    <button @click="chartType = 'bar'">bar</button>
    <button @click="chartType = 'pie'">pie</button>
  </div>
  <v-chart class="chart" :option="option" :autoresize="true" />
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

// const option = ref({
//   title: {
//     text: "Traffic Sources",
//     left: "center"
//   },
//   tooltip: {
//     trigger: "item",
//     formatter: "{a} <br/>{b} : {c} ({d}%)"
//   },
//   legend: {
//     orient: "vertical",
//     left: "left",
//     data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
//   },
//   series: [
//     {
//       name: "Traffic Sources",
//       type: "pie",
//       radius: "55%",
//       center: ["50%", "60%"],
//       data: [
//         { value: 335, name: "Direct" },
//         { value: 310, name: "Email" },
//         { value: 234, name: "Ad Networks" },
//         { value: 135, name: "Video Ads" },
//         { value: 1548, name: "Search Engines" }
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: "rgba(0, 0, 0, 0.5)"
//         }
//       }
//     }
//   ]
// });
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>