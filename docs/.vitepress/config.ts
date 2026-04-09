import { defineConfig } from 'vitepress'
import { generateSitemaps } from './utils/sitemap'
import { generateSidebarConfig } from './utils/routes'
import { submitToIndexNow } from './utils/indexnow'
import { getAllRoutes } from './utils/routes'

export default defineConfig({
  title: 'ChatGPT中文版',
  description: '更好用的中文AI助手',
  
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
        hm.src = "https://hm.baidu.com/hm.js?0eed9ae0e6d2a83e431d3111fb3220a0";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
    ],
    // Google Analytics
    /* [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JLRMT84H63' }
    ], */
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
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'ChatGPT介绍', link: '/chatgpt/' },
      { text: 'ChatGPT使用指南', link: '/guides/' }
    ],

    // 侧边栏 - 从中心化配置自动生成
    sidebar: generateSidebarConfig(),

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo' }
    ],
    footer: {
      message: 'Powered by ChatGPT中文版',
      copyright: 'Copyright © 2025 ChatGPT中文版'
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
        const hostname = process.env.INDEXNOW_HOST || 'chatgpt-china.com'
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