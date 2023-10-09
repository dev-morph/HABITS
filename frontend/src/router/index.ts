import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'signup',
		component: () => import('../views/SignupView.vue'),
	},
	{
		path: '/home',
		name: 'home',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
	},
	{
		path: '/oauth/kakao/redirect',
		name: 'kakao',
		component: () => import(/* webpackChunkName: "about" */ '../views/KakaoRedirectView.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
