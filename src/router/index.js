import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import userLayout from '@/userLayout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },

  {
    path: '/talent/edit/',
    component: () => import('@/views/talentManage/components/personVita'),
    name: 'EditArticle',
    meta: {
      title: '查看简历',
      noCache: true,
      activeMenu: '/talent/manange'
    },
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/register'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    path: '/Mandashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'shouye',
      affix: true
    },
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'shouye',
        affix: true
      }
    }]
  },
  {
    path: '/qiyeindex',
    component: Layout,
    redirect: '/qiyeindex/qiyeindex',
    // meta:{title:'岗位管理1'},
    children: [{
      path: '/qiyeindex/qiyeindex',
      component: () => import('@/views/qiyeindex/qiyeindex'),
      meta: {
        title: '企业信息',
        icon: 'qiye',
        affix: true
      }
    }]
  },
  {
    path: '/post',
    component: Layout,
    redirect: '/post/manange',
    // meta:{title:'岗位管理1'},
    children: [{
      path: '/post/manange',
      component: () => import('@/views/postManage/modules/index'),
      meta: {
        title: '岗位管理',
        icon: 'gongwenbao'
      }
    }]
  },

  {
    path: '/talent',
    component: Layout,
    redirect: '/talent/manange',
    children: [{
      path: '/talent/manange',
      component: () => import('@/views/talentManage/modules/index'),
      meta: {
        title: '人才管理',
        icon: 'lingdai'
      }
    },
    {
      path: '/talent/Cv/',
      component: () => import('@/views/Cv/cv'),
      name: 'Cv',
      meta: {
        title: '查看简历',
        noCache: true,
        activeMenu: '/talent/manange'
      },
      hidden: true
    }
    ]
  },
  {
    path: '/square',
    component: Layout,
    redirect: '/square/market',
    children: [{
      path: '/square/market',
      component: () => import('@/views/talentSquare/modules/index'),
      meta: {
        title: '人才广场',
        icon: 'mokuai'
      }
    }]
  },
  {
    path: '/',
    name: 'userLayout',
    component: userLayout,
    redirect: 'userdash',
    hidden: true,
    children: [{
      name: '首页',
      path: '/userdash',
      component: () => import('@/views/userDashboard/index')
    },
    {
      name: '职位',
      path: '/userpost',
      component: () => import('@/views/userPost/modules/index')
    },
    {
      name: '培训认证',
      path: '/usertrain',
      component: () => import('@/views/userTrain/modules/index')
    },
    {
      name: '关于我们',
      path: '/userabout',
      component: () => import('@/views/userAbout/modules/index')
    },
    {

      name: '联系我们',
      path: '/usercontact',
      component: () => import('@/views/userContact/modules/index')
    },
    {
      name: '个人主页',
      path: '/usercenter',
      component: () => import('@/views/userCenter/modules/index')
    },
    {
      name: '支付中心',
      path: '/paymentcenter',
      component: () => import('@/views/paymentCenter/index.vue')
    },
    {
      name: '在线简历',
      path: '/uservitae',
      component: () => import('@/views/userCenter/userVitae/index.vue')
    },
    {
      name: '求职列表',
      path: '/jobwanted',
      component: () => import('@/views/userCenter/jobWantList/index.vue')
    },
    {
      name: '我的简历',
      path: '/myvitae',
      component: () => import('@/views/userCenter/myVitae/index.vue')
    },
    {
      name: 'postdes',
      path: '/postdes',
      component: () => import('@/views/userPostdes/index.vue')
    },
    {
      name: '我的',
      path: '/my',
      component: () => import('@/views/my/index.vue'),
      children: [
        {
          name: '个人中心',
          path: '/my',
          component: () => import('@/views/my/components/personage.vue')
        },
        {
          name: '我的简历',
          path: '/resume',
          component: () => import('@/views/my/components/resume.vue')
        },
        {
          name: '求职申请',
          path: '/job',
          component: () => import('@/views/my/components/job.vue')
        },
        {
          name: '面试邀约',
          path: '/interview',
          component: () => import('@/views/my/components/interview.vue')
        },
        {
          name: '我的收藏',
          path: '/collection',
          component: () => import('@/views/my/components/collection.vue')
        },
        {
          name: '安全中心',
          path: '/safety',
          component: () => import('@/views/my/components/safety.vue')
        },
        {
          name: '隐私设置',
          path: '/privacy',
          component: () => import('@/views/my/components/privacy.vue')
        }
      ]
    }
    ]
  },
  // 客户端 路由引入
  {
    path: '/clientlayout',
    name: 'clientlayout',
    redirect: '/clientindex',
    component: () => import('../views/Client/layout.vue'),
    children: [{
      path: '/clientMy',
      name: 'clientMy',
      component: () => import('../views/Client/clientMine/clientMy.vue'),
      redirect: '/clientinfo',
      children: [{
        path: '/clientinfo',
        name: 'clientinfo',
        component: () => import('../views/Client/componets/clientinfo.vue')
      }, {
        path: '/clienttran',
        name: 'clienttran',
        component: () => import('../views/Client/componets/clienttran.vue')
      }, {
        path: '/onlinemy',
        name: 'onlinemy',
        component: () => import('../views/Client/componets/onlinemy')
      }]
    }, {
      path: '/clientindex',
      name: 'clientindex',
      component: () => import('../views/Client/clientMine/index.vue')
    }

    ]
  },
  {
    path: '/certdetail',
    name: 'certdetail',
    component: () => import('../views/Client/componets/certdetail.vue')
  },
  {
    path: '/coursedetail',
    name: 'coursedetail',
    component: () => import('../views/Client/componets/coursedetail.vue')
  },
  {
    path: '/ClassStudetail',
    name: 'ClassStudetail',
    component: () => import('../views/Client/componets/Classdetail.vue')
  },
  {
    path: '/clientLogin',
    name: 'clientLogin',
    component: () => import('../views/Client/login/clientLogin.vue')
  },
  //  后台管理路由引入搭建
  {
    path: '/Bmanagementlayout',
    name: 'Bmanagementlayout',
    meta: { title: '后台管理' },
    component: () => import('../views/Bmanagement/layout.vue'),
    redirect: 'courseMan',
    children: [{
      // 课程
      path: '/courseMan',
      name: 'courseMan',
      meta: { title: '课程管理' },
      component: () => import('../views/Bmanagement/manager/courseMan.vue')
    }, {
      // 教师
      path: '/teacherMan',
      name: 'teacherMan',
      meta: { title: '教师管理' },
      component: () => import('../views/Bmanagement/manager/teacherMan.vue')
    }, {
      // 证书
      path: '/certMan',
      name: 'certMan',
      meta: { title: '证书管理' },
      component: () => import('../views/Bmanagement/manager/certMan.vue')
    }, {
      // 学员
      path: '/classMan',
      name: 'classMan',
      meta: { title: '学员管理' },
      component: () => import('../views/Bmanagement/manager/classMan.vue')
    }, {
      // 班级
      path: '/classroomMan',
      name: 'classroomMan',
      meta: { title: '班级管理' },
      component: () => import('../views/Bmanagement/manager/classroomMan.vue')
    }, {
      path: '/classDetail',
      name: 'classDetail',
      meta: { title: '班级详情' },
      component: () => import('../views/Bmanagement/manager/classDetail.vue')
    }
    ]
  }

]

export const newRouter = [{
  path: '/post',
  component: Layout,
  redirect: '/post/manange',
  // meta:{title:'岗位管理1'},
  children: [{
    path: '/post/manange',
    component: () => import('@/views/postManage/modules/index'),
    meta: {
      title: '岗位管理',
      icon: 'gongwenbao'
    }
  }]
},
{
  path: '/talent',
  component: Layout,
  redirect: '/talent/manange',
  children: [{
    path: '/talent/manange',
    component: () => import('@/views/talentManage/modules/index'),
    meta: {
      title: '人才管理',
      icon: 'lingdai'
    }
  },
  {
    path: '/talent/edit/',
    component: () => import('@/views/talentManage/components/personVita'),
    name: 'EditArticle',
    meta: {
      title: '查看简历',
      noCache: true,
      activeMenu: '/talent/manange'
    },
    hidden: true
  }
  ]
},
{
  path: '/square',
  component: Layout,
  redirect: '/square/market',
  children: [{
    path: '/square/market',
    component: () => import('@/views/talentSquare/modules/index'),
    meta: {
      title: '人才广场',
      icon: 'mokuai'
    }
  }]
}
]

export const asyncRoutes = [
  //   {
  //     path: '/post',
  //     component: Layout,
  //     redirect: '/post/manange',
  //     // meta:{title:'岗位管理1'},
  //     children: [{
  //       path: '/post/manange',
  //       component: () => import('@/views/postManage/modules/index'),
  //       meta: { title: '岗位管理', icon: 'gongwenbao', }
  //     }]
  //   },
  //   {
  //     path: '/talent',
  //     component: Layout,
  //     redirect: '/talent/manange',
  //       children: [
  //         {
  //           path: '/talent/manange',
  //           component: () => import('@/views/talentManage/modules/index'),
  //           meta: { title: '人才管理', icon: 'lingdai', },
  //         },
  //         {
  //           path: '/talent/edit/',
  //           component: () => import('@/views/talentManage/components/personVita'),
  //           name: 'EditArticle',
  //           meta: { title: '查看简历', noCache: true, activeMenu: '/talent/manange' },
  //           hidden: true
  //         }
  //       ]
  //   },
  //   {
  //     path: '/square',
  //     component: Layout,
  //     redirect: '/square/market',
  //     children: [{
  //       path: '/square/market',
  //       component: () => import('@/views/talentSquare/modules/index'),
  //       meta: { title: '人才广场', icon: 'mokuai', }
  //     }]
  //   }
  //   ,
  //   { path: '*', redirect: '/404', hidden: true }
]

Router.selfaddRoutes = function (params) {
  Router.matcher = new Router().matcher
  Router.addRoutes(params)
}

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
