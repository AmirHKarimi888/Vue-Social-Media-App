import { createRouter, createWebHistory } from 'vue-router'
import { IndexView, PostView, NotFoundView } from '../views';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: IndexView },
    { name: "Post", path: "/posts/:id", component: PostView },
    { name: "NotFound", path: "/:pathMatch(.*)", component: NotFoundView }
  ],
})

export default router;