# Presentation Builder Toolset Installation

**Toolset ID:** `presentation-builder`

## Overview
This document provides instructions for installing and setting up the Presentation Builder toolset in a workspace. Presentation Builder helps transform Markdown files into interactive demo websites with fullscreen presentation mode and keyboard navigation.

## AI Guided Installation
To install this toolset using AI Guided Installation, copy and paste the following prompt into your AI Coding tool's chat window:

```shell
Follow instructions in .asdm/toolsets/presentation-builder/INSTALL.md
```

## Installation Steps

### 1. Create `.asdm/workspace/presentations` directory for Presentation Builder's workspace

Create the directory structure for storing presentation output files:

```bash
mkdir -p .asdm/workspace/presentations
```

### 2. Detect the current `Agentic Engine` provider

Detect the current AI coding assistant provider (e.g., Claude Code, GitHub Copilot, Tencent CodeBuddy). Using the following guidelines to detect the provider:

- If `.claude` directory exists, use `Claude Code`
- If `.github` directory exists, use `GitHub Copilot`
- If `.codebuddy` directory exists, use `Tencent CodeBuddy`
- If no such folder is found in the current workspace, give user a prompt to select a provider manually

### 3. Create shortcuts commands for Presentation Builder (toolset ID: `presentation-builder`) in provider's entry point

Create shortcut commands in the appropriate location based on the detected provider:

#### For Claude Code (`.claude/commands/`):
Claude Code uses Markdown files with Frontmatter metadata for slash commands. Create commands by concatenating Claude-specific frontmatter with instruction content:

```bash
mkdir -p .claude/commands/

# Build Demo command
cat > .claude/commands/asdm-build-demo.md << 'EOF'
---
description: "Build a demo website from a Markdown file"
argument-hint: "[path to markdown file]"
---

EOF
cat .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md >> .claude/commands/asdm-build-demo.md

# Preview Demo command
cat > .claude/commands/asdm-preview-demo.md << 'EOF'
---
description: "Preview the built demo website"
argument-hint: "[path to output directory]"
---

EOF
cat .asdm/toolsets/presentation-builder/actions/asdm-preview-demo.md >> .claude/commands/asdm-preview-demo.md
```

#### For GitHub Copilot (`.github/prompts/`):
GitHub Copilot uses `.prompt.md` files with YAML frontmatter. Create prompt files by concatenating GitHub-specific frontmatter with instruction content:

```bash
mkdir -p .github/prompts/

# Build Demo prompt
cat > .github/prompts/asdm-build-demo.prompt.md << 'EOF'
---
agent: 'agent'
description: 'Build a demo website from a Markdown file'
argument-hint: 'Enter path to markdown file'
---

EOF
cat .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md >> .github/prompts/asdm-build-demo.prompt.md

# Preview Demo prompt
cat > .github/prompts/asdm-preview-demo.prompt.md << 'EOF'
---
agent: 'agent'
description: 'Preview the built demo website'
argument-hint: 'Enter path to output directory'
---

EOF
cat .asdm/toolsets/presentation-builder/actions/asdm-preview-demo.md >> .github/prompts/asdm-preview-demo.md
```

#### For Tencent CodeBuddy (`.codebuddy/commands/`):
CodeBuddy doesn't support frontmatter, so simply copy the instruction files as-is:

```bash
mkdir -p .codebuddy/commands/

# Copy instruction files directly (no frontmatter needed)
cp .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md .codebuddy/commands/
cp .asdm/toolsets/presentation-builder/actions/asdm-preview-demo.md .codebuddy/commands/
```

### 4. Manual Usage for Other Providers

If your AI coding assistant provider is not detected by the automatic detection logic, you can still use the Presentation Builder manually:

1. **Navigate to the instruction files**:
   ```bash
   cd .asdm/toolsets/presentation-builder/actions/
   ```

2. **Enter a prompt** in your AI coding assistant:
   ```
   Follow the instructions in .asdm/toolsets/presentation-builder/actions/asdm-build-demo.md with [path to your markdown file]
   ```

## Available Commands

Once installed, you can use the following commands:

1. **`/asdm-build-demo`** - Build a demo website from a Markdown file
2. **`/asdm-preview-demo`** - Preview the built demo website in a browser

## Usage Examples

### Building a Presentation
```shell
# Build from a Markdown file
/asdm-build-demo ./README.md

# Build with custom output
/asdm-build-demo ./docs/presentation.md --output ./demo-site
```

### Previewing a Presentation
```shell
# Preview the built website
/asdm-preview-demo ./presentation-output
```

## Verification

After installation, verify that:

1. The `.asdm/workspace/presentations` directory exists for Presentation Builder
2. Shortcut commands for Presentation Builder are created in the appropriate provider directory
3. The Presentation Builder toolset files are located in `.asdm/toolsets/presentation-builder`

## Notes

- The generated HTML file is completely self-contained (all CSS/JS inline, no external dependencies)
- The presentation supports fullscreen mode via the Play button on the landing page
- Use Left/Right arrow keys to navigate between slides in fullscreen mode
- Each `# Heading 1` in the Markdown file becomes a separate slide
- `## Heading 2` and `### Heading 3` become content sections within each slide

## License
Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.

---

*This installation document is part of the Presentation Builder toolset. Use the build instruction to create interactive demo websites from your Markdown files.*
