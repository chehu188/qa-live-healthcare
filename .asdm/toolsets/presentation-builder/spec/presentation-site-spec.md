# Presentation Site Specification

## Language Guidelines

This specification document must use the detected response language from the environment. Ensure all content in this document follows:

1. **Language Consistency**: Use the same language throughout the entire document
2. **Writing Conventions**: Follow the detected language's writing style and formatting
3. **Clarity**: Ensure content is clear and understandable in the chosen language

**Supported Languages**:
- English (en)
- Chinese (zh)
- Other languages based on environment detection

---

## Overview

本规范定义了由 `asdm-build-demo` 动作生成的演示站点的技术结构、交互行为和设计要求。演示站点是一个基于 Web 技术的可交互幻灯片应用，支持全屏播放和键盘导航。

**主要用途**:
- 为 AI 模型生成演示站点提供统一的技术标准
- 确保所有生成的演示站点具有一致的交互行为和视觉风格
- 定义站点目录结构、文件组织和代码规范

---

## Site Structure

生成的演示站点应使用以下目录结构：

```
<project-name>/
├── src/
│   ├── index.html              # 首页（含播放按钮）
│   ├── slides/                 # 幻灯片页面
│   │   ├── SlideOne.vue/html   # 第 1 页（对应第 1 个 # 标题）
│   │   ├── SlideTwo.vue/html   # 第 2 页（对应第 2 个 # 标题）
│   │   └── ...
│   ├── css/                    # 样式文件
│   │   └── style.css           # 全局样式
│   └── js/                     # 交互逻辑
│       ├── navigation.js       # 幻灯片导航控制
│       └── fullscreen.js       # 全屏播放控制
├── input.md                    # 原始 Markdown 输入文件
├── package.json                # 项目配置
└── vite.config.ts              # 构建配置（如使用 Vite）
```

**Key Elements**:
- `index.html`: 首页入口，包含播放按钮和站点基本信息
- `slides/`: 每个幻灯片页面为一个独立文件
- `css/`: 全局样式，包含排版、动画、响应式布局
- `js/`: 导航、全屏、过渡动画等交互逻辑

---

## Page Specifications

### Landing Page (index.html)

The landing page is the entry point of the presentation site.

**Required Elements**:
- **Project Title**: 显示演示标题，取自 Markdown 文件名或第一个 `#` 标题
- **Play Button**: 居中放置的播放按钮（▶ 图标），视觉突出
- **Slide Count**: 显示总页数信息（如"共 10 页"）
- **Subtitle**: 简短描述（可选）

**Behavior**:
- 点击播放按钮后调用 `document.documentElement.requestFullscreen()` 进入全屏
- 全屏后自动跳转到第一页幻灯片
- 按 `Esc` 退出全屏，返回首页

**Layout**:
```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│          [演示标题]                   │
│                                      │
│             ▶ (播放按钮)              │
│                                      │
│          共 N 页幻灯片                │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

### Slide Page

Each slide page renders the content from one `#` heading section.

**Required Elements**:
- **Slide Title**: 渲染 `#` 标题文本作为页面大标题
- **Slide Content**: 渲染 `##`/`###` 及其下方的所有 Markdown 内容
- **Page Indicator**: 底部显示当前页码和总页数（如 "3 / 10"）
- **Navigation Hints**: 显示键盘操作提示（"← → 翻页"）

**Content Rendering**:
- `##` 标题渲染为页面内二级标题
- `###` 标题渲染为页面内三级标题
- 支持渲染的 Markdown 元素：
  - 段落文本
  - 有序/无序列表
  - 代码块（含语法高亮）
  - 图片（自适应居中）
  - 表格
  - 引用块
  - 粗体/斜体/链接

**Layout**:
```
┌──────────────────────────────────────┐
│  [← 上一页]              [下一页 →]  │
│                                      │
│  # 幻灯片标题                         │
│  ─────────────                       │
│                                      │
│  ## 内容章节 A                        │
│  - 要点 1                            │
│  - 要点 2                            │
│                                      │
│  ### 详细内容                         │
│  内容文本...                          │
│                                      │
│                                      │
│              3 / 10                  │
└──────────────────────────────────────┘
```

---

## Interaction Specifications

### Fullscreen Playback

**Trigger**: 点击首页播放按钮

**Behavior**:
1. 调用 `document.documentElement.requestFullscreen()` 进入全屏
2. 隐藏首页非必要 UI 元素
3. 显示第一页幻灯片
4. 页面切换使用平滑过渡动画（推荐 CSS `transform` + `transition`，持续 300-500ms）
5. 监听 `fullscreenchange` 事件，退出全屏时返回首页

**Exit**:
- 按 `Esc` 键退出（浏览器原生行为）
- 可选：提供退出全屏按钮

### Keyboard Navigation

**Event Listener**: `document.addEventListener('keydown', handler)`

**Key Mappings**:

| 按键 | 行为 |
|------|------|
| `ArrowRight` (→) | 下一页 |
| `ArrowLeft` (←) | 上一页 |
| `Escape` (Esc) | 退出全屏（浏览器原生） |

**Boundary Handling**:
- 在第一页时按 `←`：无操作（不回绕）
- 在最后一页时按 `→`：无操作（不回绕）
- 页面切换时播放过渡动画

**Transition Animation**:
- 推荐使用 CSS `transform: translateX()` 实现水平滑动效果
- 过渡时长：300-500ms
- 使用 `ease-in-out` 或 `cubic-bezier` 缓动函数

---

## Styling Guidelines

### Typography

- **Slide Title** (`#`): 大号加粗，作为页面视觉焦点（如 2.5rem - 3.5rem）
- **Section Title** (`##`): 中号加粗（如 1.5rem - 2rem）
- **Subsection Title** (`###`): 小号加粗（如 1.2rem - 1.5rem）
- **Body Text**: 常规大小，行高 1.6 - 1.8
- **Code**: 使用等宽字体，代码块有背景色区分

### Color Scheme

- 背景色：白色或浅灰（`#ffffff` / `#f8f9fa`）
- 正文色：深灰或黑色（`#333333` / `#1a1a1a`）
- 标题色：主题色（建议 `#2c3e50` 或项目品牌色）
- 代码背景：浅灰（`#f4f4f5`）
- 强调色：用于链接、按钮等交互元素

### Responsive Design

- 幻灯片内容区域最大宽度：`960px - 1200px`
- 内容区域水平居中
- 图片自适应容器宽度（`max-width: 100%`）
- 代码块支持水平滚动（`overflow-x: auto`）
- 字体大小在小屏幕上适当缩小

### Code Blocks

- 使用语法高亮（推荐 Prism.js 或 highlight.js）
- 代码块有圆角边框和背景色
- 行号可选显示
- 支持水平滚动（长代码行不被截断）

---

## Output Format

**Format**: HTML + CSS + JavaScript（SPA 架构）
**Location**: `.asdm/workspace/demos/<project-name>/`
**Technology Stack**: 不限（Vite + Vanilla JS/TS, React, Vue 等均可）

**Requirements**:
- 项目可通过 `npm install && npm run dev` 启动
- 生成站点为单页应用（SPA），无需后端服务
- 支持构建为静态文件（`npm run build`）用于部署

---

## Best Practices

1. **Keep It Simple**: 优先选择轻量级技术栈，避免不必要的依赖
2. **Performance First**: 确保页面切换流畅，动画使用 GPU 加速（`transform`/`opacity`）
3. **Accessibility**: 确保键盘导航无障碍可用，添加适当的 ARIA 属性
4. **Content First**: 幻灯片设计以内容展示为核心，避免过度装饰
5. **Progressive Enhancement**: 基础功能不依赖 JavaScript，增强功能逐步添加

### Common Pitfalls to Avoid

- 避免在幻灯片中使用过多动画效果，分散观众注意力
- 避免使用固定定位元素遮挡内容
- 避免在代码块中嵌套过多层级导致渲染异常
- 避免忽略移动端适配

---

## Related Documents

- **Markdown Structure Spec**: 定义 Markdown 标题到幻灯片页面的映射规则
- **Action: asdm-build-demo**: 使用本规范生成演示站点

---

## Checklist

Before finalizing the presentation site, verify:

- [ ] 所有 `#` 标题均有对应的幻灯片页面
- [ ] 首页播放按钮可正常触发全屏
- [ ] `←`/`→` 键盘导航正常工作
- [ ] `Esc` 可退出全屏模式
- [ ] 页面切换有平滑过渡动画
- [ ] Markdown 内容（列表、代码、图片、表格）正确渲染
- [ ] 站点可通过 `npm run dev` 启动
- [ ] 视觉风格专业、一致
- [ ] 响应式布局在不同屏幕尺寸下正常显示
