# Instructions for asdm-generate-install action

## Purpose
This instruction guides the AI model to generate installation instructions for an existing toolset. It creates a comprehensive INSTALL.md file that includes installation steps for all supported AI providers, workspace setup, and usage examples.

## Language Detection

Before generating the installation file, you must detect and use the current environment's response language:

1. **Detect Response Language**: Analyze the environment settings to determine the primary language:
   - Check system/user language settings or environment configuration
   - Identify the primary language used in project documentation and comments
   - Determine the language preference based on workspace context

2. **Apply Language Consistency**: Ensure all generated files use the detected language:
   - Use the same language for all markdown files, comments, and documentation
   - Maintain language consistency across all generated files
   - Follow the detected language's writing conventions and formatting

3. **Supported Languages**:
   - English (en)
   - Chinese (zh)
   - Other languages as needed based on environment detection

**IMPORTANT**: The language detection is the FIRST step before any file generation. All output must consistently use the detected language throughout the entire process.

## Context Injection

Before generating INSTALL.md, the AI model should read the toolset's README.md to understand installation requirements:

### Context Files to Read (Required)

1. **Toolset README.md** (Required)
   - Path: `.asdm/toolsets/<toolset-id>/README.md`
   - Purpose: Understand the toolset's structure, workspace requirements, and workflow

2. **Action Files** (Required)
   - Path: `.asdm/toolsets/<toolset-id>/actions/*.md`
   - Purpose: Understand what directories and files the toolset needs

## Steps to Generate Installation Guide

### 1. Identify the Toolset

The action receives a toolset ID as input. If not provided, prompt the user to select a toolset:
- List existing toolsets in `.asdm/toolsets/`
- Display toolset IDs and names
- Ask user to select which toolset to generate installation guide for

### 2. Validate Toolset Exists

Check if the toolset exists:
- Path: `.asdm/toolsets/<toolset-id>/README.md`
- If the README.md doesn't exist, inform the user that the toolset hasn't been initialized yet
- Suggest running `/asdm-init-toolset <toolset-id>` first

### 3. Load Toolset Information

Read the toolset's README.md to understand:
- Toolset purpose and description
- Toolset structure
- Toolset workspace (what directories/files it needs)
- Actions and their requirements
- Workflow

### 4. Determine Installation Requirements

Analyze the toolset to determine what needs to be installed:

**Common Installation Requirements:**
1. **Toolset directory**: `.asdm/toolsets/<toolset-id>/`
2. **Workspace directory**: Based on Toolset Workspace section
3. **Commands**: For each action in `actions/` directory
4. **Skills/MCPs**: Any special skills or MCPs the toolset uses

**Method:**
- Read the "Toolset Workspace" section from README.md
- List all action files from `actions/` directory
- Check for any skill or MCP references in action files
- Compile a list of installation requirements

### 5. Generate INSTALL.md

Create a comprehensive INSTALL.md file following this structure:

```markdown
# <Toolset Name> Installation

**Toolset ID:** `<toolset-id>`

## Overview
This document provides instructions for installing and setting up the <Toolset Name> toolset. <Toolset description from README.md>.

## AI Guided Installation
To install this toolset using AI Guided Installation, copy and paste the following prompt into your AI Coding tool's chat window:

```shell
Follow instructions in .asdm/toolsets/<toolset-id>/INSTALL.md
```

## Installation Steps

### 1. Create workspace directories

<Describe what workspace directories to create based on Toolset Workspace section>

```bash
mkdir -p <workspace-directory-1>
mkdir -p <workspace-directory-2>
```

### 2. Detect the current `Agentic Engine` provider

Detect the current AI coding assistant provider (e.g., Claude Code, GitHub Copilot, Tencent CodeBuddy). Using the following guidelines to detect the provider:

- If `.claude` directory exists, use `Claude Code`
- If `.github` directory exists, use `GitHub Copilot`
- If `.codebuddy` directory exists, use `Tencent CodeBuddy`
- If no such folder is found in the current workspace, give user a prompt to select a provider manually

### 3. Create shortcuts commands for <Toolset Name> (toolset ID: `<toolset-id>`) in provider's entry point

Create shortcut commands in the appropriate location based on the detected provider. The installation process is consistent across all providers - we use `cat` to concatenate provider-specific frontmatter with the actual instruction content:

#### For Claude Code (`.claude/commands/`):
Claude Code uses Markdown files with Frontmatter metadata for slash commands. Create commands by concatenating Claude-specific frontmatter with instruction content:

```bash
mkdir -p .claude/commands/

# Action 1 command
cat > .claude/commands/<action-name>.md << 'EOF'
---
description: "<Brief description from feature>"
argument-hint: "[<argument hint>]"
---

EOF
cat .asdm/toolsets/<toolset-id>/actions/<action-name>.md >> .claude/commands/<action-name>.md

# Action 2 command
cat > .claude/commands/<action-name>.md << 'EOF'
---
description: "<Brief description from feature>"
argument-hint: "[<argument hint>]"
---

EOF
cat .asdm/toolsets/<toolset-id>/actions/<action-name>.md >> .claude/commands/<action-name>.md

[Continue for all actions]
```

#### For GitHub Copilot (`.github/prompts/`):
GitHub Copilot uses `.prompt.md` files with YAML frontmatter. Create prompt files by concatenating GitHub-specific frontmatter with instruction content:

```bash
mkdir -p .github/prompts/

# Action 1 prompt
cat > .github/prompts/<action-name>.prompt.md << 'EOF'
---
agent: 'agent'
description: '<Brief description from feature>'
argument-hint: '<Argument hint>'
---

EOF
cat .asdm/toolsets/<toolset-id>/actions/<action-name>.md >> .github/prompts/<action-name>.prompt.md

# Action 2 prompt
cat > .github/prompts/<action-name>.prompt.md << 'EOF'
---
agent: 'agent'
description: '<Brief description from feature>'
argument-hint: '<Argument hint>'
---

EOF
cat .asdm/toolsets/<toolset-id>/actions/<action-name>.md >> .github/prompts/<action-name>.prompt.md

[Continue for all actions]
```

#### For Tencent CodeBuddy (`.codebuddy/commands/`):
CodeBuddy doesn't support frontmatter, so simply copy the instruction files as-is:

```bash
mkdir -p .codebuddy/commands/

# Copy instruction files directly (no frontmatter needed)
cp .asdm/toolsets/<toolset-id>/actions/<action-name>.md .codebuddy/commands/
cp .asdm/toolsets/<toolset-id>/actions/<action-name>.md .codebuddy/commands/

[Continue for all actions]
```

### 4. Manual Usage for Other Providers

If your AI coding assistant provider is not detected by the automatic detection logic (Claude Code, GitHub Copilot, or Tencent CodeBuddy), you can still use the <Toolset Name> manually. Follow these steps:

#### Direct Instruction Usage
You can directly use the instruction files by copying their relative paths and pasting them into your AI coding assistant's chat window:

1. **Navigate to the instruction files**:
   ```bash
   cd .asdm/toolsets/<toolset-id>/actions/
   ```

2. **Right-click on the desired instruction file** and copy its relative path:
   - For <action 1>: `<action-name>.md`
   - For <action 2>: `<action-name>.md`
   - For <action 3>: `<action-name>.md`

3. **Enter a prompt** in your AI coding assistant:
   ```
   Follow the instructions in {relative path to instruction file}
   ```

## Initializing <Toolset Name>

### <First Action Description>
After installation, you can start by running the first action:

```shell
Follow the instructions in .asdm/toolsets/<toolset-id>/actions/<action-name>.md
```

This will:
- <List what this action does from action file>

### <Second Action Description>
After completing the first action, you can run subsequent actions:

```shell
Follow the instructions in .asdm/toolsets/<toolset-id>/actions/<action-name>.md
```

This will:
- <List what this action does from action file>

[Continue for all actions with descriptions]

### Available Commands
Once installed, you can use the following commands:

1. **`/<action-name>`** - <Brief description from feature>
2. **`/<action-name>`** - <Brief description from feature>
3. **`/<action-name>`** - <Brief description from feature>

[Continue for all actions]

## Toolset Structure
The toolset will create the following structure in `.asdm/workspace/<workspace-type>/`:

```
.asdm/workspace/<workspace-type>/
├── <file-1>
├── <file-2>
└── <directory>/
    └── <file>
```

[Based on Toolset Workspace section from README.md]

## Spec Documents
The toolset uses the following spec documents as templates:

1. **`<spec-one>`** - Template for generating <document type>
2. **`<spec-two>`** - Template for generating <document type>
3. **`<spec-three>`** - Template for generating <document type>

[Based on spec files in spec/ directory]

## Verification

After installation, verify that:

1. The `<workspace-directory>` directory exists for <Toolset Name>
2. Shortcut commands for <Toolset Name> (toolset ID: `<toolset-id>`) are created in the appropriate provider directory (if using Claude Code, GitHub Copilot, or Tencent CodeBuddy)
3. The <Toolset Name> toolset files are located in `.asdm/toolsets/<toolset-id>` (toolset ID: `<toolset-id>`)

**For other providers**: Verify that you can access the instruction files at:
- `.asdm/toolsets/<toolset-id>/actions/<action-name>.md`
- `.asdm/toolsets/<toolset-id>/actions/<action-name>.md`
- [Continue for all actions]

## Usage Examples

### Example 1: <Example Title>
```shell
# First, install the toolset using AI Guided Installation
Follow instructions in .asdm/toolsets/<toolset-id>/INSTALL.md

# Then run the first action
Follow the instructions in .asdm/toolsets/<toolset-id>/actions/<action-name>.md

# Example prompt when using slash command:
/<action-name> <example arguments>
```

### Example 2: <Example Title>
```shell
# Run the action
Follow the instructions in .asdm/toolsets/<toolset-id>/actions/<action-name>.md

# Example prompt when using slash command:
/<action-name> <example arguments>
```

[Provide 1-2 usage examples based on toolset workflow]

## Usage

### For Supported Providers (Claude Code, GitHub Copilot, Tencent CodeBuddy)
Once installed, you can use the following commands:

- `/<action-name>`: <Brief description from feature>
- `/<action-name>`: <Brief description from feature>
- `/<action-name>`: <Brief description from feature>
[Continue for all actions]

### For Other Providers (Manual Usage)
If your provider is not automatically detected, you can manually use the instructions by following the steps in the "Manual Usage for Other Providers" section above.

## Notes

- This installation process assumes you have the necessary permissions to create directories and files
- The actual implementation of the commands will be handled by the AI model using the templates and instructions provided in <Toolset Name> (toolset ID: `<toolset-id>`)
- Make sure to customize the provider-specific setup based on your actual AI coding assistant
- The toolset ID `<toolset-id>` should be used consistently when referring to <Toolset Name> in commands and documentation
- **For providers not in the detection logic**: Users can manually use the instruction files by copying their relative paths and entering prompts like "follow the instructions in .asdm/toolsets/<toolset-id>/actions/<action-name>.md"
<Add any toolset-specific notes>

## Integration with Other Toolsets
<Toolset Name> can integrate with other ASDM toolsets and context files. Context files from Context Builder can be referenced to ground the generated documents to the actual project.

### Getting Help
For issues with <Toolset Name> toolset, refer to:
- [ASDM Documentation](https://asdm.ai/docs)
- Toolset README: `.asdm/toolsets/<toolset-id>/README.md`
- Spec documents in `.asdm/toolsets/<toolset-id>/spec/`

## License
Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.

---

*This installation document is part of the <Toolset Name> toolset. <Add any closing notes>.*
```

**INSTALL.md Path**: `.asdm/toolsets/<toolset-id>/INSTALL.md`

### 6. Generate Installation Summary

Create a summary for the developer:

```markdown
# Installation Guide Generation Summary

## Toolset
- **Toolset ID**: <toolset-id>
- **Toolset Name**: <Toolset Name>

## Generated Files
- INSTALL.md: `.asdm/toolsets/<toolset-id>/INSTALL.md`

## Installation Support
The INSTALL.md includes installation instructions for:
- Claude Code (.claude/commands/)
- GitHub Copilot (.github/prompts/)
- Tencent CodeBuddy (.codebuddy/commands/)
- Manual usage for other providers

## Next Steps
1. Review the generated INSTALL.md
2. Test the installation commands
3. Use `/asdm-complete-toolset <toolset-id>` to finalize the toolset

## Important Notes
- INSTALL.md supports multiple AI providers
- Workspace setup commands are included
- Usage examples are provided for each action
- Manual usage is supported for unsupported providers
```

Save this summary to a temporary location or display it to the developer.

## Execution Guidelines

### When to Use This Action

Use this action when:
- You have defined the toolset's features and specs
- You need to create installation instructions
- You want to support multiple AI providers

### Installation Guide Guidelines

When generating INSTALL.md:

1. **Be Comprehensive**: Cover all installation steps
2. **Support Multiple Providers**: Include Claude Code, GitHub Copilot, Tencent CodeBuddy
3. **Provide Examples**: Include usage examples for each action
4. **Be Clear**: Make instructions easy to follow
5. **Include Verification**: Add steps to verify installation

### Workspace Setup Guidelines

When describing workspace setup:
- Based on Toolset Workspace section from README.md
- Use `mkdir -p` commands
- Create all necessary directories
- Explain what each directory is for

### Command Generation Guidelines

When generating provider-specific commands:
- Claude Code: Use frontmatter with description and argument-hint
- GitHub Copilot: Use YAML frontmatter with agent, description, argument-hint
- CodeBuddy: Copy files directly (no frontmatter)
- Use `cat` to concatenate frontmatter with action content

## Usage

To use this instruction, the AI model should:
1. Detect the response language
2. Identify the toolset (prompt if not provided)
3. Validate the toolset exists and has been initialized
4. Load the toolset's README.md and action files
5. Determine installation requirements (workspace, commands, skills/MCPs)
6. Generate a comprehensive INSTALL.md file
7. Include installation steps for all supported providers
8. Add workspace setup, usage examples, and verification steps
9. Present an installation guide generation summary with next steps

## Output Summary

After completing the installation guide generation, the following will be generated:
- INSTALL.md: `.asdm/toolsets/<toolset-id>/INSTALL.md`

The INSTALL.md includes:
- Installation steps for Claude Code, GitHub Copilot, and Tencent CodeBuddy
- Manual usage instructions for other providers
- Workspace setup commands
- Usage examples for each action
- Verification steps
- Getting help section
