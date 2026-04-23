# Presentation Builder Installation

**Toolset ID:** `presentation-builder`

## Overview

本文档提供 Presentation Builder 工具集的安装和设置说明。Presentation Builder 是一个基于 Markdown 文件自动生成可交互 Web 演示站点的工具集，支持全屏播放和键盘导航。

## AI Guided Installation

使用 AI 引导式安装，将以下提示复制到 AI 编码工具的聊天窗口中：

```shell
Follow instructions in .asdm/toolsets/presentation-builder/INSTALL.md
```

## Installation Steps

### 1. 创建工作区目录

创建演示项目的存放目录：

```bash
mkdir -p .asdm/workspace/demos
```

### 2. 检测当前 Agentic Engine 提供商

检测当前使用的 AI 编码助手提供商：

- 如果 `.claude` 目录存在，使用 `Claude Code`
- 如果 `.github` 目录存在，使用 `GitHub Copilot`
- 如果 `.codebuddy` 目录存在，使用 `Tencent CodeBuddy`
- 如果当前工作区中未找到上述目录，提示用户手动选择提供商

### 3. 创建快捷命令

根据检测到的提供商，在对应目录下创建快捷命令。

#### For Claude Code (`.claude/commands/`):

```bash
mkdir -p .claude/commands/

# asdm-build-demo command
cat > .claude/commands/asdm-build-demo.md << 'EOF'
---
description: "根据 Markdown 文件构建可交互的 Web 演示站点"
argument-hint: "[Markdown 文件路径]"
---

EOF
cat .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md >> .claude/commands/asdm-build-demo.md
```

#### For GitHub Copilot (`.github/prompts/`):

```bash
mkdir -p .github/prompts/

# asdm-build-demo prompt
cat > .github/prompts/asdm-build-demo.prompt.md << 'EOF'
---
agent: 'agent'
description: '根据 Markdown 文件构建可交互的 Web 演示站点'
argument-hint: '[Markdown 文件路径]'
---

EOF
cat .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md >> .github/prompts/asdm-build-demo.prompt.md
```

#### For Tencent CodeBuddy (`.codebuddy/commands/`):

```bash
mkdir -p .codebuddy/commands/

# Copy instruction files directly (no frontmatter needed)
cp .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md .codebuddy/commands/
```

### 4. 其他提供商的手动使用

如果您的 AI 编码助手不在自动检测范围内（Claude Code、GitHub Copilot 或 Tencent CodeBuddy），仍可手动使用本工具集：

#### 直接使用指令文件

1. **导航到指令文件目录**：
   ```bash
   cd .asdm/toolsets/presentation-builder/actions/
   ```

2. **右键点击指令文件**并复制其相对路径：
   - `asdm-build-demo.md`

3. **在 AI 编码助手中输入提示**：
   ```
   Follow the instructions in {relative path to instruction file}
   ```

## 初始化 Presentation Builder

### 构建演示站点

安装完成后，可以运行构建命令来创建演示站点：

```shell
/asdm-build-demo ./README.md
```

这将：
- 解析指定的 Markdown 文件
- 根据 `#` 标题拆分为独立幻灯片页面
- 生成完整的 Web 演示站点（含首页播放按钮、全屏播放、键盘导航）
- 安装依赖并启动本地开发服务器

### 可用命令

安装完成后，可以使用以下命令：

1. **`/asdm-build-demo`** - 根据 Markdown 文件构建可交互的 Web 演示站点

## 工具集结构

工具集将在 `.asdm/workspace/demos/` 下创建以下结构：

```
.asdm/workspace/demos/
└── <project-name>/
    ├── src/                    # 演示站点源代码
    │   ├── index.html          # 站点首页（含播放按钮）
    │   ├── slides/             # 幻灯片页面
    │   │   ├── slide-1.html    # 第 1 页（对应第 1 个 # 标题）
    │   │   ├── slide-2.html    # 第 2 页（对应第 2 个 # 标题）
    │   │   └── ...
    │   ├── css/                # 样式文件
    │   └── js/                 # 交互逻辑（导航、全屏）
    ├── input.md                # 原始 Markdown 输入文件
    └── package.json            # 项目配置
```

## Spec 文档

工具集使用以下规范文档作为模板：

1. **`presentation-site-spec.md`** - 演示站点的技术结构、交互行为和设计要求
2. **`markdown-structure-spec.md`** - Markdown 标题层级到幻灯片页面的映射规则和解析算法

## 验证

安装完成后，验证以下内容：

1. `.asdm/workspace/demos/` 目录已创建
2. 快捷命令已在对应提供商目录下创建（如使用 Claude Code、GitHub Copilot 或 Tencent CodeBuddy）
3. 工具集文件位于 `.asdm/toolsets/presentation-builder`

**其他提供商**：验证可访问以下指令文件：
- `.asdm/toolsets/presentation-builder/actions/asdm-build-demo.md`

## 使用示例

### 示例 1：从项目 README 构建演示站点

```shell
# 首先使用 AI 引导式安装
Follow instructions in .asdm/toolsets/presentation-builder/INSTALL.md

# 然后运行构建命令
/asdm-build-demo ./README.md
```

### 示例 2：从任意 Markdown 文件构建演示站点

```shell
# 从指定路径的 Markdown 文件构建
/asdm-build-demo ./docs/product-intro.md
```

## Usage

### 支持的提供商（Claude Code, GitHub Copilot, Tencent CodeBuddy）

安装完成后，可以使用以下命令：

- `/asdm-build-demo`: 根据 Markdown 文件构建可交互的 Web 演示站点

### 其他提供商（手动使用）

如果您的提供商未被自动检测，请按照"其他提供商的手动使用"部分中的步骤手动使用指令文件。

## Notes

- 本安装过程假设您拥有创建目录和文件的必要权限
- 命令的实际实现将由 AI 模型使用 Presentation Builder 中提供的模板和指令完成
- 请根据您实际的 AI 编码助手自定义提供商配置
- **Markdown 结构规则**：每个 `#`（一级标题）生成一个独立幻灯片页面，`##`/`###` 作为页面内展示内容
- **技术栈不限**：生成的演示站点可选择任意适合的前端技术栈

## Integration with Other Toolsets

Presentation Builder 可与其他 ASDM 工具集和上下文文件集成。可引用 Context Builder 生成的上下文文件来增强演示内容。

### 获取帮助

如遇到 Presentation Builder 工具集的问题，请参考：
- 工具集 README: `.asdm/toolsets/presentation-builder/README.md`
- 规范文档: `.asdm/toolsets/presentation-builder/spec/`

## License

Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.

---

*本安装文档是 Presentation Builder 工具集的一部分。*
