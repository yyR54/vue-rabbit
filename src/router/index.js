// createRouter: 创建router实例对象
// createWebHistory: 创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router';

// 模拟用户登录状态
let isLoggedIn = false;

// 设置用户登录状态
export const setLoggedIn = (status) => {
  isLoggedIn = status;
};

// 获取用户登录状态
export const getLoggedIn = () => {
  return isLoggedIn;
};

// 路由守卫逻辑提取到单独的函数中
const checkPaymentAccess = (to) => {
  const paymentPages = ['checkout', 'pay', 'paycallback'];
  const isPaymentPage = paymentPages.some(page => to.path.includes(page));
  return isPaymentPage && !getLoggedIn();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: 'cartlist',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: '/member',
          component: () => import('@/views/Member/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    }
  ],
  // 路由行为定制
  scrollBehavior () {
    return { top: 0 }
  }
});

// 动态添加路由
const paymentRoutes = [
  {
    path: 'checkout',
    component: () => import('@/views/Checkout/index.vue')
  },
  {
    path: 'pay',
    component: () => import('@/views/Pay/index.vue')
  },
  {
    path: 'paycallback', // 注意路径，必须是paycallback
    component: () => import('@/views/Pay/PayBack.vue')
  }
];

paymentRoutes.forEach(route => {
  router.addRoute('layout', route);
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (checkPaymentAccess(to)) {
    next('/login');
  } else {
    next();
  }
});

export default router;