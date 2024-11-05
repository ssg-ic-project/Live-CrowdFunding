<!-- src/components/CategoryList.vue -->
<template>
  <div class="category-list">
    <h2>카테고리</h2>
    <ul>
      <li
        v-for="category in categories"
        :key="category"
        class="category-item"
        @click="selectCategory(category)"
      >
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [
        '생활 가전',
        '주방가전',
        '스마트 가전',
        'DIY',
        '엔터테이먼트',
        '웨어러블',
        '주변 기기'
      ]
    };
  },
  methods: {
    selectCategory(category) {
      this.$router.push({ name: 'SearchResults', query: { q: category } });
    }
  }
}
</script>

<style scoped>
.category-list {
  text-align: center;
  margin: 2rem auto;
}

ul {
  list-style: none;
  padding: 0;
}

.category-item {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-item:hover {
  background-color: var(--primary-color);
  color: white;
}
</style>
