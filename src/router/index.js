import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '../views/ProductsList.vue'

const routes = [
  {
    path: '/',
    name: 'ProductsList',
    component: ProductsList
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddProduct.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
