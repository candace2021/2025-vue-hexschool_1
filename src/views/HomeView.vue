<script setup>
import { ref } from 'vue'

const menus = ref([
  {
    id: 't001',
    item: '珍珠奶茶',
    describe: '香濃奶茶搭配QQ珍珠',
    price: '50',
    stock: '20',
  },
  {
    id: 't002',
    item: '冬瓜檸檬',
    describe: '清新冬瓜配上新鮮檸檬',
    price: '45',
    stock: '18',
  },
  {
    id: 't003',
    item: '翡翠檸檬',
    describe: '綠茶與檸檬的完美結合',
    price: '55',
    stock: '34',
  },
  {
    id: 't004',
    item: '四季春茶',
    describe: '香醇四季春茶，回甘無比',
    price: '45',
    stock: '10',
  },
  {
    id: 't005',
    item: '阿薩姆奶茶',
    describe: '阿薩姆紅茶搭配香醇鮮奶',
    price: '50',
    stock: '25',
  },
  {
    id: 't006',
    item: '檸檬冰茶',
    describe: '檸檬與冰茶的清新組合',
    price: '45',
    stock: '20',
  },
  {
    id: 't007',
    item: '芒果綠茶',
    describe: '芒果與綠茶的獨特風味',
    price: '55',
    stock: '18',
  },
  {
    id: 't008',
    item: '抹茶拿鐵',
    describe: '抹茶與鮮奶的絕配',
    price: '60',
    stock: '20',
  },
])
const edit = ref({})
const editID = ref('')

const editFn = {
  edit: (item) => {
    edit.value = { ...item }
    editID.value = item.id
  },
  reset: () => {
    edit.value = {}
    editID.value = ''
  },
  save: () => {
    const index = menus.value.findIndex((menu) => menu.id == editID.value)
    menus.value[index] = edit.value
    editFn.reset()
  },
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="menu in menus" :key="menu.id">
        <td>
          {{ menu.item }}
        </td>
        <td>
          <small>
            {{ menu.describe }}
          </small>
        </td>
        <td>
          {{ menu.price }}
        </td>
        <td>
          <button @click="menu.stock--">-</button>
          {{ menu.stock }}
          <button @click="menu.stock++">+</button>
        </td>
        <td>
          <button type="button" @click="editFn.edit(menu)" v-if="editID != menu.id">修改</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="edit" v-if="editID">
    <h2>修改內容</h2>
    <div class="list">
      <label for="">品項：</label>
      <input type="text" v-model="edit.item" />
    </div>
    <div class="list">
      <label for="">描述：</label>
      <input type="text" v-model="edit.describe" />
    </div>
    <div class="list">
      <label for="">價格：</label>
      <input type="number" v-model="edit.price" />
    </div>
    <div class="list">
      <label for="">庫存：</label>
      <input type="number" v-model="edit.stock" />
    </div>
    <div class="btn">
      <button type="button" @click="editFn.reset()">取消</button>
      <button type="button" @click="editFn.save()">確認</button>
    </div>
  </div>
</template>

<style lang="scss">
table {
  font-size: 18px;
}
table td {
  padding: 10px;
  border-top: 1px solid #ccc;
}
.edit {
  font-size: 18px;
  h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  .list {
    margin-bottom: 10px;
  }
  input {
    height: 22px;
    font-size: 18px;
  }
  .btn {
    button {
      font-size: 18px;
      margin: 5px 10px;
    }
  }
}
</style>
