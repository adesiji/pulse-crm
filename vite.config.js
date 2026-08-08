import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base is set to '/pulse-crm/' because the app is hosted on GitHub Pages
  // under the sub-path https://<username>.github.io/pulse-crm/
  base: "/pulse-crm/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
