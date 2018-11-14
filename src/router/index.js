import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/orgUnitMgr',
    component: Layout,
    redirect: '/orgUnitMgr/orgInfo',
    name: 'OrgUnitMgr',
    meta: { title: '组织管理', icon: 'org' },
    children: [
      {
        path: 'orgInfo',
        name: 'OrgInfo',
        component: () => import('@/views/org/OrgInfo'),
        meta: { title: '部门信息', icon: 'orgInfo' }
      },
      {
        path: 'orgMgr',
        name: 'orgMgr',
        component: () => import('@/views/org/orgMgr'),
        meta: { title: '部门管理', icon: 'orgMgr' }
      },
      {
        path: 'orgHistory',
        name: 'orgHistory',
        component: () => import('@/views/org/OrgHistory'),
        meta: { title: '历史部门', icon: 'orgHistory' }
      },
      {
        path: 'orgChangeHistory',
        name: 'orgChangeHistory',
        component: () => import('@/views/org/orgChangeHistory'),
        meta: { title: '变更历史', icon: 'orgChangeHistory' }
      }
    ]
  },
  {
    path: '/empInfraMgr',
    component: Layout,
    redirect: '/empInfraMgr/empInfra',
    name: 'EmpInfraMgr',
    meta: { title: '人事管理', icon: 'emp' },
    children: [
      {
        path: 'empInfra',
        name: 'empInfra',
        component: () => import('@/views/emp/EmpInfra'),
        meta: { title: '员工信息', icon: 'table' }
      },
      {
        path: 'editEmp',
        name: 'editEmp',
        component: () => import('@/views/emp/EmpEdit'),
        meta: { title: '员工维护', icon: 'table'},
        hidden: true
      },
      {
        path: 'editEmp2',
        name: 'editEmp2',
        component: () => import('@/views/emp/EmpEdit2'),
        meta: { title: '员工维护', icon: 'table'},
        hidden: true
      },
      {
        path: 'editEmp3',
        name: 'editEmp3',
        component: () => import('@/views/emp/EmpEdit3'),
        meta: { title: '员工维护', icon: 'table'},
        hidden: true
      },
      {
        path: 'addEmp',
        name: 'addEmp',
        component: () => import('@/views/emp/EntryMgr'),
        meta: { title: '入职管理', icon: 'table' }
      },
      {
        path: 'employeeInfo',
        name: 'employeeInfo',
        component: () => import('@/views/emp/employeeInfo'),
        meta: { title: '员工信息显示', icon: 'table'},
        hidden: true
      },
      {
        path: 'addEmp2',
        name: 'addEmp2',
        component: () => import('@/views/emp/AddMgr3'),
        meta: { title: '人员录入', icon: 'table' },
        hidden: true
      },
      {
        path: 'trunMgr',
        name: 'trunMgr',
        component: () => import('@/views/emp/RegularMgr'),
        meta: { title: '转正管理', icon: 'table' }
      },
      {
        path: 'empOrgUnitMgr',
        name: 'empOrgUnitMgr',
        component: () => import('@/views/emp/EmpUnit'),
        meta: { title: '调职管理', icon: 'table' }
      },
      {
        path: 'empTransfer2',
        name: 'empTransfer2',
        component: () => import('@/views/emp/PromotionMgr'),
        meta: { title: '晋升管理', icon: 'table' }
      },
      // {
      //   path: 'empTransfer',
      //   name: 'empTransfer',
      //   component: () => import('@/views/emp/Transfer'),
      //   meta: { title: '晋升管理', icon: 'table' }
      // },
      {
        path: 'empQuit',
        name: 'empQuit',
        component: () => import('@/views/emp/EmpQuit'),
        meta: { title: '离职管理', icon: 'table' }
      },
      {
        path: 'empRestore',
        name: 'empRestore',
        component: () => import('@/views/emp/EmpRestore'),
        meta: { title: '复职管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/sysMgr',
    component: Layout,
    redirect: '/sysMgr/codeMgr',
    name: 'SysMgr',
    meta: { title: '组织管理', icon: 'example' },
    children: [
      {
        path: 'codeMgr',
        name: 'CodeMgr',
        component: () => import('@/views/sys/CodeMgr'),
        meta: { title: 'Code管理', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

