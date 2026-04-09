<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const titleNumber = ref(0)
const baseItems = [
  'ChatGPT 对话', 
  'AI 高效写作', 
  '自动生成PPT', 
  'AI 随心绘画', 
  'AI 帮你读文件',
  '专业级翻译',
  '400+ AI 助手',
  'AI 学术插件'
]

// 创建三倍长度的数组，用于无限滚动
const titles = computed(() => [...baseItems, ...baseItems, ...baseItems])
const startIndex = computed(() => baseItems.length)

// 当前显示的索引
const currentIndex = computed(() => {
  const total = baseItems.length
  const current = titleNumber.value % total
  return current + startIndex.value
})

let intervalId

const updateTitle = () => {
  titleNumber.value++
  // 当滚动到第二组的末尾时，悄悄重置到第二组的开头
  if (titleNumber.value >= baseItems.length * 2) {
    setTimeout(() => {
      titleNumber.value = baseItems.length
    }, 0)
  }
}

onMounted(() => {
  titleNumber.value = baseItems.length // 从中间组开始
  intervalId = setInterval(updateTitle, 1200)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="hero-container">
    <div class="hero-background">
      <div class="background-veil"></div>
      <div class="bubble bubble-1"></div>
      <div class="bubble bubble-2"></div>
      <div class="bubble bubble-3"></div>
    </div>
    <div class="hero-content">
      <div class="hero-card">
        <div class="title-container">
          <h2 class="main-title">
            <span class="highlight">ChatGPT 中文版将获得</span>
            <div class="animated-text-container">
              <div class="animated-text">
                <div 
                  v-for="(title, index) in titles" 
                  :key="`${title}-${index}`"
                  class="text-item"
                  :style="{
                    transform: `translateY(${(index - currentIndex) * 100}%)`,
                    opacity: Math.abs(index - currentIndex) < 1 ? 1 : 0,
                    transition: `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`
                  }"
                >
                  <span class="gradient-text">{{ title }}</span>
                </div>
              </div>
            </div>
          </h2>

          <p class="description">
            为中文用户打造的AI对话助手，让您的AI对话体验更自然、更流畅。
            告别繁琐的使用方法，享受全球顶级AI带来的效率提升。
          </p>
        </div>

        <div class="cta-buttons">
          <a href="https://xsimplechat.com" class="primary-button">
            ChatGPT 中文版 →
          </a>
          <a href="https://aihuoya.com" class="secondary-button">
            ChatGPT 镜像站 →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, #f0f9ff 0%, #fff6f9 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 1.5rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 30%, rgba(166, 233, 248, 0.45), transparent 55%),
    radial-gradient(circle at 80% 15%, rgba(255, 210, 236, 0.4), transparent 60%),
    radial-gradient(circle at 30% 85%, rgba(214, 248, 189, 0.45), transparent 60%);
}

.background-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.2) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.bubble {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
  opacity: 0.6;
  animation: floatBubble 18s ease-in-out infinite;
}

.bubble-1 {
  width: 320px;
  height: 320px;
  top: -140px;
  left: -90px;
}

.bubble-2 {
  width: 220px;
  height: 220px;
  top: 18%;
  right: 14%;
  background: radial-gradient(circle at 35% 35%, rgba(192, 230, 255, 0.75), rgba(192, 230, 255, 0));
  animation-delay: -5s;
}

.bubble-3 {
  width: 280px;
  height: 280px;
  bottom: -150px;
  left: 26%;
  background: radial-gradient(circle at 35% 35%, rgba(255, 221, 236, 0.65), rgba(255, 221, 236, 0));
  animation-delay: -10s;
}

@keyframes floatBubble {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, -18px, 0) scale(1.05);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: center;
}

.hero-card {
  width: 100%;
  max-width: 920px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 32px;
  padding: 4rem 3.5rem;
  box-shadow: 0 32px 60px -40px rgba(86, 148, 171, 0.65);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.title-container {
  text-align: center;
  max-width: 40rem;
}

.main-title {
  font-size: 3.25rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  color: #1d3557;
}

.highlight {
  color: #64b5a0;
  font-weight: 600;
}

.animated-text-container {
  height: 4rem;
  position: relative;
  margin-top: 1rem;
  overflow: hidden;
}

.animated-text {
  position: relative;
  width: 100%;
  height: 100%;
}

.text-item {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform, opacity;
}

.gradient-text {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(120deg, #5ec5b4 0%, #8acdea 45%, #f7b9d5 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: shimmer 8s ease-in-out infinite;
}

@keyframes shimmer {
  from {
    background-position: 0% center;
  }
  to {
    background-position: 200% center;
  }
}

.description {
  font-size: 1.2rem;
  line-height: 1.75;
  color: #4c6a77;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.4rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.15rem;
  text-decoration: none;
  background: linear-gradient(135deg, #a6e3e9 0%, #cbf1f5 100%);
  color: #1b4965;
  border: none;
  box-shadow: 0 18px 32px -22px rgba(86, 148, 171, 0.95);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.secondary-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.4rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.15rem;
  text-decoration: none;
  background: linear-gradient(135deg, #ffe5f3 0%, #f8d3e0 100%);
  color: #8a4d76;
  border: none;
  box-shadow: 0 18px 32px -22px rgba(197, 134, 166, 0.7);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 36px -24px rgba(86, 148, 171, 0.95);
}

.secondary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 36px -24px rgba(197, 134, 166, 0.85);
}

.primary-button:active,
.secondary-button:active {
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .hero-container {
    padding: 5rem 1.5rem;
  }

  .hero-card {
    padding: 3.5rem 3rem;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: 4rem 1.25rem;
  }

  .hero-card {
    padding: 2.8rem 2.25rem;
    border-radius: 24px;
    gap: 2.5rem;
  }

  .gradient-text {
    font-size: 2.2rem;
  }

  .animated-text-container {
    height: 3.2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-card {
    padding: 2.4rem 1.75rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.05rem;
  }
}

:global(.dark) .hero-container {
  background: linear-gradient(155deg, #0f172a 0%, #1f2a44 100%);
}

:global(.dark) .background-veil {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.25) 100%);
}

:global(.dark) .hero-background::before {
  background: radial-gradient(circle at 25% 25%, rgba(91, 190, 202, 0.35), transparent 55%),
    radial-gradient(circle at 75% 20%, rgba(186, 161, 255, 0.28), transparent 60%),
    radial-gradient(circle at 35% 80%, rgba(123, 215, 182, 0.32), transparent 60%);
  opacity: 0.75;
}

:global(.dark) .bubble {
  opacity: 0.4;
}

:global(.dark) .hero-card {
  background: rgba(17, 25, 40, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 32px 60px -40px rgba(15, 23, 42, 0.75);
}

:global(.dark) .main-title {
  color: #e2e8f0;
}

:global(.dark) .highlight {
  color: #82e1c6;
}

:global(.dark) .description {
  color: #cbd5f5;
}

:global(.dark) .primary-button {
  background: linear-gradient(135deg, rgba(96, 212, 208, 0.85) 0%, rgba(148, 239, 233, 0.85) 100%);
  color: #0f2335;
  box-shadow: 0 20px 34px -22px rgba(96, 212, 208, 0.95);
}

:global(.dark) .secondary-button {
  background: linear-gradient(135deg, rgba(232, 170, 221, 0.85) 0%, rgba(255, 205, 225, 0.85) 100%);
  color: #2a1f33;
  box-shadow: 0 20px 34px -22px rgba(232, 170, 221, 0.9);
}

:global(.dark) .primary-button:hover {
  box-shadow: 0 22px 38px -24px rgba(96, 212, 208, 1);
}

:global(.dark) .secondary-button:hover {
  box-shadow: 0 22px 38px -24px rgba(232, 170, 221, 0.95);
}
</style>