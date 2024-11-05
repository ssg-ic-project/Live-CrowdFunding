<!-- src/views/SearchResults.vue -->
<template>
  <div class="main-content" ref="mainContent" @scroll.passive="handleScroll">
    <!-- 검색 결과 제목 -->
    <h2 class="search-title">
      "{{ searchQuery }}" {{ isCategory ? '카테고리' : '검색결과' }}
    </h2>

    <!-- 라이브 상품 리스트 -->
    <div class="live-products" v-if="liveProducts.length">
      <h3>라이브 상품</h3>
      <div :style="productListStyle" class="product-list">
        <ProductItem
          v-for="(product, index) in liveProducts"
          :key="index"
          :product="product"
        />
      </div>
    </div>

    <!-- 가로줄 구분선 -->
    <hr class="divider" v-if="liveProducts.length && generalProducts.length" />

    <!-- 일반 상품 리스트 -->
    <div class="general-products" v-if="generalProducts.length">
      <h3>일반 상품</h3>
      <div :style="productListStyle" class="product-list">
        <ProductItem
          v-for="(product, index) in generalProducts"
          :key="index"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue';

export default {
  name: 'SearchResults',
  components: {
    ProductItem
  },
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  computed: {
    isCategory() {
      const categories = [
        '생활 가전',
        '주방가전',
        '스마트 가전',
        'DIY',
        '엔터테이먼트',
        '웨어러블',
        '주변 기기'
      ];
      return categories.includes(this.searchQuery);
    },
    productListStyle() {
      const minCardWidth = 200; // 카드 최소 가로 길이
      const maxCardWidth = 1; // 최대 너비
      return {
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, ${maxCardWidth}fr))`
      };
    }
  },
  data() {
    return {
      liveProducts: this.generateDummyData(true, 15),
      generalProducts: this.generateDummyData(false, 30),
      mainContentWidth: 1200,
      loading: false
    };
  },
  methods: {
    generateDummyData(isLive, count) {
      const products = [];
      for (let i = 1; i <= count; i++) {
        products.push({
          id: i,
          image: 'https://via.placeholder.com/150',
          achievement: Math.floor(Math.random() * 100),
          endDate: `2024-${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0')}`,
          name: `${isLive ? '라이브 상품' : '일반 상품'} ${i}`,
          company: `회사 ${String.fromCharCode(65 + (i % 26))}`,
          price: Math.floor(Math.random() * 500000) + 50000,
          isLive: isLive
        });
      }
      return products;
    },
    loadMoreData() {
      this.loading = true;
      setTimeout(() => {
        this.liveProducts.push(...this.generateDummyData(true, 10));
        this.generalProducts.push(...this.generateDummyData(false, 10));
        this.loading = false;
      }, 1000);
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (bottomOfWindow && !this.loading) {
        this.loadMoreData();
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100vw;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.search-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
}

.live-products,
.general-products {
  width: 100%;
  margin-bottom: 1rem;
}

.product-list {
  display: grid;
  gap: 1rem;
}

.divider {
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin: 2rem 0;
}

/* 반응형 설정 */
@media (max-width: 992px) {
  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
