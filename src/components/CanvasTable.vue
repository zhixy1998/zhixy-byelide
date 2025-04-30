<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
//1.为了获取canvas dom
//2.获取绘制上下文

//声明界面中显示的行数
let startRow = 0

//定义事件
const emit = defineEmits(['click'])
const data = {
    columns: [{
        title: '姓名',
        key: 'name',
        width: 100,
    }, {
        title: '年龄',
        key: 'age',
        width: 100
    }],
    dataSource: Array.from({ length: 10000 }).map((_, index) => ({
        key: index,
        name: `name-${index}`,
        age: Math.floor(Math.random() * 100)
    }))
}
const pixelRatio = window.devicePixelRatio
const cellWidth = 100 * pixelRatio
const cellHeight = 50 * pixelRatio
const canvas = ref<HTMLCanvasElement | null>(null)
const selectedCell = reactive({ row: -1, column: -1 })
//定义点击事件
const handleClick = (ev: MouseEvent) => {
    //当前点击了哪里
    if (!canvas.value) return;
    // 获取Canvas的实际物理尺寸和逻辑尺寸
    const rect: DOMRect = canvas.value.getBoundingClientRect();
    // 计算点击位置（转换为逻辑坐标）
    const x = (ev.clientX - rect.left)
    const y = (ev.clientY - rect.top)

    // 计算行列索引（注意：表头占第0行）
    const rowIndex = Math.floor((y * pixelRatio) / cellHeight) - 1;
    const colIndex = Math.floor((x * pixelRatio) / cellWidth);
    console.log(`${y * pixelRatio} -100`, `${x* pixelRatio} -200`)
    // TODO: 这的数值计算有问题
    console.log(rowIndex, colIndex, '<---------')
    //判断rowIndex >=0 且rowIndex<data.length说明被选中
    if (rowIndex >= 1 && rowIndex < data.dataSource.length && colIndex >= 0 && colIndex < data.columns.length) {
        // 说明有单元被选中
        selectedCell.row = rowIndex
        selectedCell.column = colIndex
        emit('click')
        // 重绘表格
        drawTable()
    }


}
const drawTable = () => {
    canvas.value?.addEventListener('click', handleClick)
    const ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 1600, 1200)
    ctx.beginPath();

    const { columns, dataSource } = data
    const padding = 10
    ctx.beginPath()
    // 画表头
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        ctx.font = `${16 * pixelRatio}px bold`
        ctx.fillText(column.title, i * cellWidth + padding, cellHeight / 2)
    }
    // 表格
    for (let i = 1; i < dataSource.length; i++) {
        const record = dataSource[i]
        for (let j = 0; j < columns.length; j++) {
            // 做判断，如果被选中了，那么需要画矩形来高亮单元格
            const column = columns[j]
            ctx.font = `${16 * pixelRatio}px bold`
            //先画背景，再画内容
            // TODO:显示的黄色背景也没有在正确位置
            if (selectedCell.row === i && selectedCell.column === j) {
                ctx.fillStyle = 'yellow'
                ctx.fillRect(j * cellWidth, (i + 1) * cellHeight, cellWidth, cellHeight / 2)
                ctx.fillStyle = 'black'
            }
            ctx.fillText(String(record[column['key'] as keyof typeof record]), j * cellWidth + padding, (i + 1) * cellHeight / 2)

            //画矩形其实是fill 填充操作
        }
    }
    ctx.closePath()
}
const handleWheel = () => {
    document.addEventListener('wheel', (ev) => {
        const { deltaY } = ev
        if (deltaY < 0) {
            //通过改变startRow来使canvas中数据滚动
            startRow = Math.max(0, startRow - 1)
        } else {
            startRow = Math.min(data.dataSource.length, startRow + 1)
        }
        console.log('ev', deltaY, startRow)

    })
}
const handleSearch = (ev) => {
    const { value } = ev.target
    // vue中的数组的操作太大变动会导致rerenderer，canvastable方案不会
    data.dataSource = data.dataSource.filter((item) => item.name.includes(value))

}
watch(() => data.dataSource, () => { drawTable() })
onMounted(() => {
    drawTable()
    handleWheel()
})
onUnmounted(() => {
    canvas.value?.removeEventListener('click', handleClick)
})
</script>
<template>
  <div class="canvas">
    <input @input="handleSearch">
    <canvas
      ref="canvas"
      width="800"
      height="600"
    />
  </div>
</template>

<style scoped>
.canvas {
    width: 800px;
    height: 600px;
}
</style>