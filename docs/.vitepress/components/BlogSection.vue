<script setup lang="ts">
import { data as posts } from '../../blog/posts.data.ts'

// 获取前6篇文章用于首页展示
const featuredPosts = posts.slice(0, 6)

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const getCoverGradient = (index: number) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  ]
  return gradients[index % gradients.length]
}
</script>

<template>
  <section class="blog-section">
    <div class="blog-container">
      <!-- 区域标题 -->
      <header class="section-header">
        <span class="section-label">博客更新</span>
        <h2 class="section-title">最新文章</h2>
        <p class="section-desc">
          深入了解 ChatGPT 的使用技巧、创作指南和行业动态
        </p>
      </header>

      <!-- 文章网格 -->
      <div class="posts-grid">
        <article
          v-for="(post, index) in featuredPosts"
          :key="post.url"
          class="post-card"
        >
          <a :href="post.url" class="card-link">
            <!-- 封面区域 -->
            <div class="card-cover" :style="{ background: getCoverGradient(index) }">
              <div class="cover-overlay"></div>
              <div class="cover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
            </div>

            <!-- 内容区域 -->
            <div class="card-content">
              <div class="card-meta">
                <time class="post-date">{{ formatDate(post.date) }}</time>
                <div class="post-tags" v-if="post.tags?.length">
                  <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>

              <h3 class="post-title">{{ post.title }}</h3>

              <p class="post-excerpt">{{ post.excerpt || '探索更多内容，请阅读完整文章...' }}</p>

              <div class="card-footer">
                <span class="read-more">
                  阅读全文
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </article>
      </div>

      <!-- 查看更多 -->
      <div class="view-more">
        <a href="/blog/" class="btn-view-all">
          查看所有文章
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-section {
  position: relative;
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #030712 0%, #0f172a 50%, #1e293b 100%);
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 区域标题 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 999px;
  color: #a78bfa;
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
}

.section-desc {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* 文章网格 */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.post-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(139, 92, 246, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  height: 100%;
}

/* 封面 */
.card-cover {
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
}

.cover-icon {
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  color: #ffffff;
}

.cover-icon svg {
  width: 28px;
  height: 28px;
}

/* 内容 */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.post-date {
  font-size: 0.8125rem;
  color: #64748b;
}

.post-tags {
  display: flex;
  gap: 0.375rem;
}

.tag {
  padding: 0.125rem 0.5rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 4px;
  font-size: 0.6875rem;
  color: #a78bfa;
  font-weight: 500;
}

.post-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-excerpt {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #60a5fa;
  transition: all 0.2s ease;
}

.read-more svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.post-card:hover .read-more svg {
  transform: translateX(4px);
}

/* 查看更多 */
.view-more {
  text-align: center;
}

.btn-view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-view-all svg {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.btn-view-all:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-view-all:hover svg {
  transform: translateX(4px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-section {
    padding: 5rem 1.5rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card-cover {
    height: 120px;
  }

  .card-content {
    padding: 1.25rem;
  }
}
</style>
