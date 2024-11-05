<!-- src/views/IdPasswordRecovery.vue -->
<template>
    <div class="recovery-container">
      <img src="../assets/image/logo.png" alt="Logo" class="logo" />
      
      <div class="recovery-box">
        <!-- 메뉴 탭: 아이디 찾기, 비밀번호 찾기 -->
        <div class="tabs">
          <span :class="{ active: isIdRecovery }" @click="selectTab('id')">아이디 찾기</span>
          <span :class="{ active: !isIdRecovery }" @click="selectTab('password')">비밀번호 찾기</span>
        </div>
  
        <!-- 아이디 찾기 -->
        <div v-if="isIdRecovery">
          <div class="input-group">
            <label>이름</label>
            <input type="text" v-model="name" placeholder="이름을 입력하세요" />
          </div>
          <div class="input-group">
            <label>전화번호</label>
            <input type="text" v-model="phone" placeholder="전화번호를 입력하세요" />
          </div>
          <button @click="findId" class="action-button">아이디 찾기</button>
        </div>
  
        <!-- 비밀번호 찾기 -->
        <div v-else>
          <div class="input-group">
            <label>이메일</label>
            <input type="email" v-model="email" placeholder="이메일을 입력하세요" />
          </div>
          <div class="input-group">
            <label>이름</label>
            <input type="text" v-model="name" placeholder="이름을 입력하세요" />
          </div>
          <div class="input-group">
            <label>전화번호</label>
            <input type="text" v-model="phone" placeholder="전화번호를 입력하세요" />
          </div>
          <button @click="findPassword" class="action-button">비밀번호 재설정</button>
          <p v-if="passwordError" class="error-message">일치하는 회원 정보가 없습니다.</p>
        </div>
      </div>
  
      <!-- 로그인 및 회원가입 링크 -->
      <div class="links">
        <router-link to="/login">로그인</router-link> | 
        <router-link to="/signup">회원가입</router-link>
      </div>
  
      <!-- 모달창 -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content">
          <p>{{ modalMessage }}</p>
          <button @click="closeModal" class="modal-button">{{ modalButtonText }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'IdPasswordRecovery',
    data() {
      return {
        isIdRecovery: true,
        name: '',
        phone: '',
        email: '',
        showModal: false,
        modalMessage: '',
        modalButtonText: '',
        passwordError: false
      }
    },
    methods: {
      selectTab(tab) {
        this.isIdRecovery = (tab === 'id')
        this.clearFields()
      },
      findId() {
        // 예시: 아이디 찾기 성공 시 모달창 표시
        this.modalMessage = "회원님의 아이디는 'example@example.com'입니다."
        this.modalButtonText = "확인"
        this.showModal = true
      },
      findPassword() {
        // 예시: 비밀번호 재설정 시 성공/실패 메시지
        if (this.email && this.name && this.phone) {
          this.modalMessage = "비밀번호 재설정 메일을 발송했습니다."
          this.modalButtonText = "로그인 화면으로"
          this.showModal = true
        } else {
          this.passwordError = true
        }
      },
      closeModal() {
        this.showModal = false
        if (!this.isIdRecovery) this.$router.push('/login')
      },
      clearFields() {
        this.name = ''
        this.phone = ''
        this.email = ''
        this.passwordError = false
      }
    }
  }
  </script>
  
  <style scoped>
  .recovery-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }
  
  .logo {
    width: 50%;
    margin-bottom: 1rem;
  }
  
  .recovery-box {
    width: 300px;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .tabs span {
    cursor: pointer;
    font-weight: bold;
    padding: 0.5rem 1rem;
    color: #ccc;
  }
  
  .tabs .active {
    color: black;
    border-bottom: 2px solid black;
  }
  
  .input-group {
    margin-bottom: 1rem;
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
  
  .action-button {
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
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    width: 80%;
    max-width: 300px;
  }
  
  .modal-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  