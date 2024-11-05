<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <!-- 로고 -->
    <div class="logo">
      <router-link to="/">
        <img src="../assets/image/logo.png" alt="logo" class="logo-image" />
      </router-link>
    </div>

    <!-- 메뉴 항목 -->
    <div class="nav-center">
      <router-link to="/live" class="nav-item">라이브</router-link>
      <router-link to="/schedule" class="nav-item">편성표</router-link>
      <router-link to="/wishlist" class="nav-item">찜</router-link>
      
      <!-- 검색창 -->
      <input 
        type="text" 
        placeholder="검색어 입력" 
        class="search-input" 
        v-model="searchQuery" 
        @keyup.enter="handleSearch" 
      />
      <button @click="handleSearch" class="search-button">검색</button>
    </div>

    <!-- 로그인 또는 프로필 아이콘 -->
    <div class="nav-actions">
      <div
        v-if="isLoggedIn"
        class="profile-container"
        @mouseenter="showDropdown"
        @mouseleave="hideDropdown"
      >
        <img :src="userProfileImage" alt="User Profile" class="profile-img" />
        <!-- 드롭다운 메뉴 -->
        <div
          v-if="dropdownVisible"
          class="dropdown-menu"
          @mouseenter="showDropdown"
          @mouseleave="hideDropdown"
        >
          <div class="profile-info">
            <img :src="userProfileImage" alt="User Profile" class="profile-thumbnail" />
            <span class="username">{{ userName }}</span>
          </div>
          <router-link to="/mypage" class="dropdown-item">마이페이지</router-link>
          <button @click="logout" class="dropdown-item">로그아웃</button>
        </div>
      </div>
      <router-link v-else to="/login" class="login-button">로그인</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false,
      userName: '사용자 이름',
      userProfileImage: 'https://via.placeholder.com/120',
      searchQuery: '',
      dropdownVisible: false
    };
  },
  methods: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.dropdownVisible = false;
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery } });
      }
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  position: relative;
  z-index: 2;
}

.logo {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo-image {
  width: 100px; 
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-item {
  margin: 0 1rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 0.5rem;
  width: 200px;
}

.search-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.nav-actions {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: var(--secondary-color);
}

.profile-container {
  position: relative;
  display: inline-block;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* 프로필 바로 아래에 붙여서 표시 */
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 160px;
  text-align: center;
  z-index: 3;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.profile-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.username {
  font-weight: bold;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: var(--primary-color);
  color: white;
}
</style>