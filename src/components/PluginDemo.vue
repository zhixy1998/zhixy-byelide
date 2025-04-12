<script setup lang="ts">
//计算器支持的计算方法
const addOperation: Operation = {
    name: 'add',
    operation: (a: number, b: number) => a + b
}
const modOperation: Operation = {
    name: 'add',
    operation: (a: number, b: number) => a % b
}
/**
 * 插件协议 
 */
type Operation = {
    name: string,
    operation: (a: number, b: number) => number
}
/**
 * 插件底座
 */
class Calculator {
    operations: Operation[]
    constructor() {
        this.operations = []
    }
    use(operation: Operation) {
        this.operations.push(operation)
    }
    calculate(a: number, b: number, operationName: string) {
        const operation = this.operations.find(item => item.name === operationName)
        if (operation) {
            return operation.operation(a, b)
        }
        return NaN
    }
}
const calculator = new Calculator()
calculator.use(addOperation)
calculator.use(modOperation)
const count = calculator.calculate(1, 2, 'add')
</script>
<template>
  {{ count }}
</template>