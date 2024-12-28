<template>
  <div class="home">
    <BlogHomeNavbar />
    <!-- 首屏部分 -->
    <div class="hero-section">
      <div class="smoke-background"></div>
      <div class="content">
        <h1 class="main-title">{{ homeStore.title }}</h1>
        <h5 class="title">{{ displayText }}<span class="cursor">|</span></h5>
        <p class="subtitle">{{ homeStore.subtitle }}</p>
      </div>
      <!-- 滚动指示器 -->
      <div class="scroll-down" @click="handleScroll">
        <span class="arrow"></span>
      </div>
    </div>
    <!-- 移除 :articles 属性 -->
    <ArticleList />
    <BlogHomeFooter :footer-text="homeStore.footer" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BlogHomeNavbar from '@/components/navbar/BlogHomeNavbar.vue';
import ArticleList from '@/components/article/ArticleList.vue';
import BlogHomeFooter from '@/components/footer/BlogHomeFooter.vue';
import { useHomeStore } from '@/store/home';

const homeStore = useHomeStore(); // 创建 store 实例

// 响应式状态
const displayText = ref('');
let currentTextIndex = 0;

// 工具函数
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// 打字效果
const typeText = async (text: string): Promise<void> => {
  try {
    for (let char of text) {
      displayText.value += char;
      await sleep(230);
    }
    await sleep(1500);
    while (displayText.value) {
      displayText.value = displayText.value.slice(0, -1);
      await sleep(80);
    }
    await sleep(500);
  } catch (error) {
    console.error('打字效果执行错误:', error);
  }
};

// 开始打字效果
const startTyping = async (): Promise<void> => {
  if (!homeStore.sentences.length) {
    console.warn('没有可显示的句子');
    return;
  }

  try {
    while (true) {
      const currentSentence = homeStore.sentences[currentTextIndex];
      if (!currentSentence) {
        console.warn(`无法获取索引 ${currentTextIndex} 的句子`);
        break;
      }
      await typeText(currentSentence);
      currentTextIndex = (currentTextIndex + 1) % homeStore.sentences.length;
    }
  } catch (error) {
    console.error('打字循环执行错误:', error);
  }
};

// 平滑滚动
const handleScroll = (): void => {
  const articlesSection = document.querySelector('.articles-section');
  articlesSection?.scrollIntoView({ behavior: 'smooth' });
};

// 生命周期钩子
onMounted(() => {
  console.log("主页的onMounted被调用")
  startTyping(); 
});
</script>

<style scoped>
@font-face {
  font-family: "WonderLife";
  src: url(../assets/fonts/WonderLife.ttf) format("truetype");
  font-weight: normal;
  font-style: normal;
}

.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

.smoke-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/smoke.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  color: white;
  text-align: center;
  z-index: 1;
}

.main-title {
  font-family: WonderLife, Arial, sans-serif;
  font-size: 4rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.title {
  font-family: WonderLife, Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-family: HK;
  font-size: 2rem;
  margin-top: 9rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.cursor {
  font-family: Helvetica, sans-serif;
  display: inline-block;
  animation: blink 1s infinite;
  font-weight: 100;
  margin-left: 5px;
  font-size: 2rem;
}

.scroll-down {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 3;
}

.arrow {
  display: block;
  width: 20px;
  height: 20px;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(-20px) rotate(45deg);
  }
  60% {
    transform: translateY(-10px) rotate(45deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .title {
    font-size: 1.2rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
}
</style>