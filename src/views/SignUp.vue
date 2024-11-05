<!-- src/views/SignUp.vue -->
<template>
    <div class="signup-container">
      <div class="signup-box">
        <img src="../assets/image/logo.png" alt="Logo" class="logo" />
  
        <!-- 회원 유형 선택 -->
        <div v-if="step === 'selectType'">
          <h2>회원 유형 선택</h2>
          <button @click="setUserType('user')" class="signup-type-button">일반회원</button>
          <button @click="setUserType('maker')" class="signup-type-button">판매자(메이커)</button>
        </div>
  
        <!-- 기본 정보 입력 (일반회원/메이커 공통) -->
        <div v-else-if="step === 'basicForm'">
          <h2>{{ userType === 'user' ? '일반 회원가입' : '메이커 회원가입' }}</h2>
  
          <!-- 소셜 간편가입 (일반회원 전용) -->
          <div class="social-signup" v-if="userType === 'user'">
            <h3>간편가입</h3>
            <button class="social-login kakao-login">카카오로 간편 가입</button>
            <button class="social-login naver-login">네이버로 간편 가입</button>
          </div>
  
          <!-- 이메일 간편가입 폼 -->
          <h3>이메일 간편 가입</h3>
          <div class="input-group">
            <label for="email">이메일</label>
            <input type="text" id="email" v-model="email" placeholder="이메일을 입력하세요" />
            <button @click="sendEmailVerification">인증코드 보내기</button>
          </div>
          <div class="input-group">
            <label for="code">인증코드</label>
            <input type="text" id="code" v-model="emailCode" placeholder="인증코드를 입력하세요" />
          </div>
          <div class="input-group">
            <label for="nickname">닉네임</label>
            <input type="text" id="nickname" v-model="nickname" placeholder="닉네임을 입력하세요" />
          </div>
          <div class="input-group">
            <label for="phone">전화번호</label>
            <input type="text" id="phone" v-model="phone" placeholder="전화번호를 입력하세요" />
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" />
          </div>
          <div class="input-group">
            <label for="confirm-password">비밀번호 확인</label>
            <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="비밀번호를 다시 입력하세요" />
          </div>
  
          <!-- 주소 입력 -->
          <div class="input-group address-group">
            <label for="postcode">우편번호</label>
            <input type="text" id="postcode" v-model="postcode" readonly />
            <button @click="openAddressAPI">주소 찾기</button>
          </div>
          <div class="input-group">
            <label for="address">주소</label>
            <input type="text" id="address" v-model="address" readonly />
          </div>
          <div class="input-group">
            <label for="detailAddress">상세주소</label>
            <input type="text" id="detailAddress" v-model="detailAddress" placeholder="상세주소를 입력하세요" />
          </div>
  
          <!-- 사업자 번호 추가 필드 (메이커 전용) -->
          <div class="input-group" v-if="userType === 'maker'">
            <label for="business-number">사업자 번호</label>
            <input type="text" id="business-number" v-model="businessNumber" placeholder="사업자 번호를 입력하세요" />
            <button @click="verifyBusinessNumber">사업자 확인</button>
          </div>
  
          <!-- 개인정보 수집 동의 -->
          <div class="input-group">
            <label>
              <input type="checkbox" v-model="agreeToTerms" />
              개인정보 수집 및 이용에 동의합니다.
            </label>
          </div>
  
          <button @click="nextStep" class="signup-button">이메일로 시작하기</button>
        </div>
  
        <!-- 추가 정보 입력 (일반회원 전용) -->
        <div v-else-if="step === 'additionalInfo' && userType === 'user'">
          <h2>추가 정보 입력</h2>
          <div class="input-group">
            <label for="birthdate">생년월일</label>
            <input type="text" id="birthdate" v-model="birthdate" placeholder="YYYYMMDD 형식으로 입력하세요" maxlength="8" />
          </div>
          <div class="input-group">
            <label>성별</label>
            <div class="gender-checkboxes">
              <label>
                <input type="checkbox" :checked="gender === 'male'" @change="selectGender('male')" />
                남성
              </label>
              <label>
                <input type="checkbox" :checked="gender === 'female'" @change="selectGender('female')" />
                여성
              </label>
            </div>
          </div>
          <div class="input-group">
            <label>관심 분야</label>
            <div class="interest-categories">
              <div
                v-for="category in categories"
                :key="category"
                :class="['category-item', { selected: interest.includes(category) }]"
                @click="toggleInterest(category)"
              >
                {{ category }}
              </div>
            </div>
          </div>
          <button @click="completeRegistration" class="signup-button">가입완료</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        step: 'selectType', // 현재 단계
        userType: null, // 회원 유형: 일반회원 or 메이커
        email: '',
        emailCode: '',
        nickname: '',
        phone: '',
        password: '',
        confirmPassword: '',
        postcode: '',
        address: '',
        detailAddress: '',
        businessNumber: '',
        agreeToTerms: false,
        birthdate: '',
        gender: '', // 성별 (남성: 'male', 여성: 'female')
        interest: [],
        categories: ['생활 가전', '주방가전', '스마트 가전', 'DIY', '엔터테인먼트', '웨어러블', '주변 기기']
      };
    },
    methods: {
      setUserType(type) {
        this.userType = type;
        this.step = 'basicForm';
      },
      nextStep() {
        if (this.userType === 'user') {
          this.step = 'additionalInfo';
        } else {
          this.completeRegistration();
        }
      },
      sendEmailVerification() {
        // 이메일 인증 코드 전송
      },
      openAddressAPI() {
        // 다음 주소 API 호출
        // 예시 코드
        /* eslint-disable */
        new daum.Postcode({
          oncomplete: data => {
            this.postcode = data.zonecode;
            this.address = data.address;
          }
        }).open();
        /* eslint-enable */
      },
      verifyBusinessNumber() {
        // 사업자 확인 API 호출
      },
      toggleInterest(category) {
        if (this.interest.includes(category)) {
          this.interest = this.interest.filter(item => item !== category);
        } else {
          this.interest.push(category);
        }
      },
      selectGender(selectedGender) {
        if (this.gender === selectedGender) {
          this.gender = '';
        } else {
          this.gender = selectedGender;
        }
      },
      completeRegistration() {
        // 회원가입 완료 처리 및 로그인 페이지로 이동
        alert('회원가입이 완료되었습니다.');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    background-color: #f5f5f5;
  }
  
  .signup-box {
    width: 400px;
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
  
  .input-group input,
  .input-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .address-group {
    display: flex;
    align-items: center;
  }
  
  .address-group input {
    flex: 1;
    margin-right: 0.5rem;
  }
  
  .signup-type-button,
  .signup-button {
    width: 100%;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
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
  
  .gender-checkboxes label {
    margin-right: 1rem;
  }
  
  .gender-checkboxes input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  
  .interest-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .category-item {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: 2px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
  }
  
  .category-item.selected {
    border-color: #007bff;
    background-color: #e6f0ff;
  }
  </style>
  