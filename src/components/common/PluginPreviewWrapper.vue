<template>
  <div
    class="plugin-preview-wrapper"
    :class="{
      'theme-dark': theme === 'dark' || themeSwitchState,
      'theme-light': theme === 'light' || !themeSwitchState
    }">
    <div class="preview-main">
      <slot></slot>
    </div>

    <div class="preview-footer">
      <a-space :size="5">
        <a-typography-text>自动预览</a-typography-text>
        <a-switch
          :checked="autoPreview"
          checked-children="开"
          un-checked-children="关"
          @change="(checked) => onChange(checked)"
          style="vertical-align: bottom">
        </a-switch>

        <a-typography-text>背景</a-typography-text>
        <a-switch
          v-model:checked="themeSwitchState"
          checked-children="暗"
          un-checked-children="亮"
          @change="(checked) => themeSwitch(checked)"
          style="vertical-align: bottom; background-color: #1890ff">
        </a-switch>
      </a-space>
      <a-typography-link
        :href="url"
        :copyable="{ text: url }"
        target="_blank"
        style="float: right">
        插件链接
      </a-typography-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { PropType } from 'vue'

const userStore = useUserStore()

const props = defineProps({
  pluginName: {
    type: String,
    default: ''
  },
  autoPreview: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark'
  }
})

const emit = defineEmits<{
  (event: 'update:autoPreview', checked: boolean): void
  (event: 'update:theme', style: 'dark' | 'light'): void
  (event: 'onAutoPreviewSwitchChange', checked: boolean): void
}>()

const url = computed(
  () =>
    `${window.location.origin}/#/plugins-obs/${props.pluginName}?uuid=${userStore.uuid}`
)

const onChange = (checked: unknown) => {
  emit('update:autoPreview', checked as boolean)
  emit('onAutoPreviewSwitchChange', checked as boolean)
}

const themeSwitch = (checked: unknown) => {
  emit('update:theme', (checked as boolean) ? 'dark' : 'light')
}

const themeSwitchState = ref(true)
</script>

<style lang="less" scoped>
.plugin-preview-wrapper {
  width: 100%;

  .preview-main {
    margin-bottom: 16px;
    width: 100%;
    height: calc(100% - 80px);
    background-position:
      0 0,
      16px 0,
      16px -16px,
      0 16px;
    background-size: 32px 32px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }

  &.theme-dark {
    .preview-main {
      background-color: #444;
      background-image:
        -webkit-gradient(
          linear,
          0 100%,
          100% 0,
          color-stop(0.25, #333),
          color-stop(0.25, transparent)
        ),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #333), color-stop(0.25, transparent)),
        -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #333)),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #333));
    }
  }

  &.theme-light {
    .preview-main {
      background-color: #ddd;
      background-image:
        -webkit-gradient(
          linear,
          0 100%,
          100% 0,
          color-stop(0.25, #eee),
          color-stop(0.25, transparent)
        ),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #eee), color-stop(0.25, transparent)),
        -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #eee)),
        -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #eee));
    }
  }
}
</style>
