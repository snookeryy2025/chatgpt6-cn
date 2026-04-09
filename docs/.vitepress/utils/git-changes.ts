/**
 * Git 变更检测工具
 * 用于识别修改和新增的文件，并映射到对应的 URL
 */

import { execSync } from 'child_process'
import { resolve } from 'path'
import { filePathToUrl } from './file-to-url.ts'

export interface ChangedFile {
  path: string
  status: 'added' | 'modified' | 'deleted' | 'renamed'
  oldPath?: string  // 用于重命名的情况
}

/**
 * 检测 Git 变更的文件
 * @param baseRef Git 基准引用，默认为 'HEAD'（工作区变更）或 'HEAD~1'（与上一个 commit 对比）
 * @param targetRef 目标引用，默认为工作区
 */
export function getChangedFiles(
  baseRef: string = 'HEAD',
  targetRef: string = ''
): ChangedFile[] {
  try {
    // 检查是否在 Git 仓库中
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' })
    } catch {
      console.warn('⚠️  Not in a Git repository, skipping change detection')
      return []
    }

    const changedFiles: ChangedFile[] = []
    const rootDir = resolve(process.cwd())
    const docsDir = resolve(rootDir, 'docs')

    // 构建 git diff 命令
    let command = `git diff --name-status ${baseRef}`
    if (targetRef) {
      command += ` ${targetRef}`
    } else {
      // 如果没有指定 targetRef，检查工作区变更
      command += ' --'
    }

    // 只检查 docs 目录下的文件
    const output = execSync(command, {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe'
    }).trim()

    if (!output) {
      return []
    }

    // 解析 git diff 输出
    // 格式: STATUS\tFILE_PATH
    // STATUS: A=added, M=modified, D=deleted, R=renamed
    const lines = output.split('\n').filter(line => line.trim())
    
    for (const line of lines) {
      const parts = line.split('\t')
      if (parts.length < 2) continue

      const statusCode = parts[0].trim()
      const filePath = parts[1].trim()
      const oldPath = parts[2]?.trim() // 重命名时会有旧路径

      // 只处理 docs 目录下的文件
      if (!filePath.startsWith('docs/')) continue

      // 只处理 markdown 文件和相关配置文件
      if (!filePath.match(/\.(md|mdx)$/i) && !filePath.includes('.vitepress/utils/routes.ts')) {
        continue
      }

      let status: ChangedFile['status'] = 'modified'
      if (statusCode.startsWith('A')) {
        status = 'added'
      } else if (statusCode.startsWith('D')) {
        status = 'deleted'
      } else if (statusCode.startsWith('R')) {
        status = 'renamed'
      }

      changedFiles.push({
        path: filePath,
        status,
        oldPath: oldPath || undefined
      })
    }

    // 如果没有变更，尝试检查未暂存的变更
    if (changedFiles.length === 0) {
      try {
        const unstagedOutput = execSync('git diff --name-only --', {
          cwd: rootDir,
          encoding: 'utf-8',
          stdio: 'pipe'
        }).trim()

        if (unstagedOutput) {
          unstagedOutput.split('\n').forEach(filePath => {
            if (filePath.startsWith('docs/') && filePath.match(/\.(md|mdx)$/i)) {
              changedFiles.push({
                path: filePath.trim(),
                status: 'modified'
              })
            }
          })
        }
      } catch {
        // 忽略错误
      }
    }

    return changedFiles
  } catch (error) {
    console.error('❌ Error detecting Git changes:', error)
    return []
  }
}

/**
 * 从路由配置中查找文件路径对应的 URL
 * 使用 file-to-url 工具进行转换
 */
export function findUrlForFile(filePath: string): string {
  return filePathToUrl(filePath)
}

/**
 * 获取变更文件对应的 URL 列表
 */
export function getChangedUrls(
  baseRef: string = 'HEAD',
  targetRef: string = ''
): string[] {
  const changedFiles = getChangedFiles(baseRef, targetRef)
  const urls: string[] = []
  const seenUrls = new Set<string>()

  for (const file of changedFiles) {
    // 跳过删除的文件（但可以提交旧 URL 让搜索引擎知道）
    if (file.status === 'deleted') {
      // 对于删除的文件，我们可以提交旧路径的 URL
      const url = findUrlForFile(file.path)
      if (url && !seenUrls.has(url)) {
        urls.push(url)
        seenUrls.add(url)
      }
      continue
    }

    // 处理重命名：提交新 URL
    if (file.status === 'renamed' && file.oldPath) {
      const newUrl = findUrlForFile(file.path)
      if (newUrl && !seenUrls.has(newUrl)) {
        urls.push(newUrl)
        seenUrls.add(newUrl)
      }
      // 也可以提交旧 URL（如果旧路径还存在）
      const oldUrl = findUrlForFile(file.oldPath)
      if (oldUrl && oldUrl !== newUrl && !seenUrls.has(oldUrl)) {
        urls.push(oldUrl)
        seenUrls.add(oldUrl)
      }
      continue
    }

    // 新增和修改的文件
    const url = findUrlForFile(file.path)
    if (url && !seenUrls.has(url)) {
      urls.push(url)
      seenUrls.add(url)
    }
  }

  // 如果 routes.ts 文件被修改，可能需要提交所有路由
  const routesFileChanged = changedFiles.some(
    file => file.path.includes('.vitepress/utils/routes.ts')
  )

  if (routesFileChanged) {
    console.log('📝 routes.ts changed, consider submitting all URLs with --all flag')
  }

  return urls
}

