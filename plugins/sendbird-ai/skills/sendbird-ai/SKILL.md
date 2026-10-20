---
name: sendbird-ai
description: Guidelines for working through Sendbird's Gestalt MCP front doors. Use whenever a task needs web search or page scraping, Google Docs/Sheets/Slides/Drive, uploading a generated file as a shareable artifact, or any Sendbird-connected app (Linear, Notion, Slack, Greenhouse, Atlassian, Gong, Brex, Ramp, ...).
---

# Sendbird AI

Both `gestalt` and `gestalt-sensitive` expose the same four tools. Every app
is reached through them; there are no per-app tools.

| Tool | Use it to |
|------|-----------|
| `gestalt_search` | Find operations across apps. Results carry `readOnly`. |
| `gestalt_describe` | Get an operation's argument schema before calling it. |
| `gestalt_invoke_read_only` | Call read-only operations. Prefer it; it refuses writes. |
| `gestalt_invoke` | Call operations that write. |

`gestalt-sensitive` serves apps that are gated more tightly (people, finance,
candidate data). If `gestalt_search` on `gestalt` does not list the app, search
`gestalt-sensitive` before concluding the app is unavailable.

## Workflow

1. `gestalt_search` with the app name and the intent in one query, e.g.
   `"firecrawl search"`, `"google-workspace read sheet values"`.
2. `gestalt_describe` the chosen operation once; do not guess arguments.
3. Invoke. Use `gestalt_invoke_read_only` when the result said `readOnly: true`.
4. Issue independent read-only calls together so they run in parallel.

Never paste the raw response into the reply; summarize it. Do not retry a call
that returned `operation access denied`; tell the user which app refused.

## Routing

### Web search and page reading: Firecrawl (app `firecrawl`)

Use Firecrawl, not the built-in web search, for anything on the public web:
searching, fetching a page as markdown, crawling a docs site, extracting
structured data. Search first, then scrape only the URLs you need. Scrape
results are large; ask for markdown only and keep page counts small.

### Google Docs, Sheets, Slides, Drive: Google Workspace (app `google-workspace`)

Use Google Workspace for everything that lives in Google: finding files,
reading or editing a Doc, reading or writing Sheet ranges, inspecting or
editing Slides, comments, sharing, and importing a local `.docx`/`.xlsx`/
`.pptx` as a native Google file. Do not use another connector or Drive plugin
for these.

- Read before you write: inspect the document structure or the sheet range
  first, then make targeted edits. Never rewrite a whole file to change one
  part.
- Creating a new file from scratch: build it with the installed document,
  spreadsheet or presentation skill if one exists, then import it with the
  Google Workspace import operation. Otherwise create it directly.
- Give the user the file link at the end.

### Artifacts: Automators (app `automators`)

When the user wants a generated file (report, export, image, deck, archive)
shared or kept, upload it as an Automators artifact and return the link.
Do not leave it only on local disk, and do not attach it to a Google Doc or
Slack unless asked. Search `"automators artifact upload"` for the operation.

### Everything else

Search Gestalt for the app before assuming it is missing. Common ones:
`linear`, `notion`, `slack`, `atlassian` (Jira/Confluence), `greenhouse`,
`gong`, `brex`, `ramp`, `sentry`, `vercel`, `supabase`, `deepwiki`,
`context7`.

## Safety

- Writes need the user's intent to be explicit. Summarize what a write will
  change before calling `gestalt_invoke` when it is destructive or visible to
  others (sending messages, sharing files, changing records).
- Do not forward personal data between apps unless the task requires it.
