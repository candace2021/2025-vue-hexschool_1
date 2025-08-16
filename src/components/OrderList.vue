<script setup>
defineProps(['orderData'])
</script>

<template>
  <tr v-for="data in orderData" :key="data.id">
    <td>{{ data.name }}</td>
    <td>{{ data.num }}</td>
    <td>{{ data.price * data.num }}</td>
  </tr>
</template>

<style scoped lang="scss"></style>
