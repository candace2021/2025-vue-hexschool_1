<script setup>
defineProps(['Cart'])
const emit = defineEmits(['removeCart'])
const removeCart = (item) => {
  emit('removeCart', item)
}
</script>

<template>
  <li v-for="item in Cart" :key="item.id">
    <div>
      <div class="name">{{ item.title }}</div>
      <div class="number">數量：{{ item.number }}</div>
    </div>
    <div>
      <div class="price">$ {{ (item.price * item.number).toFixed(2) }}</div>
      <div class="btn removeBtn">
        <a href="#" @click.prevent="removeCart(item)">移除</a>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss"></style>
