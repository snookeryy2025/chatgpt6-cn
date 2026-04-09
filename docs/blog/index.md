---
title: ChatGPT中文版
description: ChatGPT中文版博客，分享AI使用技巧、写作指南和最新动态
---

<script setup>
import { data as posts } from './posts.data.ts'
</script>

<style>
.blog-container {
  margin: 2rem 0;
}

.post-card {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  text-align: left;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.post-title {
  margin: 0;
  text-align: left;
}

.post-title a {
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.post-title a:hover {
  color: var(--vp-c-brand);
  text-decoration: none !important;
}

.post-meta {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  letter-spacing: normal;
}

.tags-container {
  display: inline-flex;
  gap: 0.3rem;
  align-items: center;
  flex-wrap: wrap;
  letter-spacing: normal;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.15em 0.5em;
  border-radius: 3px;
  font-size: 0.85em;
  background: var(--vp-c-brand-dimm-1);
  color: var(--vp-c-brand);
  white-space: nowrap;
  line-height: 1.4;
  border: 1px solid var(--vp-c-brand-dimm);
  letter-spacing: normal;
  font-weight: 500;
}

.tag:hover {
  background: var(--vp-c-brand-dimm-2);
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

.date-container {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  white-space: nowrap;
}

.tags-label {
  margin-left: 0.5rem;
}

.post-excerpt {
  margin: 0.8rem 0 0 0;
  text-align: left;
  color: var(--vp-c-text-1);
}
</style>

# 📚 ChatGPT 博客文章

<div class="blog-container">
  <div v-for="post in posts" :key="post.url" class="post-card">
    <h2 class="post-title">
      <a :href="post.url">{{ post.title }}</a>
    </h2>
    <div class="post-meta">
      <span class="date-container">📅 {{ post.date }}</span>
      <span class="tags-container">🏷️ <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span></span>
    </div>
    <p class="post-excerpt">{{ post.excerpt }}</p>
  </div>
</div> 