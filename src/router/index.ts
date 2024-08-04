import { createRouter, createWebHistory } from 'vue-router'
import { IndexView, NotFoundView } from '../views';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: IndexView },
    { name: "NotFound", path: "/:pathMatch(.*)", component: NotFoundView }
  ],
})

export default router;