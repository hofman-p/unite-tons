import { route } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(({ store /* ssrContext */ }) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    const userToken = Cookies.get('user_token');
    const userRole = Cookies.get('user_role');
    const userEmail = Cookies.get('user_email');
    if (userToken && !store.state.userStore?.user.token) {
      store.commit('userStore/setUser', {
        user_token: userToken,
        user_role: userRole,
        user_email: userEmail,
      });
    }
    if (to.meta.requiresAuth && (!Cookies.has('user_token') || !store.state.userStore?.user.token)) {
      return {
        name: 'login',
      };
    }
    return true;
  });

  return Router;
});
