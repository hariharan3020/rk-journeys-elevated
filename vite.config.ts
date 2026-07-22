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

// Custom plugin: copy backend/ PHP files into dist/backend/ after build
function copyBackendFiles() {
  return {
    name: "copy-backend-files",
    closeBundle() {
      const src = path.resolve(__dirname, "backend");
      const dest = path.resolve(__dirname, "dist", "backend");
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
        console.log("✓ Copied backend/ PHP files to dist/backend/");
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
    copyBackendFiles(),
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
    proxy: {
      "/backend": {
        target: "http://localhost:80",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/backend/, "/rk-journeys-elevated/backend"),
      },
    },
  },
});
