<template>
  <div class="home">
    <BlogHomeNavbar />
    <!-- 首屏部分 -->
    <div class="hero-section">
      <div class="smoke-background"></div>
      <div class="content">
        <h1 class="main-title">{{ title }}</h1>
        <h5 class="title">{{ displayText }}<span class="cursor">|</span></h5>
        <p class="subtitle">{{ subtitle }}</p>
      </div>
      <!-- 滚动指示器 -->
      <div class="scroll-down" @click="handleScroll">
        <span class="arrow"></span>
      </div>
    </div>
    <ArticleList :articles="articles"/>
    <BlogHomeFooter :footer-text="footer"/>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogHomeNavbar from '@/components/navbar/BlogHomeNavbar.vue'
import ArticleList from '@/components/article/ArticleList.vue'
import BlogHomeFooter from '@/components/footer/BlogHomeFooter.vue'
import { getHomeSentences } from '@/api/home/homeData'
interface HomeData {
  sentences: string[];
  title: string;
  subtitle: string;
  footer: string;
}
//默认输出
const defaultSentences = [
  "想你、想你、像我",
  "Together, We Can Achieve More",
  "Success Starts with Self-Belief",
  "Every Day is a New Opportunity",
  "Turn Your Dreams into Plans",
  "拥抱变化，拥抱成长"
]
// 响应式状态
const articles = ref<any[]>([])
const sentences = ref<string[]>(defaultSentences)
const displayText = ref('')
const title = ref('(T▽T)世界上最遥远的距离就是断网')
const footer = ref('ljBlog. All Rights Reserved.')
const subtitle = ref('დ 每个人都有属于自己的一片森林,迷失的人迷失了,相逢的人会再相逢 დ')
let currentTextIndex = 0

// 工具函数
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

// 打字效果
const typeText = async (text: string): Promise<void> => {
  try {
    for (let char of text) {
      displayText.value += char
      await sleep(260)
    }
    await sleep(1500)
    
    while (displayText.value) {
      displayText.value = displayText.value.slice(0, -1)
      await sleep(80)
    }
    await sleep(500)
  } catch (error) {
    console.error('打字效果执行错误:', error)
  }
}

// 开始打字效果
const startTyping = async (): Promise<void> => {
  if (!sentences.value?.length) {
    console.warn('没有可显示的句子')
    return
  }

  try {
    while (true) {
      const currentSentence = sentences.value[currentTextIndex]
      if (!currentSentence) {
        console.warn(`无法获取索引 ${currentTextIndex} 的句子`)
        break
      }
      await typeText(currentSentence)
      currentTextIndex = (currentTextIndex + 1) % sentences.value.length
    }
  } catch (error) {
    console.error('打字循环执行错误:', error)
  }
}
// 平滑滚动
const handleScroll = (): void => {
  const articlesSection = document.querySelector('.articles-section')
  articlesSection?.scrollIntoView({ behavior: 'smooth' })
}
// 初始化数据
const initializeData = async (): Promise<void> => {
  try {
    const response = await getHomeSentences()
    
    if (response?.code === 200 && response.data) {
      const { sentences: sentencesData, title: titleData, footer: footerData, subtitle: subtitleData } = response.data as HomeData
      if (Array.isArray(sentencesData) && sentencesData.length > 0) {
        sentences.value = sentencesData
        title.value = titleData
        footer.value = footerData
        subtitle.value = subtitleData
      } else {
        console.warn('获取到的句子数组为空，使用默认句子')
        // 保持使用默认句子
      }
    } else {
      console.error('API 响应格式不正确，使用默认句子')
      // 保持使用默认句子
    }
    // 无论是否成功获取数据，都开始打字效果
    startTyping()
  } catch (error) {
    console.error('初始化数据失败，使用默认句子:', error)
    // 使用默认句子并开始打字效果
    startTyping()
  }
}
// 生命周期钩子
onMounted(initializeData)
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

.wave-transition {
  position: relative;
  height: 150px;
  z-index: 2;
  margin-top: -150px;
}

.wave-transition svg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.articles-section {
  position: relative;
  background-color: #ffffff;
  padding: 60px 20px;
  z-index: 2;
}

.articles-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.article-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.article-image {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-icon {
  width: 100px;
  height: 100px;
}

.article-content {
  padding: 20px;
}

.article-content h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.article-desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 0.8rem;
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
  
  .articles-container {
    grid-template-columns: 1fr;
  }
  
  .wave-transition {
    height: 100px;
    margin-top: -100px;
  }
  
  .article-card {
    margin: 0 10px;
  }
}
</style>