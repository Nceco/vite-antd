<template>
  <div class="container">
    <div class="form_box">
      <a-form
      size="large"
      style="width: 85%;"
      :model="formState"
      :label-col="{style: { width: '80px' }}"
      labelAlign="left"
      autocomplete="off"
      >
        <a-form-item
          name="name"
          :rules="[{ required: true, message: 'Please input your name!' }]"
        >
          <a-input v-model:value="formState.name" placeholder="请输入用户名">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password"  placeholder="请输入密码">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="div_item" style="display: flex;flex-direction: row;justify-content: space-between;">
          <a-form-item
            name="captcha"
            :rules="[{ required: true, message: 'Please input your captcha!' }]"
          >
            <a-input v-model:value="formState.captcha"  placeholder="请输入验证码">
              <template #prefix>
                <safety-outlined />
              </template>
            </a-input>
          </a-form-item>
          <div v-if="captchaImg" class="captcha_img" @click="refreshCaptcha" v-html="captchaImg"></div>
          <img v-else class="no_img" src="" alt="验证码"/>
        </div>
      </a-form>
      <div>
        <a-button type="primary" html-type="submit" @click="onFinish">登录</a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive,onMounted,ref } from 'vue';
import {message} from 'ant-design-vue'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue';
import {login,captcha} from '@/api/login'

const formState = reactive({
  name: '',
  password: '',
  captcha: '',
});

const captchaImg = ref('');

onMounted(() => {
  captcha().then(res => {
    captchaImg.value = res.data.captchaImg
  }).catch(error => {
    throw new Error(error)
  })
})

const refreshCaptcha = async () => {
  try{
    const res = await captcha();
    captchaImg.value = res.data.captchaImg
  }catch(error){
    throw new Error(error)
  }
}
const onFinish = async (values) => {
  try{
    const res = await login(values);
    if(res.code === 200){
      localStorage.setItem('loginInfo',JSON.stringify(res.data || {}));
      message.success('登录成功');
    }else if(res.code === 300){
      message.error(res.message);
    }
  }catch(error){
    throw new Error(error)
  }
};

</script>
<style lang="less" scoped>
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0818336d;
  .form_box{
    background-color: white;
    width: 400px;
    height: 300px;
    box-shadow: 0 0.143rem 0.571rem 0 rgba(31, 40, 51, 0.05);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .no_img{
      width: 150px;
      height: 40px;
      margin-left: 10px;
      border: 1px solid #ccc;
    }
  }
}
.div_item > .ant-form-item{
  flex: 1;
}  
.captcha_img{
  margin-left: 10px;
  cursor: pointer;
}
</style>

