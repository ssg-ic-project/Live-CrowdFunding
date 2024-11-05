<!-- src/components/BannerSlider.vue -->
<template>
    <div class="banner-slider">
      <!-- 배너 이미지 목록 -->
      <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <img v-for="(banner, index) in banners" :key="index" :src="banner" alt="Banner Image" class="slide-image" />
      </div>
  
      <!-- 좌우 화살표 -->
      <button @click="prevSlide" class="arrow left-arrow">&lt;</button>
      <button @click="nextSlide" class="arrow right-arrow">&gt;</button>
  
      <!-- 배너 개수 표시 -->
      <div class="slide-indicator">
        {{ currentSlide + 1 }} / {{ banners.length }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BannerSlider',
    data() {
      return {
        banners: [
          'https://via.placeholder.com/800x300?text=Banner+1',
          'https://via.placeholder.com/800x300?text=Banner+2',
          'https://via.placeholder.com/800x300?text=Banner+3'
        ],
        currentSlide: 0
      };
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.banners.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.banners.length) % this.banners.length;
      }
    },
    mounted() {
      // 3초마다 슬라이드 전환
      setInterval(this.nextSlide, 3000);
    }
  }
  </script>
  
  <style scoped>
  .banner-slider {
    position: relative;
    width: 800px;
    height: 300px;
    overflow: hidden;
    margin: auto;
  }
  
  .slides {
    display: flex;
    transition: transform 0.5s ease; /* 슬라이드 애니메이션 효과 */
  }
  
  .slide-image {
    width: 800px;
    height: 300px;
    object-fit: cover;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .left-arrow {
    left: 0;
  }
  
  .right-arrow {
    right: 0;
  }
  
  .slide-indicator {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  </style>
  