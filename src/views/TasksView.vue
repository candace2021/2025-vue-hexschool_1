<script setup>
import axios from 'axios'
import { onMounted, provide, ref } from 'vue'
import TaskList from '@/components/TaskList.vue'
import TaskCart from '@/components/TaskCart.vue'
import TaskMessage from '@/components/TaskMessage.vue'

const datas = ref([])
const Cart = ref([])
const message = ref([])
provide('msg', message)
const total = () => {
  let num = 0
  Cart.value.forEach((item) => {
    num += item.price * item.number
  })
  return num.toFixed(2)
}
const toCart = (item) => {
  const index = Cart.value.findIndex((list) => list.id == item.id)
  if (index < 0) {
    Cart.value.push({ ...item, number: 1 })
  } else {
    Cart.value[index].number++
  }
  messageEdit(1)
}
const removeCart = (item) => {
  const index = Cart.value.findIndex((list) => list.id == item.id)
  Cart.value.splice(index, 1)
  messageEdit(0)
}
const messageEdit = (item) => {
  if (item) {
    message.value.push({
      type: 'add',
      msg: '已加入購物車',
    })
  } else {
    message.value.push({
      type: 'remove',
      msg: '已刪除列表',
    })
  }
  setTimeout(() => message.value.shift(), 3000)
}
const api = async () => {
  try {
    const { data } = await axios('https://fakestoreapi.com/products')
    datas.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => api())
</script>

<template>
  <div class="productPage">
    <div class="products">
      <h2 class="title">商品列表</h2>
      <ul class="productsList">
        <TaskList :datas="datas" @toCart="toCart"></TaskList>
      </ul>
    </div>
    <div class="Cart">
      <h2 class="title">購物車</h2>
      <ul class="CartList">
        <TaskCart v-if="Cart.length > 0" :Cart="Cart" @removeCart="removeCart"></TaskCart>
        <li v-else>
          <div class="noData">購物車是空的~</div>
        </li>
      </ul>
      <div class="total" v-if="Cart.length > 0">總金額：$ {{ total() }}</div>
    </div>
    <TaskMessage></TaskMessage>
  </div>
</template>

<style lang="scss">
.productPage {
  @media (min-width: 768px) {
    display: flex;
    align-items: start;
    justify-content: space-between;
  }
}
.title {
  font-size: 32px;
  margin-bottom: 20px;
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 28px;
  }
  @media (max-width: 767px) {
    font-size: 26px;
  }
}
.products {
  @media (min-width: 768px) {
    flex: 0 1 auto;
  }
  @media (max-width: 767px) {
    margin-bottom: 50px;
  }
}
.productsList {
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: 30px;
  @media (min-width: 768px) and (max-width: 991px) {
    margin-left: -5px;
    margin-right: 20px;
  }
  @media (max-width: 767px) {
    margin: 0;
  }
  > li {
    display: flex;
    flex-direction: column;
    width: 265px;
    margin: 0 10px 30px;
    border-radius: 10px;
    border: 1px solid #ccc;
    overflow: hidden;
    @media (min-width: 768px) and (max-width: 991px) {
      width: 200px;
      margin: 0 5px 30px;
    }
    @media (max-width: 767px) {
      width: 100%;
      margin: 0 0 30px;
    }
    img {
      display: block;
      width: 100%;
      aspect-ratio: 1 / 0.65;
      object-fit: contain;
      object-position: center;
      padding: 16px;
    }
    .txt {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px;
      @media (min-width: 768px) and (max-width: 991px) {
        padding: 12px;
      }
    }
    .name,
    .description {
      max-height: (1.2 * 3) * 1em;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media (max-width: 991px) {
        max-height: (1.2 * 2) * 1em;
        -webkit-line-clamp: 2;
      }
    }
    .description {
      margin-bottom: 30px;
      max-height: (1.45 * 3) * 1em;
      line-height: 1.45;
      overflow: hidden;
      @media (max-width: 991px) {
        max-height: (1.45 * 2) * 1em;
      }
    }
    .price {
      margin-bottom: 10px;
    }
    .btn {
      a {
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        border-radius: 5px;
        text-align: center;
        font-size: 16px;
        letter-spacing: 0.1em;
        color: #fff;
        background-color: #0059ff;
        border: 1px solid #0059ff;
        transition: 0.5s;
        @media (max-width: 991px) {
          font-size: 15px;
        }
        &:hover {
          @media (min-width: 992px) {
            background-color: #fff;
            color: #0059ff;
          }
        }
      }
    }
  }
}
.name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  @media (max-width: 991px) {
    font-size: 18px;
  }
}
.description,
.number {
  font-size: 16px;
  line-height: 1.45;
  color: #454545;
  @media (max-width: 991px) {
    font-size: 15px;
  }
}
.price {
  color: #0059ff;
  font-size: 20px;
  font-weight: 500;
  @media (max-width: 991px) {
    font-size: 18px;
  }
}
.Cart {
  @media (min-width: 992px) {
    flex: 1 0 315px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    flex: 1 0 250px;
  }
  @media (max-width: 767px) {
    margin-bottom: 100px;
  }
}
.CartList {
  li {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 20px;
    > div:nth-child(2) {
      display: flex;
      align-items: center;
      text-align: right;
      margin-top: 20px;
      justify-content: space-between;
    }
  }
  .removeBtn {
    a {
      display: inline-block;
      height: 30px;
      color: #e10b0b;
      font-size: 16px;
      line-height: 32px;
      padding: 0 10px;
      margin-left: 10px;
      border-radius: 5px;
      border: 1px solid #e10b0b;
      transition: 0.5s;
      @media (max-width: 991px) {
        font-size: 15px;
      }
      &:hover {
        @media (min-width: 992px) {
          background-color: #e10b0b;
          color: #fff;
        }
      }
    }
  }
  .noData {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #777;
  }
}
.total {
  font-size: 20px;
  font-weight: 700;
  text-align: right;
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 18px;
  }
}
</style>
