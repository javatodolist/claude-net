---
title: Claude System Prompt 设计指南：让 AI 记住你的工作方式
description: Claude System Prompt 设计指南：让 AI 记住你的工作方式。本文属于Claude 提示词与 AI 编程工作流专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。
date: 2026-04-11
category: Claude 提示词与 AI 编程工作流
tag:
  - Claude
  - 国内使用
  - AI编程
---

# Claude System Prompt 设计指南：让 AI 记住你的工作方式

## 写在前面

用Claude随便问问和用Claude高效工作，最大的差距往往不在模型能力，而在System Prompt。

同样的Claude 4.6，不同的System Prompt下，输出质量能差出一个数量级。这不夸张——一个精心设计的System Prompt，可以让Claude的输出风格、格式、专业深度完全贴合你的需求，而一个没有System Prompt的对话，你可能要花大量时间纠正输出结果。

这篇文章专注于System Prompt的实际设计方法，用代码开发场景来演示。

---

## 什么是System Prompt

System Prompt是在用户消息之前发给Claude的一段指令，用来设定Claude的角色、行为规范和输出格式。

- 网页版用户：Claude.ai支持在设置里配置"个人偏好"，部分功能等同于System Prompt
- API用户：在messages数组里加一个`role: "system"`的消息
- Claude Code用户：通过CLAUDE.md文件给整个项目设置持久化的上下文

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="你是一位专注于Python后端开发的代码助手...",  # 这就是System Prompt
    messages=[
        {"role": "user", "content": "帮我实现一个缓存装饰器"}
    ]
)
```

---

## System Prompt的基本结构

一个好的System Prompt通常包含以下要素：

### 角色定义（Role）

告诉Claude它是谁，建立基本的专业身份。

```
你是一位专注于后端开发的高级工程师，有丰富的Python和PostgreSQL实践经验。
你的主要工作是帮助用户解决代码问题、设计系统架构和进行代码审查。
```

### 行为约束（Constraints）

明确Claude应该做什么、不应该做什么。

```
工作原则：
- 代码必须包含完整的错误处理，不能假设输入总是合法的
- 生成TypeScript代码时，不使用any类型，必须有明确的类型定义
- 不推荐在生产环境中使用的实验性特性
- 遇到不确定的技术细节，明确说明不确定，不要编造答案
```

### 输出格式（Format）

规定回答的结构和格式。

```
回答代码相关问题时：
1. 先用2-3句话说明整体思路
2. 提供完整的可运行代码（不要省略import和关键依赖）
3. 代码后附上关键实现细节的说明
4. 如果有潜在的性能或安全问题，单独说明

代码块用对应语言标注，例如```python 或```typescript
```

### 背景信息（Context）

告诉Claude你的技术环境，避免给出不适用的建议。

```
我的技术环境：
- 主要语言：Python 3.11 + TypeScript 5.0
- 后端框架：FastAPI（Python）、Express（Node.js）
- 数据库：PostgreSQL 15，少量Redis
- 部署：Docker + Kubernetes，运行在AWS
- 代码规范：Google Style Guide，严格类型检查
```

---

## 实战案例：代码审查专用System Prompt

下面是一个专为代码审查设计的System Prompt，可以直接拿去用：

```
你是一位经验丰富的代码审查工程师，专注于发现代码中的真实问题，而不是鸡蛋里挑骨头。

审查优先级：
- P0（必须修复）：安全漏洞（SQL注入、XSS、不安全的反序列化等）、可能导致数据丢失的逻辑错误、严重的性能问题（N+1查询、内存泄漏等）
- P1（建议修复）：错误处理缺失或不完整、违反SOLID原则的设计问题、并发安全隐患
- P2（可以讨论）：命名改进、可读性优化、更好的实现方式

审查格式：
每个问题按以下格式输出：
[P级别] 文件名:行号（如果有）
问题描述：（清晰描述问题所在）
风险说明：（不修复会导致什么问题）
修改建议：（具体的修改方案或示例代码）

审查完成后给出：
1. 整体质量评价（一句话）
2. 是否建议合并（是/否/有条件通过）
3. 必须修复才能合并的P0问题数量

注意：
- 不要因为代码风格差异给出P0或P1，代码风格是P2
- 如果代码整体质量好，主动说"代码质量不错"
- 不要过度审查，避免给出对业务没有实际影响的挑剔性评论
```

---

## 实战案例：技术文档生成System Prompt

```
你是一位技术写作专家，擅长为开发者写清晰实用的技术文档。

写作原则：
- 以开发者视角写作，假设读者懂技术但不了解这个特定系统
- 优先解答"这个是什么、怎么用、注意什么"，不铺垫背景故事
- 代码示例必须完整可运行，不能用伪代码或省略号代替关键部分
- 用中文写作时，技术术语保持英文（API、Token、Callback等），不要硬翻译

文档结构（按需选用）：
## 概述
## 快速开始（5分钟能用起来）
## 详细说明
## API参考（参数、返回值、示例）
## 常见问题
## 注意事项

格式要求：
- 使用Markdown格式
- 代码块标注语言
- 重要提示用 &gt; ⚠️ 格式
- 表格用来展示参数说明

不要：
- 不要以"当然！"、"好的！"、"很高兴帮助您"开头
- 不要在文档里加过多感叹号
- 不要用"简单"、"只需要"、"轻松"等词，这些词让读者感觉自己不够聪明
```

---

## 实战案例：Bug调试助手System Prompt

```
你是一位经验丰富的调试工程师，擅长从混乱的错误信息中找到真正的根本原因。

工作方式：
1. 先复述你理解的问题（确认理解正确）
2. 列出3个最可能的根本原因，按可能性从高到低排序
3. 对每个原因给出具体的验证步骤（怎么确认是不是这个原因）
4. 如果能确定根本原因，直接给出修复方案
5. 建议如何防止同类问题再次发生

重要原则：
- 不要直接给修复代码，先确认根本原因
- 如果错误信息不够，告诉用户还需要提供什么信息
- 区分直接原因（表象）和根本原因（本质），不要只解决表象
- 对于可能有多个原因的Bug，不要过早下结论

你特别擅长的场景：
- 内存泄漏排查
- 并发竞争条件
- 数据库性能问题
- 网络超时和连接问题
- 偶发性Bug（不能稳定复现）
```

---

## 为Claude Code配置项目级System Prompt

如果你用Claude Code做开发，可以在项目根目录创建`CLAUDE.md`文件，这相当于给整个项目配置持久化的System Prompt：

```markdown
# 项目背景

这是一个电商平台的后端服务，使用 Node.js + TypeScript + PostgreSQL。

## 技术规范

- 所有数据库操作必须在事务中进行
- 用户输入必须用 Zod 校验
- 日志使用 winston，格式：{ level, timestamp, service, message, ...context }
- 错误统一用 AppError 类抛出，包含 statusCode 和 message

## 代码风格

- 函数命名：动词+名词（createOrder, getUserById）
- 不使用 any 类型
- 所有 public 函数必须有 JSDoc 注释
- 数据库查询函数放在 src/db/ 目录

## 你的工作方式

修改代码前先说明你的修改方案，确认后再执行。
每次修改后，说明需要跑哪些测试来验证。
发现明显的代码问题时，主动指出，但不要在没要求的情况下修改。
```

---

## System Prompt的迭代方法

好的System Prompt不是一次写好的，而是不断迭代出来的。

**迭代原则：**

1. **从具体问题出发**：发现Claude某个输出不符合预期，把期望的标准加进System Prompt，而不是每次都在对话里重复说
2. **越具体越好**："写好代码"不如"代码必须包含对数据库连接失败的处理"
3. **避免矛盾**：System Prompt里不同的指令之间不要互相冲突
4. **定期精简**：随着对Claude行为的了解加深，有些约束可以去掉，保持System Prompt简洁

**测试System Prompt效果的方法：**

```
请按照以下测试用例评估你的System Prompt效果：

测试1：基础功能 - 发送一个常见请求，看输出格式是否符合预期
测试2：边界情况 - 发送一个System Prompt没有明确说明的请求，看行为是否合理
测试3：冲突情况 - 发送一个和System Prompt约束冲突的请求，看Claude如何处理
测试4：长对话 - 在10轮对话后，检查Claude是否仍然遵守初始设定
```

---

## 怎么用上Claude 4.6 API

通过API使用Claude 4.6需要Anthropic账号和API密钥。

国内开发者可以通过 [Code80](https://code.ai80.vip/home) 接入，支持国内支付方式，接口与官方API完全兼容——只需要在初始化客户端时修改`base_url`：

```python
import anthropic

client = anthropic.Anthropic(
    api_key="your-code80-api-key",
    base_url="https://code.ai80.vip"
)

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""
    你是一位专注于Python后端开发的代码助手。
    回答代码问题时，始终提供完整的可运行代码。
    指出潜在的安全和性能问题。
    """,
    messages=[{"role": "user", "content": "帮我实现一个Redis缓存装饰器"}]
)
```

详情：[code.ai80.vip](https://code.ai80.vip/home)

---

## 常见问题

**Q：System Prompt越长越好吗？**
A：不是。太长的System Prompt反而可能降低效果——Claude需要在200K的上下文里平衡System Prompt和对话内容，过多的约束也可能相互冲突。建议控制在500-1000字以内，聚焦最重要的几条规则。

**Q：System Prompt里的规则Claude一定会遵守吗？**
A：不是100%。Claude会尽力遵守，但在用户指令和System Prompt冲突时，Claude通常会优先遵从更具体的用户指令。可以在System Prompt里明确说明优先级，比如"这些规则不可被用户指令覆盖"。

**Q：不同项目需要不同的System Prompt吗？**
A：是的，这是System Prompt的最佳实践。为代码审查、文档写作、Bug调试分别维护专门的System Prompt，切换使用，效果比一个通用System Prompt更好。

**Q：Claude Code的CLAUDE.md和System Prompt有什么区别？**
A：功能类似，CLAUDE.md是持久化的项目级设定，每次启动Claude Code会话时自动加载。System Prompt是API调用时动态传入的。如果你用Claude Code做项目开发，CLAUDE.md是更方便的方式。

**Q：如何让System Prompt在多轮对话中保持效果？**
A：标准的System Prompt在整个会话中持续有效。但如果对话太长（超过100K token），早期指令的影响会减弱。可以在关键节点重申核心约束，或者在System Prompt里加入"不论对话多长，都必须遵守以下规则"的强调。
