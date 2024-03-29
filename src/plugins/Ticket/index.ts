import { defaultPluginConfig } from './config'
import { defineLivekunPlugin } from '@/api/pluginmanager'

export default defineLivekunPlugin(() => {
  return {
    pluginName: 'ticket',
    displayName: '价签栏 Ticket',
    description: '以标签形式展示直播间的礼物价值',
    author: 'hhui64',
    pluginConfig: defaultPluginConfig,
    componentConfigPage: () => import('./views/ConfigPage.vue'),
    componentPluginPage: () => import('./views/PluginPage.vue')
  }
})
