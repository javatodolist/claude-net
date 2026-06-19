---
title: claude code 的web search无法使用如何解决？
description: claude code 的web search无法使用如何解决？。本文属于Claude 常见问题 FAQ专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 常见问题 FAQ
tag:
  - Claude
  - 国内使用
  - AI编程
---

# claude code 的web search无法使用如何解决？

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
谢邀 @马卍
3 人赞同了该回答
Claude Code 的搜索是通过 MCP 服务器 提供。如果没连上可用的搜索或者抓取工具，就会搜不到。
首先，自己检查是否有MCP。
列出已连接的 MCP 服务器，看看有没有类似 fetch / web-search / gemini-google-search 等
claude mcp list
如果没有，可以在配置文件中添加搜索服务所需的 API Key。例如：
Tavily: TAVILY_API_KEY
SerpApi: SERPAPI_API_KEY
Google: GOOGLE_SEARCH_API_KEY 和 GOOGLE_SEARCH_ENGINE_ID
另外，你也可以添加爬取类 MCP 来读取网页正文（配合搜索效果更好）。
claude mcp add fetch -s user -- npx -y @kazuph/mcp-fetch
如果你使用“基于 Anthropic Web Search API 的 MCP”，API Key 需要被启用 web search 能力，否则搜索会直接失败。
还有就是，网络的原因也会导致无法进行搜索。
WSL 下最易出现 “0 searches”；优先在 原生 macOS/Linux 或 Windows 主机 跑 Code，或把搜索放到 Claude Desktop/网页端执行。
如果是在公司或者学校里面的，网络也可能被拦截，
如果你没办法订阅Claude Pro/Max账号，可以在0011.ai中使用，因为它不仅可以使用Claude code，还能使用Codex，这是目前公认的最强AI编程模型
如果你只想专心用 Claude、连搜索 MCP 一起稳定跑起来，[Code80](https://code.ai80.vip/home) 也是个省事的路子，真实订阅账号转 API，换个 endpoint 就能用，和官方 API 完全兼容，国内支付直接支持。
发布于 2025-11-12 11:31・广东
赞同 3​
5
2
