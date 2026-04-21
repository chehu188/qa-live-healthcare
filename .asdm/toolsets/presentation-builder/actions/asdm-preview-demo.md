# Instructions for asdm-preview-demo action

## Purpose
This instruction guides the AI model to preview a previously built demo website by launching a local development server. This allows the user to view and interact with the presentation in a browser before sharing or deploying it.

## Steps to Preview a Demo Website

### 1. Locate the Output Directory

- If the user provides an output directory path, use it
- If not, check `.asdm/workspace/presentations/` for existing presentations
- If multiple presentations exist, list them and ask the user to select one
- If no presentations exist, suggest running `/asdm-build-demo` first

### 2. Verify the HTML File

- Check that `index.html` exists in the output directory
- If not found, inform the user and suggest rebuilding

### 3. Launch a Local Server

Start a simple HTTP server to serve the demo website:

```bash
# Using Python (available on most systems)
cd <output-directory>
python3 -m http.server 8080

# Or using Node.js npx
npx serve <output-directory> -p 8080
```

- Default port: 8080
- If port is in use, try 8081, 8082, etc.
- Inform the user of the URL: `http://localhost:8080`

### 4. Provide Instructions

Tell the user:

- The URL to open in their browser
- How to use the presentation:
  - Click the Play button to enter fullscreen
  - Use Left/Right arrow keys to navigate
  - Press Escape to exit fullscreen
- How to stop the server (Ctrl+C)

## Error Handling

| Error | Solution |
|-------|----------|
| No presentation found | Suggest running `/asdm-build-demo` first |
| Port in use | Try alternative ports |
| Server fails to start | Try alternative method (Python vs Node.js) |

## Usage

To use this instruction, the AI model should:

1. Receive an optional output directory path from the user
2. Locate and verify the HTML file
3. Launch a local server
4. Provide the URL and usage instructions
