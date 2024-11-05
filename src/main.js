// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 전역 스타일 파일 임포트
import './assets/styles/global.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
