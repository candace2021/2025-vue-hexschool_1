<script setup>
defineProps(['datas'])
const emit = defineEmits(['toCart'])
const toCart = (data) => {
  emit('toCart', data)
}
</script>

<template>
  <li v-for="data in datas" :key="data.id">
    <div class="img">
      <img :src="data.image" alt="data.title" :title="data.title" />
    </div>
    <ul class="txt">
      <li>
        <div class="name">{{ data.title }}</div>
        <div class="description">{{ data.description }}</div>
      </li>
      <li>
        <div class="price">$ {{ data.price }}</div>
        <div class="btn">
          <a href="#" @click.prevent="toCart(data)">加入購物車</a>
        </div>
      </li>
    </ul>
  </li>
</template>

<style scoped lang="scss"></style>
