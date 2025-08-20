<script setup>
import { inject } from 'vue'

const message = inject('msg')
</script>

<template>
  <div class="message">
    <ul>
      <li v-for="(msg, idx) in message" :key="idx" :class="msg.type">{{ msg.msg }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 10px;
  right: 10px;
  li {
    position: relative;
    border-radius: 5px;
    margin-bottom: 6px;
    padding: 0 20px;
    height: 40px;
    line-height: 42px;
    color: #fff;
    text-align: center;
    &.add {
      background-color: #22c55e;
    }
    &.remove {
      background-color: #ef4444;
    }
  }
}
</style>
