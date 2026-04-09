# 文章变更跟踪和 IndexNow 提交脚本

## 📋 功能说明

这些脚本用于自动跟踪文章变更并提交到 Bing Webmaster 的 IndexNow API。

## 🚀 使用方法

### 1. 跟踪文章变更

当你修改或添加文章后，运行以下命令来记录变更：

```bash
npm run track-changes
```

这个脚本会：
- 使用 git 检测 `docs/` 目录下所有变更的 `.md` 文件
- 将文件路径转换为对应的 URL（例如：`docs/gemini/gemini3.md` → `https://www.chatgpt-china.com/gemini/gemini3`）
- 将变更的 URL 保存到 `changed-urls.json` 文件中

### 2. 提交到 IndexNow

运行以下命令来提交变更的 URL 到 IndexNow：

```bash
npm run submit-indexnow
```

这个脚本会：
- 自动从 `changed-urls.json` 读取待提交的 URL
- 提交到 Bing Webmaster 的 IndexNow API
- 提交成功后自动清空变更记录文件

### 3. 手动指定 URL

你也可以直接指定要提交的 URL：

```bash
node scripts/submit-indexnow.js https://www.chatgpt-china.com/gemini/gemini3 https://www.chatgpt-china.com/blog/gemini3-news
```

### 4. 提交后保留记录

如果不想在提交后清空变更记录，可以手动指定 URL 并省略 `--clear` 标志：

```bash
node scripts/submit-indexnow.js https://www.chatgpt-china.com/gemini/gemini3
```

## 📁 文件说明

- `track-changes.js` - 检测并记录变更的文章
- `submit-indexnow.js` - 提交 URL 到 IndexNow API
- `changed-urls.json` - 存储变更的 URL 列表（自动生成）

## 🔧 工作流程示例

```bash
# 1. 修改或添加文章
# 编辑 docs/gemini/gemini3.md

# 2. 记录变更
npm run track-changes

# 3. 提交到 IndexNow
npm run submit-indexnow
```

## ⚙️ 配置说明

- **HOST**: 网站域名，默认 `www.chatgpt-china.com`（在脚本中可修改）
- **API Key**: IndexNow API 密钥文件应放在 `docs/public/` 目录下（`.txt` 格式）

## 📝 注意事项

1. 确保已安装 IndexNow API 密钥文件到 `docs/public/` 目录
2. 脚本会自动检测 git 变更，包括已暂存和未暂存的文件
3. 变更记录会自动去重，不会重复记录相同的 URL
4. 提交成功后，变更记录文件会被自动清空

