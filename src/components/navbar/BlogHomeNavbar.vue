<template>
  <nav class="navbar" :class="{ 'navbar-hidden': isHidden, 'navbar-scrolled': isScrolled }">
    <div class="nav-brand">
      <router-link to="/" class="logo">Wonder Life</router-link>
    </div>
    <div class="nav-links">
      <router-link to="/" class="nav-item">首页</router-link>
      <router-link to="/blog" class="nav-item">檔案</router-link>
      <router-link to="/about" class="nav-item">关于</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isHidden = ref(false)
const isScrolled = ref(false)
let lastScrollTop = 0

const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

  // 控制滚动状态
  isScrolled.value = currentScrollTop > 0

  // 控制导航栏隐藏
  if (currentScrollTop > 80) {
    isHidden.value = currentScrollTop > lastScrollTop
  } else {
    isHidden.value = false
  }

  lastScrollTop = currentScrollTop
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
}

.navbar-scrolled {
  background-color: rgba(245, 245, 245, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-hidden {
  transform: translateY(-100%);
}

.nav-brand {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  font-family: 'WonderLife', Arial, sans-serif;
  transition: color 0.3s ease;
}

.navbar-scrolled .logo {
  color: #333; /* 滚动时改变logo颜色 */
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  font-family: WonderLife, Arial, sans-serif;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
  opacity: 0.7;
  position: relative;
}

.navbar-scrolled .nav-item {
  opacity: 1;
  color: #333; /* 滚动时改变导航项颜色 */
}

/* 添加悬停时的下划线动画效果 */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #6f9eee;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item:hover {
  opacity: 1;
}

/* 当前活动路由的样式 */
.nav-item.router-link-active {
  color: #6f9eee;
  opacity: 1;
}

.nav-item.router-link-active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 20px;
  }

  .nav-links {
    gap: 15px;
  }

  .nav-item {
    font-size: 1rem;
  }
}
</style>