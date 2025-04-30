<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
const {values} = useForm
const title = useField('title')
const genter = useField('gender')
</script>

<template>
    <input v-model="title" />
    <select v-model="genter">
        <option>男</option>
        <option>女</option>
    </select>
</template>

<style scoped></style>