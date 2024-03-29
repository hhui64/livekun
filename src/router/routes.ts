import { RouteRecordRaw } from 'vue-router'

const NotFound = () => import('../views/Common/NotFound.vue')

const Console = () => import('../views/Console.vue')
const Plugins = () => import('../views/Plugins.vue')
const PluginsOBS = () => import('../views/PluginsOBS.vue')

const ConnectPage = () => import('../views/Console/ConnectPage.vue')
const AccountPage = () => import('../views/Console/AccountPage.vue')

const LoginPage = () => import('../views/User/Login.vue')

const TestPage = () => import('../views/TestPage.vue')
const VoicePage = () => import('../views/VoicePage.vue')

const childrenRoutes: Array<RouteRecordRaw> = [
  /** @todo 控制台首页，重定向至 connect 页面，因为暂时没有完成 */
  {
    path: '/console',
    redirect: '/console/connect'
  },
  {
    path: '/console/connect',
    name: 'Connect',
    component: ConnectPage,
    meta: {
      title: '连接控制',
      menuItemKey: '/console/connect',
      showOnMenu: true,
      requiresAuth: true
    }
  },
  {
    path: '/console/plugins',
    name: 'Plugins',
    component: Plugins,
    meta: {
      title: '插件设置',
      menuItemKey: '/console/plugins',
      showOnMenu: true,
      requiresAuth: true
    }
  },
  {
    path: '/console/account',
    name: 'Account',
    component: AccountPage,
    meta: {
      title: '个人中心',
      menuItemKey: '/console/account',
      showOnMenu: true,
      requiresAuth: true
    }
  },
  {
    path: '/console/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到',
      requiresAuth: false
    }
  }
]

const routes: Array<RouteRecordRaw> = [
  /** @todo livekun 首页，重定向至控制台首页，因为暂时没有完成 */
  {
    path: '/',
    redirect: '/console'
  },
  {
    path: '/console',
    name: 'Console',
    component: Console,
    meta: { requiresAuth: true },
    children: [...childrenRoutes]
  },
  {
    path: '/plugins-obs',
    name: 'PluginsOBS',
    component: PluginsOBS,
    meta: { requiresAuth: false }
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/voice',
    name: 'VoicePage',
    component: VoicePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  }
]

export { routes }
