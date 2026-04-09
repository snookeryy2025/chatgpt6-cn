/**
 * 文件路径到 URL 的映射工具
 * 用于将 Git 变更的文件路径转换为对应的网站 URL
 */

import { getAllRoutes, type RouteItem } from './routes.ts'

/**
 * 创建文件路径到 URL 的映射表
 * 通过扫描实际文件并匹配路由配置来构建
 */
export function createFilePathToUrlMap(): Map<string, string> {
  const map = new Map<string, string>()
  const routes = getAllRoutes()

  // 从路由配置中提取可能的文件路径模式
  // 例如: /guides/chatgpt/chatgpt-guide.html -> docs/guides/chatgpt/chatgpt-guide.md
  routes.forEach(route => {
    // 移除 .html 后缀和开头的 /
    let path = route.url.replace(/^\/+/, '').replace(/\.html$/, '')
    
    // 处理特殊路径
    if (path === '' || path === 'index') {
      map.set('docs/index.md', '/')
      map.set('index.md', '/')
      return
    }

    // 构建可能的文件路径
    // /guides/chatgpt/xxx -> docs/guides/chatgpt/xxx.md
    const filePath = `docs/${path}.md`
    map.set(filePath, route.url)
    
    // 也支持 index.md 的情况
    // /guides/chatgpt/ -> docs/guides/chatgpt/index.md
    const indexPath = `docs/${path}/index.md`
    if (!map.has(indexPath)) {
      map.set(indexPath, route.url)
    }
  })

  return map
}

/**
 * 将文件路径转换为 URL
 * 优先从路由配置中查找，找不到则使用默认规则
 */
export function filePathToUrl(filePath: string): string {
  // 标准化文件路径（移除 docs/ 前缀如果存在）
  const normalizedPath = filePath.startsWith('docs/') 
    ? filePath 
    : `docs/${filePath}`

  // 从映射表中查找
  const map = createFilePathToUrlMap()
  if (map.has(normalizedPath)) {
    return map.get(normalizedPath)!
  }

  // 如果找不到，使用默认规则
  // docs/xxx.md -> /xxx.html
  // docs/xxx/index.md -> /xxx/
  let relativePath = normalizedPath.replace(/^docs\//, '')
  relativePath = relativePath.replace(/\.(md|mdx)$/i, '')

  if (relativePath === 'index' || relativePath === '') {
    return '/'
  }

  if (relativePath.endsWith('/index')) {
    return '/' + relativePath.replace(/\/index$/, '') + '/'
  }

  return '/' + relativePath + '.html'
}

/**
 * 批量转换文件路径为 URL
 */
export function filePathsToUrls(filePaths: string[]): string[] {
  const urls: string[] = []
  const seen = new Set<string>()

  for (const filePath of filePaths) {
    const url = filePathToUrl(filePath)
    if (url && !seen.has(url)) {
      urls.push(url)
      seen.add(url)
    }
  }

  return urls
}

