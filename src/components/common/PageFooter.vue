<template>
  <div class="page-footer">
    <p>
      <a-typography-text type="secondary">
        {{ globalAppConfig.copyright }}
        Powered by
        <a-typography-link
          type="secondary"
          :href="'https://antdv.com/'"
          target="_blank"
          underline>
          Ant Design Vue </a-typography-link
        >.
      </a-typography-text>
    </p>
    <p>
      <img
        src="@/assets/images/record-logo.png"
        height="20"
        style="vertical-align: bottom; margin-right: 4px" />
      <a-typography-link
        type="secondary"
        :href="globalAppConfig.gongan.url"
        target="_blank">
        {{ globalAppConfig.gongan.beian }}
      </a-typography-link>

      <a-typography-link
        type="secondary"
        :href="globalAppConfig.icp.url"
        target="_blank"
        style="margin-left: 8px">
        {{ globalAppConfig.icp.beian }}
      </a-typography-link>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { globalAppConfig } from '@/api/common'
</script>

<style lang="less" scoped>
.page-footer {
  text-align: center;

  p {
    margin: 0;
  }
}
</style>
