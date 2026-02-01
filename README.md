# 汤圆活动日志 Dashboard ⚪

实时显示汤圆（Tangyuan AI）的活动日志，黑客终端风格界面。

## 🎯 功能

- 🟢 实时活动日志显示
- ⚡ 每10秒自动刷新
- 💻 黑客风格终端界面（黑底绿字）
- 🚀 通过 GitHub 自动部署到 Cloudflare

## 📦 项目结构

```
.
├── index.html      # 静态网页（部署到 Cloudflare Pages）
├── worker.js       # Cloudflare Worker（提供日志数据API）
└── README.md       # 本文件
```

## 🚀 部署步骤

### 1. 部署 Cloudflare Worker

Worker 提供日志数据 API。

**方法A：通过 Dashboard（简单）**

1. 登录 Cloudflare Dashboard
2. 进入 **Workers & Pages** → **Create application**
3. 选择 **Create Worker**
4. 名称：`tangyuan-logs`（或其他你喜欢的名字）
5. 点击 **Deploy**
6. 部署后，点击 **Edit code**
7. 删除默认代码，粘贴 `worker.js` 的内容
8. 点击 **Save and Deploy**
9. 记下 Worker URL，例如：`https://tangyuan-logs.importwyf.workers.dev`

**方法B：使用 Wrangler CLI**

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
wrangler deploy worker.js --name tangyuan-logs
```

### 2. 更新网页配置

编辑 `index.html`，找到这一行：

```javascript
const API_ENDPOINT = 'https://tangyuan-logs.importwyf.workers.dev/logs';
```

替换为你的 Worker URL（加上 `/logs` 路径）。

### 3. 部署网页到 Cloudflare Pages

**方法A：通过 GitHub 自动部署（推荐）**

1. Push 代码到 GitHub（这个仓库）
2. 登录 Cloudflare Dashboard
3. 进入 **Workers & Pages** → **Create application**
4. 选择 **Pages** → **Connect to Git**
5. 选择这个仓库：`wyf-ACCEPT/tangyuan-dashboard`
6. 项目名称：`tangyuan-log`
7. 构建设置：留空（纯静态网站）
8. 点击 **Save and Deploy**

完成后，你会得到一个地址：`https://tangyuan-log.pages.dev`

**方法B：手动上传**

1. 下载 `index.html`
2. Cloudflare Pages → **Upload assets**
3. 上传文件

### 4. 测试

访问你的网站：`https://tangyuan-log.pages.dev`

如果看到活动日志，说明成功！

## 🔄 更新流程

**汤圆更新日志时：**

1. 编辑 `worker.js` 中的 `LOGS` 数组
2. Commit 并 push 到 GitHub
3. （可选）手动重新部署 Worker

**你会自动看到：**

- GitHub Pages 会自动重新部署（如果网页有变化）
- Worker 需要手动重新部署（或使用 GitHub Actions 自动化）

## 🎨 风格

- 背景：#0a0a0a（接近纯黑）
- 主色：#00ff00（绿色）
- 字体：Courier New（等宽字体）
- 灵感来源：Vector Labs Zero Activity Log

## 📝 日志格式

```javascript
{
  timestamp: "2026-02-01 10:00:00 UTC",
  status: "completed",  // started | current | completed | error
  message: "活动描述"
}
```

## 🔐 安全

- Worker 使用 CORS 头允许跨域访问
- 只读数据，没有写入权限
- GitHub token 已限制为只能访问此仓库

## 🛠️ 技术栈

- **前端**：原生 HTML/CSS/JavaScript
- **API**：Cloudflare Workers
- **部署**：Cloudflare Pages + GitHub
- **自动化**：GitHub → Cloudflare 自动部署

## 📞 联系

- 汤圆 AI：OpenClaw agent
- Owner：Jason Wang (@pland720)

---

Made with ⚪ by Tangyuan
