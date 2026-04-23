# Instructions for asdm-build-demo action

## Purpose

This instruction guides the AI model to build an interactive web-based presentation site from a Markdown file. It parses the Markdown file's heading structure to generate individual slide pages, creates a landing page with a play button for fullscreen playback, and implements keyboard navigation for slide switching.

## Language Detection

Before generating any content, you must detect and use the current environment's response language:

1. **Detect Response Language**: Analyze the environment settings to determine the primary language:
   - Check system/user language settings or environment configuration
   - Identify the primary language used in project documentation and comments
   - Determine the language preference based on workspace context

2. **Apply Language Consistency**: Ensure all generated content uses the detected language:
   - Use the same language for all markdown files, comments, and documentation
   - Maintain language consistency across all generated files
   - Follow the detected language's writing conventions and formatting

3. **Supported Languages**:
   - English (en)
   - Chinese (zh)
   - Other languages as needed based on environment detection

**IMPORTANT**: The language detection is the FIRST step before any content generation. All output must consistently use the detected language throughout the entire process.

## Context Injection

Before building the demo site, the AI model should read the toolset README and spec files for reference:

### Context Files to Read (Optional)

1. **Presentation Site Spec** (Recommended)
   - Path: `.asdm/toolsets/presentation-builder/spec/presentation-site-spec.md`
   - Purpose: Understand the presentation site's technical requirements and design specifications

2. **Markdown Structure Spec** (Recommended)
   - Path: `.asdm/toolsets/presentation-builder/spec/markdown-structure-spec.md`
   - Purpose: Understand how Markdown headings map to slides

3. **Progressive Context Reading** (Optional)
   - Only read additional context if needed for customization

## Steps to Build Demo Site

### 1. Receive and Validate Input

Receive the Markdown file path from the user command parameter:

- If a path is provided (e.g., `/asdm-build-demo ./README.md`), use it as the input file
- If no path is provided, prompt the user to specify a Markdown file path

Validate the input:
- Verify the Markdown file exists at the specified path
- Read the file content and confirm it contains at least one `#` (level-1 heading)
- If validation fails, inform the user and stop

### 2. Parse Markdown Structure

Parse the Markdown file to extract the slide structure:

1. Split the content by level-1 headings (`# heading`)
2. Each level-1 heading becomes an independent slide page
3. The content under each level-1 heading (including `##` and `###` sub-headings, paragraphs, lists, code blocks, images, etc.) becomes the slide content
4. Ignore the toolset's own README metadata (toolset-id, toolset-name, etc.) if the input is the toolset README — only parse heading-based content

### 3. Determine Output Directory

Determine where to generate the demo site:

1. Derive a project name from the Markdown filename (without extension)
2. Create the output directory: `.asdm/workspace/demos/<project-name>/`
3. Create the following subdirectory structure:
   ```
   .asdm/workspace/demos/<project-name>/
   ├── src/
   │   ├── slides/
   │   ├── css/
   │   └── js/
   ├── input.md
   └── package.json
   ```

### 4. Generate the Presentation Site

Build the complete presentation site using an appropriate technology stack (e.g., Vite + Vanilla JS, or React, or any suitable framework):

#### 4.1 Landing Page (`index.html`)

Create a landing page that includes:
- A centered play button (▶ icon) that is visually prominent
- Brief project title or description derived from the first `#` heading or the Markdown filename
- When the play button is clicked, enter fullscreen presentation mode
- Use the Fullscreen API (`element.requestFullscreen()`) to enter fullscreen

#### 4.2 Slide Pages

For each level-1 heading parsed in step 2:

- Generate a slide component/page
- Render the Markdown content under that heading as formatted HTML
- Each slide should support:
  - Proper typography for headings (`##`, `###`)
  - Rendered Markdown elements: paragraphs, lists, code blocks, images, tables, blockquotes
  - Appropriate slide layout and styling

#### 4.3 Fullscreen Playback

Implement fullscreen playback behavior:

- Clicking the play button on the landing page triggers `document.documentElement.requestFullscreen()`
- In fullscreen mode, hide non-essential UI elements (navigation chrome, scrollbars)
- Display slides in a centered, maximized layout
- Show a minimal slide counter (e.g., "3 / 10") and an exit button
- Pressing `Esc` exits fullscreen mode and returns to the landing page
- The browser's native `Esc` to exit fullscreen is sufficient; no additional logic needed

#### 4.4 Keyboard Navigation

Implement keyboard-based slide navigation:

- Listen for `keydown` events on the document
- `ArrowRight` (→): Navigate to the next slide
- `ArrowLeft` (←): Navigate to the previous slide
- At the first slide, `←` should have no effect (or wrap to last slide)
- At the last slide, `→` should have no effect (or wrap to first slide)
- Implement smooth transition animations between slides (e.g., CSS transitions or animations)

#### 4.5 Styling

Apply professional presentation styling:

- Clean, modern design with good typography
- Responsive layout that works across screen sizes
- Code blocks should have syntax highlighting (use a lightweight library if needed)
- Images should be responsive and centered
- Sufficient contrast for readability
- Consistent spacing and visual hierarchy

### 5. Copy Input Markdown File

Copy the original Markdown file to the output directory:

- Path: `.asdm/workspace/demos/<project-name>/input.md`
- Purpose: Preserve the source file for reference

### 6. Generate Build Configuration

Create necessary build configuration files:

- `package.json` with dev/build scripts (if applicable)
- Any framework-specific configuration files
- Ensure the project can be started with a simple command (e.g., `npm run dev` or similar)

### 7. Start Development Server

After generating the site:

1. Install dependencies if any (e.g., `npm install`)
2. Start the local development server (e.g., `npm run dev`)
3. Display the local URL to the user (e.g., `http://localhost:5173`)
4. Inform the user they can open the URL, click the play button, and use arrow keys to navigate

## Execution Guidelines

### When to Use This Action

Use this action when:
- A user wants to create a presentation from an existing Markdown document
- A user needs an interactive demo site for product introductions, tech talks, or training
- A user wants to quickly convert documentation into a slideshow format

### Technology Stack Guidelines

- The technology stack is flexible — choose the most appropriate one for the task
- Prefer lightweight, fast-setup frameworks (e.g., Vite + Vanilla JS/TS, or a minimal SPA framework)
- Avoid heavy frameworks unless the content complexity warrants it
- Ensure the generated project is self-contained and can run independently

### Slide Design Guidelines

- Each slide should focus on one main topic (derived from its `#` heading)
- Content should be concise and well-formatted
- Use proper Markdown rendering for all content elements
- Slides should look professional without requiring manual CSS adjustments

### Quality Checklist

Before completing, verify:
- [ ] All `#` headings from the Markdown have corresponding slides
- [ ] Slide content renders correctly (headings, lists, code, images)
- [ ] Play button on landing page triggers fullscreen mode
- [ ] `←` and `→` arrow keys navigate between slides
- [ ] `Esc` exits fullscreen mode
- [ ] Slide transitions are smooth
- [ ] The site is visually professional and readable
- [ ] Development server starts successfully

## Usage

To use this instruction, the AI model should:
1. Detect the response language
2. Receive the Markdown file path from the user command
3. Validate the input Markdown file exists and has content
4. Parse the Markdown structure (split by `#` headings)
5. Generate the complete presentation site with landing page, slides, fullscreen playback, and keyboard navigation
6. Copy the input Markdown to the output directory
7. Create build configuration and install dependencies
8. Start the development server and provide the URL to the user

## Output Summary

After completing the action, the following artifacts will be generated:

- **Presentation site**: `.asdm/workspace/demos/<project-name>/src/`
  - Landing page with play button (`index.html`)
  - Individual slide pages (one per `#` heading)
  - Stylesheet (`css/`)
  - Navigation and fullscreen logic (`js/`)
- **Source reference**: `.asdm/workspace/demos/<project-name>/input.md`
- **Build config**: `.asdm/workspace/demos/<project-name>/package.json`

The site will be started on a local development server, and the user can open it in a browser to start presenting.
