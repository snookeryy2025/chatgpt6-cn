import { defineConfig } from 'vitepress'
import { submitToIndexNow } from './utils/indexnow'
import { generateSidebarConfig, getAllRoutes } from './utils/routes'
import { generateSitemaps } from './utils/sitemap'

export default defineConfig({
  title: 'ChatGPT 官方指南',
  description: '国内可用的 ChatGPT 镜像网站推荐，支持 GPT-5.1、GPT-5、GPT-4o、o1 等高级模型，无需科学上网，完全免费使用。附镜像站与官方版的区别对比、各模型能力分析和高级使用技巧。',
  
  // 外观配置 - 禁用深色模式，固定使用白天模式
  appearance: false,

  head: [
    // Referrer Policy - 允许跨域发送完整来源信息，便于目标网站统计
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    // 百度统计
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?7e243cf8d1f6b6375ec6ffc67b0ef882";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JLRMT84H63');`
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icons/openai.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/icons/openai.png' }],
    ['meta', { name: 'msvalidate.01', content: 'AB8C3F03302BE0DD53689617956200C5' }],
  ],

  themeConfig: {
    siteTitle: "ChatGPT 国内使用指南",
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'Blog', link: '/blog/' },
     /*  { text: 'ChatGPT介绍', link: '/chatgpt/' }, */
      { text: 'ChatGPT使用指南', link: '/guides/' }
    ],

    // 侧边栏 - 从中心化配置自动生成
    sidebar: generateSidebarConfig(),

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    footer: {
      message: 'Powered by ChatGPT中文版',
      copyright: 'Copyright © 2025-2026 ChatGPT中文版'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

  },

  buildEnd: async ({ outDir }) => {
    // 生成 sitemap
    await generateSitemaps(outDir)
    
    // 可选：自动提交到 IndexNow（通过环境变量控制）
    if (process.env.INDEXNOW_AUTO_SUBMIT === 'true') {
      try {
        const hostname = process.env.INDEXNOW_HOST || 'chatgpt6-cn.com'
        const host = hostname.replace(/^https?:\/\//, '').replace(/\/$/, '')
        
        // 从路由配置获取所有 URL
        const routes = getAllRoutes()
        const urls = routes.map(route => {
          const url = route.url.startsWith('/') ? route.url : '/' + route.url
          return `https://${host}${url}`
        })
        
        console.log('\n📤 Auto-submitting URLs to IndexNow...')
        const { resolve } = await import('path')
        const publicDir = resolve(outDir, '../../public')
        await submitToIndexNow(urls, {
          host,
          publicDir
        })
      } catch (error) {
        console.error('❌ IndexNow auto-submit failed:', error)
        // 不阻止构建流程
      }
    }
  }
}) 