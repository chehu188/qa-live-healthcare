# ASDM Toolset - Presentation Builder

toolset-id: presentation-builder
toolset-name: Presentation Builder
version: 0.0.1
updated-date: 2026-04-23
toolset-description: 基于 Markdown 文件自动生成可交互的 Web 演示站点，支持全屏播放和键盘导航。

## 概述

Presentation Builder（工具集 ID: `presentation-builder`）是一个将 Markdown 文件转换为可交互 Web 演示站点的 ASDM 工具集。用户只需提供一个 Markdown 文件作为输入，工具即可自动生成一个完整的演示网站。该网站支持全屏播放、键盘左右键翻页等交互功能，适合产品介绍、技术分享、培训教学等多种演示场景。

工具集的核心设计理念是"Markdown 即演示"——用户按照简单的标题层级规则编写 Markdown 内容，工具负责将其渲染为专业的分页演示站点。一级标题（`#`）自动成为独立的演示页面，二级/三级标题（`##`/`###`）作为页面内的展示内容，无需学习额外的标记语法。

用户可以将此工具集安装到工作区中，运行 `INSTALL.md` 文档并使用 `AI 引导式安装` 来为工作区初始化工具集。

## 功能特性

### 通用功能

- 基于 Markdown 文件生成演示站点，技术栈不限
- 站点首页提供播放按钮，点击可进入全屏播放模式
- 支持键盘左右方向键进行页面切换
- 演示页面与 Markdown 标题层级一一对应

### 功能1: 演示站点构建 (build-demo)

根据用户提供的 Markdown 文件，构建一个完整的可交互 Web 演示站点。

**输入**:
- Markdown 文件路径（必需），例如 `./README.md`

**输出**:
- 完整的演示站点项目（包含 HTML、CSS、JS 及构建配置）
- 生成的站点可直接通过本地开发服务器或静态部署进行访问

**使用场景**:
- 需要将产品文档、技术方案等内容快速转化为演示站点
- 团队内部培训或技术分享需要可交互的演示材料
- 向客户展示产品功能或解决方案

**Markdown 结构规则**:
- 每个 **一级标题**（`#`）生成一个独立的演示页面
- 每个一级标题下的 **二级标题**（`##`）和 **三级标题**（`###`）作为该页面的展示内容
- 页面之间的顺序与 Markdown 中一级标题的出现顺序一致

**命令示例**:
```
/asdm-build-demo ./README.md
```

### 功能2: 全屏播放模式 (fullscreen-playback)

生成的演示站点首页提供播放按钮，用户点击后进入全屏演示模式。

**输入**:
- 已构建的演示站点

**输出**:
- 全屏沉浸式演示体验

**行为特性**:
- 首页显示"播放"按钮（▶），用户点击后进入全屏播放状态
- 全屏模式下隐藏站点导航等非必要 UI 元素，最大化展示区域
- 支持按 `Esc` 键退出全屏模式

### 功能3: 键盘导航 (keyboard-navigation)

在演示模式下，用户可以通过键盘完成页面切换。

**输入**:
- 处于播放状态的演示站点

**输出**:
- 流畅的页面切换交互

**交互说明**:
- `←`（左方向键）：切换到上一页
- `→`（右方向键）：切换到下一页
- 页面切换时支持平滑过渡动画

## 工具集安装流程

`INSTALL.md` 将通过以下步骤设置工具集：

1. **检测 AI 助手提供商**: 自动识别当前环境使用的 AI 编码助手（如 Tencent CodeBuddy）
2. **创建命令快捷方式**: 在 `.codebuddy/commands/` 目录下注册以下命令：
   - `/asdm-build-demo`: 根据 Markdown 文件构建演示站点
3. **初始化工作区目录**: 创建 `.asdm/workspace/demos/` 目录用于存放演示项目
4. **验证安装**: 输出安装确认信息和使用指引

详细安装步骤请参考 [INSTALL.md](INSTALL.md) 文档。

## 工具集工作流程

一旦 Presentation Builder 安装完成，用户可以使用以下命令：

| 命令 | 说明 | 示例 |
|------|------|------|
| `/asdm-build-demo` | 根据 Markdown 文件构建演示站点 | `/asdm-build-demo ./README.md` |

### 典型工作流

```
Step 1: 准备 Markdown 文件
┌─────────────────────────────────────────────┐
│ # 页面一标题                                  │
│ ## 内容要点 1                                 │
│ ## 内容要点 2                                 │
│                                              │
│ # 页面二标题                                  │
│ ### 详细内容 A                               │
│ ### 详细内容 B                               │
└─────────────────────────────────────────────┘
                    ↓
Step 2: 构建演示站点
┌─────────────────────────────────────────────┐
│ /asdm-build-demo ./README.md                │
└─────────────────────────────────────────────┘
                    ↓
Step 3: 启动站点并播放
┌─────────────────────────────────────────────┐
│ 点击首页播放按钮 → 全屏演示 → 左右键翻页      │
└─────────────────────────────────────────────┘
```

## 工具集结构

Presentation Builder 工具集具有以下结构：

```
.asdm/
└── toolsets/
    └── presentation-builder/
        ├── INSTALL.md
        ├── README.md
        ├── actions/
        │   └── asdm-build-demo.md
        └── spec/
            ├── presentation-site-spec.md
            └── markdown-structure-spec.md
```

## 工具集工作区

Presentation Builder 工具集具有以下工作区结构：

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

## 版权与许可

Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.
