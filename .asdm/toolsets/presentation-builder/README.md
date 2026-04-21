# ASDM Toolset - Presentation Builder

toolset-id: presentation-builder
toolset-name: Presentation Builder
version: 0.0.1
updated-date: 2026-04-21
toolset-description: A toolset for building interactive demo websites from Markdown files, enabling fullscreen presentation with keyboard navigation.

## Overview

Presentation Builder (toolset-id: presentation-builder) is an ASDM toolset that transforms a Markdown file into a beautiful, interactive demo website. Each `# Heading 1` in the Markdown becomes an independent presentation slide, and `## Heading 2` / `### Heading 3` content becomes the slide's display content. The generated website supports fullscreen presentation mode and keyboard navigation (left/right arrow keys).

User can install this `toolset` into a workspace and run `INSTALL.md` document using `AI Guided Installation` to initialize the toolset for the workspace. Just simply copy and paste the following prompt into your `AI Coding` tool's chat window and hit enter:

```shell
Follow instructions in .asdm/toolsets/presentation-builder/INSTALL.md
```

## Features

Main features of Presentation Builder:

### Common features

- Provide user friendly shortcuts `actions` using provider's entry point to build presentation websites from Markdown files
- Provide standard `spec` for presentation site templates, allowing users to customize the look and feel

### Build Phase

- Parse a Markdown file and split it into slides based on `# Heading 1` sections
- Generate a complete, self-contained HTML demo website from the parsed slides
- Each `## Heading 2` and `### Heading 3` becomes structured content on the slide
- Support for lists, code blocks, tables, images, and other Markdown elements
- The generated website includes:
  - A landing page with a **Play** button to enter fullscreen presentation mode
  - Fullscreen presentation with slide-by-slide navigation
  - Left/Right arrow key navigation between slides
  - Slide counter and progress indicator
  - Beautiful, modern UI with smooth transitions
  - Responsive design for different screen sizes

### Preview Phase

- Preview the generated demo website in a local development server
- Verify the presentation flows correctly
- Check visual formatting and content accuracy

## Input / Output

### Input

- A Markdown file (e.g., `README.md`, `presentation.md`) containing the presentation content
- The file should use `# Heading 1` to separate slides

### Output

- A complete, self-contained HTML file (`index.html`) that can be opened directly in any browser
- The HTML file contains all CSS and JavaScript inline (no external dependencies)
- The file is placed in a directory named after the input file (e.g., `./presentation-output/`)

## Usage

```shell
# Build a presentation from a Markdown file
/asdm-build-demo ./README.md

# Build with custom output directory
/asdm-build-demo ./README.md --output ./my-presentation

# Build and preview
/asdm-build-demo ./README.md --preview
```

## Markdown Format

The Presentation Builder expects the following Markdown structure:

```markdown
# Slide Title 1

## Section Title
- Bullet point 1
- Bullet point 2

### Subsection Title
Content for this subsection

# Slide Title 2

## Another Section
More content...

### Details
- Detail 1
- Detail 2
```

**Rules**:
- Each `# Heading 1` creates a new slide
- `## Heading 2` and `### Heading 3` become slide content sections
- Content between headings (paragraphs, lists, code blocks, tables, images) is rendered as-is

## Toolset Installation Process

`INSTALL.md` will setup the toolset with the following steps:

- Create `.asdm/workspace/presentations` directory for Presentation Builder's workspace
- Detect the current `Agentic Engine` provider, e.g. Claude Code, GitHub Copilot, Tencent CodeBuddy etc.
- Create shortcuts commands for `Presentation Builder` in provider's entry point

## Toolset Workflow

Once `Presentation Builder` is installed, user can use the following commands:

- `/asdm-build-demo`: build a demo website from a Markdown file
- `/asdm-preview-demo`: preview the built demo website

## Toolset Structure

The Presentation Builder toolset has the following structure:

```
.asdm/
├── toolsets/
│   └── presentation-builder/                 ## Presentation Builder toolset
│       ├── INSTALL.md                        ## Installation instructions
│       ├── README.md                         ## Documentation
│       └── actions/                          ## Instructions for Presentation Builder
│           ├── asdm-build-demo.md            ## Instruction for building demo website
│           └── asdm-preview-demo.md          ## Instruction for previewing demo website
│       └── spec/                             ## Spec documents for Presentation Builder
│           ├── presentation-html-spec.md     ## Spec for the generated HTML template
│           └── slide-parser-spec.md          ## Spec for Markdown slide parsing rules
```

## Toolset Workspace

The Presentation Builder toolset has the following workspace structure:

```
.asdm/
└── workspace/                                ## Workspace for ASDM
    └── presentations/                        ## Workspace for presentations
        └── <presentation-name>/              ## Output directory for a presentation
            ├── index.html                    ## The generated demo website
            └── source.md                     ## Copy of the source Markdown file
```

## Copyright & License

Copyright (c) 2026 LeansoftX.com & iSoftStone. All rights reserved.

Licensed under the PROPRIETARY SOFTWARE LICENSE. See [LICENSE](LICENSE) in the project root for license information.
