<template>
    <div>
      <h1>상품 상세 페이지</h1>
      <p>상품 ID: {{ productId }}</p>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
  
  export default {
    name: 'ProductDetail',
    setup() {
      const route = useRoute()
      const productId = route.params.productId
      return { productId }
    }
  }
  </script>
  