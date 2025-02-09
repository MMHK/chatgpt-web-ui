import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'

const routes: RouteRecordRaw[] = [
	{
		path: '/zoho/callback',
		name: 'zoho-callback',
		component: () => import('@/views/chat/login.vue'),
		meta: {
			needAuth: false,
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/chat/login.vue'),
		meta: {
			needAuth: false,
		}
	},
  {
    path: '/',
    name: 'Root',
    component: ChatLayout,
    redirect: '/chat',
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
		meta: {
    	needAuth: true,
		}
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
		meta: {
			needAuth: false,
		}
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
		meta: {
			needAuth: false,
		}
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
		meta: {
			needAuth: false,
		}
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupPageGuard(router)

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
