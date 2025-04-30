<script setup lang="ts">
import type { DropResult } from 'smooth-dnd';
import { inject, ref } from 'vue';

import { blocks } from '../mock/block'
import { arrayMove } from '../utils/array.ts'
import { SmoothDndContainer } from './SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from './SmoothDnd/SmoothDndDraggable';
const blockMap = inject('blockMap')
const blocksData = ref(blocks)
const applyDrag = <T extends any[]>(arr: T, dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  const result = [...arr]
  //没做操作
  if (addedIndex === null) return result
  //添加
  if (addedIndex !== null && removedIndex === null) {
    result.splice(addedIndex, 0, {
      id: `${Math.random()}`,
      ...payload
    })
  }
  //移动
  if (addedIndex !== null && removedIndex !== null) {
    return arrayMove(result, removedIndex, addedIndex)
  }
  return result
}
const handleDrop = ($event: any) => {
  //TODO:：这的赋值有问题
  blocksData.value = applyDrag([...blocksData.value], $event)
}
</script>


<template>
  <SmoothDndContainer @drop="handleDrop">
    <SmoothDndDraggable v-for="block in blocksData" :key="block.id">
      <component class="material" :is="blockMap[block.type].material"></component>
    </SmoothDndDraggable>
  </SmoothDndContainer>
</template>

<style scoped>
.material{
  width: 100%;
}
</style>