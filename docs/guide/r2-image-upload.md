# Upload Markdown Images to Cloudflare R2

This guide shows how to set up VS Code to automatically upload 
images to R2 when writing Markdown blog posts.

## Why

- `public/` doesn't scale well on Vercel
- R2 + CDN is faster and cheaper
- Automatic upload removes the manual step

## Setup

1. Create R2 API Token (Object Read & Write)
2. Configure `Paste and Upload` extension
3. Bind a custom domain to R2

## Config

![](https://cdn.sonicaurastudio.com/blog/2b33d9eb.png)

