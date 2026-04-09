import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');  // 脚本在 docs/script/ 下，需要上两层到项目根目录
const PUBLIC_DIR = path.join(ROOT_DIR, 'docs/public');
const CHANGED_URLS_FILE = path.join(ROOT_DIR, 'changed-urls.json');
const HOST = 'www.chatgpt6-cn.com';
const INDEXNOW_ENDPOINT = 'api.indexnow.org';

// Find API key file
function findApiKey() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`Error: Public directory not found at ${PUBLIC_DIR}`);
    return null;
  }

  const files = fs.readdirSync(PUBLIC_DIR);
  // IndexNow key file usually has the name equal to the key content, e.g., "abc123xyz.txt" containing "abc123xyz"
  // Or just any .txt file that looks like a key.
  // We will look for a .txt file that is NOT robots.txt
  const keyFiles = files.filter(f => f.endsWith('.txt') && f !== 'robots.txt');

  if (keyFiles.length === 0) {
    console.error('Error: No API key file found in docs/public/. Please download the key file from Bing Webmaster Tools and place it there.');
    return null;
  }

  if (keyFiles.length > 1) {
    console.warn(`Warning: Multiple .txt files found. Using the first one: ${keyFiles[0]}`);
  }

  const keyFile = keyFiles[0];
  const key = keyFile.replace('.txt', '');
  return key;
}

// 读取变更记录文件
function readChangedUrls() {
  if (fs.existsSync(CHANGED_URLS_FILE)) {
    try {
      const content = fs.readFileSync(CHANGED_URLS_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.warn('Warning: Failed to read changed-urls.json');
      return { urls: [], lastUpdated: null };
    }
  }
  return { urls: [], lastUpdated: null };
}

// 清空变更记录
function clearChangedUrls() {
  if (fs.existsSync(CHANGED_URLS_FILE)) {
    const emptyData = { urls: [], lastUpdated: null };
    fs.writeFileSync(CHANGED_URLS_FILE, JSON.stringify(emptyData, null, 2), 'utf-8');
    console.log('✅ 已清空变更记录文件');
  }
}

// 清理 URL 末尾的非法字符
function cleanUrl(url) {
  return url.replace(/[`）)】」』】.,;:!?]+$/, '').trim();
}

// 验证 URL 是否合法且属于目标网站
function isValidUrl(urlString, targetHost = HOST) {
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    return url.hostname === targetHost || url.hostname === `www.${targetHost}` || url.hostname === targetHost.replace('www.', '');
  } catch {
    return false;
  }
}

// 从 markdown 文件中提取自己网站的 URL
function extractUrlsFromMarkdown(content) {
  const urls = [];
  // 匹配 markdown 链接格式 [text](url) 中的 url，以及纯 URL
  const mdLinkRegex = /\[([^\]]*)\]\((https?:\/\/www\.chatgpt6-cn\.com[^)\s]*)\)/g;
  const plainUrlRegex = /(?<!["(<\[])(https?:\/\/www\.chatgpt6-cn\.com[^\s)"'<>]+)/g;

  let match;
  while ((match = mdLinkRegex.exec(content)) !== null) {
    const rawUrl = cleanUrl(match[2]);
    if (isValidUrl(rawUrl)) {
      urls.push(rawUrl);
    }
  }

  while ((match = plainUrlRegex.exec(content)) !== null) {
    const rawUrl = cleanUrl(match[1]);
    if (isValidUrl(rawUrl)) {
      urls.push(rawUrl);
    }
  }

  return [...new Set(urls)];
}

// 扫描目录生成页面 URL
function generatePageUrlsFromDir(dir, baseUrl, rootOffset = '') {
  const urls = new Set();
  const ignoreDirs = ['.vitepress', 'public', 'script', 'node_modules', '.claude'];

  function scan(directory, prefix = '') {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!ignoreDirs.includes(entry.name)) {
          scan(fullPath, prefix + '/' + entry.name);
        }
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        const slug = entry.name.replace('.md', '');
        urls.add(`${baseUrl}${prefix}/${slug}`);
      }
    }
  }

  scan(dir);
  return Array.from(urls);
}

// 扫描所有 markdown 文件
function scanAllMarkdownFiles(dir, baseUrl) {
  const urls = new Set();

  function scan(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const fileUrls = extractUrlsFromMarkdown(content);
        fileUrls.forEach(url => urls.add(url));
      }
    }
  }

  scan(dir);

  // 扫描所有 docs 子目录生成页面 URL（排除 index.md）
  const pageUrls = generatePageUrlsFromDir(dir, baseUrl);
  pageUrls.forEach(url => urls.add(url));

  return Array.from(urls);
}

// 全量提交 IndexNow
async function submitFullIndex() {
  const docsDir = path.join(ROOT_DIR, 'docs');
  const baseUrl = `https://${HOST}`;
  const urls = scanAllMarkdownFiles(docsDir, baseUrl);

  if (urls.length === 0) {
    console.log('❌ 未找到任何 URL');
    return;
  }

  console.log(`🔍 扫描到 ${urls.length} 个 URL，准备全量提交...\n`);

  // IndexNow 单次最多提交 10000 条，分批处理
  const BATCH_SIZE = 10000;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / BATCH_SIZE);
    console.log(`📦 正在提交第 ${batchNum}/${totalBatches} 批（${batch.length} 个 URL）...`);
    submitUrls(batch, false);
    // 每批之间稍作延迟，避免请求过快
    if (i + BATCH_SIZE < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

function submitUrls(urls, clearAfterSubmit = false) {
  const key = findApiKey();
  if (!key) return;

  const data = JSON.stringify({
    host: HOST,
    key: key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: urls
  });

  const options = {
    hostname: INDEXNOW_ENDPOINT,
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('✅ 成功：URLs 已提交到 IndexNow');
        if (clearAfterSubmit) {
          //clearChangedUrls();
        }
      } else {
        console.error('❌ 提交失败:', responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ 请求错误:', error);
  });

  req.write(data);
  req.end();
}

// Main execution
const args = process.argv.slice(2);

// 处理全量提交
if (args.includes('--full')) {
  const isDryRun = args.includes('--dry-run');
  const docsDir = path.join(ROOT_DIR, 'docs');
  const baseUrl = `https://${HOST}`;
  const urls = scanAllMarkdownFiles(docsDir, baseUrl);

  if (urls.length === 0) {
    console.log('❌ 未找到任何 URL');
    process.exit(1);
  }

  console.log(`🔍 扫描到 ${urls.length} 个 URL，准备全量提交...\n`);

  if (isDryRun) {
    console.log('🔍 [Dry Run] 即将提交的 URL：\n');
    urls.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));
    console.log(`\n✅ [Dry Run] 共 ${urls.length} 个 URL`);
    process.exit(0);
  }

  console.log('🚀 开始全量提交 IndexNow...\n');
  submitFullIndex();
} else {
  let urlsToSubmit = [];

  // 如果提供了参数，使用参数中的 URL
  if (args.length > 0) {
    // 检查是否有 --clear 标志
    const clearFlagIndex = args.indexOf('--clear');
    const shouldClear = clearFlagIndex !== -1;
    if (shouldClear) {
      args.splice(clearFlagIndex, 1);
    }

    // 验证 URL
    urlsToSubmit = args.filter(url => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        console.error(`❌ 无效的 URL，已忽略: ${url}`);
        return false;
      }
    });
  } else {
    // 如果没有提供参数，从变更记录文件读取
    console.log('📖 从变更记录文件读取 URL...\n');
    const changedData = readChangedUrls();

    if (changedData.urls.length === 0) {
      console.log('ℹ️  变更记录文件中没有 URL。');
      console.log('\n💡 使用方法：');
      console.log('   1. 运行 "npm run track-changes" 来记录变更的文章');
      console.log('   2. 或者直接提供 URL 作为参数：');
      console.log('      node scripts/submit-indexnow.js <url1> <url2> ...');
      console.log('   3. 使用 --clear 标志在提交后清空变更记录：');
      console.log('      node scripts/submit-indexnow.js --clear');
      console.log('   4. 使用 --full 标志全量提交所有页面：');
      console.log('      node scripts/submit-indexnow.js --full');
      process.exit(0);
    }

    urlsToSubmit = changedData.urls;
    console.log(`📋 找到 ${urlsToSubmit.length} 个待提交的 URL（最后更新：${changedData.lastUpdated || '未知'}）\n`);
  }

  if (urlsToSubmit.length > 0) {
    console.log('📤 正在提交以下 URL 到 IndexNow：');
    urlsToSubmit.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });
    console.log();

    // 如果是从文件读取的，默认提交后清空
    const shouldClear = args.length === 0 || args.includes('--clear');
    submitUrls(urlsToSubmit, shouldClear);
  } else {
    console.log('❌ 没有有效的 URL 可提交。');
  }
}
