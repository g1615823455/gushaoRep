import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/login/login"
Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/**
 * @Description: 路由配置页面
 * @PageAuthor: rendc
 * @Date: 2019-12-19 09:39:06
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    //@/pages/login/login
    //@/views/login/index
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home', // 首页
    children: [
      {
        path: 'home',
        component: () => import('@/pages/home/Home'),
        name: 'home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

/**
 * @Description: 权限页面
 * @PageAuthor:  rendc
 * @Date: 2019-12-19 10:04:36
 */
export const asyncRoutes = [
  {
    path: '/fire',
    component: Layout,
    redirect: '/example/list',
    name: 'fire',
    meta: {
      title: '消防',
      icon: 'example',
      roles: ['admin','ordinary']
    },
    children: [
      {
        path: 'journal',
        component: () => import('@/pages/fireData/journal.vue'),
        name: 'journal',
        meta: { title: '日志记录', icon: 'list',roles: ['admin','ordinary'] }
      },
      {
        path:'/reportForm',
        component: () => import('@/pages/fireData/reportForm.vue'),
        name:'reportForm',
        meta:{title:'数据报表',icon:'chart',roles: ['admin','ordinary'] },
      },
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video/list',
    name: 'video',
    meta: {
      title: '安防',
      icon: 'guide',
      roles: ['admin','ordinary']
    },
    children: [
      {
        path: 'monitor',
        component: () => import('@/pages/secData/Monitor'),
        name: 'monitor',
        meta: { title: '实时监控', icon: 'component',roles: ['admin','ordinary'] }
      },
      {
        path: 'video',
        component: () => import('@/pages/secData/Video'),
        name: 'video',
        meta: { title: '录像信息', icon: 'tab',roles: ['admin','ordinary'] }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    name: 'message',
    meta: {
      title: '消息预警',
      icon: 'message',
      roles: ['admin','ordinary']
    },
    children: [
      {
        path: 'message',
        component: () => import('@/pages/message/Message'),
        name: 'message',
        meta: { title: '预警消息', icon: 'edit',roles: ['admin','ordinary'] }
      },
      
    ]
  },
  {
    path: '/my',
    component: Layout,
    redirect: '/my/list',
    name: 'my',
    meta: {
      title: '个人信息',
      icon: 'my',
      roles: ['admin','ordinary']
    },
    children: [
      {
        path: 'my',
        component: () => import('@/pages/my/My'),
        name: 'myArticle',
        meta: { title: '个人中心', icon: 'user',roles: ['admin','ordinary'] }
      },
      
    ]
  },
  {
    path: '/administer',
    component: Layout,
    redirect: '/administer/list',
    name: 'administer',
    meta: {
      title: '用户管理',
      icon: 'my',
      roles: ['admin']
    },
    children: [
      {
        path: 'administer',
        component: () => import('@/pages/administer/administer'),
        name: 'UserAdminister',
        meta: { title: '用户管理', icon: 'peoples', roles: ['admin']}
      },
      
    ]
  },
  
]



export default router
