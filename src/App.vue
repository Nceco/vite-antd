<script setup></script>
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#081833',
      }
    }"
  >
    <router-view />
  </a-config-provider>
</template>
<style scoped>
</style>