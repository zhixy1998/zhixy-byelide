<!-- <script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { watch } from 'vue'
import * as yup from 'yup'
interface FormFeild {
  id: string,
  type: 'input' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'date',
  label: string,
  required?: boolean,
  options?: { label: string, value: string }[],//用于select类型
  disabled?: boolean,
  placeholder?: string,
  props: string,
  validation?: yup.AnySchema
}
const fields: FormFeild[] = [
  {
    id: 'title',
    type: 'input',
    label: '标题',
    required: true,
    props: 'title',
    validation: yup.string().required('标题不能为空')
  },
  {
    id: 'gender',
    type: 'select',
    label: '性别',
    required: true,
    props: 'gender',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ],
    validation: yup.string().required('性别不能为空')
  }
]
const schema = yup.object(fields.reduce((acc, cur) => {
  acc[cur.props] = cur.validation
  return acc
}, {}))
// 为每个字段创建绑定
const fieldBinds = fields.reduce((acc, cur) => {
  acc[cur.props] = useField(cur.props)
  return acc
}, {})
const { values, handleSubmit, errors } = useForm(
  {
    initialValues: { title: '', gender: 'male' },
    validationSchema: schema,
    validateOnBlur: true
  }
)
watch(values, (newVal) => {

})
const emit = defineEmits(['submit'])
const onSubmit = handleSubmit((values) => {
  console.log(values, 'values')
  emit('submit', values)
})
// const { fields, append, remove } = useFieldArray('fields', {
//   defaultValue:
//   }
// )
// const title = useField('title')
// const genter = useField('gender')
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div v-for="(field, index) in fields" :key="`formItem${index}`">
      <label>
        {{ field.label }}
        <span v-if="field.required">*</span>
      </label>
      <div v-if="field.type === 'input'">
        <input type="text" v-model="values[field.props]" :placeholder="field.placeholder" :disabled="field.disabled" />
      </div>
      <div v-else-if="field.type === 'select'">
        <select v-model="values[field.props]" :disabled="field.disabled">
          <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
      </div>
      <div v-else-if="field.type === 'radio'">
        <input type="radio" v-model="values[field.props]" :disabled="field.disabled" />
      </div>
      <div v-else-if="field.type === 'checkbox'">
        <input type="checkbox" v-model="values[field.props]" :disabled="field.disabled" />
      </div>
      <div v-else-if="field.type === 'textarea'">
        <textarea v-model="values[field.props]" :disabled="field.disabled" :placeholder="field.placeholder"></textarea>
      </div>
      <div v-else-if="field.type === 'date'">
        <input type="date" v-model="values[field.props]" :disabled="field.disabled" />
      </div>
      <div v-else-if="field.type === 'text'">{{
        values[field.props] }}</div>
      <div v-if="errors[field.props]">{{ errors[field.props] }}</div>
    </div>
    <button type="submit">提交表单</button>

  </form>
</template>

<style scoped></style> -->
<template>
  <form @submit="onSubmit" novalidate>
    <div v-for="(field, idx) in fields" :key="field.key">
      <Field :name="`links[${idx}].url`" type="url" />

      <button type="button" @click="remove(idx)">Remove</button>
    </div>

    <button type="button" @click="push({ url: '' })">Add</button>

    <button>Submit</button>
  </form>
</template>

<script setup>
import { Field, useForm, useFieldArray } from 'vee-validate';

const { handleSubmit } = useForm({
  initialValues: {
    links: [{ id: 1, url: 'https://github.com/logaretm' }],
  },
});

const { remove, push, fields } = useFieldArray('links');
const onSubmit = handleSubmit(values => {
  console.log(JSON.stringify(values, null, 2));
});
</script>