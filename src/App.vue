<template>
  <div class="container">
    <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="name"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import {message} from 'ant-design-vue'
import {login} from './api/login'
import {getAllUser} from './api/user'

const formState = reactive({
  name: '',
  password: ''
});
const onFinish = async (values) => {
  try{
    const res = await getAllUser();
    console.log(res)
    // const res = await login(values);
    // if(res.code === 200){
    //   localStorage.setItem('loginInfo',JSON.stringify(res.data));
    //   message.success('登录成功');
    // }
  }catch(error){
    console.log(error);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>
<style scoped>
.container {
    width: 100%;
    padding: 200px 400px;
  }
</style>

