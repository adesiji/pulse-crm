# Pulse CRM — Deployment to GitHub Pages

## Steps

- [x] 0. Confirm plan with user
- [x] 1. Update `vite.config.js` to set `base: '/pulse-crm/'`
- [x] 2. Switch `main.jsx` from `BrowserRouter` to `HashRouter`
- [x] 3. Create `.github/workflows/deploy.yml` (GitHub Actions build & deploy)
- [x] 4. Build the project locally to verify it compiles
- [x] 5. Commit and push changes to GitHub
- [ ] 6. Enable GitHub Pages in repo settings (Source = "GitHub Actions") — REQUIRED, workflow's "Setup Pages" step fails without this
- [ ] 7. Re-run the workflow / push again after enabling
- [ ] 8. Verify the live site at https://adesiji.github.io/pulse-crm/
