<template>
  <div class="home-content">
    <div class="home-background" aria-hidden="true">
      <span class="home-bubble bubble-1"></span>
      <span class="home-bubble bubble-2"></span>
      <span class="home-bubble bubble-3"></span>
    </div>

    <section class="hero">
      <div class="hero-card">
        <h1>ChatGPT中文版 · 探索全方位 AI 能力</h1>
        <p class="description">立即体验 ChatGPT 最新镜像站，让 AI 对话和智能创作为您的工作和生活带来革新。</p>
        <a href="https://chat.lify.vip" class="cta-button">立即使用</a>
      </div>
    </section>

    <section class="features">
      <div class="feature-row" v-for="(feature, index) in features" :key="index">
        <template v-if="index % 2 === 0">
          <div class="feature-content">
            <h2 v-html="feature.title"></h2>
            <ul>
              <li v-for="(item, i) in feature.items" :key="i" v-html="item"></li>
            </ul>
          </div>
          <div class="feature-image">
            <img :src="feature.image" :alt="feature.title" />
          </div>
        </template>
        <template v-else>
          <div class="feature-image">
            <img :src="feature.image" :alt="feature.title" />
          </div>
          <div class="feature-content">
            <h2 v-html="feature.title"></h2>
            <ul>
              <li v-for="(item, i) in feature.items" :key="i" v-html="item"></li>
            </ul>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const features = [
  {
    title: '💬 ChatGPT 对话',
    items: [
      '🌐 支持 ChatGPT 全系列模型 4.0、4o、4omini、o1、o1 Pro',
      '🔄 各模型灵活切换，持续更新最新 ChatGPT 模型'
    ],
    image: '/images/ai-chat.png'
  },
  {
    title: '📝 AI写作',
    items: [
      '✨ AI小红书、教学教案、学术论文、脚本生成、标书编写',
      '✍️ AI润色、扩写、缩写、阅读理解、语法校正'
    ],
    image: '/images/ai-writing.png'
  },
  {
    title: '🎨 AI绘画',
    items: [
      '🖼️ 内置Midjourney、Dalle绘画模型，一键实现指令绘图',
      '🎨 支持上下文多轮修改出图'
    ],
    image: '/images/ai-painting.png'
  },
  {
    title: '📊 AIPPT',
    items: [
      '📝 输入标题，AI自动生成大纲、内容和素材',
      '📈 支持根据上传的资料生成对应的PPT'
    ],
    image: '/images/ai-ppt.png'
  }
]

onMounted(() => {
  if (typeof window !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.feature-row').forEach(section => {
      observer.observe(section)
    })
  }
})
</script>

<style scoped>
.home-content {
  position: relative;
  padding: 6rem 0 8rem;
  max-width: 100%;
  overflow: hidden;
}

.home-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 15% 20%, rgba(166, 233, 248, 0.4), transparent 55%),
    radial-gradient(circle at 85% 15%, rgba(255, 210, 236, 0.38), transparent 60%),
    radial-gradient(circle at 45% 85%, rgba(214, 248, 189, 0.38), transparent 60%);
  opacity: 0.95;
}

.home-bubble {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
  opacity: 0.55;
  animation: floatSoft 16s ease-in-out infinite;
}

.home-bubble.bubble-1 {
  width: 360px;
  height: 360px;
  top: -140px;
  left: -120px;
}

.home-bubble.bubble-2 {
  width: 240px;
  height: 240px;
  top: 22%;
  right: 18%;
  background: radial-gradient(circle at 35% 35%, rgba(192, 230, 255, 0.75), rgba(192, 230, 255, 0));
  animation-delay: -4s;
}

.home-bubble.bubble-3 {
  width: 300px;
  height: 300px;
  bottom: -160px;
  left: 28%;
  background: radial-gradient(circle at 35% 35%, rgba(255, 221, 236, 0.65), rgba(255, 221, 236, 0));
  animation-delay: -8s;
}

@keyframes floatSoft {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(0, -16px, 0) scale(1.04);
  }
}

.hero,
.features {
  position: relative;
  z-index: 1;
}

.hero {
  display: flex;
  justify-content: center;
  padding: 0 1.5rem;
}

.hero-card {
  width: 100%;
  max-width: 920px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 36px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 40px 90px -60px rgba(86, 148, 171, 0.9);
  padding: 4rem 3.5rem;
  text-align: center;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.hero-card h1 {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(120deg, var(--vp-c-brand) 0%, rgba(247, 185, 213, 0.85) 95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-card .description {
  font-size: 1.25rem;
  max-width: 720px;
  margin: 0 auto;
  color: var(--vp-c-text-2);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2.6rem;
  margin-top: 2.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1b4965;
  background: linear-gradient(135deg, #a6e3e9 0%, #cbf1f5 100%);
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 22px 38px -24px rgba(86, 148, 171, 0.9);
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 26px 42px -24px rgba(86, 148, 171, 0.95);
}

.features {
  margin-top: 5rem;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.feature-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3rem;
  padding: 3rem;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 40px 90px -60px rgba(86, 148, 171, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transform: translateY(18px);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
  overflow: hidden;
  position: relative;
}

.feature-row::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(247, 185, 213, 0.25), transparent 65%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-row.visible {
  transform: translateY(0);
  opacity: 1;
}

.feature-row:hover::after {
  opacity: 1;
}

.feature-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.feature-content h2 {
  font-size: 1.9rem;
  margin: 0;
  background: linear-gradient(120deg, var(--vp-c-brand) 0%, rgba(247, 185, 213, 0.85) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-content li {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  padding-left: 1.6rem;
  position: relative;
}

.feature-content li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.65rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--vp-c-brand) 0%, rgba(247, 185, 213, 0.8) 100%);
  box-shadow: 0 0 0 6px rgba(166, 227, 233, 0.2);
}

.feature-image {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(166, 227, 233, 0.35) 0%, rgba(255, 221, 236, 0.35) 100%);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 28px 60px -48px rgba(86, 148, 171, 0.85);
}

.feature-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.feature-image:hover img {
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .hero-card {
    padding: 3.5rem 3rem;
  }

  .feature-row {
    padding: 2.5rem;
    gap: 2.5rem;
  }
}

@media (max-width: 860px) {
  .feature-row {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .feature-content {
    align-items: center;
  }

  .feature-content li {
    padding-left: 0;
  }

  .feature-content li::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .home-content {
    padding: 4.5rem 0 6rem;
  }

  .hero-card {
    padding: 3rem 2.4rem;
    border-radius: 28px;
  }

  .hero-card h1 {
    font-size: 2.4rem;
  }

  .hero-card .description {
    font-size: 1.1rem;
  }

  .cta-button {
    width: 100%;
    max-width: 280px;
  }

  .feature-row {
    padding: 2.2rem;
  }
}

@media (max-width: 520px) {
  .hero-card {
    padding: 2.4rem 1.75rem;
  }

  .hero-card h1 {
    font-size: 2.1rem;
  }

  .features {
    gap: 2.4rem;
  }

  .feature-row {
    padding: 1.8rem;
  }

  .feature-content h2 {
    font-size: 1.6rem;
  }
}

:global(.dark) .home-background {
  background: radial-gradient(circle at 20% 25%, rgba(91, 190, 202, 0.28), transparent 55%),
    radial-gradient(circle at 80% 20%, rgba(186, 161, 255, 0.22), transparent 60%),
    radial-gradient(circle at 40% 80%, rgba(123, 215, 182, 0.26), transparent 65%);
  opacity: 0.9;
}

:global(.dark) .home-bubble {
  opacity: 0.38;
  background: radial-gradient(circle at 35% 35%, rgba(226, 232, 240, 0.35), rgba(226, 232, 240, 0));
}

:global(.dark) .hero-card {
  background: rgba(17, 25, 40, 0.74);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 40px 90px -60px rgba(15, 23, 42, 0.8);
}

:global(.dark) .hero-card .description {
  color: var(--vp-c-text-2);
}

:global(.dark) .cta-button {
  color: #0f2335;
  background: linear-gradient(135deg, rgba(96, 212, 208, 0.9) 0%, rgba(148, 239, 233, 0.85) 100%);
  box-shadow: 0 24px 42px -24px rgba(96, 212, 208, 0.9);
}

:global(.dark) .cta-button:hover {
  box-shadow: 0 26px 46px -24px rgba(96, 212, 208, 1);
}

:global(.dark) .feature-row {
  background: rgba(17, 25, 40, 0.72);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 40px 90px -60px rgba(15, 23, 42, 0.75);
}

:global(.dark) .feature-row::after {
  background: radial-gradient(circle at 80% 20%, rgba(130, 225, 198, 0.28), transparent 65%);
}

:global(.dark) .feature-content li {
  color: var(--vp-c-text-2);
}

:global(.dark) .feature-content li::before {
  box-shadow: 0 0 0 6px rgba(96, 212, 208, 0.2);
}

:global(.dark) .feature-image {
  background: linear-gradient(135deg, rgba(96, 212, 208, 0.25) 0%, rgba(186, 161, 255, 0.2) 100%);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 28px 60px -48px rgba(15, 23, 42, 0.8);
}
</style>