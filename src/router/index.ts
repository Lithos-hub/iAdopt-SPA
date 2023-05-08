import {
	NavigationGuardNext,
	RouteLocation,
	RouteRecordRaw,
	createRouter,
	createWebHistory,
} from 'vue-router';

const requiresAuth = async (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
	const isLogged = true;
	if (!isLogged) {
		console.log('Access denied');
		next('/');
	} else {
		next();
	}
};

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'access',
		component: () => import(/* webpackChunkName: "home" */ '@/views/access/AccessView.vue'),
	},
	{
		path: '/form/:id',
		name: 'Form view',
		component: () => import(/* webpackChunkName: "home" */ '@/views/form/FormView.vue'),
	},
	{
		path: '/app',
		name: 'AppLayout',
		component: () => import(/* webpackChunkName: "home" */ '@/AppLayout.vue'),
		beforeEnter: requiresAuth,
		redirect: '/app/generator',
		children: [
			{
				path: '/app/generator',
				name: 'Generator',
				beforeEnter: requiresAuth,
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/generator/GeneratorView.vue'),
				redirect: '/app/generator/new',
				children: [
					{
						path: '/app/generator/new',
						name: 'New generation',
						component: () =>
							import(/* webpackChunkName: "home" */ '@/views/generator/CreateFormView.vue'),
					},
					{
						path: '/app/generator/:id',
						name: 'Detail generation',
						component: () =>
							import(/* webpackChunkName: "home" */ '@/views/generator/ReviewFormView.vue'),
					},
				],
			},
			{
				path: '/app/evaluator',
				name: 'Evaluator',
				beforeEnter: requiresAuth,
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/evaluator/EvaluatorView.vue'),
			},
			{
				path: '/app/about',
				name: 'About',
				beforeEnter: requiresAuth,
				component: () => import(/* webpackChunkName: "home" */ '@/views/about/AboutView.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
