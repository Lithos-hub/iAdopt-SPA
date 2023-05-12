import {
	NavigationGuardNext,
	RouteLocation,
	RouteRecordRaw,
	createRouter,
	createWebHistory,
} from 'vue-router';

const requiresAuth = async (_: RouteLocation, __: RouteLocation, next: NavigationGuardNext) => {
	const token = localStorage.getItem('token');
	if (!token) {
		console.log('Access denied');
		next('/');
	} else {
		next();
	}
};

const redirectIfAuth = async (_: RouteLocation, __: RouteLocation, next: NavigationGuardNext) => {
	const token = localStorage.getItem('token');
	if (token) {
		next('/app');
	} else {
		next();
	}
};

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'access',
		component: () => import(/* webpackChunkName: "home" */ '@/views/access/AccessView.vue'),
		beforeEnter: redirectIfAuth,
	},
	{
		path: '/adoption-form/:id',
		name: 'Adoption Form view',
		component: () =>
			import(/* webpackChunkName: "home" */ '@/views/adoptionForm/AdoptionFormView.vue'),
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
				component: () => import(/* webpackChunkName: "home" */ '@/views/generator/_Index.vue'),
				redirect: '/app/generator/new',
				children: [
					{
						path: '/app/generator/new',
						name: 'New generation',
						component: () =>
							import(/* webpackChunkName: "home" */ '@/views/generator/CreateFormView.vue'),
					},
					{
						path: '/app/surveys/:id',
						name: 'Survey Details',
						beforeEnter: requiresAuth,
						component: () =>
							import(/* webpackChunkName: "home" */ '@/views/survey/SurveyDetails.vue'),
					},
				],
			},
			{
				path: '/app/my-reports',
				name: 'My reports',
				beforeEnter: requiresAuth,
				component: () =>
					import(/* webpackChunkName: "home" */ '@/views/my-reports/MyReportsView.vue'),
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
