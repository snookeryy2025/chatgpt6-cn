/**
 * IndexNow 工具模块
 * 用于向 Bing 等搜索引擎提交 URL 更新通知
 */

import https from 'https'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export interface IndexNowConfig {
  host: string
  publicDir?: string
  apiKey?: string
  endpoint?: string
}

/**
 * 从 public 目录查找 IndexNow API Key
 */
export function findApiKey(publicDir: string): string | null {
  if (!existsSync(publicDir)) {
    console.error(`❌ Public directory not found: ${publicDir}`)
    return null
  }

  const files = readdirSync(publicDir)
  // IndexNow key file: 文件名就是 key，内容也是 key
  // 例如: "abc123xyz.txt" 包含内容 "abc123xyz"
  const keyFiles = files.filter(f => f.endsWith('.txt') && f !== 'robots.txt')

  if (keyFiles.length === 0) {
    console.error('❌ No API key file found in docs/public/')
    console.error('💡 Please download the key file from Bing Webmaster Tools and place it there.')
    return null
  }

  if (keyFiles.length > 1) {
    console.warn(`⚠️  Multiple .txt files found. Using: ${keyFiles[0]}`)
  }

  const keyFile = keyFiles[0]
  const keyPath = resolve(publicDir, keyFile)
  const keyFromFilename = keyFile.replace('.txt', '')
  
  // 验证 key 文件内容
  try {
    const keyContent = readFileSync(keyPath, 'utf-8').trim()
    
    if (keyContent === keyFromFilename) {
      return keyFromFilename
    } else {
      console.warn(`⚠️  Key file content doesn't match filename. Using filename as key.`)
      return keyFromFilename
    }
  } catch (error) {
    console.error(`❌ Error reading key file: ${error}`)
    return keyFromFilename
  }
}

/**
 * 提交 URL 列表到 IndexNow
 */
export async function submitToIndexNow(
  urls: string[],
  config: IndexNowConfig
): Promise<boolean> {
  if (urls.length === 0) {
    console.warn('⚠️  No URLs to submit')
    return false
  }

  // 获取 API Key
  const publicDir = config.publicDir || resolve(__dirname, '../../public')
  const apiKey = config.apiKey || findApiKey(publicDir)
  
  if (!apiKey) {
    console.error('❌ IndexNow API key not found')
    return false
  }

  const host = config.host
  const endpoint = config.endpoint || 'api.indexnow.org'

  // IndexNow 限制：每次最多提交 10,000 个 URL
  const maxUrlsPerRequest = 10000
  const urlBatches: string[][] = []
  
  for (let i = 0; i < urls.length; i += maxUrlsPerRequest) {
    urlBatches.push(urls.slice(i, i + maxUrlsPerRequest))
  }

  console.log(`📤 Submitting ${urls.length} URLs to IndexNow (${urlBatches.length} batch/es)...`)

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < urlBatches.length; i++) {
    const batch = urlBatches[i]
    const batchNum = urlBatches.length > 1 ? ` [${i + 1}/${urlBatches.length}]` : ''
    
    try {
      const success = await submitBatch(batch, {
        host,
        apiKey,
        endpoint,
        keyLocation: `https://${host}/${apiKey}.txt`
      })
      
      if (success) {
        successCount += batch.length
        console.log(`✅ Batch${batchNum} submitted successfully (${batch.length} URLs)`)
      } else {
        failCount += batch.length
        console.error(`❌ Batch${batchNum} submission failed`)
      }
    } catch (error) {
      failCount += batch.length
      console.error(`❌ Batch${batchNum} error:`, error)
    }
  }

  console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed`)
  return failCount === 0
}

/**
 * 提交单个批次
 */
function submitBatch(
  urls: string[],
  options: {
    host: string
    apiKey: string
    endpoint: string
    keyLocation: string
  }
): Promise<boolean> {
  return new Promise((resolve) => {
    const data = JSON.stringify({
      host: options.host,
      key: options.apiKey,
      keyLocation: options.keyLocation,
      urlList: urls
    })

    const requestOptions = {
      hostname: options.endpoint,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data)
      }
    }

    const req = https.request(requestOptions, (res) => {
      let responseBody = ''
      
      res.on('data', (chunk) => {
        responseBody += chunk.toString()
      })

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve(true)
        } else {
          console.error(`❌ HTTP ${res.statusCode}: ${responseBody || 'No response body'}`)
          resolve(false)
        }
      })
    })

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message)
      resolve(false)
    })

    req.setTimeout(30000, () => {
      req.destroy()
      console.error('❌ Request timeout')
      resolve(false)
    })

    req.write(data)
    req.end()
  })
}

