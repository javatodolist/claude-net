#!/bin/bash
# ============================================================
# Claude Code 驱动的文档翻译 - 启动脚本
#
# 用法：
#   ./run.sh                    # 翻译全部
#   ./run.sh --priority 1       # 只翻译 P1
#   ./run.sh --one              # 只翻译 1 篇
#   ./run.sh --dry-run          # 干跑
#   ./run.sh --priority 1 --one # P1 中翻译 1 篇
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# 确保不在 Claude Code 会话中运行
unset CLAUDECODE

echo "============================================================"
echo "  启动文档翻译（请在独立终端中运行，不要在 Claude Code 里运行）"
echo "============================================================"
echo ""

# 先显示进度
node status.mjs
echo ""

# 执行翻译
exec node translate-cc.mjs "$@"
