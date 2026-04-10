<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const features = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>`,
    title: '智能对话',
    description: '流畅自然的多轮对话，理解上下文语境，提供精准的问答服务',
    tags: ['GPT-4', 'GPT-5']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
    </svg>`,
    title: '内容创作',
    description: '文章撰写、文案创意、营销内容，一键生成高质量文本',
    tags: ['写作助手', '营销']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>`,
    title: '图像生成',
    description: 'DALL-E 3 驱动的 AI 绘画，输入描述即可创作精美图片',
    tags: ['DALL-E', 'AI绘画']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
    </svg>`,
    title: '编程辅助',
    description: '代码生成、调试优化、技术方案咨询，提升开发效率',
    tags: ['Codex', '编程']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>`,
    title: '文档处理',
    description: 'PDF解析、文档总结、要点提取，快速把握核心内容',
    tags: ['文件解析', '摘要']
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
    </svg>`,
    title: '多语言翻译',
    description: '专业级翻译服务，支持100+语言，精准传达语义',
    tags: ['翻译', '多语言']
  }
]

let observer = null
const visibleCards = ref<Set<number>>(new Set())

onMounted(() => {
  if (typeof window !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.getAttribute('data-index'))
        if (entry.isIntersecting) {
          visibleCards.value.add(index)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    setTimeout(() => {
      document.querySelectorAll('.feature-card').forEach((card, i) => {
        card.setAttribute('data-index', String(i))
        observer.observe(card)
      })
    }, 100)
  }
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section class="features-section">
    <div class="section-bg">
      <div class="bg-gradient"></div>
    </div>

    <div class="features-container">
      <!-- 区域标题 -->
      <header class="section-header" :class="{ visible: true }">
        <span class="section-label">核心能力</span>
        <h2 class="section-title">为什么选择 ChatGPT 中文版</h2>
        <p class="section-desc">
          集成 OpenAI 最新模型，为中文用户打造的专业 AI 助手平台
        </p>
      </header>

      <!-- 功能卡片网格 -->
      <div class="features-grid">
        <article
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card"
          :class="{ visible: visibleCards.has(index) }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="card-icon" v-html="feature.icon"></div>
          <h3 class="card-title">{{ feature.title }}</h3>
          <p class="card-desc">{{ feature.description }}</p>
          <div class="card-tags">
            <span v-for="tag in feature.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="card-glow"></div>
        </article>
      </div>

      <!-- 底部行动区 -->
      <div class="cta-section">
        <div class="cta-content">
          <h3 class="cta-title">准备好开始探索了吗？</h3>
          <p class="cta-desc">访问我们的使用指南，了解如何充分利用 ChatGPT 的强大功能</p>
          <div class="cta-buttons">
            <a href="/guides/" class="btn btn-primary">
              查看使用指南
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <a href="https://lazymanchat.com" class="btn btn-secondary" target="_blank" rel="noopener">
              立即体验
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  position: relative;
  padding: 8rem 2rem;
  background: #030712;
  overflow: hidden;
}

.section-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
}

.features-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* 区域标题 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
}

.section-header.visible {
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-label {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 999px;
  color: #60a5fa;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.section-desc {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* 功能卡片网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 6rem;
}

.feature-card {
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-4px);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .card-glow {
  opacity: 1;
}

.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 14px;
  margin-bottom: 1.5rem;
  color: #60a5fa;
}

.card-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 0.75rem;
}

.card-desc {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #64748b;
  margin: 0 0 1.25rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.625rem;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 6px;
  font-size: 0.75rem;
  color: #60a5fa;
  font-weight: 500;
}

/* CTA 区域 */
.cta-section {
  position: relative;
  padding: 4rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 24px;
  text-align: center;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.75rem;
}

.cta-desc {
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn svg {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 响应式 */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 5rem 1.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .cta-section {
    padding: 2.5rem 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>
