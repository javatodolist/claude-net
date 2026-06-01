#!/usr/bin/env python3
"""生成 claude-code-guide 的 ASCII URL 映射产物（SEO 阶段 4）。

URL 方案 A（层级）：中文源路径 → /claude-code-guide/part-N/ch-M/N-W
源文件保持中文名不动（翻译流水线 docs-map.mjs 依赖中文路径），仅靠 VitePress
rewrites 在构建时映射成 ASCII URL。

生成：
  docs/.vitepress/rewrites-claude-code-guide.ts        VitePress rewrites 映射表
  extension/ai80.net/redirect-claude-code-guide.conf   nginx 301（旧中文 URL → 新 ASCII）
  extension/ai80.net/baidu-revision-claude-code-guide.txt  百度「网站改版」URL 对

就地改写以下文件中指向 guide 的链接为 ASCII：
  docs/.vitepress/sidebar.ts, docs/.vitepress/nav.ts,
  docs/index.md, docs/claude-domestic/index.md,
  docs/claude-code-guide/README.md

幂等：重复运行结果一致。翻译流水线将来新译入文档后，重跑本脚本即可补全映射。
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import quote, unquote

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
GUIDE = DOCS / "claude-code-guide"
SITE = "https://ai80.net"

PART_RE = re.compile(r"第(\d+)部分")
CHAP_RE = re.compile(r"第(\d+)章")
SEC_RE = re.compile(r"^(\d+)\.(\d+)")

# 需要改写链接的文件
PATCH_FILES = [
    DOCS / ".vitepress" / "sidebar.ts",
    DOCS / ".vitepress" / "nav.ts",
    DOCS / "index.md",
    DOCS / "claude-domestic" / "index.md",
    GUIDE / "README.md",
]

# 已删除的孤儿/重命名文件，其旧 URL 需 301 到对应 ASCII 页（不在磁盘扫描范围内）
EXTRA_REDIRECTS = [
    ("claude-code-guide/第8部分：Claude Code 原理与技术/第27章：Claude Code 核心原理/27.1 大语言模型基础",
     "/claude-code-guide/part-8/ch-27/27-1"),
    ("claude-code-guide/第8部分：Claude Code 原理与技术/第27章：Claude Code 核心原理/27.2 Claude Code 架构设计",
     "/claude-code-guide/part-8/ch-27/27-2"),
    ("claude-code-guide/第8部分：Claude Code 原理与技术/第27章：Claude Code 核心原理/27.3 Claude Code 核心算法",
     "/claude-code-guide/part-8/ch-27/27-3"),
    ("claude-code-guide/第9部分：企业级Claude Code部署/第30章：企业部署概述/30.1 企业部署概述",
     "/claude-code-guide/part-9/ch-30/30-1"),
    ("claude-code-guide/第9部分：企业级Claude Code部署/第30章：企业部署概述/30.2 部署决策与规划",
     "/claude-code-guide/part-9/ch-30/30-2"),
    # 旧 22.5「插件发布与维护」已重命名为 22.6
    ("claude-code-guide/第6部分：插件系统/第22章：高级插件开发/22.5 插件发布与维护",
     "/claude-code-guide/part-6/ch-22/22-6"),
]

# 捕获 markdown / TS / yaml 中的 guide 链接 token（路径含空格与中文，以引号/括号/换行为界）
LINK_TOKEN_RE = re.compile(r"/(?:md/)?claude-code-guide/[^)'\"\n]+")
# 已是 ASCII 目标形态（part-N/ch-M/N-W），重复运行时跳过，保证幂等
ASCII_LINK_RE = re.compile(r"^claude-code-guide/part-\d+/ch-\d+/\d+-\d+$")


def die(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def build_map() -> tuple[dict[str, str], dict[str, str]]:
    """返回 (rewrites: 源.md→目标.md, link_lookup: 源链接(无.md)→目标URL)。"""
    rewrites: dict[str, str] = {}
    link_lookup: dict[str, str] = {}
    seen_dest: dict[str, str] = {}

    files = sorted(p for p in GUIDE.rglob("*.md") if p.name != "README.md")
    for path in files:
        rel = path.relative_to(DOCS).as_posix()  # claude-code-guide/第N部分.../X.Y 标题.md
        segs = rel.split("/")
        if len(segs) != 4:
            die(f"路径层级非 part/chapter/file：{rel}")
        part_m, chap_m = PART_RE.search(segs[1]), CHAP_RE.search(segs[2])
        sec_m = SEC_RE.match(segs[3])
        if not (part_m and chap_m and sec_m):
            die(f"无法解析 部分/章/节 编号：{rel}")
        dest = f"claude-code-guide/part-{part_m.group(1)}/ch-{chap_m.group(1)}/{sec_m.group(1)}-{sec_m.group(2)}.md"
        if dest in seen_dest:
            die(f"目标 URL 冲突：{dest}\n  ← {seen_dest[dest]}\n  ← {rel}")
        seen_dest[dest] = rel
        rewrites[rel] = dest
        link_lookup[rel[:-3]] = "/" + dest[:-3]  # 去 .md
    return rewrites, link_lookup


def normalize_token(token: str) -> str:
    """把链接 token 规整为 link_lookup 的 key：去前缀斜杠/md、去 .md、URL 解码。"""
    s = token.lstrip("/")
    if s.startswith("md/"):
        s = s[3:]
    s = unquote(s).rstrip()
    if s.endswith(".md"):
        s = s[:-3]
    return s


def patch_files(link_lookup: dict[str, str]) -> int:
    unresolved: list[str] = []
    total = 0
    for path in PATCH_FILES:
        if not path.exists():
            die(f"待改写文件不存在：{path}")
        text = path.read_text(encoding="utf-8")

        def repl(m: re.Match) -> str:
            nonlocal total
            key = normalize_token(m.group(0))
            if ASCII_LINK_RE.match(key):
                return m.group(0)  # 已改写，幂等跳过
            dest = link_lookup.get(key)
            if dest is None:
                unresolved.append(f"{path.name}: {m.group(0)}")
                return m.group(0)
            total += 1
            return dest

        new_text = LINK_TOKEN_RE.sub(repl, text)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
    if unresolved:
        die("以下 guide 链接无法解析（可能编号/路径有误）：\n  " + "\n  ".join(unresolved))
    return total


def write_rewrites(rewrites: dict[str, str]) -> None:
    out = DOCS / ".vitepress" / "rewrites-claude-code-guide.ts"
    lines = [
        "// 由 scripts/build_guide_url_map.py 自动生成，请勿手改。",
        "// claude-code-guide 中文源路径 → ASCII URL（VitePress rewrites，SEO 阶段 4）。",
        "export const claudeCodeGuideRewrites: Record<string, string> = {",
    ]
    for src, dest in sorted(rewrites.items()):
        s = src.replace("\\", "\\\\").replace('"', '\\"')
        d = dest.replace("\\", "\\\\").replace('"', '\\"')
        lines.append(f'  "{s}": "{d}",')
    lines.append("}")
    lines.append("")
    out.write_text("\n".join(lines), encoding="utf-8")


def write_nginx(link_lookup: dict[str, str]) -> None:
    out = ROOT / "extension" / "ai80.net" / "redirect-claude-code-guide.conf"
    out.parent.mkdir(parents=True, exist_ok=True)
    redirects = [("/" + k, v) for k, v in link_lookup.items()]
    redirects += [("/" + k, v) for k, v in EXTRA_REDIRECTS]
    redirects.sort()
    header = [
        "# 阶段4：claude-code-guide 旧中文 URL → 新 ASCII URL 的 301。由 scripts/build_guide_url_map.py 生成。",
        "# location = 为精确匹配，nginx 按解码后的 $uri 匹配，故此处用中文原文。",
        "# 通过宝塔 extension 目录（include extension/ai80.net/*.conf）引入到 server{} 块内。",
        f"# 共 {len(redirects)} 条。",
        "",
    ]
    body = []
    for old, new in redirects:
        body.append(f'location = "{old}" {{')
        body.append(f"    return 301 {new}$is_args$args;")
        body.append("}")
    out.write_text("\n".join(header + body) + "\n", encoding="utf-8")
    return len(redirects)


def write_baidu(link_lookup: dict[str, str]) -> None:
    out = ROOT / "extension" / "ai80.net" / "baidu-revision-claude-code-guide.txt"
    pairs = list(link_lookup.items()) + EXTRA_REDIRECTS
    lines = []
    for old_key, new_url in sorted(pairs):
        old_url = SITE + "/" + quote(old_key, safe="/")
        lines.append(f"{old_url}\t{SITE}{new_url}")
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    rewrites, link_lookup = build_map()
    if len(rewrites) != 202:
        print(f"WARN: 扫描到 {len(rewrites)} 篇（预期 202），请确认孤儿清理/重命名是否完成。", file=sys.stderr)
    patched = patch_files(link_lookup)
    write_rewrites(rewrites)
    n_redirects = write_nginx(link_lookup)
    write_baidu(link_lookup)
    print(f"✓ rewrites 映射     : {len(rewrites)} 条 → docs/.vitepress/rewrites-claude-code-guide.ts")
    print(f"✓ 改写内部链接      : {patched} 处（{len(PATCH_FILES)} 个文件）")
    print(f"✓ nginx 301         : {n_redirects} 条 → extension/ai80.net/redirect-claude-code-guide.conf")
    print(f"✓ 百度改版 URL 对   : {len(rewrites) + len(EXTRA_REDIRECTS)} 条 → extension/ai80.net/baidu-revision-claude-code-guide.txt")


if __name__ == "__main__":
    main()
