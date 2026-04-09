# ChatGPT 中文博客

## 📝 添加新文章（超级简单！）

### 新流程（推荐） ⭐
 
只需 2 步：

1. **创建 Markdown 文件**
   ```bash
   docs/guides/chatgpt/你的文章.md
   ```

2. **在 `docs/.vitepress/utils/routes.ts` 添加配置**
   ```typescript
   export const chatgptGuides: RouteItem[] = [
     // 添加你的文章 👇
     { 
       url: '/guides/chatgpt/你的文章', 
       title: '文章标题', 
       changefreq: 'weekly', 
       priority: 0.8 
     },
   ]
   ```

✅ **完成！** 侧边栏和 sitemap 会自动更新。

📖 详细教程：查看 [如何添加新文章.md](./如何添加新文章.md)

### 旧流程（已废弃）

~~1. 加 MD~~  
~~2. 在 docs/config.js 中添加目录~~  
~~3. 在 docs/.vitepress/utils/sitemap.ts 添加sitemap~~

**新系统优势：**
- 只需在 1 个地方配置（而不是 2 个文件、4 个地方）
- 自动更新侧边栏和所有 sitemap
- 避免配置不一致的问题

## 🚀 开发命令

```bash
# 开发模式
npm run docs:dev

# 构建
npm run docs:build

# 预览
npm run docs:preview

# 启动服务器
npm run server
```

## 📚 项目结构

```
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts              # VitePress 配置
│   │   └── utils/
│   │       ├── routes.ts          # ⭐ 中心化路由配置
│   │       ├── sitemap.ts         # Sitemap 生成器
│   │       └── README.md          # 详细文档
│   ├── guides/                    # 指南文章
│   ├── blog/                      # 博客文章
│   └── public/                    # 静态资源
├── 如何添加新文章.md              # 快速参考
└── 路由系统更新说明.md            # 更新说明
```

## 🎯 特性

- ✅ 中心化路由管理
- ✅ 自动生成侧边栏
- ✅ 自动生成 sitemap（XML、TXT、HTML）
- ✅ SEO 优化
- ✅ 百度统计 & Google Analytics
- ✅ 响应式设计

## 📖 相关文档

- [如何添加新文章](./如何添加新文章.md) - 快速参考指南
- [路由系统更新说明](./路由系统更新说明.md) - 了解新系统的改进

- [详细使用文档](./docs/.vitepress/utils/README.md) - 高级用法和常见问题

---
**最后更新时间**: 2025-11-11
