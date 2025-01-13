<template>
  <div class="container">
    <a-form
    :model="formState"
    :label-col="{style: { width: '80px' }}"
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
        <a-input v-model:value="formState.name" style="height: 40px;"/>
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" style="height: 40px;"/>
      </a-form-item>

      <div class="div_item" style="display: flex;flex-direction: row;justify-content: space-between;">
        <a-form-item
          label="验证码"
          name="captcha"
          :rules="[{ required: true, message: 'Please input your captcha!' }]"
        >
          <a-input v-model:value="formState.captcha" style="height: 40px;"/>
        </a-form-item>
        <div class="captcha_img" @click="refreshCaptcha" v-html="captchaImg"></div>
      </div>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup>
import { reactive,onMounted,ref } from 'vue';
import {message} from 'ant-design-vue'
import {login,captcha} from './api/login'
import {getAllUser} from './api/user'

const formState = reactive({
  name: '',
  password: ''
});

const captchaImg = ref('');

onMounted(() => {
  captcha().then(res => {
    captchaImg.value = res.data.captchaImg
  }).catch(error => {
   console.log(error) 
  })
})

const refreshCaptcha = async () => {
  try{
    const res = await captcha();
    captchaImg.value = res.data.captchaImg
  }catch(error){
    console.log(error);
  }
}
const onFinish = async (values) => {
  try{
    // const res = await getAllUser();
    // console.log(res)
    const res = await login(values);
    if(res.code === 200){
      localStorage.setItem('loginInfo',JSON.stringify(res.data || {}));
      message.success('登录成功');
    }else if(res.code === 300){
      message.error(res.message);
    }
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
.div_item > .ant-form-item{
  flex: 1;
}  
.captcha_img{
  margin-left: 10px;
  cursor: pointer;
}
</style>

