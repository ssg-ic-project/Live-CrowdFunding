<!-- src/views/Category.vue -->
<template>
    <div>
      <h1 class="text-center">카테고리 페이지</h1>
      <p>카테고리 ID: {{ categoryId }}</p>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
  
  export default {
    name: 'Category',
    setup() {
      const route = useRoute()
      const categoryId = route.params.categoryId
      return { categoryId }
    }
  }
  </script>
  
  <style scoped>
  h1 {
    color: var(--primary-color);
  }
  </style>
  