import Vue from 'vue';
import VueRouter from 'vue-router';
import Characters from '../components/characters.vue';
import Episodes from '../components/episodes.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Characters',
    component: Characters,
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: Episodes,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
