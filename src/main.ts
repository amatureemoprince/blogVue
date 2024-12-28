import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'  // 添加这行
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  // 添加这行
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)  
app.use(router)
app.use(createPinia())
app.mount('#app')