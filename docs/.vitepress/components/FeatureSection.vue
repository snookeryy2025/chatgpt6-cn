<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const features = [
  {
    icon: '🧠',
    title: '什么是ChatGPT？',
    items: [
      { icon: '🔍', text: '由OpenAI开发的大型语言模型，基于GPT（生成式预训练转换器）架构' },
      { icon: '💡', text: '通过海量文本数据训练，能够理解和生成类人的自然语言' },
      { icon: '🌐', text: '支持多种语言，可进行流畅的跨语言交流' }
    ],
    image: 'https://images.unsplash.com/photo-1675557010061-315772f6efef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '⚙️',
    title: 'ChatGPT模型系列',
    items: [
      { icon: '🔥', text: 'GPT-5：OpenAI最先进的模型，拥有更强的推理能力和知识广度' },
      { icon: '🚀', text: 'GPT-4：平衡了性能与效率的主流模型，适合日常使用' },
      { icon: '✨', text: 'GPT-4o：优化的多模态模型，支持图像理解和更自然的交互' },
      { icon: '🌟', text: 'Claude、Gemini等：其他公司开发的竞争模型' }
    ],
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '💼',
    title: '商业应用场景',
    items: [
      { icon: '📊', text: '客户服务：智能客服、问答系统、个性化推荐' },
      { icon: '📝', text: '内容创作：文案撰写、创意构思、内容优化' },
      { icon: '💻', text: '编程辅助：代码生成、调试、技术文档编写' },
      { icon: '📈', text: '数据分析：数据解读、报告生成、趋势预测' }
    ],
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa430'
  },
  {
    icon: '🎓',
    title: '教育与学习',
    items: [
      { icon: '📚', text: '学习助手：解答问题、概念解释、知识扩展' },
      { icon: '✏️', text: '写作辅导：论文指导、语法纠正、文章结构建议' },
      { icon: '🧩', text: '个性化教育：根据学习进度提供定制化学习材料' },
      { icon: '🌍', text: '语言学习：语言练习、翻译、文化背景解释' }
    ],
    image: 'https://images.unsplash.com/photo-1678483789107-0029c61fdcca'
  },
  {
    icon: '🛠️',
    title: '技术原理',
    items: [
      { icon: '🧮', text: '基于Transformer架构，采用自注意力机制处理序列数据' },
      { icon: '📊', text: '通过预训练和微调两阶段训练方法提升性能' },
      { icon: '🔄', text: '使用RLHF（基于人类反馈的强化学习）优化输出质量' },
      { icon: '🧩', text: '参数规模庞大，GPT-4拥有数万亿参数' }
    ],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'
  },
  {
    icon: '🚀',
    title: 'ChatGPT Plus',
    items: [
      { icon: '⚡', text: '优先访问：高峰时段优先使用权，减少等待时间' },
      { icon: '🔍', text: '最新模型：第一时间体验最新GPT模型' },
      { icon: '🔌', text: '插件生态：访问第三方插件，扩展功能边界' },
      { icon: '💰', text: '合理定价：每月20美元的订阅费用' }
    ],
    image: 'https://images.unsplash.com/photo-1679403766682-3b31efa571a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    icon: '🔮',
    title: '未来发展',
    items: [
      { icon: '🧠', text: '多模态能力：理解和生成文本、图像、音频等多种形式内容' },
      { icon: '🌐', text: '知识更新：实时获取最新信息，减少知识截止问题' },
      { icon: '🤝', text: '个性化交互：根据用户习惯和偏好调整交互方式' },
      { icon: '🛡️', text: '安全与伦理：更强的安全保障和伦理框架' }
    ],
    image: 'https://images.unsplash.com/photo-1620266757065-5814239881fd'
  },
  {
    icon: '⚠️',
    title: '使用限制与挑战',
    items: [
      { icon: '📅', text: '知识截止：模型知识有时间限制，无法获取最新信息' },
      { icon: '❓', text: '幻觉问题：可能生成看似合理但实际不正确的内容' },
      { icon: '🔒', text: '隐私考虑：用户输入的数据可能用于模型训练' },
      { icon: '🌍', text: '地区限制：某些地区可能无法直接访问服务' }
    ],
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec'
  },
  {
    icon: '🔗',
    title: 'API集成',
    items: [
      { icon: '💻', text: '开发接口：通过API将ChatGPT能力集成到自己的应用' },
      { icon: '💰', text: '按量计费：根据使用量付费的灵活计费模式' },
      { icon: '🛠️', text: '自定义选项：调整温度、最大长度等参数' },
      { icon: '🔒', text: '企业级安全：提供企业级数据保护和隐私控制' }
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  }
]

let observer = null

onMounted(() => {
  if (typeof window !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    })

    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card)
    })
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="features-container">
    <div class="features-background">
      <div class="background-veil"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
    </div>

    <div class="features-content">
      <div class="features-header">
        <h1 class="main-heading">
          <span class="gradient-text">GPT 中文版</span>
          <span class="separator">|</span>
          <span class="gradient-text">OpenAI 官网</span>
          <span class="separator">|</span>
          <span class="gradient-text">ChatGPT 镜像站</span>
        </h1>
        <p class="sub-heading">
          探索ChatGPT的强大功能、技术原理与应用场景，了解这一改变世界的AI技术如何为您服务
        </p>
      </div>

      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
          :class="{ 'reverse': index % 2 !== 0 }"
        >
          <div class="feature-text">
            <div class="feature-title">
              <span class="title-icon">{{ feature.icon }}</span>
              <h2>{{ feature.title }}</h2>
            </div>
            <ul class="feature-list">
              <li v-for="(item, i) in feature.items" :key="i">
                <span class="item-icon">{{ item.icon }}</span>
                <span class="item-text">{{ item.text }}</span>
              </li>
            </ul>
          </div>
          <div class="feature-visual">
            <div class="image-wrapper">
              <img :src="feature.image" :alt="feature.title" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <div class="external-resources">
        <h2 class="resources-title">相关资源</h2>
        <div class="resources-grid">
          <a href="https://chat.openai.com" target="_blank" rel="noopener" class="resource-link">
            <img src="/icons/chatgpt-site.png" alt="ChatGPT官网" />
            <span>ChatGPT官网</span>
          </a>
          <a href="https://openai.com" target="_blank" rel="noopener" class="resource-link">
            <span>OpenAI Docs</span>
          </a>
          <a href="https://platform.openai.com/docs" target="_blank" rel="noopener" class="resource-link">
            <span>API文档</span>
          </a>
          <a href="https://help.openai.com" target="_blank" rel="noopener" class="resource-link">
            <span>帮助中心</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(155deg, #f8fafc 0%, #fff6f9 100%);
  padding: 5rem 0 8rem;
}

.features-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.features-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 25% 15%, rgba(166, 233, 248, 0.4), transparent 50%),
    radial-gradient(circle at 75% 35%, rgba(255, 210, 236, 0.35), transparent 55%),
    radial-gradient(circle at 45% 80%, rgba(214, 248, 189, 0.4), transparent 50%);
}

.background-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 100%);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: floatGlow 20s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 5%;
  background: radial-gradient(circle, rgba(166, 233, 248, 0.6), transparent 70%);
}

.glow-2 {
  width: 350px;
  height: 350px;
  top: 45%;
  right: 10%;
  background: radial-gradient(circle, rgba(255, 210, 236, 0.5), transparent 70%);
  animation-delay: -7s;
}

.glow-3 {
  width: 450px;
  height: 450px;
  bottom: 10%;
  left: 30%;
  background: radial-gradient(circle, rgba(214, 248, 189, 0.55), transparent 70%);
  animation-delay: -14s;
}

@keyframes floatGlow {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  33% {
    transform: translate3d(30px, -30px, 0) scale(1.1);
  }
  66% {
    transform: translate3d(-30px, 30px, 0) scale(0.9);
  }
}

.features-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.features-header {
  text-align: center;
  margin-bottom: 5rem;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-heading {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.gradient-text {
  background: linear-gradient(120deg, #5ec5b4 0%, #8acdea 50%, #f7b9d5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: shimmer 8s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    background-position: 0% center;
  }
  50% {
    background-position: 200% center;
  }
}

.separator {
  color: #cbd5e1;
  font-weight: 300;
}

.sub-heading {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #4c6a77;
  max-width: 700px;
  margin: 0 auto;
}

.features-grid {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.feature-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 28px;
  box-shadow: 0 24px 48px -32px rgba(86, 148, 171, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 32px 64px -32px rgba(86, 148, 171, 0.75);
}

.feature-card.reverse {
  direction: rtl;
}

.feature-card.reverse > * {
  direction: ltr;
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.feature-title h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(120deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
}

.item-icon {
  font-size: 1.25rem;
  line-height: 1.7;
  flex-shrink: 0;
}

.item-text {
  flex: 1;
}

.feature-visual {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px -24px rgba(86, 148, 171, 0.7);
  transition: all 0.4s ease;
}

.image-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(166, 233, 248, 0.2), rgba(255, 210, 236, 0.2));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.feature-card:hover .image-wrapper::before {
  opacity: 1;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.feature-card:hover .image-wrapper img {
  transform: scale(1.05);
}

.external-resources {
  margin-top: 6rem;
  text-align: center;
}

.resources-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  background: linear-gradient(120deg, #5ec5b4 0%, #8acdea 50%, #f7b9d5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.resources-grid {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.resource-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  color: #1b4965;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 12px 24px -16px rgba(86, 148, 171, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.resource-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -16px rgba(86, 148, 171, 0.85);
  background: rgba(255, 255, 255, 0.95);
}

.resource-link img {
  width: 24px;
  height: 24px;
}

@media (max-width: 1024px) {
  .features-content {
    padding: 0 1.5rem;
  }

  .feature-card {
    padding: 2.5rem;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .features-container {
    padding: 4rem 0 6rem;
  }

  .main-heading {
    font-size: 2rem;
  }

  .sub-heading {
    font-size: 1.1rem;
  }

  .features-header {
    margin-bottom: 3.5rem;
  }

  .features-grid {
    gap: 2.5rem;
  }

  .feature-card {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .feature-card.reverse {
    direction: ltr;
  }

  .feature-title h2 {
    font-size: 1.75rem;
  }

  .feature-list li {
    font-size: 1rem;
  }

  .external-resources {
    margin-top: 4rem;
  }

  .resources-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .features-content {
    padding: 0 1rem;
  }

  .main-heading {
    font-size: 1.75rem;
    gap: 0.5rem;
  }

  .feature-card {
    padding: 1.75rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .feature-title h2 {
    font-size: 1.5rem;
  }

  .resources-grid {
    flex-direction: column;
    align-items: center;
  }

  .resource-link {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

/* 暗黑模式 */
:global(.dark) .features-container {
  background: linear-gradient(155deg, #0f172a 0%, #1f2a44 100%);
}

:global(.dark) .features-background::before {
  background: radial-gradient(circle at 25% 20%, rgba(91, 190, 202, 0.3), transparent 50%),
    radial-gradient(circle at 75% 40%, rgba(186, 161, 255, 0.25), transparent 55%),
    radial-gradient(circle at 45% 75%, rgba(123, 215, 182, 0.28), transparent 50%);
  opacity: 0.7;
}

:global(.dark) .background-veil {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.5) 0%, rgba(15, 23, 42, 0.2) 100%);
}

:global(.dark) .glow {
  opacity: 0.35;
}

:global(.dark) .sub-heading {
  color: #cbd5e1;
}

:global(.dark) .feature-card {
  background: rgba(17, 25, 40, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 24px 48px -32px rgba(15, 23, 42, 0.7);
}

:global(.dark) .feature-card:hover {
  box-shadow: 0 32px 64px -32px rgba(15, 23, 42, 0.85);
}

:global(.dark) .feature-list li {
  color: #cbd5e1;
}

:global(.dark) .image-wrapper {
  box-shadow: 0 20px 40px -24px rgba(15, 23, 42, 0.8);
}

:global(.dark) .resource-link {
  background: rgba(17, 25, 40, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #cbd5e1;
  box-shadow: 0 12px 24px -16px rgba(15, 23, 42, 0.7);
}

:global(.dark) .resource-link:hover {
  background: rgba(17, 25, 40, 0.85);
  box-shadow: 0 16px 32px -16px rgba(15, 23, 42, 0.85);
}
</style>

