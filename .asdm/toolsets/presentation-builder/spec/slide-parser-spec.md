# Slide Parser Spec

## Overview

This spec defines the rules for parsing a Markdown file into slides for the Presentation Builder toolset. The parser splits Markdown content by `# Heading 1` sections and converts each section into a slide object.

## Parsing Rules

### Slide Separation

1. The Markdown file is split by lines that start with `# ` (one hash followed by a space)
2. Each `# Heading 1` line marks the beginning of a new slide
3. The heading text (after `# `) becomes the slide title
4. All content after the heading until the next `# Heading 1` or end of file becomes the slide body

### Edge Cases

| Scenario | Handling |
|----------|----------|
| Content before the first `# Heading 1` | Create a title slide using the filename as the title |
| Empty slide (only `# Title` with no content) | Create a slide with just the title |
| Multiple blank lines between sections | Trim and ignore extra whitespace |
| No `# Heading 1` in the file | Treat the entire file as a single slide |
| Nested headings (`#### ` or deeper) | Render as h4/h5/h6 within the slide |

### Content Within Slides

Each slide body may contain:

- `## Heading 2` → Section headings within the slide
- `### Heading 3` → Subsection headings within the slide
- Paragraphs of text
- Unordered lists (`- item` or `* item`)
- Ordered lists (`1. item`)
- Code blocks (` ```language ... ``` `)
- Inline code (`` `code` ``)
- Bold (`**text**`) and italic (`*text*`)
- Links (`[text](url)`)
- Images (`![alt](url)`)
- Tables (`| header | header |`)
- Blockquotes (`> quote`)
- Horizontal rules (`---`)

### Output Format

The parser should produce an array of slide objects:

```javascript
[
  {
    title: "Slide Title",
    rawContent: "## Section\n- item 1\n- item 2",
    htmlContent: "<h2>Section</h2><ul><li>item 1</li><li>item 2</li></ul>"
  }
]
```

## Validation

After parsing, validate:

1. At least one slide exists (even if empty)
2. Each slide has a non-empty title
3. No Markdown syntax errors that would prevent rendering
4. Report warnings for any unsupported or malformed Markdown
