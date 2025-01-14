<script setup>
import { ref } from 'vue';
import { TranslationOutlined } from '@ant-design/icons-vue'
import { LanguageList } from '@/locales'
import { useLangStore } from '@/store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const langText = ref(localStorage.getItem('language') || 'zh-CN')
const langStore = useLangStore()
const changeLanguage = (item) => {
  localStorage.setItem('language',item.value)
  langStore.setLanguage(item.value)
  langText.value = item.value
}
</script>
<template>
  <div class="language_box">
    <a-dropdown placement="bottom" arrow>
      <a @click.prevent>
        <TranslationOutlined />
        {{ langText }}
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in LanguageList" :key="item.value" @click="changeLanguage(item)">
            <a href="javascript:;">{{ t(item.label) }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<style lang="less" scoped>
.language_box{
    position: absolute;
    top: 20px;
    right: 30px;
    height: 50px;
    cursor: pointer;
    color: #ffffff;
    min-width: 80px;
    text-align: center;
    z-index: 99;
  }
</style>