<template>
  <footer class="blog-footer">
    <div class="footer-section">
      <div class="social-links">
        <a href="https://github.com/amatureemoprince" title="GitHub">
          <i class="fab fa-github"></i> GitHub
        </a>
        
        <a @click="showWechatQR" href="javascript:void(0)" title="微信">
          <i class="fab fa-weixin"></i> 微信
        </a>
        <a @click="copyEmail" href="javascript:void(0)" title="点击复制邮箱">
          <i class="fas fa-envelope"></i> QQ邮箱
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copyright">© {{ currentYear }} {{ footerText }}</p>
    </div>
    <div v-if="isQRVisible" class="qr-modal" @click="hideWechatQR">
      <div class="qr-container">
        <img :src="wechatQRCode" alt="微信二维码" />
        <p>谢谢你的主动，扫码添加为我的好友</p>
      </div>
    </div>
    <div v-if="showCopyTip" class="copy-tip">
      邮箱已复制到剪贴板！
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import wechatQRCode from '@/assets/images/weixin.jpg'
const currentYear = new Date().getFullYear()
const isQRVisible = ref(false)
const showCopyTip = ref(false)
const EMAIL = '2069057986@.qq.com'
const props = defineProps<{
  footerText: string
}>()
const showWechatQR = () => {
  isQRVisible.value = true
}

const hideWechatQR = () => {
  isQRVisible.value = false
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(EMAIL)
    showCopyTip.value = true
    setTimeout(() => {
      showCopyTip.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
.blog-footer {
  background-color: #000000;
  color: #ffffff;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0 1rem;
  align-items: center;
}

.footer-section, .social-links {
  flex-direction: row !important;
  padding: 0.3rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.footer-section .social-links a {
  color: #ffffff;
  font-size: 1.1rem;
  opacity: 0.8;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
}

.footer-section h3 {
  color: #ffffff;
  margin-bottom: 0.3rem;
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.9;
}

.footer-text {
  opacity: 0.8;
  font-size: 0.85rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.2rem;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  font-size: 0.85rem;
}

.footer-links a:hover {
  opacity: 1;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.social-links a {
  color: #ffffff;
  font-size: 1.1rem;
  opacity: 0.8;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

/* 设置图标颜色 */
.social-links i {
  color: #ffffff;
  font-size: 1.2em;
}

.social-links a:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  margin-top: 0.4rem;
  padding-top: 0.3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.copyright {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* QR Modal 样式 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.qr-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.qr-container img {
  max-width: 200px;
  height: auto;
}

.qr-container p {
  color: #333;
  margin-top: 10px;
}

/* 复制提示样式 */
.copy-tip {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.3rem;
  }
  
  .social-links {
    align-items: center;
  }
  
  .footer-section {
    padding: 0.2rem;
  }
}
</style>