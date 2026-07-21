import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import fs from "fs";

// Custom plugin: remove ezgif-split from dist after build
function excludeEzgifSplit() {
  return {
    name: "exclude-ezgif-split",
    closeBundle() {
      const target = path.resolve(__dirname, "dist", "ezgif-split");
      if (fs.existsSync(target)) {
        fs.rmSync(target, { recursive: true, force: true });
        console.log("✓ Removed dist/ezgif-split from build output.");
      }
    },
  };
}

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    excludeEzgifSplit(),
  ],
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
  },
  build: {
    outDir: "dist",
    copyPublicDir: true,
  },
  publicDir: "public",
  // Exclude images folder from public dir copy
  server: {
    fs: {
      strict: false,
    },
  },
});
