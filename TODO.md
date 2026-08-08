# Pulse CRM — Deployment to GitHub Pages

## Steps

- [x] 0. Confirm plan with user
- [x] 1. Update `vite.config.js` to set `base: '/pulse-crm/'`
- [x] 2. Switch `main.jsx` from `BrowserRouter` to `HashRouter`
- [x] 3. Create `.github/workflows/deploy.yml` (GitHub Actions build & deploy)
- [x] 4. Build the project locally to verify it compiles
- [x] 5. Commit and push changes to GitHub
- [x] 6. Enable GitHub Pages in repo settings (Source = "GitHub Actions")
- [x] 7. Re-run the workflow — run #31275736920 succeeded
- [x] 8. Verify the live site — HTTP 200 at https://adesiji.github.io/pulse-crm/ ✅ LIVE
