<script setup>
import axios from 'axios'
import { ref } from 'vue'

const apiURL = 'https://todolist-api.hexschool.io'
const content = ref({})
const validate = ref({})
const message = ref('')
const messageIn = ref('')
const messageToken = ref('')

const axiosAPI = async (type, link, payload, txt, num, config = {}) => {
  try {
    const res = await axios[type](`${apiURL + link}`, payload, config)
    if (res.data.status) {
      if (num == 0) {
        messageIn.value = txt + res.data.token
      } else if (num == 1) {
        message.value = txt
      } else if (num == 2) {
        messageToken.value = txt
      }
    }
    content.value = {}
    validate.value = {}
  } catch (error) {
    if (num == 0) {
      messageIn.value = error.response?.data?.message || '錯誤'
    } else if (num == 1) {
      message.value = error.response?.data?.message || '錯誤'
    } else if (num == 2) {
      messageToken.value = error.response?.data?.message || '錯誤'
    }
  }
}
const registerVerify = () => {
  message.value = ''
  verification.email(content.value.email)
  verification.nickname(content.value.nickname)
  verification.password(content.value.password)
  verification.password2(content.value.password2)

  const payload = {
    email: content.value.email,
    password: content.value.password,
    nickname: content.value.nickname,
  }
  if (Object.keys(validate.value).length === 0) {
    axiosAPI('post', '/users/sign_up', payload, '註冊成功', 1)
  }
}
const signInVerify = () => {
  messageIn.value = ''
  verification.email(content.value.emailIn, 0)
  verification.password(content.value.passwordIn, 0)

  const payload = {
    email: content.value.emailIn,
    password: content.value.passwordIn,
  }
  if (!validate.value.emailIn && !validate.value.passwordIn) {
    axiosAPI('post', '/users/sign_in', payload, '登入成功, Token= ', 0)
  }
}
const tokenVerify = () => {
  messageToken.value = ''
  verification.token(content.value.token)
}
const signOutVerify = () => {
  messageToken.value = ''
  verification.token(content.value.token, 0)
}

const verification = {
  email: (mail, num = 1) => {
    if (!mail) {
      if (num) {
        validate.value.email = '此欄位不可為空值'
      } else {
        validate.value.emailIn = '此欄位不可為空值'
      }
    } else {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(mail).toLowerCase())) {
        delete validate.value.email
        delete validate.value.emailIn
      } else {
        if (num) {
          validate.value.email = 'E-mail格式有誤'
        } else {
          validate.value.emailIn = 'E-mail格式有誤'
        }
      }
    }
  },
  nickname: (name) => {
    if (!name) {
      validate.value.nickname = '此欄位不可為空值'
    } else {
      delete validate.value.nickname
    }
  },
  password: (pas, num = 1) => {
    if (!pas) {
      if (num) {
        validate.value.password = '此欄位不可為空值'
      } else {
        validate.value.passwordIn = '此欄位不可為空值'
      }
    } else {
      if (pas.length < 6) {
        if (num) {
          validate.value.password = '長度不足 6 個字'
        } else {
          validate.value.passwordIn = '長度不足 6 個字'
        }
      } else {
        delete validate.value.password
        delete validate.value.passwordIn
      }
    }
  },
  password2: (pas2) => {
    if (!pas2) {
      validate.value.password2 = '此欄位不可為空值'
    } else {
      if (pas2 !== content.value.password) {
        validate.value.password2 = '密碼不一致'
      } else {
        delete validate.value.password2
      }
    }
  },
  token: (token, num = 1) => {
    if (!token) {
      validate.value.token = '此欄位不可為空值'
    } else {
      delete validate.value.token
      if (num) {
        axiosAPI(
          'get',
          '/users/checkout',
          { headers: { Authorization: content.value.token } },
          '驗證成功',
          2,
        )
      } else {
        axiosAPI('post', '/users/sign_out', {}, '登出成功', 2, {
          headers: {
            Authorization: content.value.token,
          },
        })
      }
    }
  },
}
</script>

<template>
  <div class="register">
    <h2>註冊帳號</h2>
    <form action="">
      <div class="form-list">
        <label for="">Email</label>
        <input type="email" placeholder="請輸入Email" v-model="content.email" />
        <small>{{ validate.email }}</small>
      </div>
      <div class="form-list">
        <label for="">您的暱稱</label>
        <input type="text" placeholder="請輸入您的暱稱" v-model="content.nickname" />
        <small>{{ validate.nickname }}</small>
      </div>
      <div class="form-list">
        <label for="">密碼</label>
        <input type="password" placeholder="請輸入密碼" v-model="content.password" />
        <small>{{ validate.password }}</small>
      </div>
      <div class="form-list">
        <label for="">再次輸入密碼</label>
        <input type="password" placeholder="請再次輸入密碼" v-model="content.password2" />
        <small>{{ validate.password2 }}</small>
      </div>
    </form>
    <div class="msg" v-if="message">註冊回應：{{ message }}</div>
    <div class="btn">
      <button class="black" type="button" @click="registerVerify">註冊帳號</button><br />
    </div>
  </div>
  <hr />
  <div class="signIn">
    <h2>登入</h2>
    <form action="">
      <div class="form-list">
        <label for="">Email</label>
        <input type="email" placeholder="請輸入Email" v-model="content.emailIn" />
        <small>{{ validate.emailIn }}</small>
      </div>
      <div class="form-list">
        <label for="">密碼</label>
        <input type="password" placeholder="請輸入密碼" v-model="content.passwordIn" />
        <small>{{ validate.passwordIn }}</small>
      </div>
    </form>
    <div class="msg" v-if="messageIn">登入回應：{{ messageIn }}</div>
    <div class="btn">
      <button class="black" type="button" @click="signInVerify">登入</button><br />
    </div>
  </div>
  <hr />
  <div class="verify">
    <h2>驗證</h2>
    <form action="">
      <div class="form-list">
        <label for="">Token</label>
        <input type="text" placeholder="請輸入Token" v-model="content.token" />
        <small>{{ validate.token }}</small>
      </div>
    </form>
    <div class="msg" v-if="messageToken">Token回應：{{ messageToken }}</div>
    <div class="btn">
      <button class="black" type="button" @click="tokenVerify">驗證</button><br />
      <button type="button" @click="signOutVerify">登出</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap');
* {
  box-sizing: border-box;
  font-family: 'Noto Sans TC', sans-serif;
}
.register,
.signIn,
.verify {
  max-width: 360px;
  width: 100%;
}
h2 {
  margin-bottom: 6px;
}
.form-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  label {
    font-weight: 500;
    margin-bottom: 4px;
  }
  input {
    width: 100%;
    height: 36px;
    border-radius: 10px;
    border: 1px solid #333;
    padding: 0 12px;
    font-size: 16px;
    &::placeholder {
      font-size: 16px;
      color: #aaa;
      font-family: 'Noto Sans TC', sans-serif;
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
  small {
    margin-top: 4px;
    color: #e03b3b;
    font-weight: 500;
  }
}
.btn {
  text-align: center;
  button {
    cursor: pointer;
    width: 160px;
    height: 42px;
    font-size: 16px;
    margin: 0 0 12px;
    padding: 0;
    border: none;
    color: #fff;
    background-color: #333;
    transition: opacity 0.5s;
    &:hover {
      opacity: 0.7;
    }
  }
}
.msg {
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  color: red;
  font-weight: 700;
  word-break: break-all;
}
</style>
