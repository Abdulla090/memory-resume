# Contributing

## Prerequisites

- Node.js 22+
- npm

## Checks before opening a PR

```powershell
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

Or run `npm run check` (typecheck + test + build).

## Branching

- `main` is production-ready
- Use feature branches and open PRs against `main`

## Security

- Never commit `.env` or API keys
- See [docs/SECURITY.md](docs/SECURITY.md)
