# OctoFit Tracker Frontend

## Environment variables

The frontend expects `VITE_CODESPACE_NAME` to be defined for Codespaces API access.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When set, API requests use this base URL:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to relative endpoints under `/api` to avoid invalid URLs like `https://undefined-8000.app.github.dev/...`.

## API endpoint pattern

Each resource page uses:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

where `[component]` is one of: `activities`, `users`, `teams`, `leaderboard`, `workouts`.
