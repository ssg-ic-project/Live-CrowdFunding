<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-box">
      <img src="../assets/image/logo.png" alt="Logo" class="logo" />
      
      <!-- 이메일 입력 -->
      <div class="input-group">
        <label for="email">이메일</label>
        <input
          type="text"
          id="email"
          v-model="email"
          @input="validateEmail"
          placeholder="이메일을 입력하세요"
        />
        <p v-if="emailError" class="error-message">유효한 이메일을 입력해주세요.</p>
      </div>

      <!-- 비밀번호 입력 -->
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <!-- 로그인 버튼 -->
      <button @click="handleLogin" class="login-button">이메일로 로그인</button>
      <p v-if="loginError" class="error-message">이메일 또는 비밀번호를 확인해주세요.</p>

      <!-- 소셜 로그인 버튼들 -->
      <button class="social-login kakao-login">카카오톡 간편 로그인</button>
      <button class="social-login naver-login">네이버 간편 로그인</button>

      <!-- 아이디/비밀번호 찾기 및 회원가입 -->
      <div class="links">
        <router-link :to="{ name: 'IdPasswordRecovery', query: { redirect: this.previousRoute }}">아이디/비밀번호 찾기</router-link> |
        <router-link to="/signup">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      loginError: false,
      previousRoute: null // 이전 경로 저장
    }
  },
  methods: {
    validateEmail() {
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      this.emailError = this.email.length > 0 && !emailRegex.test(this.email)
    },
    handleLogin() {
      this.validateEmail() // 이메일 유효성 재확인
      if (this.emailError) return

      const isLoginSuccessful = this.email === 'test@example.com' && this.password === 'password'
      if (isLoginSuccessful) {
        this.$router.push(this.previousRoute || '/')
      } else {
        this.loginError = true
      }
    }
  },
  mounted() {
    // 이전 경로를 확인하여 저장
    this.previousRoute = this.$route.query.redirect || '/'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 300px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 50%;
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.social-login {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  color: white;
  font-weight: bold;
}

.kakao-login {
  background-color: #fee500;
  color: #3c1e1e;
}

.naver-login {
  background-color: #03c75a;
}

.links {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.links a {
  color: #007bff;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}
</style>
