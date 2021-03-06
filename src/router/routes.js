const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'movies' },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'movies',
        name: 'movies',
        component: () => import('pages/Movies.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
