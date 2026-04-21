# Instructions for asdm-build-demo action

## Purpose
This instruction guides the AI model to build an interactive demo website from a Markdown file using the Presentation Builder toolset. It parses the Markdown file, splits it into slides based on `# Heading 1`, and generates a complete, self-contained HTML file that supports fullscreen presentation with keyboard navigation.

## Language Detection

Before generating any presentation content, you must detect and use the current environment's response language:

1. **Detect Response Language**: Analyze the environment settings to determine the primary language:
   - Check system/user language settings or environment configuration
   - Identify the primary language used in project documentation and comments
   - Determine the language preference based on workspace context

2. **Apply Language Consistency**: Ensure all generated UI text uses the detected language:
   - Button labels, navigation hints, and error messages
   - Status text and progress indicators
   - Maintain language consistency throughout the generated HTML file

3. **Supported Languages**:
   - English (en)
   - Chinese (zh)
   - Other languages as needed based on environment detection

**IMPORTANT**: The language detection is the FIRST step before any content generation. All output must consistently use the detected language throughout the entire process.

## Context Injection

Before building a presentation, the AI model should understand the project context if available:

### Context Files to Read (Optional)

1. **index.md** (Optional)
   - Path: `.asdm/contexts/index.md`
   - Purpose: Provides an overview of the workspace
   - This can help understand the project context for better slide organization

2. **Progressive Context Reading** (Optional - On-Demand)
   - Only if additional context is needed about the project
   - Not required for basic presentation building

## Steps to Build a Demo Website

### 1. Validate Input File

Verify the input Markdown file exists and is readable:

- Read the specified Markdown file path from the user's input
- If no file path is provided, prompt the user for one
- Validate that the file exists and has `.md` extension
- If the file doesn't exist, inform the user and stop

### 2. Parse the Markdown File

Parse the Markdown file content and split it into slides:

- Split the content by `# Heading 1` lines
- Each `# Heading 1` section becomes a separate slide
- The heading text becomes the slide title
- Content under each heading (including `## Heading 2`, `### Heading 3`, paragraphs, lists, code blocks, tables, images) becomes the slide body
- If the Markdown file starts with content before the first `# Heading 1`, treat that content as a title slide (using the file name as the title)
- Preserve all Markdown formatting within each slide section

**Parsing Rules**:
- `# Heading 1` → New slide with this as the title
- `## Heading 2` → Section heading within the slide
- `### Heading 3` → Subsection heading within the slide
- `- item` / `* item` → Unordered list items
- `1. item` → Ordered list items
- `` `code` `` → Inline code
- ` ```code block``` ` → Code block with syntax highlighting
- `| table |` → Table
- `![alt](url)` → Image
- `**bold**` → Bold text
- `*italic*` → Italic text
- `---` → Horizontal rule (visual separator within a slide)

### 3. Determine Output Directory

Set the output directory for the generated files:

- Default output directory: `.asdm/workspace/presentations/<filename-without-extension>/`
- If user specifies `--output` flag, use the specified directory
- Create the output directory if it doesn't exist

### 4. Generate the HTML Demo Website

Generate a complete, self-contained HTML file based on the parsed slides. The HTML file must include:

#### 4.1 HTML Structure
- A proper HTML5 document with `<!DOCTYPE html>`
- All CSS and JavaScript must be inline (no external dependencies)
- UTF-8 encoding
- Responsive viewport meta tag

#### 4.2 Landing Page
- Display the presentation title (first `# Heading 1` or filename)
- Show total slide count
- A prominent **Play** button to enter fullscreen presentation mode
- A brief description or subtitle if available
- Clean, modern design with centered content

#### 4.3 Presentation Mode
- Fullscreen layout covering the entire viewport
- Each slide displayed one at a time
- Slide title prominently displayed at the top
- Slide content formatted beautifully below the title
- Smooth slide transition animations (fade or slide)
- Bottom navigation bar with:
  - Current slide number / total slides
  - Progress bar
  - Left/Right navigation arrows
  - Exit fullscreen button

#### 4.4 Keyboard Navigation
- **Right Arrow** or **Space**: Next slide
- **Left Arrow**: Previous slide
- **Escape**: Exit fullscreen / return to landing page
- **Home**: Go to first slide
- **End**: Go to last slide

#### 4.5 Visual Design Requirements
- Modern, professional design with clean typography
- Color scheme: Dark background (#1a1a2e or similar) with light text
- Accent color for highlights and interactive elements
- Proper spacing and padding for readability
- Code blocks with syntax highlighting (monospace font, subtle background)
- Tables with clean borders and alternating row colors
- Images scaled to fit within the slide
- Responsive text sizing that works on different screens
- Smooth CSS transitions for slide changes
- Subtle animations for entering/exiting fullscreen

#### 4.6 Markdown Rendering
- Convert all Markdown syntax to proper HTML
- Support for:
  - Headings (h2, h3 within slides)
  - Paragraphs
  - Unordered and ordered lists
  - Code blocks with language-specific styling
  - Inline code
  - Bold and italic text
  - Links
  - Images
  - Tables
  - Horizontal rules
  - Blockquotes

### 5. Copy Source File

Copy the original Markdown file to the output directory as `source.md`:

- This preserves the original content for reference and regeneration

### 6. Verify the Output

Verify the generated HTML file:

- Check that the file was created successfully
- Verify the file is valid HTML (opening/closing tags match)
- Ensure all slides are present in the output
- Confirm the slide count matches the number of `# Heading 1` sections
- Verify keyboard navigation logic is included
- Verify fullscreen mode toggle is included

### 7. Report Results

Provide a summary of the build results to the user:

- Output file path
- Number of slides generated
- Slide titles (list all)
- Instructions for opening the demo:
  - Open the HTML file directly in a browser, or
  - Use `/asdm-preview-demo` to launch a local server

## Error Handling

### Common Errors

| Error | Solution |
|-------|----------|
| Input file not found | Prompt user to provide a valid Markdown file path |
| No `# Heading 1` found | Treat the entire file as a single slide with the filename as title |
| Empty Markdown file | Inform user and stop |
| Output directory creation failed | Check permissions and try an alternative path |
| Markdown parsing errors | Skip malformed sections and continue; warn the user |

### Recovery Strategies

1. **File Not Found**: Ask user for the correct path
2. **Empty Content**: Suggest adding content with `# Heading 1` sections
3. **Parse Errors**: Continue with what can be parsed, report issues

## Usage

To use this instruction, the AI model should:

1. Receive a Markdown file path from the user
2. Detect the response language
3. Read and validate the Markdown file
4. Parse the file into slides
5. Generate the HTML demo website following the spec template
6. Save the output files
7. Verify the output
8. Report the results to the user

## Output Summary

After completing the build phase, the following artifacts will be generated:

- `index.html` - The complete, self-contained demo website
- `source.md` - Copy of the original Markdown source file

These files are placed in the output directory (default: `.asdm/workspace/presentations/<filename>/`).

The user can open `index.html` directly in a browser or use `/asdm-preview-demo` to launch a local development server.
