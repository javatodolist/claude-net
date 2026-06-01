# ai80.net Nginx 配置片段

本目录对应宝塔服务器上的 `/www/server/panel/vhost/nginx/extension/ai80.net/`。
ai80.net 的站点配置里有一行 `include .../extension/ai80.net/*.conf;`（在 `server{}` 块内），
所以放进该目录的 `.conf` 会被**自动加载**，且宝塔面板重存站点配置时不会覆盖这些文件。
`scripts/deploy.sh` 只替换静态文件，不动 Nginx，因此新增/修改 conf 需手动同步到服务器一次。

## 文件清单

| 文件 | SEO 阶段 | 作用 |
|---|---|---|
| `clean-urls.conf` | 阶段 2 | 提供 `location / { try_files $uri $uri.html $uri/ =404; }`（无后缀 URL 命中 .html）；旧 `.html` URL 用 `if ($request_uri ~ ...)` 301 到无后缀（带 `$is_args$args`，用 `$request_uri` 防死循环）|
| `redirect-claude-domestic.conf` | 阶段 3 | claude-domestic 6 篇旧中文 URL → 新 ASCII slug 的 301 |
| `redirect-claude-code-guide.conf` | 阶段 4 | claude-code-guide 旧中文 URL → 新 ASCII URL 的 301（208 条，脚本生成）|
| `baidu-revision-claude-code-guide.txt` | 阶段 4 | 百度站长平台「网站改版」用的新旧 URL 对（制表符分隔，**非** Nginx 配置）|

> 服务器上另有 `www-redirect.conf`（www→非 www）和宝塔自带的 `site_total.conf`，与 SEO 改造无关，不在本仓库管理。

## 同步到服务器

把改动的 conf 上传到 `/www/server/panel/vhost/nginx/extension/ai80.net/`，然后：

```bash
nginx -t && nginx -s reload
```

`location =` 是精确匹配，优先级最高，无论文件 include 顺序如何都先于 `clean-urls.conf` 的 `location /` 命中，故旧中文 URL 会被正确 301，新 ASCII URL 走 try_files。

## 百度「网站改版」

阶段 4 改了大量已收录 URL，除 Nginx 301 外，去百度站长平台
「优化与维护 → 网站改版」提交 `baidu-revision-claude-code-guide.txt` 里的新旧 URL 对，
能让权重更快平滑转移。对确实废弃的旧 URL 可另用「死链提交」。

## 重新生成

`redirect-claude-code-guide.conf`、`baidu-revision-claude-code-guide.txt` 由脚本生成：

```bash
python3 scripts/build_guide_url_map.py
```

翻译流水线（`scripts/translate/`）将来新译入 guide 文档后，重跑该脚本即可补全映射与 301。
