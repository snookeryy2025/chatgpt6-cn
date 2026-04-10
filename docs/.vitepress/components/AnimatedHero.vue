<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isVisible = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  const rect = document.querySelector('.hero-container')?.getBoundingClientRect()
  if (rect) {
    mouseX.value = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    mouseY.value = ((e.clientY - rect.top) / rect.height - 0.5) * 20
  }
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  window.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section class="hero-container" :style="{ '--mouse-x': `${mouseX}px`, '--mouse-y': `${mouseY}px` }">
    <!-- 背景效果层 -->
    <div class="hero-bg">
      <!-- 网格背景 -->
      <div class="grid-bg"></div>
      <!-- 渐变光晕 -->
      <div class="glow-orb glow-1"></div>
      <div class="glow-orb glow-2"></div>
      <div class="glow-orb glow-3"></div>
      <!-- 粒子点缀 -->
      <div class="particles">
        <span v-for="i in 20" :key="i" class="particle" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }"></span>
      </div>
    </div>

    <!-- 主内容 -->
    <div class="hero-content" :class="{ visible: isVisible }">
      <!-- 标签 -->
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <span>GPT-5 & GPT-4o 支持</span>
      </div>

      <!-- 主标题 -->
      <h1 class="hero-title">
        <span class="title-line">探索 AI 的无限可能</span>
        <span class="title-accent">与 ChatGPT 对话</span>
      </h1>

      <!-- 副标题 -->
      <p class="hero-subtitle">
        告别繁琐，掌握最前沿的人工智能技术。<br />
        从对话交流到创意生成，让 AI 成为您工作和生活中的得力助手。
      </p>

      <!-- 统计数据 -->
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-value">400+</span>
          <span class="stat-label">AI 助手</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">秒级</span>
          <span class="stat-label">响应速度</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">24/7</span>
          <span class="stat-label">持续在线</span>
        </div>
      </div>

      <!-- CTA 按钮 -->
      <div class="hero-actions">
        <a href="https://xsimplechat.com" class="btn btn-primary" target="_blank" rel="noopener">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          立即开始使用
        </a>
        <a href="/guides/chatgpt-china-mirror" class="btn btn-secondary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          阅读使用指南
        </a>
      </div>

      <!-- 底部说明 -->
      <p class="hero-footer">
        无需翻墙 · 中文优化 · 免费体验
      </p>
    </div>

    <!-- 滚动提示 -->
    <div class="scroll-indicator" :class="{ visible: isVisible }">
      <span>向下滚动探索更多</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero-container {
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(165deg, #030712 0%, #0f172a 50%, #1e1b4b 100%);
  /* 移动端顶栏在文档流内，无需叠加导航高度 */
  padding: 6rem 2rem 6rem;
}

@media (min-width: 960px) {
  .hero-container {
    /* 桌面 fixed 顶栏：背景从视口顶开始，正文留在导航下方安全区 */
    padding-top: calc(var(--vp-nav-height) + 3.5rem);
    padding-bottom: 6rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* 背景效果 */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  animation: float 20s ease-in-out infinite;
}

.glow-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.5), transparent 70%);
}

.glow-2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  left: -100px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent 70%);
  animation-delay: -7s;
}

.glow-3 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(59, 130, 246, 0.6);
  border-radius: 50%;
  animation: particle-float 5s ease-in-out infinite;
}

@keyframes particle-float {
  0%, 100% { 
    opacity: 0.3;
    transform: translateY(0) scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: translateY(-30px) scale(1.2);
  }
}

/* 主内容 */
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 标签 */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 999px;
  color: #60a5fa;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
}

/* 主标题 */
.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.5rem;
  color: #ffffff;
}

.title-line {
  display: block;
  margin-bottom: 0.5rem;
}

.title-accent {
  display: block;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradient-shift 4s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

/* 副标题 */
.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.8;
  color: #94a3b8;
  margin: 0 0 3rem;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

/* 统计数据 */
.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #f1f5f9;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, transparent, rgba(148, 163, 184, 0.3), transparent);
}

/* CTA 按钮 */
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 底部说明 */
.hero-footer {
  font-size: 0.875rem;
  color: #475569;
  margin: 0;
}

/* 滚动提示 */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #475569;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.5s ease 1s;
}

.scroll-indicator.visible {
  opacity: 1;
}

.scroll-indicator svg {
  width: 20px;
  height: 20px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-container {
    padding: 6rem 1.5rem 4rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.25rem;
  }

  .stat-divider {
    width: 60px;
    height: 1px;
  }

  .stat-item {
    flex-direction: row;
    gap: 1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .scroll-indicator {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
