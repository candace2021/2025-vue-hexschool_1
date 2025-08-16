<script setup>
import CartList from '@/components/CartList.vue'
import OrderList from '@/components/OrderList.vue'
import ProductList from '@/components/ProductList.vue'
import { computed, ref } from 'vue'

const remark = ref('')
const remarkOrder = ref('')
const datas = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    num: 1,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    num: 1,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    num: 1,
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    num: 1,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    num: 1,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    num: 1,
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    num: 1,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    num: 1,
  },
]
const tableData = ref([])
const orderData = ref([])

const addCart = (item) => {
  const newItem = tableData.value.filter((data) => data.id == item.id)
  if (newItem.length == 0) {
    tableData.value.push({ ...item })
  } else {
    alert('已加入購物車，請直接調整數量')
  }
}
const deleteFn = (item) => {
  const deleteIdx = tableData.value.findIndex((data) => data.id == item.id)
  // datas.value[deleteIdx].num = 1
  tableData.value.splice(deleteIdx, 1)
}
const total = computed(() => {
  let num = 0
  tableData.value.forEach((data) => {
    num += Number(data.price) * Number(data.num)
  })
  return num
})

const sentOrder = () => {
  orderData.value = tableData.value
  remarkOrder.value = remark.value
  tableData.value = []
  remark.value = ''
}
const orderSum = computed(() => {
  let num = 0
  orderData.value.forEach((data) => {
    num += Number(data.price) * Number(data.num)
  })
  return num
})
</script>

<template>
  <div class="topContent">
    <div class="navSide">
      <ul>
        <ProductList :datas="datas" @addCart="addCart"></ProductList>
      </ul>
    </div>
    <div class="product">
      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>品項</th>
            <th>描述</th>
            <th>數量</th>
            <th>單價</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody v-if="tableData.length != 0">
          <CartList :tableData="tableData" @deleteFn="deleteFn"></CartList>
        </tbody>
        <tbody v-else>
          <tr class="noData">
            <td colspan="6"><span>請選擇商品</span></td>
          </tr>
        </tbody>
      </table>
      <div class="content" v-if="tableData.length != 0">
        <div class="sum">
          總計: <span>${{ total }}</span>
        </div>
        <div class="textarea">
          <textarea name="" id="" placeholder="備註" v-model="remark"></textarea>
        </div>
        <div class="sent">
          <button type="button" @click="sentOrder">送出</button>
        </div>
      </div>
    </div>
  </div>
  <div class="bottomContent">
    <div class="noData" v-if="orderData.length == 0">尚未建立訂單</div>
    <div class="content" v-else>
      <div class="title">訂單</div>
      <table>
        <thead>
          <tr>
            <th>品項</th>
            <th>數量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <OrderList :orderData="orderData"></OrderList>
        </tbody>
      </table>
      <div class="textarea">備註: {{ remarkOrder }}</div>
      <div class="sum">
        總計: <span>${{ orderSum }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.topContent {
  display: flex;
  align-items: start;
  padding-bottom: 20px;
  border-bottom: 1px solid #000;
  .navSide {
    flex: 0 0 350;
    margin-right: 6%;
    border-radius: 16px;
    border: 1px solid #ccc;
    .navList {
      cursor: pointer;
      padding: 16px 14px;
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
    }
    .title {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .name {
      font-size: 20px;
      font-weight: 700;
    }
    .price {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .product {
    flex: 1;
    .sent {
      text-align: right;
      button {
        cursor: pointer;
        border: none;
        background-color: #6ba28c;
        color: #fff;
        padding: 8px 20px;
        border-radius: 10px;
        font-size: 16px;
        letter-spacing: 0.1em;
      }
    }
  }
}
table,
textarea {
  width: 100%;
}
thead {
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  th {
    text-align: center;
    padding-bottom: 10px;
  }
}
tbody {
  .noData {
    border: none;
    td {
      width: 100%;
    }
    span {
      display: inline-block;
      background: #4277c7;
      width: 80%;
      padding: 24px 40px;
      border-radius: 10px;
      color: #fff;
    }
  }
  tr {
    border-bottom: 1px solid #ccc;
    a {
      display: block;
    }
  }
  td {
    font-size: 18px;
    text-align: center;
    padding: 20px 0;
  }
  select {
    width: 48px;
    height: 28px;
    padding: 0 6px;
    font-size: 16px;
  }
}
.sum {
  font-size: 22px;
  margin: 20px 0;
  text-align: right;
  span {
    font-size: 28px;
    font-weight: 700;
  }
}
.textarea {
  margin-bottom: 20px;
  textarea {
    resize: none;
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 100px;
  }
}
.bottomContent {
  width: 80%;
  margin: 20px auto 70px;
  overflow: hidden;
  .noData {
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: #fff;
    background-color: #bd3e3e;
  }
  .content {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  tr th,
  tr td {
    &:first-child {
      text-align: left;
    }
  }
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
  }
  .textarea {
    margin: 20px 0 40px;
    font-size: 18px;
    text-align: right;
  }
}
</style>
