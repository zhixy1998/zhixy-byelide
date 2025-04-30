<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as zrender from 'zrender'
const container = ref<HTMLElement | null>(null)
onMounted(() => {
  const zr = zrender.init(container.value)
  /**
   * 画一个极坐标下的圆
   */
  const pics = 10
  const eagle = (2 * Math.PI) / 10
  const r = 50
  const o = 100
  for (let index = 0; index < pics; index++) {
    //在极坐标系下
    const x = o + r
    const y = o + r
    // 极坐标系下的三角绘制，一定要学三角函数
    const arc = new zrender.Arc(
      {
        shape: {
          cx: x + r * Math.cos(eagle * index),
          cy: y + r * Math.sin(eagle * index),
          r: 10,
        },
        style: {
          fill: 'red'
        }
      }
    )
    arc.animate('shape', true)
      .when(1000,
        {
          r: 20
        }
      )
      .start()
    zr.add(arc)
  }
})
</script>

<template>
  <div ref="container" class="zrenderContainer">

  </div>
</template>

<style scoped>
.zrenderContainer {
  width: 100%;
  height: 400px;
}
</style>