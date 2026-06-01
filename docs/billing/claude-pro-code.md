---
title: claude充了pro还是用不了code
description: claude充了pro还是用不了code。本文属于Claude 订阅、付款与账号风控专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-05-31
category: Claude 订阅、付款与账号风控
tag:
  - Claude
  - 国内使用
  - AI编程
---

# claude充了pro还是用不了code

AI工具导航站
同名“AI工具导航站”，跟上时代的脚步
1 人赞同了该回答
应该是你之前用过 CC 中转站，或者配置过 API Key 的方式登录，导致认证乱掉了。
Pro 会员本身没问题，Claude Code 报 403 的锅基本不在订阅上。
最常见的坑是这个：系统里如果存了 ANTHROPIC_API_KEY 这个环境变量，Claude Code 会优先走 API Key 认证，完全无视你的 Pro 订阅，自然就报错了。
按这个顺序排查，基本能解决：
查环境变量 — 终端运行 echo $ANTHROPIC_API_KEY，有输出就说明问题在这，把它清掉
重新登录 — 运行 /logout 退出，再 /login 用 Pro 账号重新授权
更新版本 — claude update 之后完全重启终端
如果你之前用的是 Console PAYG（按量付费）方式登录的，同样需要重新 /login 切换回订阅模式。
发布于 2026-03-03 10:13・广东
赞同 1​
2
喜欢
