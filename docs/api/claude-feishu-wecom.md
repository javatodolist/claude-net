---
title: Claude 接入飞书与企业微信：给团队搭一个 AI 助手
description: Claude 接入飞书与企业微信：给团队搭一个 AI 助手。本文属于Claude API 接入与开发专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-11
category: Claude API 接入与开发
tag:
  - Claude
  - 国内使用
  - AI编程
---

# Claude 接入飞书与企业微信：给团队搭一个 AI 助手

## 写在前面

公司里的AI工具推广，有一个最大的障碍：大家不愿意切换工具。工程师们已经在IDE里了，非要跑去开个浏览器打开claude.ai，这个摩擦成本很多人觉得不值得。

解法很直接：把Claude送到大家已经在用的地方——飞书或企业微信。在聊天里@一下，就能问Claude问题、生成代码、写文档。没有登录、没有切换、没有注册账号的门槛。

这篇文章给出完整的实现方案：用Node.js把Claude 4.6 API接入飞书/企业微信，从零开始搭起一个团队AI助手。

---

## 整体架构

```
飞书/企业微信
    ↓  接收消息（Webhook）
后端服务（Node.js）
    ↓  调用API
Claude 4.6 API
    ↓  返回结果
后端服务
    ↓  发送消息（Bot API）
飞书/企业微信
```

核心步骤：
1. 注册飞书/企业微信机器人，获取Webhook地址
2. 搭建后端服务，接收消息事件
3. 调用Claude 4.6 API获取回复
4. 通过Bot API发送回复到群组

---

## 方案一：飞书机器人接入

### 第一步：创建飞书自定义应用

1. 打开飞书开放平台（open.feishu.cn）
2. 创建企业自建应用
3. 开启以下权限：
   - 接收消息（im:message:receive_v1）
   - 发送消息（im:message）
4. 获取App ID和App Secret

### 第二步：配置消息事件订阅

在应用配置 → 事件订阅里，填入你的服务器接收事件的URL，格式：`https://your-server.com/feishu/event`

飞书会发送一个验证请求，你需要返回challenge字段。

### 第三步：后端服务实现

```javascript
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL // 国内用户配置 Code80 endpoint
});

// 维护对话历史（按用户ID存储）
const conversationHistory = new Map();

// 获取飞书Access Token
async function getFeishuAccessToken() {
  const response = await axios.post(
    'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    {
      app_id: process.env.FEISHU_APP_ID,
      app_secret: process.env.FEISHU_APP_SECRET
    }
  );
  return response.data.tenant_access_token;
}

// 发送飞书消息
async function sendFeishuMessage(receiveId, content, receiveIdType = 'chat_id') {
  const token = await getFeishuAccessToken();
  await axios.post(
    'https://open.feishu.cn/open-apis/im/v1/messages',
    {
      receive_id: receiveId,
      msg_type: 'text',
      content: JSON.stringify({ text: content })
    },
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { receive_id_type: receiveIdType }
    }
  );
}

// 调用Claude API
async function askClaude(userId, userMessage) {
  // 维护多轮对话历史
  if (!conversationHistory.has(userId)) {
    conversationHistory.set(userId, []);
  }

  const history = conversationHistory.get(userId);
  history.push({ role: 'user', content: userMessage });

  // 保留最近20轮对话
  const recentHistory = history.slice(-20);

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `你是公司内部的AI助手，帮助同事解决工作问题。
你擅长：代码开发、技术问题解答、文档撰写、方案分析。
回答要简洁准确，代码示例要完整可运行。
如果问题不在你的能力范围内，直接说明。`,
    messages: recentHistory
  });

  const assistantMessage = response.content[0].text;
  history.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}

// 飞书事件接收
app.post('/feishu/event', async (req, res) =&gt; {
  const body = req.body;

  // 飞书URL验证
  if (body.challenge) {
    return res.json({ challenge: body.challenge });
  }

  // 处理消息事件
  if (body.header?.event_type === 'im.message.receive_v1') {
    const event = body.event;
    const message = JSON.parse(event.message.content);
    const userMessage = message.text?.replace(/@[^\s]+/g, '').trim(); // 去掉@机器人

    if (!userMessage) return res.json({ code: 0 });

    const chatId = event.message.chat_id;
    const userId = event.sender.sender_id.user_id;

    // 异步处理，先返回200
    res.json({ code: 0 });

    try {
      const reply = await askClaude(userId, userMessage);
      await sendFeishuMessage(chatId, reply);
    } catch (error) {
      console.error('处理消息失败:', error);
      await sendFeishuMessage(chatId, '抱歉，处理你的请求时出现了问题，请稍后再试。');
    }
  } else {
    res.json({ code: 0 });
  }
});

app.listen(3000, () =&gt; console.log('飞书机器人服务启动，端口3000'));
```

### 环境变量配置

```bash
FEISHU_APP_ID=your_feishu_app_id
FEISHU_APP_SECRET=your_feishu_app_secret
ANTHROPIC_API_KEY=your_api_key
ANTHROPIC_BASE_URL=https://code.ai80.vip  # 国内用户使用
```

---

## 方案二：企业微信机器人接入

企业微信机器人配置稍有不同：

### 第一步：创建企业微信应用

1. 登录企业微信管理后台（work.weixin.qq.com）
2. 应用管理 → 创建应用
3. 记录AgentId、Secret
4. 在应用详情里配置接收消息的服务器URL和Token、EncodingAESKey

### 第二步：后端实现（企业微信版）

```javascript
const express = require('express');
const WXBizMsgCrypt = require('wechat-crypto'); // 企业微信消息加解密
const xml2js = require('xml2js');
const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.text({ type: 'application/xml' }));

const wxCrypt = new WXBizMsgCrypt(
  process.env.WXWORK_TOKEN,
  process.env.WXWORK_ENCODING_AES_KEY,
  process.env.WXWORK_CORP_ID
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: process.env.ANTHROPIC_BASE_URL
});

// 获取企业微信Access Token（需要定期刷新）
let wxAccessToken = '';
async function refreshWXToken() {
  const response = await axios.get(
    `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${process.env.WXWORK_CORP_ID}&corpsecret=${process.env.WXWORK_APP_SECRET}`
  );
  wxAccessToken = response.data.access_token;
  // 7200秒后刷新
  setTimeout(refreshWXToken, 7000 * 1000);
}
refreshWXToken();

// 发送企业微信消息
async function sendWXMessage(userId, content) {
  await axios.post(
    `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${wxAccessToken}`,
    {
      touser: userId,
      msgtype: 'text',
      agentid: process.env.WXWORK_AGENT_ID,
      text: { content }
    }
  );
}

// 接收企业微信消息
app.post('/wxwork/event', async (req, res) =&gt; {
  const { msg_signature, timestamp, nonce } = req.query;

  try {
    // 解密消息
    const decrypted = wxCrypt.decrypt(/* 从XML解析出的加密内容 */);
    const message = await xml2js.parseStringPromise(decrypted);

    const fromUser = message.xml.FromUserName[0];
    const msgType = message.xml.MsgType[0];
    const content = message.xml.Content?.[0];

    if (msgType === 'text' && content) {
      res.send('&lt;xml&gt;&lt;return_code&gt;success&lt;/return_code&gt;&lt;/xml&gt;');

      const reply = await askClaude(fromUser, content);
      await sendWXMessage(fromUser, reply);
    } else {
      res.send('&lt;xml&gt;&lt;return_code&gt;success&lt;/return_code&gt;&lt;/xml&gt;');
    }
  } catch (error) {
    console.error('处理企业微信消息失败:', error);
    res.send('&lt;xml&gt;&lt;return_code&gt;success&lt;/return_code&gt;&lt;/xml&gt;');
  }
});

app.listen(3000);
```

---

## 实用功能扩展

### 功能一：命令系统

让机器人支持特定命令：

```javascript
function parseCommand(message) {
  if (message.startsWith('/reset')) {
    return { command: 'reset' };
  }
  if (message.startsWith('/code ')) {
    return { command: 'code', content: message.slice(6) };
  }
  if (message.startsWith('/review ')) {
    return { command: 'review', content: message.slice(8) };
  }
  return { command: 'chat', content: message };
}
```

支持的命令：
- `/reset` — 清除对话历史，开始新会话
- `/code [需求]` — 切换到代码生成模式，输出纯代码
- `/review [代码]` — 切换到代码审查模式
- `/doc [功能描述]` — 生成技术文档

### 功能二：用量统计

记录各用户的使用量，方便后续成本分析：

```javascript
const usageStats = {};

async function askClaude(userId, message) {
  const response = await anthropic.messages.create({ /* ... */ });

  // 记录用量
  if (!usageStats[userId]) {
    usageStats[userId] = { inputTokens: 0, outputTokens: 0, messageCount: 0 };
  }
  usageStats[userId].inputTokens += response.usage.input_tokens;
  usageStats[userId].outputTokens += response.usage.output_tokens;
  usageStats[userId].messageCount++;

  return response.content[0].text;
}
```

---

## 部署建议

**小团队（20人以下）：** 一个低配VPS就够了（2核4G），用PM2管理Node.js进程，Nginx做反向代理和HTTPS终结。

```bash
npm install -g pm2
pm2 start app.js --name feishu-claude-bot
pm2 save
pm2 startup
```

**中等规模团队：** 用Docker容器化部署，方便扩容：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

**注意事项：**
- 务必配置HTTPS（飞书/企业微信要求）
- 对话历史存在内存里重启会丢失，生产环境建议用Redis存储
- 配置速率限制，防止单个用户消耗过多API配额

---

## API接入

这套方案依赖Claude API，国内开发者接入需要处理海外支付问题。[Code80](https://code.ai80.vip/home) 提供了国内可用的接入方式，支持国内支付，只需要修改`baseURL`参数：

```javascript
const anthropic = new Anthropic({
  apiKey: 'your-code80-api-key',
  baseURL: 'https://code.ai80.vip'
});
```

其他代码完全不需要改动，与官方API完全兼容。详情：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：飞书/企业微信会记录发给机器人的消息吗？**
A：企业管理员有权限查看企业内的消息记录，这取决于你们公司的信息管理政策。对于敏感的代码或业务讨论，建议使用私聊方式而非群组。

**Q：对话历史保存多长时间合适？**
A：推荐保留最近20-30轮对话，超过这个数量上下文质量下降但token消耗大增。可以把对话历史存到Redis并设置TTL，比如24小时不活跃自动清除。

**Q：机器人同时被多人@，性能会有问题吗？**
A：Claude API的响应时间通常是2-10秒，Node.js的异步处理完全可以应对小团队的并发量。如果响应时间太长，可以先发一条"处理中..."的消息，等Claude返回后再发最终结果。

**Q：能给不同用户设置不同的System Prompt吗（比如开发者和产品经理）？**
A：完全可以，根据用户ID或部门信息动态选择System Prompt就行。可以在数据库里维护一张用户→System Prompt的映射表。
