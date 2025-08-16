<script setup>
defineProps(['datas'])
const emit = defineEmits(['addCart'])

const addCart = (item) => {
  emit('addCart', item)
}
</script>

<template>
  <li v-for="data in datas" :key="data.id" class="navList" @click="addCart(data)">
    <div class="title">
      <div class="name">{{ data.name }}</div>
      <div class="price">${{ data.price }}</div>
    </div>
    <div class="describe">{{ data.description }}</div>
  </li>
</template>

<style scoped lang="scss"></style>
