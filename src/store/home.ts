// store/home.ts
import { defineStore } from 'pinia'; // 如果使用 Pinia
import { ref } from 'vue';
import { getHomeSentences } from '@/api/home/homeData';
import { onMounted } from 'vue'; 
// 定义 HomeData 接口
interface HomeData {
  sentences: string[];
  title: string;
  subtitle: string;
  footer: string;
}
// 默认句子
const defaultSentences: string[] = [
  "想你、想你、像我",
  "Together, We Can Achieve More",
  "Success Starts with Self-Belief",
  "Every Day is a New Opportunity",
  "Turn Your Dreams into Plans",
  "拥抱变化，拥抱成长"
];
// 创建 Home Store
export const useHomeStore = defineStore('home', () => {
  const sentences = ref<string[]>(defaultSentences); // 初始化为默认句子
  const title = ref<string>('(T▽T)世界上最遥远的距离就是断网');
  const subtitle = ref<string>('დ 每个人都有属于自己的一片森林,迷失的人迷失了,相逢的人会再相逢 დ');
  const footer = ref<string>('ljBlog. All Rights Reserved.');
  // 初始化数据
  const initializeData = async () => {
    try {
      const response = await getHomeSentences();
      // 检查 API 响应格式
      if (response.data) {
        const { sentences: sentencesData, title: titleData, footer: footerData, subtitle: subtitleData } = response.data as HomeData;
        // 更新状态
        sentences.value = Array.isArray(sentencesData) && sentencesData.length > 0 ? sentencesData : defaultSentences;
        title.value = titleData || title.value; // 如果 titleData 为空，保持原值
        footer.value = footerData || footer.value; // 如果 footerData 为空，保持原值
        subtitle.value = subtitleData || subtitle.value; // 如果 subtitleData 为空，保持原值
      } else {
        console.error('获取主页展示数据失败，展示默认数据');
      }
    } catch (error) {
      console.error('初始化数据失败，使用默认句子:', error);
    }
  };

  onMounted(() => {
    initializeData(); 
    setTimeout(() => {
        console.log(
            "经过homeStore赋值后的数据",
            {
                sentences: sentences.value, // 输出 sentences 的值
                title: title.value, // 输出 title 的值
                subtitle: subtitle.value, // 输出 subtitle 的值
                footer: footer.value // 输出 footer 的值
            }
        );
    }, 1000); // 等待 1 秒以确保数据已更新
  });
  return { sentences, title, subtitle, footer, initializeData };
});