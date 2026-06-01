from pathlib import Path
import hashlib
import re
import shutil

ROOT = Path(r"G:\work_for_job\workspace")
SITE = ROOT / "claude-net"
DOCS = SITE / "docs"
SOURCE = ROOT / "cc_docs"
NEWS = SOURCE / "05-新闻资讯"
FAQ_SRC = SOURCE / "zhihu_answers"

SECTIONS = {
    "guide": {
        "title": "Claude 入门与国内使用",
        "description": "面向国内用户的 Claude 中文入门指南，覆盖注册、登录、国内访问路线、官方入口、API 与第三方方案。",
        "keywords": "Claude 国内怎么用、Claude 注册、Claude 中文教程、Claude 国内使用",
        "items": [
            (NEWS / "2026-04-10" / "2026年Claude 4.6国内使用完全手册：注册、订阅、白嫖、API，全在这里.md", "claude-domestic-complete-guide", "2026年Claude国内使用完全手册：注册、订阅、免费体验、API"),
            (NEWS / "2026-04-10" / "Claude 4.6国内注册全流程：从零开始到Claude Pro用起来.md", "claude-register-pro-guide", "Claude 国内注册全流程：从零开始到 Claude Pro 用起来"),
            (NEWS / "2026-04-10" / "不翻墙怎么用Claude 4.6？国内三种可行方案横向对比.md", "claude-domestic-three-ways", "不翻墙怎么用 Claude：国内三种可行方案横向对比"),
            (NEWS / "2026-04-11" / "2026年国内使用Claude的几种路线：官方、镜像、API转发哪个更稳.md", "claude-domestic-routes", "国内使用 Claude 的几种路线：官方、镜像、API 转发哪个更稳"),
            (NEWS / "2026-04-02" / "Claude-国内怎么用最省事-官网订阅-直连平台和第三方入口一篇帮你理清楚.md", "claude-domestic-easiest-way", "Claude 国内怎么用最省事：官网订阅、直连平台和第三方入口"),
        ],
    },
    "claude-code": {
        "title": "Claude Code 国内安装与工作流",
        "description": "Claude Code 中文教程，覆盖国内安装、账号准备、CLI、VS Code、第一次任务、高阶技巧与工作流实践。",
        "keywords": "Claude Code 国内安装、Claude Code 怎么用、Claude Code 教程、Claude Code 工作流",
        "items": [
            (NEWS / "2026-04-10" / "Claude Code本地跑起来：从安装到第一次对话的完整步骤.md", "claude-code-local-install", "Claude Code 本地跑起来：从安装到第一次对话"),
            (NEWS / "2026-04-02" / "Claude-Code-国内安装使用完整教程.md", "claude-code-domestic-install", "Claude Code 国内安装使用完整教程"),
            (NEWS / "Claude-Code国内使用方案技术拆解-三种路线怎么选.md", "claude-code-domestic-solutions", "Claude Code 国内使用方案技术拆解：三种路线怎么选"),
            (NEWS / "Claude-Code最详细的新手上手指南-从下载安装到账号注册把这台AI编程Agent真正跑起来.md", "claude-code-beginner-guide", "Claude Code 新手上手指南：从下载到账号注册"),
            (NEWS / "别再把Claude-Code当聊天框了-16个高阶技巧把终端AI编程效率直接拉满.md", "claude-code-advanced-tips", "别再把 Claude Code 当聊天框：16 个高阶技巧"),
            (NEWS / "2026最新Claude-Code在VS-Code里怎么用-插件接入项目打开和第一次任务实操.md", "claude-code-vscode-guide", "Claude Code 在 VS Code 里怎么用：插件、项目打开和第一次任务"),
            (NEWS / "2026最新Claude-Code-Windows安装教程-NodeGit-Bash命令检查一步步配好.md", "claude-code-windows-install", "Claude Code Windows 安装教程：Node、Git Bash 与命令检查"),
            (NEWS / "2026最新Claude-Code常见报错处理-安装失败命令无效配置冲突怎么排查.md", "claude-code-errors", "Claude Code 常见报错处理：安装失败、命令无效、配置冲突"),
        ],
    },
    "api": {
        "title": "Claude API 接入与开发",
        "description": "Claude API 中文开发指南，覆盖 API Key、SDK 接入、成本计算、文档生成、团队系统集成与国内开发者路线。",
        "keywords": "Claude API 接入、Claude API 国内、Claude API Key、Claude SDK",
        "items": [
            (NEWS / "2026-04-10" / "Claude 4.6 API接入开发者指南：把Claude集成进项目只需这几步.md", "claude-api-developer-guide", "Claude API 接入开发者指南：把 Claude 集成进项目"),
            (NEWS / "2026-04-11" / "Claude 4.6自动生成API文档：从代码注释到完整文档只需几分钟.md", "claude-api-docs", "Claude 自动生成 API 文档：从代码注释到完整文档"),
            (NEWS / "2026-04-11" / "Claude 4.6接入飞书与企业微信：给团队搭一个零成本AI助手.md", "claude-feishu-wecom", "Claude 接入飞书与企业微信：给团队搭一个 AI 助手"),
            (NEWS / "2026-04-11" / "Claude 4.6 DevOps实战：CI、CD、监控脚本全靠AI生成.md", "claude-devops", "Claude DevOps 实战：CI、CD、监控脚本生成"),
        ],
    },
    "billing": {
        "title": "Claude 订阅、付款与账号风控",
        "description": "国内用户订阅 Claude Pro、Max、Team 和 API 的付款、套餐选择、封号风控与稳定使用避坑指南。",
        "keywords": "Claude 订阅、Claude Pro 付款、Claude 封号、Claude Max、Claude Team",
        "items": [
            (NEWS / "2026-04-10" / "Claude封号、付不了款？2026年国内使用全攻略（含免费白嫖方法）.md", "claude-ban-payment-guide", "Claude 封号、付不了款？国内使用全攻略"),
            (NEWS / "2026-04-10" / "Claude 4.6套餐怎么选？Pro、Max、API按量，一张表看清楚.md", "claude-plan-choose", "Claude 套餐怎么选：Pro、Max、API 按量一张表看清"),
            (NEWS / "2026-04-10" / "Claude四档套餐完整解析：$20 Pro够用吗，API按量怎么算更划算？.md", "claude-pricing-analysis", "Claude 四档套餐解析：Pro 够用吗，API 怎么算更划算"),
            (NEWS / "2026-04-10" / "Claude 4.6账号老是被封？这几个操作能让你稳定用满一年.md", "claude-account-ban-avoid", "Claude 账号老是被封？稳定使用避坑指南"),
            (NEWS / "Claude封号避坑指南-十几个真实案例总结的生存法则.md", "claude-ban-survival", "Claude 封号避坑指南：真实案例总结的生存法则"),
            (NEWS / "国内订阅Claude-Pro踩坑实录-五种方法亲测对比.md", "claude-pro-payment-comparison", "国内订阅 Claude Pro 踩坑实录：五种方法对比"),
        ],
    },
    "prompt-engineering": {
        "title": "Claude 提示词与 AI 编程工作流",
        "description": "Claude Prompt、System Prompt、TDD、代码审查、前后端开发与团队工作流实战。",
        "keywords": "Claude 提示词、Claude System Prompt、Claude TDD、Claude 代码审查",
        "items": [
            (NEWS / "2026-04-11" / "Claude 4.6 Prompt工程完全指南：让AI输出质量翻倍的20个实用技巧.md", "claude-prompt-engineering", "Claude Prompt 工程完全指南：让 AI 输出质量翻倍"),
            (NEWS / "2026-04-11" / "Claude 4.6 System Prompt设计指南：让AI记住你的工作方式.md", "claude-system-prompt", "Claude System Prompt 设计指南：让 AI 记住你的工作方式"),
            (NEWS / "2026-04-11" / "Claude 4.6测试驱动开发实战：用AI把Bug扼杀在代码合并之前.md", "claude-tdd", "Claude 测试驱动开发实战：用 AI 把 Bug 扼杀在合并前"),
            (NEWS / "2026-04-11" / "Claude 4.6代码Review深度实战：从表面合规到真正的质量把关.md", "claude-code-review", "Claude 代码 Review 深度实战：真正的质量把关"),
            (NEWS / "2026-04-11" / "Claude 4.6前端开发实战：从需求描述到可运行组件的完整流程.md", "claude-frontend", "Claude 前端开发实战：从需求到可运行组件"),
            (NEWS / "2026-04-11" / "Claude 4.6后端开发实战：REST API从设计到上线的完整流程.md", "claude-backend", "Claude 后端开发实战：REST API 从设计到上线"),
        ],
    },
    "comparisons": {
        "title": "Claude 对比评测",
        "description": "Claude 与 ChatGPT、GPT-4o、GitHub Copilot、Cursor、Codex、OpenClaw 等 AI 编程工具的差异和选型建议。",
        "keywords": "Claude vs ChatGPT、Claude vs Cursor、Claude Code vs Codex、Claude vs Copilot",
        "items": [
            (NEWS / "2026-04-10" / "Claude 4.6 vs GPT-4o：程序员应该选哪个AI助手？.md", "claude-vs-gpt4o", "Claude vs GPT-4o：程序员应该选哪个 AI 助手"),
            (NEWS / "2026-04-11" / "Claude 4.6 vs GitHub Copilot：IDE里的AI助手，两个都用过才有资格比.md", "claude-vs-copilot", "Claude vs GitHub Copilot：IDE 里的 AI 助手怎么选"),
            (NEWS / "你还在纠结-Claude-Code-和-Codex-谁更强-真正该选的是工作流模式.md", "claude-code-vs-codex-workflow", "Claude Code 和 Codex 谁更强：真正该选的是工作流模式"),
            (NEWS / "2026-05-25" / "终端AI-Agent对比-Codex-ClaudeCode-Hermes-OpenClaw.md", "terminal-ai-agent-comparison", "终端 AI Agent 对比：Codex、Claude Code、Hermes、OpenClaw"),
            (NEWS / "Claude-Opus-4.6冷静评测-百万Token和自适应思考值不值得升级.md", "claude-opus-review", "Claude Opus 冷静评测：百万 Token 和自适应思考值不值得升级"),
        ],
    },
    "industry": {
        "title": "Claude 行业趋势与 Agent 场景",
        "description": "关注 Anthropic、Claude Agent、多智能体、远程控制、设计工具、企业自动化和 AI 编程行业趋势。",
        "keywords": "Claude Agent、Anthropic、Claude 多智能体、Claude 行业趋势",
        "items": [
            (NEWS / "2026-04-10" / "Claude-Managed-Agents-公测发布-Agent-开发成本直降500倍.md", "claude-managed-agents", "Claude Managed Agents 公测发布：Agent 开发成本直降"),
            (NEWS / "2026-04-10" / "Anthropic-官方Harness发布-全面解读Managed-Agents.md", "anthropic-harness-managed-agents", "Anthropic 官方 Harness 发布：全面解读 Managed Agents"),
            (NEWS / "让Claude连跑6小时-Anthropic多智能体框架完整拆解.md", "claude-multi-agent-framework", "让 Claude 连跑 6 小时：Anthropic 多智能体框架拆解"),
            (NEWS / "手机上发条消息电脑自己把活干完-Anthropic这次把-Claude-真正推向了行动型-Agent.md", "claude-action-agent", "手机上发条消息电脑自己把活干完：Claude 行动型 Agent"),
            (NEWS / "地铁里发条消息代码还在跑-Claude-Code-Channels把本地Agent变成远程同事.md", "claude-code-channels", "Claude Code Channels：把本地 Agent 变成远程同事"),
        ],
    },
    "faq": {
        "title": "Claude 常见问题 FAQ",
        "description": "整理国内用户关于 Claude、Claude Code、订阅、封号、Token、工具选型的高频问答。",
        "keywords": "Claude FAQ、Claude Code 问答、Claude 国内问题、Claude Token 不够用",
        "items": [
            (FAQ_SRC / "answer_12_初学者如何快速入门学会Claude Code ？.txt", "beginner-learn-claude-code", "初学者如何快速入门 Claude Code"),
            (FAQ_SRC / "answer_62_在国内如何使用Claude Code进行编程？.txt", "domestic-use-claude-code", "在国内如何使用 Claude Code 进行编程"),
            (FAQ_SRC / "answer_92_Claude Code每月$20配额不够用，有什么省token或多平台切换的技巧？.txt", "claude-code-token-saving", "Claude Code 每月配额不够用怎么办：省 Token 和多平台切换技巧"),
            (FAQ_SRC / "answer_38_claude.md怎么写才能让Claude Code更高效？.txt", "claude-md-best-practice", "claude.md 怎么写才能让 Claude Code 更高效"),
            (FAQ_SRC / "answer_44_如何才能让Claude不封号？.txt", "avoid-claude-ban", "如何才能让 Claude 不封号"),
            (FAQ_SRC / "answer_70_claude code比cursor好用吗？.txt", "claude-code-vs-cursor", "Claude Code 比 Cursor 好用吗"),
        ],
    },
}

AUTO_KEYWORDS = {
    "guide": ["国内怎么用", "国内使用", "注册", "入门", "上手", "一日工作流", "知识库", "新技术栈", "写代码有多强", "升级了什么"],
    "claude-code": ["Claude-Code", "Claude Code", "ClaudeCode", "claude code", "Claudecode", "Code国内", "Channels", "schedule", "源码泄漏", "Bash即一切"],
    "api": ["API", "接口", "SDK", "开发者指南", "自动生成API文档", "飞书", "企业微信", "DevOps"],
    "billing": ["订阅", "付款", "封号", "Pro", "Max", "Team", "套餐", "额度", "信用卡", "购买", "充值", "账号"],
    "prompt-engineering": ["Prompt", "System Prompt", "提示词", "TDD", "测试驱动", "代码Review", "Review", "claude.md", "计划运行", "Todos", "Tasks"],
    "comparisons": ["vs", "对比", "横评", "谁更强", "哪个好", "Cursor", "Copilot", "Codex", "GPT", "Gemini", "OpenClaw", "TRAE", "cline", "Kimi", "平替"],
    "industry": ["Anthropic", "Agent", "智能体", "行业", "IDE", "JetBrains", "Mythos", "电脑操作", "远程控制", "AI编程时代", "Windsurf", "Jules", "Trae", "创业", "生态"],
    "faq": ["如何", "怎么", "为什么", "怎么办", "什么情况", "够用吗", "无法使用", "有哪些方式"],
}

EXCLUDE_KEYWORDS = ["ChatGPT怎么", "ChatGPT plus", "ChatGPT Plus", "chatgpt plus", "国内怎么使用chatgpt", "Nano Banana", "Gemini3.1Flash", "美军", "哈梅内伊"]
KEEP_DOCS = {".vitepress"}


def clean_docs():
    for child in DOCS.iterdir():
        if child.name in KEEP_DOCS:
            continue
        if child.is_dir():
            shutil.rmtree(child)
        else:
            child.unlink()


def extract_date(path: Path):
    m = re.search(r"(20\d{2}-\d{2}-\d{2})", str(path))
    return m.group(1) if m else "2026-05-31"


def title_from_path(path: Path):
    name = path.stem
    if path.suffix.lower() == ".txt":
        name = re.sub(r"^answer_\d+_", "", name)
    return name.replace("_", " ").replace("-", " ").strip()


def slugify(value: str):
    ascii_slug = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-").lower()
    if ascii_slug and len(ascii_slug) >= 8:
        return ascii_slug[:90].strip("-")
    digest = hashlib.md5(value.encode("utf-8")).hexdigest()[:10]
    return f"article-{digest}"


def is_relevant(path: Path):
    title = title_from_path(path)
    haystack = str(path) + " " + title
    if any(k.lower() in haystack.lower() for k in EXCLUDE_KEYWORDS):
        return False
    return any(k.lower() in haystack.lower() for words in AUTO_KEYWORDS.values() for k in words) or any(
        k.lower() in haystack.lower() for k in ["claude", "anthropic", "ai编程", "agent"]
    )


def classify(path: Path):
    title = title_from_path(path)
    haystack = title.lower()
    if path.suffix.lower() == ".txt" and any(k in title for k in AUTO_KEYWORDS["faq"]):
        if any(k.lower() in haystack for k in AUTO_KEYWORDS["billing"]):
            return "billing"
        if any(k.lower() in haystack for k in AUTO_KEYWORDS["comparisons"]):
            return "comparisons"
        if any(k.lower() in haystack for k in AUTO_KEYWORDS["prompt-engineering"]):
            return "prompt-engineering"
        if any(k.lower() in haystack for k in AUTO_KEYWORDS["claude-code"]):
            return "faq"
    for section in ["billing", "api", "prompt-engineering", "comparisons", "industry", "claude-code", "guide"]:
        if any(k.lower() in haystack for k in AUTO_KEYWORDS[section]):
            return section
    return "industry"


def discover_extra_items(existing_paths):
    extras = {section: [] for section in SECTIONS}
    candidates = list(NEWS.rglob("*.md")) + list(FAQ_SRC.glob("answer_*.txt"))
    used_slugs = {slug for info in SECTIONS.values() for _, slug, _ in info["items"]}
    for path in candidates:
        if path in existing_paths or not is_relevant(path):
            continue
        section = classify(path)
        title = title_from_path(path)
        slug = slugify(title)
        if slug in used_slugs:
            slug = f"{slug}-{hashlib.md5(str(path).encode('utf-8')).hexdigest()[:6]}"
        used_slugs.add(slug)
        extras[section].append((path, slug, title))
    for section in extras:
        extras[section].sort(key=lambda item: item[2])
    return extras


def strip_frontmatter(text: str):
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) == 3:
            return parts[2].lstrip()
    return text.lstrip()


def convert_txt(text: str, title: str):
    lines = text.splitlines()
    body = []
    in_body = False
    for line in lines:
        if line.strip() == "--- 正文 ---":
            in_body = True
            continue
        if line.strip() == "--- 图片 ---":
            break
        if in_body:
            if line.strip() in {"关注", "分享", "收起", "添加评论"}:
                continue
            if re.fullmatch(r"[\u200b\s]*", line):
                continue
            body.append(line)
    content = "\n".join(body).strip()
    if not content:
        content = text.strip()
    return f"# {title}\n\n{content}\n"


def sanitize_content(text: str):
    text = re.sub(r"!\[([^\]]*)\]\(&lt;(https?://[^\s)]+)&gt;\)", r"![\1](\2)", text)
    text = re.sub(r"\[([^\]]+)\]\(&lt;(https?://[^\s)]+)&gt;\)", r"[\1](\2)", text)
    return text


def normalize_md(text: str, title: str):
    text = strip_frontmatter(text)
    text = text.replace("<", "&lt;").replace(">", "&gt;")
    text = sanitize_content(text)
    text = re.sub(r"^#\s+.*?\n+", "", text, count=1)
    return f"# {title}\n\n{text.strip()}\n"


def description_for(title: str, section: str):
    section_title = SECTIONS[section]["title"]
    return f"{title}。本文属于{section_title}专题，面向国内用户梳理 Claude 使用、Claude Code 编程和 AI 开发实践。"


def write_article(section: str, src: Path, slug: str, title: str):
    dest = DOCS / section / f"{slug}.md"
    if not src.exists():
        print(f"MISSING: {src}")
        return None
    raw = src.read_text(encoding="utf-8", errors="ignore")
    content = convert_txt(raw, title) if src.suffix.lower() == ".txt" else normalize_md(raw, title)
    fm = "---\n"
    fm += f"title: {title}\n"
    fm += f"description: {description_for(title, section)}\n"
    fm += f"date: {extract_date(src)}\n"
    fm += f"category: {SECTIONS[section]['title']}\n"
    fm += "tag:\n"
    fm += "  - Claude\n"
    fm += "  - Claude Code\n" if "code" in section or "Code" in title else "  - 国内使用\n"
    fm += "  - AI编程\n"
    fm += "---\n\n"
    dest.write_text(fm + content, encoding="utf-8")
    return {"text": title, "link": f"/{section}/{slug}"}


def write_index(section: str, links):
    info = SECTIONS[section]
    featured_links = links[:12]
    archive_links = links[12:]
    lines = [
        "---",
        f"title: {info['title']}",
        f"description: {info['description']}",
        f"category: {info['title']}",
        "---",
        "",
        f"# {info['title']}",
        "",
        info["description"],
        "",
        f"本专题围绕 **{info['keywords']}** 等国内搜索需求整理，帮助开发者快速找到可落地的 Claude 使用路径。",
        "",
        "## 推荐阅读",
        "",
    ]
    for link in featured_links:
        lines.append(f"- [{link['text']}]({link['link'].split('/')[-1]})")
    if archive_links:
        lines += ["", "## 更多文章", ""]
        for link in archive_links:
            lines.append(f"- [{link['text']}]({link['link'].split('/')[-1]})")
    lines += [
        "",
        "## 适合谁阅读",
        "",
        "- 想在国内稳定使用 Claude 或 Claude Code 的开发者",
        "- 需要比较 Claude、ChatGPT、Cursor、Codex 等工具的团队",
        "- 希望把 Claude 接入日常开发、文档、测试和自动化流程的人",
    ]
    (DOCS / section / "index.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_home():
    content = """---
layout: home
hero:
  name: Claude中文网
  text: 国内使用 · Claude Code · API · AI编程
  tagline: 面向国内开发者的 Claude 使用指南，系统整理 Claude 注册订阅、Claude Code 安装、API 接入、提示词工作流与对比评测
  actions:
    - theme: brand
      text: Claude 国内怎么用
      link: /guide/
    - theme: alt
      text: Claude Code 安装
      link: /claude-code/
    - theme: brand
      text: Claude API 接入
      link: /api/
    - theme: alt
      text: 常见问题
      link: /faq/
features:
  - title: Claude 国内使用指南
    details: 覆盖 Claude 注册、登录、官方入口、镜像、API 转发和国内稳定使用路线
    link: /guide/
  - title: Claude Code 国内安装
    details: 从 Node、Git Bash、CLI 到 VS Code，把 Claude Code 真正接进本地项目
    link: /claude-code/
  - title: Claude API 开发接入
    details: 面向开发者整理 API Key、SDK、成本、文档生成和团队系统集成实践
    link: /api/
  - title: 订阅付款与账号风控
    details: Pro、Max、Team、API 套餐怎么选，国内付款失败和封号问题怎么避坑
    link: /billing/
  - title: Claude 提示词与工作流
    details: Prompt、System Prompt、TDD、代码审查、前后端开发和团队协作方法
    link: /prompt-engineering/
  - title: Claude 对比评测
    details: Claude vs ChatGPT、Cursor、Copilot、Codex，按编程场景选择合适工具
    link: /comparisons/
  - title: Agent 与行业趋势
    details: 追踪 Anthropic、Managed Agents、多智能体、远程控制和行动型 Agent
    link: /industry/
  - title: Claude 常见问题
    details: 从知乎问答整理 Claude Code 入门、Token 不够、封号、国内渠道等长尾问题
    link: /faq/
---
"""
    (DOCS / "index.md").write_text(content, encoding="utf-8")


def write_404():
    (DOCS / "404.md").write_text("# 页面未找到\n\n你可以回到 [Claude中文网首页](/)，或查看 [Claude 国内使用指南](/guide/)。\n", encoding="utf-8")


def main():
    clean_docs()
    sidebars = {}
    existing_paths = {src for info in SECTIONS.values() for src, _, _ in info["items"]}
    extras = discover_extra_items(existing_paths)
    for section in SECTIONS:
        (DOCS / section).mkdir(parents=True, exist_ok=True)
        links = []
        all_items = SECTIONS[section]["items"] + extras[section]
        for src, slug, title in all_items:
            item = write_article(section, src, slug, title)
            if item:
                links.append(item)
        write_index(section, links)
        sidebars[section] = links
    write_home()
    write_404()
    print("Generated Claude content sections:")
    for section, links in sidebars.items():
        print(f"- {section}: {len(links)} articles")

if __name__ == "__main__":
    main()
