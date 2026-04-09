import { createContentLoader } from 'vitepress'

interface Post {
  url: string
  title: string
  date: string
  excerpt?: string
  tags?: string[]
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/**/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(page => page.url !== '/blog/') // 排除索引页面
      .map(page => ({
        url: page.url,
        title: page.frontmatter.title || page.title,
        date: formatDate(page.frontmatter.date),
        excerpt: page.frontmatter.description || '',
        tags: page.frontmatter.tags || []
      }))
      .sort((a, b) => b.date.localeCompare(a.date)) // 按日期降序排序
  }
})

function formatDate(raw: string): string {
  const date = new Date(raw)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 