<script setup>
import { watch, ref } from 'vue';
import { useLangStore } from '@/store'
import antdZhCN from 'ant-design-vue/es/locale/zh_CN';
import antdEnUS from "ant-design-vue/es/locale/en_US";
const store = useLangStore()
const locale = ref(antdZhCN)
watch(() => store.lang,() => {
  if(store.lang === 'en') {
    locale.value = antdEnUS
  }else{
    locale.value = antdZhCN
  }
},{
  immediate: true
})
</script>
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#081833',
      }
    }"
    :locale="locale"
  >
    <router-view />
  </a-config-provider>
</template>
<style scoped>
</style>