<script setup>
defineProps(['tableData'])
const emit = defineEmits(['deleteFn'])
const deleteFn = (data) => {
  emit('deleteFn', data)
}
</script>

<template>
  <tr v-for="data in tableData" :key="data.id">
    <td><a href="#" @click.prevent="deleteFn(data)">X</a></td>
    <td>{{ data.name }}</td>
    <td>{{ data.description }}</td>
    <td>
      <select name="" id="" v-model="data.num">
        <option v-for="index in 10" :key="index" :value="index">{{ index }}</option>
      </select>
    </td>
    <td>{{ data.price }}</td>
    <td>{{ data.price * data.num }}</td>
  </tr>
</template>

<style scoped lang="scss"></style>
