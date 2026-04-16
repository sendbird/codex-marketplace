# Sendbird Codex Marketplace

This repository is the canonical Codex marketplace source for Sendbird plugins.

Current plugins:

- `cc` — Claude Code Plugin for Codex

Add the marketplace with:

```bash
codex marketplace add sendbird/codex-marketplace
```

Then install the `cc` plugin from the Sendbird marketplace inside Codex.

After marketplace install, run:

```text
$cc:setup
```

The plugin still owns global hook setup and repair.
