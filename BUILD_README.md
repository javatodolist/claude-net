# VuePress 构建打包脚本使用指南

本项目提供了多种构建和打包方式，可根据需要选择使用。

## 📦 快速开始

### 方式 1：使用 npm 命令（推荐）

```bash
# 构建并打包为 dist.zip（最简单）
npm run build:pack

# 或者使用别名
npm run build:zip
```

### 方式 2：使用批处理脚本（Windows）

双击运行 `build.bat` 文件，或在命令行中执行：

```bash
.\build.bat
```

### 方式 3：使用 PowerShell 脚本

在 PowerShell 中执行：

```powershell
.\build.ps1
```

## 🛠️ 可用命令

### 开发命令

```bash
# 启动开发服务器
npm run dev
# 完整命令
npm run docs:dev

# 清理缓存后启动开发服务器
npm run docs:clean-dev
```

### 构建命令

```bash
# 仅构建项目
npm run build
# 完整命令
npm run docs:build

# 构建并打包为 dist.zip
npm run build:pack
# 或
npm run build:zip
```

### 清理命令

```bash
# 清理缓存和临时文件
npm run clean
```

## 📋 构建流程说明

所有构建打包方式都会执行以下步骤：

1. **清理旧文件**
   - 删除旧的 `dist` 目录
   - 删除旧的 `dist.zip` 压缩包

2. **执行构建**
   - 运行 `npm run build` 构建项目
   - 生成静态网站文件到 `dist` 目录

3. **检查构建结果**
   - 验证 `dist` 目录是否成功生成

4. **打包压缩**
   - 将 `dist` 目录下的所有文件打包为 `dist.zip`
   - 使用 PowerShell 的 `Compress-Archive` 命令

5. **显示结果**
   - 显示构建成功信息
   - 显示压缩包大小和位置

## 📂 输出文件

构建完成后，会生成以下文件：

- `dist/` - 静态网站文件目录
- `dist.zip` - 打包的压缩文件（可直接部署）

## ⚙️ 脚本特性

### build.bat（批处理脚本）
- ✅ Windows 原生支持
- ✅ 彩色输出提示
- ✅ 错误检测和提示
- ✅ 构建失败自动停止
- ✅ 显示文件大小信息

### build.ps1（PowerShell 脚本）
- ✅ 更好的跨平台支持
- ✅ 丰富的彩色输出
- ✅ 详细的错误处理
- ✅ MB 单位的文件大小显示
- ✅ 异常捕获机制

### npm 命令
- ✅ 最简洁的使用方式
- ✅ 跨平台兼容
- ✅ 集成在项目配置中
- ✅ 适合 CI/CD 集成

## 🚀 部署建议

构建完成后，可以通过以下方式部署：

1. **直接部署 dist 目录**
   ```bash
   # 将 dist 目录上传到服务器
   scp -r dist/* user@server:/var/www/html/
   ```

2. **使用 dist.zip**
   ```bash
   # 上传压缩包
   scp dist.zip user@server:/tmp/

   # 在服务器上解压
   ssh user@server "cd /var/www/html && unzip -o /tmp/dist.zip"
   ```

3. **使用 Git Pages**
   - 将 dist 目录推送到 gh-pages 分支

4. **使用 Docker**
   ```dockerfile
   FROM nginx:alpine
   COPY dist /usr/share/nginx/html
   ```

## ❓ 常见问题

### 1. 脚本执行权限问题（PowerShell）

如果遇到"无法加载文件，因为在此系统上禁止运行脚本"错误：

```powershell
# 临时允许执行脚本
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\build.ps1
```

### 2. 构建内存不足

如果构建时遇到内存不足错误，已在 `docs:build` 命令中设置了 `NODE_OPTIONS=--max_old_space_size=4096`，分配了 4GB 内存。

### 3. 端口被占用

默认开发服务器使用 8080 端口，如果被占用可以修改：

```bash
vuepress dev src --port 8081
```

## 📝 版本信息

- VuePress: 2.0.0-rc.26
- Theme Hope: 2.0.0-rc.102
- Node.js: 建议 16.x 或更高版本

## 📞 技术支持

如有问题，请检查：
1. Node.js 版本是否符合要求
2. 依赖是否正确安装（`npm install`）
3. 构建日志中的错误信息
4. 缓存是否需要清理（`npm run clean`）
