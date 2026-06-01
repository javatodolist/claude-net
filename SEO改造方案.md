# ai80.net SEO 改造方案：URL 结构 + 百度站长平台接入

> 本方案覆盖 SEO 审计中暂缓的 4 项：P0-4（cleanUrls）、P0-5（claude-code-guide 208 篇中文路径）、P0-6（claude-domestic 文件改名）、P1-1（百度站长平台）。
> 已完成并上线的修复（P0-1/2/3、P1-2/3/4/5/8、P2 多项）不在此文范围内。

## 现状

- **部署方式**：本地 `vitepress build` → 打包静态文件 → 上传宝塔面板服务器 `/www/wwwroot/ai80.net`，Nginx 提供静态服务。`scripts/deploy.sh` 只替换静态文件，**不修改 Nginx 配置**。
- **结论**：所有 301 跳转必须在宝塔的 Nginx 站点配置里加。这部分需要你操作服务器（或给我服务器访问方式）。
- 当前 `config.ts` 无 `cleanUrls`、无 `rewrites`、无重定向。
- claude-code-guide：208 篇 `.md`，9 个「第N部分」目录 → 「第N章」子目录 → 「N.N 标题.md」，全中文路径含全角冒号和空格。
- claude-domestic：5 篇正文 + index.md，文件名含中文、全角问号 `？`、全角括号、全角冒号。

---

# 第一部分：百度站长平台接入（建议优先做，零风险）

这部分纯属新增，不动任何 URL，不影响现有收录，**建议先做、立即开始**。

## 1. 站点验证

1. 登录 [ziyuan.baidu.com](https://ziyuan.baidu.com)，「用户中心 → 站点管理 → 添加网站」，填 `https://ai80.net`，站点属性选「IT/科技」类。
2. 选 **HTML 标签验证**（最省事，不用传文件）。百度会给一段：
   ```html
   <meta name="baidu-site-verification" content="codeva-XXXXXXXX" />
   ```
3. 把 `content` 值给我，我加到 `config.ts` 的 `head` 数组里（一行）。
4. 重新 `build` + 部署后，回站长平台点「完成验证」。

## 2. 提交 sitemap

- 站点已自动生成 `https://ai80.net/sitemap.xml`（本轮已加 lastmod，共约 2100 条 URL）。
- 验证通过后：「资源提交 → sitemap → 添加」，填 `https://ai80.net/sitemap.xml`。
- 百度会按 lastmod 调度抓取。

## 3. URL 推送（让新文章更快收录）

百度有两种推送，建议都上：

**a) 自动推送（JS，最省事）**
站长平台「资源提交 → 自动推送」给一段 JS。加到 `config.ts` head 或主题里，用户每打开一个页面就把该 URL 推给百度。我来接。

**b) 主动推送（API，针对新增/更新）**
站长平台给一个推送接口和 token，形如：
```
curl -H 'Content-Type:text/plain' --data-binary @urls.txt \
  "http://data.zz.baidu.com/urls?site=https://ai80.net&token=YOUR_TOKEN"
```
我会写一个推送脚本 `scripts/baidu_push.py`，从 `sitemap.xml` 或 git diff 提取新增/改动的 URL 批量推送，可挂到 `deploy.sh` 末尾，每次部署自动推送。

## 4. 需要你提供的两样东西

| 东西 | 哪里拿 | 用途 |
|---|---|---|
| 站点验证 code（`codeva-xxx`） | 站长平台 HTML 标签验证 | 注入 config.ts |
| 主动推送 token | 站长平台「资源提交 → 普通收录 → API 提交」 | baidu_push.py 用 |

## 分工

- **你**：注册验证站点、拿 code 和 token、提交 sitemap、点完成验证。
- **我**：注入验证 meta、接自动推送 JS、写 baidu_push.py 并挂进 deploy.sh。

---

# 第二部分：URL 结构改造

⚠️ **核心风险**：这三项都会改变已被搜索引擎收录的 URL。改完必须配 301 跳转，否则旧链接 404、已积累的排名权重丢失。所以每一步都要「改 URL + 配 301 + 提交百度改版」三件套一起做。

## P0-4：开启 cleanUrls（去掉 .html 后缀）

- **改动**：`config.ts` 加 `cleanUrls: true`。输出从 `blog/foo.html` 变为 `blog/foo/index.html`，访问 URL 变成 `/blog/foo`。
- **canonical**：现有逻辑已能正确去掉 `.html` 和 `index.html`，开 cleanUrls 后 canonical 自动变干净，无需改。
- **Nginx 要配**（宝塔 → 网站 → 配置文件）：
  ```nginx
  # 1. 无后缀 URL 能正确命中目录里的 index.html
  location / {
      try_files $uri $uri/ $uri.html /404.html;
  }
  # 2. 旧 .html URL 301 到无后缀（保住已收录页面权重）
  rewrite ^/(.*)/index\.html$ /$1/ permanent;
  rewrite ^/(.*)\.html$ /$1 permanent;
  ```
- **风险**：中等。规则简单、全局一条，但要在测试环境或低峰期验证不产生跳转循环。

## P0-6：claude-domestic 文件改名（6 篇，先做、当试点）

这几篇是站点最核心的目标词落地页，文件名含全角问号等危险字符。建议改成 ASCII slug：

| 现文件名 | 建议新 slug |
|---|---|
| Claude-Code-国内安装使用完整教程.md | `claude-code-china-install-guide.md` |
| Claude-Code国内使用方案技术拆解-三种路线怎么选.md | `claude-code-china-solutions-breakdown.md` |
| Claude-Code国内用不了？三种方案一次讲清楚（…）.md | `claude-code-china-three-solutions.md` |
| Claude-Code本地跑起来：从安装到第一次对话的完整步骤.md | `claude-code-local-setup-steps.md` |
| Claude-国内怎么用最省事-官网订阅-直连平台和第三方入口….md | `claude-china-access-comparison.md` |
| 国内用Claude-Code就三条路-一篇帮你选对.md | `claude-code-china-pick-your-path.md` |

（slug 可调，标题/H1 里的中文关键词保留不动——Baidu 排名看的是标题和正文，不是 URL。）
改名后更新 sidebar/nav 引用，并为旧 URL 配 301。

## P0-5（阶段 4）：claude-code-guide 208 篇 URL 改造 —— 修订方案

> 原方案推荐"真实重命名 208 个文件"。实施阶段 3 时发现一个原方案漏掉的耦合，故此修订。

### 为什么修订

`docs/claude-code-guide/` 不是纯人工目录。`scripts/translate/` 翻译流水线（Ralph Loop）把 `docs/claude-code-official/` 的 59 篇英文官方文档翻译生成到这里，映射写死在 `scripts/translate/docs-map.mjs`（60 条，`target` 字段是中文路径）。

如果"真实改名"，每次翻译流水线运行都会按 `docs-map.mjs` 的中文 `target` 写文件——要么把改名结果覆盖回去，要么生成重复的旧名文件。原方案没考虑这层耦合。

### 修订后的推荐方案：用 VitePress `rewrites`，不动源文件

在 `config.ts` 加一个 `rewrites` 映射表，把 208 个中文源路径映射成 ASCII URL。源文件保持中文名不动。

为什么从"真实改名"改为 `rewrites`（与原方案相反的结论）：
- **风险最低**：208 篇文章的源文件、正文、`docs-map.mjs`、翻译流水线全部零改动。这是个"高风险"项，改动面越小越好；出问题删掉 rewrites 映射即可整体回滚。
- **解耦翻译流水线**：`docs-map.mjs` 的中文 `target` 继续有效，流水线照常工作，不需要动它。

可接受的代价：源文件保持中文名（本来就是，且流水线依赖）；将来流水线新译入的文档 URL 仍是中文，需要时把它补进 rewrites 映射即可。

### URL 方案（执行前需你确认的唯一关键决策）

每篇文章名带唯一 `N.N` 编号。两个候选：
- **A. 层级 ASCII**：`/claude-code-guide/part-1/ch-1/1-1` —— 保留"部分/章"层级，利于爬虫理解书籍结构（推荐）
- **B. 扁平编号**：`/claude-code-guide/1-1` —— 更短、301 映射最简单

URL 不含中文关键词无妨——Baidu 排名看标题和正文，URL 关键词是弱信号。

### 实施（脚本 + subagent）

写 `scripts/rewrite_guide_urls.py`：
1. 扫描 208 个文件，按编号生成 `中文源路径 → ASCII 路径` 映射。
2. 在 `config.ts` 写入 `rewrites` 映射（量大，建议生成独立文件再 import）。
3. 重写 `sidebar.ts` 里 claude-code-guide 段的 link 为 ASCII —— VitePress 官方要求：开启 rewrites 后，sidebar/内部链接必须用 rewrite 后的路径。
4. 把 208 篇文章里互相交叉引用的中文链接改成 ASCII。
5. 生成 301 映射表（208 条）+ 百度「网站改版」URL 对文件（完整 URL）。

### Nginx

生成 `extension/ai80.net/redirect-claude-code-guide.conf`，208 条 `location =` 精确匹配 301（与阶段 3 同机制）。

### 时序与前置条件

- 与阶段 3 相同：先部署（新 URL 生效）→ 再配 Nginx 301。
- **前置**：阶段 2（cleanUrls）、阶段 3（claude-domestic）上线后观察 3-7 天，百度站长平台「索引量 / 抓取异常」正常，再做。不要和阶段 2/3 挤在一起，避免短期内对同批页面多次改 URL。
- 百度侧：208 条用「网站改版 → 新旧URL对」批量提交（这种量才值得用改版工具），新旧站点都选 `https://ai80.net`，URL 对用完整地址。

## 301 跳转方案（Nginx）

P0-5/P0-6 改名后，旧 URL 是 percent-encoded 中文，需要逐条 301。由脚本生成一个 `redirects.conf`：
```nginx
# 由 rename 脚本自动生成，宝塔站点配置里 include 进来
rewrite ^/claude-code-guide/%E7%AC%AC1%E9%83%A8%E5%88%86.*1\.1.*$ /claude-code-guide/1.1 permanent;
# ... 共 ~214 条
```
你把这个文件放到服务器、在宝塔 Nginx 配置里 `include`。

## 百度「网站改版」工具（重要）

URL 变更后，除了 Nginx 301，还要去站长平台「优化与维护 → 网站改版」提交改版规则（支持 URL 对、目录、规则三种）。这能让百度把旧 URL 的权重平滑转移到新 URL，比单纯 301 收敛快很多。同时对确实废弃的旧 URL 用「死链提交」。

---

# 推荐执行顺序与排期

| 阶段 | 内容 | 风险 | 依赖 |
|---|---|---|---|
| **阶段 1** | 百度站长平台接入（验证 + sitemap + 推送） | 零 | 你提供 code/token |
| **阶段 2** | P0-4 cleanUrls + 全局 .html→无后缀 301 | 中 | 你配 Nginx |
| **阶段 3** | P0-6 claude-domestic 6 篇改名（试点跑通流程） | 低 | 你配 Nginx + 提交百度改版 |
| **阶段 4** | P0-5 claude-code-guide URL 改造（`rewrites`）+ 孤儿清理 | 高 | 阶段 2/3 观察期后 |

每个 URL 阶段上线后观察百度站长平台「抓取异常」「索引量」3-7 天再进下一阶段。

> **执行状态（2026-05-23）**：阶段 1/2/3 已在代码中完成；阶段 4 已实现（本地构建通过，待部署 + 服务器配 Nginx）。
> 阶段 4 实施时发现方案未预料的问题并处理：
> - 磁盘上有 5 个**孤儿重复章节**文件（第27章「Claude Code 核心原理」3 篇、第30章「企业部署概述」2 篇，不在 sidebar 却进 sitemap）——已删除并 301 到对应正式页。
> - 第22章有两个 `22.5`（「插件发布与维护」实为 22.6，编号笔误）——已 `git mv` 改名修正。
> - 因编号有重复，确认采用**层级 URL 方案 A**：`/claude-code-guide/part-N/ch-M/N-W`。
> - `rewrites` 用**函数形式**（`(id)=>map[id]??id`）而非对象映射——对象 key 会被 VitePress 当 path-to-regexp 模式编译，中文/标点路径会报错。
>
> 产物：`scripts/build_guide_url_map.py`（生成器，翻译流水线新增文档后重跑即可）、
> `docs/.vitepress/rewrites-claude-code-guide.ts`（202 条映射）、
> `extension/ai80.net/`（clean-urls.conf + redirect-claude-domestic.conf + redirect-claude-code-guide.conf 208 条 + baidu-revision txt + README）。

# 风险与回滚

- 所有代码改动走 git，可回滚。
- URL 改名前打 git tag，万一要回退能整体还原文件名 + sidebar。
- Nginx 配置改动前在宝塔备份当前站点配置。
- 301 上线后用站长平台「抓取诊断」抽查几条新旧 URL 是否正确跳转。
- deploy.sh 已有 `.backup` 机制，部署出问题可在服务器手动换回。

# 分工清单

**你负责**：
- 注册并验证百度站长平台，提供验证 code 和推送 token
- 在宝塔 Nginx 站点配置里加 `try_files`、`.html` 301 规则、`include redirects.conf`
- 站长平台提交 sitemap、提交网站改版规则、提交死链

**我负责**：
- 注入百度验证 meta、自动推送 JS，写 `baidu_push.py` 并挂进 deploy.sh
- `config.ts` 开 cleanUrls
- 写 `rename_guide_urls.py`：批量改名 + 重建 sidebar + 生成 301 映射表
- claude-domestic 6 篇改名 + 改引用
- 每阶段本地 `build` 验证 + 抽查
