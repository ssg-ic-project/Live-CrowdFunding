<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 네비게이션 바와 푸터가 로그인/아이디 찾기/비밀번호 찾기 페이지에서 제외되도록 조건 추가 -->
    <Navbar v-if="!hideNavAndFooter" />
    <div class="main-container">
      <router-view />
    </div>
    <Footer v-if="!hideNavAndFooter" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  computed: {
    hideNavAndFooter() {
      // 로그인, 회원가입, 아이디/비밀번호 찾기 경로에서 네비게이션 바와 푸터 숨기기
      return ['/login', '/signup', '/recovery'].includes(this.$route.path)
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  margin: 0 auto;
}

.main-container {
  width: 100%;
  max-width: 1200px;
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
