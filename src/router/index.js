// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Category from '../views/Category.vue'
import ProductDetail from '../views/ProductDetail.vue'
import MyPage from '../views/MyPage.vue'
import SearchResults from '../views/SearchResults.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import IdPasswordRecovery from '../views/IdPasswordRecovery.vue'

const routes = [
  { path: '/', name: 'Main', component: Main },
  { path: '/category/:categoryId', name: 'Category', component: Category },
  { path: '/product/:productId', name: 'ProductDetail', component: ProductDetail },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/search', name: 'SearchResults', component: SearchResults, props: route => ({ searchQuery: route.query.q }) },
  { path: '/login', name: 'Login', component: Login } ,
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/recovery', name: 'IdPasswordRecovery', component: IdPasswordRecovery }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
