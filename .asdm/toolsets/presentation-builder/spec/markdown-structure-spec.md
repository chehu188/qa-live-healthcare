# Markdown Structure Specification

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

本规范定义了 Markdown 文件的结构规则，用于将 Markdown 内容映射为演示站点的幻灯片页面。`asdm-build-demo` 动作将按照此规范解析输入的 Markdown 文件，并将其转换为分页演示内容。

**主要用途**:
- 定义 Markdown 标题层级与幻灯片页面的对应关系
- 规定可被渲染的 Markdown 元素类型
- 提供标准的 Markdown 输入文件示例

---

## Heading-to-Slide Mapping Rules

### Core Rule

| Markdown 标题层级 | 映射目标 | 说明 |
|-------------------|----------|------|
| `#`（一级标题） | **独立幻灯片页面** | 每个 `#` 生成一个新页面 |
| `##`（二级标题） | 页面内章节标题 | 作为当前页面内的内容分区 |
| `###`（三级标题） | 页面内子章节标题 | 作为当前页面内的细分内容标题 |

### Parsing Logic

1. **按 `#` 拆分**: 以 `# ` 作为分隔符，将 Markdown 文件内容拆分为多个片段
2. **每个片段 = 一页**: 每个片段（包含 `#` 标题及其下的所有内容）对应一张幻灯片
3. **顺序保留**: 幻灯片顺序与 Markdown 中 `#` 标题的出现顺序一致
4. **内容继承**: 每个 `#` 下方的 `##`、`###` 及正文、列表、代码等均属于该幻灯片

---

## Supported Markdown Elements

### Must Support (必须支持)

以下 Markdown 元素必须在幻灯片中正确渲染：

| 元素 | 语法 | 渲染要求 |
|------|------|----------|
| 段落 | 普通文本 | 保持换行和段落间距 |
| 粗体 | `**text**` | 使用 `<strong>` 标签 |
| 斜体 | `*text*` | 使用 `<em>` 标签 |
| 链接 | `[text](url)` | 可点击链接，新窗口打开 |
| 无序列表 | `- item` | 渲染为标准列表 |
| 有序列表 | `1. item` | 渲染为带编号列表 |
| 代码块 | ` ```lang ... ``` ` | 语法高亮，等宽字体 |
| 行内代码 | `` `code` `` | 等宽字体，背景色区分 |
| 图片 | `![alt](src)` | 自适应居中显示 |

### Should Support (建议支持)

| 元素 | 语法 | 渲染要求 |
|------|------|----------|
| 表格 | `\| col \|` | 标准表格样式 |
| 引用块 | `> quote` | 左侧竖线 + 背景色 |
| 分割线 | `---` | 水平分隔线 |
| 任务列表 | `- [x] item` | 复选框 + 文本 |

### Ignore (忽略)

| 元素 | 说明 |
|------|------|
| YAML Frontmatter | 如 `---\ntitle: xxx\n---`，不渲染到幻灯片 |
| HTML 标签 | 原始 HTML 保留但不做特殊处理 |
| 脚注 | 不需要支持脚注渲染 |

---

## Markdown File Requirements

### Minimum Structure

输入的 Markdown 文件必须满足以下最低要求：

- 包含至少一个 `#`（一级标题）
- 文件编码为 UTF-8

### Recommended Structure

```markdown
# 第一页标题

本页的介绍内容。

## 要点一

- 要点描述
- 要点描述

## 要点二

详细说明文本。

### 补充说明

代码示例：

\`\`\`javascript
console.log("Hello World");
\`\`\`

# 第二页标题

本页内容...

## 功能介绍

| 功能 | 描述 |
|------|------|
| 功能A | 说明 |
| 功能B | 说明 |
```

### Title Slide Convention (可选)

如果 Markdown 的第一个 `#` 标题内容较短且没有 `##` 子标题，可将其视为"标题页"（Title Slide），采用居中大字排版：

```markdown
# ASDM 产品介绍

> 2026 年 4 月 · 内部分享

# 产品概述

## 核心价值
...
```

---

## Parsing Algorithm

### Step-by-Step Parsing

1. **读取文件**: 读取 Markdown 文件全部内容
2. **移除 Frontmatter**: 如果文件以 `---` 开头，移除 YAML frontmatter 块
3. **按 `#` 拆分**: 使用正则 `/^# .+$/m` 匹配所有一级标题，将内容分割为片段数组
4. **构建幻灯片数据**: 对每个片段：
   - 提取 `#` 标题文本作为 `slide.title`
   - 提取 `##` 标题作为 `slide.sections`
   - 将剩余 Markdown 内容作为 `slide.content`
5. **生成页面文件**: 根据幻灯片数据数组生成对应的页面文件

### Edge Cases

| 场景 | 处理方式 |
|------|----------|
| 文件无 `#` 标题 | 报错提示，终止构建 |
| `#` 标题后无内容 | 生成空白幻灯片（仅含标题） |
| 文件开头有普通文本（无 `#`） | 忽略，第一个 `#` 之前的内容不生成幻灯片 |
| 连续多个 `#` 标题 | 每个都生成独立幻灯片 |
| `#` 标题嵌套在列表/引用中 | 仅匹配行首的 `#`，忽略缩进的 `#` |
| 图片路径为相对路径 | 保持原样，不进行路径转换 |
| 图片路径为绝对 URL | 保持原样 |

---

## Usage Guidelines

当生成演示站点时：

1. **Step 1**: 验证输入 Markdown 文件存在且可读
2. **Step 2**: 按上述解析算法拆分内容
3. **Step 3**: 为每个片段生成幻灯片页面
4. **Step 4**: 将原始 Markdown 文件复制到 `input.md` 保留引用

**Important**:
- 不要修改 Markdown 原始内容的语义
- 代码块的语法标记（如 `javascript`、`python`）应传递给语法高亮库
- 图片的 `alt` 文本应保留，用于无障碍访问

---

## Output Format

**Input**: Markdown 文件（`.md`）
**Output**: 幻灯片数据结构，用于生成 HTML 页面

**数据结构示意**:
```
slides = [
  {
    index: 0,
    title: "第一页标题",
    content: "## 要点一\n- 要点描述\n..."
  },
  {
    index: 1,
    title: "第二页标题",
    content: "## 功能介绍\n| 功能 | 描述 |\n..."
  }
]
```

---

## Best Practices

### For Markdown Authors

1. **One Topic Per Slide**: 每个 `#` 标题聚焦一个主题
2. **Concise Content**: 每页内容不宜过多，保持 3-5 个要点
3. **Visual Hierarchy**: 合理使用 `##`/`###` 组织内容层级
4. **Code Examples**: 使用代码块时标注语言类型以启用语法高亮
5. **Image Sizing**: 控制图片数量和尺寸，避免页面过于拥挤

### For AI Models

1. **Preserve Semantics**: 渲染时保持 Markdown 的语义结构
2. **Handle Errors Gracefully**: 遇到无法解析的元素时跳过而非报错
3. **Responsive Images**: 图片使用 `max-width: 100%` 确保自适应
4. **Code Safety**: 对代码块中的 HTML 进行转义，避免 XSS

### Common Pitfalls to Avoid

- 不要将多个主题塞入同一个 `#` 下，应拆分为多个页面
- 不要在标题中使用过长的文本，建议控制在 50 字符以内
- 不要依赖特定的 Markdown 扩展语法（如脚注、数学公式），使用标准 CommonMark 即可

---

## Related Documents

- **Presentation Site Spec**: 定义演示站点的技术结构和交互行为
- **Action: asdm-build-demo**: 使用本规范解析 Markdown 文件

---

## Checklist

Before completing Markdown parsing, verify:

- [ ] Markdown 文件包含至少一个 `#` 标题
- [ ] 每个 `#` 标题对应一个幻灯片
- [ ] `##`/`###` 标题正确渲染为页面内章节
- [ ] 列表、代码块、图片、表格正确渲染
- [ ] 第一个 `#` 之前的文本被正确忽略
- [ ] 原始 Markdown 文件已复制到 `input.md`
- [ ] 特殊字符和 HTML 内容正确处理
