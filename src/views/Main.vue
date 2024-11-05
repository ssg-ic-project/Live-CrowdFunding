<!-- src/views/Main.vue -->
<template>
  <div class="main-content">
    <!-- 슬라이드 배너 -->
    <BannerSlider />



    <!-- 카테고리 리스트 -->
    <CategoryList @selectCategory="handleCategoryClick" />

    <!-- 3x3 그리드 레이아웃 -->
    <div class="grid-layout">
      <!-- 라이브 상품 -->
      <div class="live-product">
        <h2>라이브 상품</h2>
        <div class="product-list">
          <ProductItem
            v-for="(product, index) in liveProducts"
            :key="index"
            :product="product"
          />
        </div>
      </div>

      <!-- AI 추천 상품 -->
      <div class="recommended-product">
        <h2>AI 추천 상품</h2>
        <div class="product-list">
          <ProductItem
            v-for="(product, index) in recommendedProducts"
            :key="index"
            :product="product"
          />
        </div>
      </div>

      <!-- 랭킹 -->
      <div class="ranking">
        <h2>랭킹</h2>
        <div class="product-list">
          <ProductItem
            v-for="(product, index) in rankingProducts"
            :key="index"
            :product="product"
            :rank="index + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerSlider from '../components/BannerSlider.vue'
import CategoryList from '../components/CategoryList.vue'
import ProductItem from '../components/ProductItem.vue'

export default {
  name: 'Main',
  components: {
    BannerSlider,
    CategoryList,
    ProductItem
  },
  data() {
    return {
      searchQuery: '',
      liveProducts: [
        { id: 1, image: 'https://via.placeholder.com/150', achievement: 75, endDate: '2024-12-31', name: '라이브 상품1', company: '회사A', price: 100000, isLive: true },
        { id: 2, image: 'https://via.placeholder.com/150', achievement: 60, endDate: '2024-11-30', name: '라이브 상품2', company: '회사B', price: 200000, isLive: true },
        { id: 3, image: 'https://via.placeholder.com/150', achievement: 80, endDate: '2024-10-20', name: '라이브 상품3', company: '회사C', price: 250000, isLive: true },
        { id: 4, image: 'https://via.placeholder.com/150', achievement: 55, endDate: '2024-09-10', name: '라이브 상품4', company: '회사D', price: 270000, isLive: true },
        { id: 5, image: 'https://via.placeholder.com/150', achievement: 90, endDate: '2024-12-15', name: '라이브 상품5', company: '회사E', price: 350000, isLive: true },
        { id: 6, image: 'https://via.placeholder.com/150', achievement: 45, endDate: '2024-12-25', name: '라이브 상품6', company: '회사F', price: 180000, isLive: true }
      ],
      recommendedProducts: [
        { id: 7, image: 'https://via.placeholder.com/150', achievement: 40, endDate: '2024-10-15', name: 'AI 추천 상품1', company: '회사G', price: 300000 },
        { id: 8, image: 'https://via.placeholder.com/150', achievement: 90, endDate: '2024-11-01', name: 'AI 추천 상품2', company: '회사H', price: 150000 },
        { id: 9, image: 'https://via.placeholder.com/150', achievement: 50, endDate: '2024-12-10', name: 'AI 추천 상품3', company: '회사I', price: 180000 },
        { id: 10, image: 'https://via.placeholder.com/150', achievement: 65, endDate: '2024-12-05', name: 'AI 추천 상품4', company: '회사J', price: 220000 },
        { id: 11, image: 'https://via.placeholder.com/150', achievement: 70, endDate: '2024-11-28', name: 'AI 추천 상품5', company: '회사K', price: 290000 },
        { id: 12, image: 'https://via.placeholder.com/150', achievement: 85, endDate: '2024-10-30', name: 'AI 추천 상품6', company: '회사L', price: 330000 },
        { id: 13, image: 'https://via.placeholder.com/150', achievement: 95, endDate: '2024-12-22', name: 'AI 추천 상품7', company: '회사M', price: 400000 },
        { id: 14, image: 'https://via.placeholder.com/150', achievement: 78, endDate: '2024-11-17', name: 'AI 추천 상품8', company: '회사N', price: 250000 }
      ],
      rankingProducts: [
        { id: 15, image: 'https://via.placeholder.com/150', achievement: 85, endDate: '2024-12-20', name: '랭킹 상품1', company: '회사O', price: 120000 },
        { id: 16, image: 'https://via.placeholder.com/150', achievement: 70, endDate: '2024-10-10', name: '랭킹 상품2', company: '회사P', price: 110000 },
        { id: 17, image: 'https://via.placeholder.com/150', achievement: 95, endDate: '2024-11-25', name: '랭킹 상품3', company: '회사Q', price: 130000 },
        { id: 18, image: 'https://via.placeholder.com/150', achievement: 55, endDate: '2024-12-01', name: '랭킹 상품4', company: '회사R', price: 90000 },
        { id: 19, image: 'https://via.placeholder.com/150', achievement: 100, endDate: '2024-10-05', name: '랭킹 상품5', company: '회사S', price: 140000 },
        { id: 20, image: 'https://via.placeholder.com/150', achievement: 80, endDate: '2024-11-12', name: '랭킹 상품6', company: '회사T', price: 150000 }
      ]
    }
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: 'SearchResults', query: { q: this.searchQuery } })
      }
    },
    handleCategoryClick(categoryId) {
      this.$router.push({ name: 'Category', params: { categoryId } })
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
}

.search-bar {
  display: flex;
  margin-top: 1rem;
}

.search-bar input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.search-bar button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.live-product {
  grid-column: 1 / span 2;
  grid-row: 1;
}

.recommended-product {
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
}

.ranking {
  grid-column: 3;
  grid-row: 1 / span 3;
  border-left: 2px solid #ddd;
  padding-left: 1rem;
}

/* 반응형 설정 */
@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .live-product,
  .recommended-product,
  .ranking {
    grid-column: auto;
    grid-row: auto;
  }

  .ranking {
    border-left: none;
    padding-left: 0;
    border-top: 2px solid #ddd;
    padding-top: 1rem;
  }
}
</style>
