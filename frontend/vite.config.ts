import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // 프론트엔드 포트
    proxy: {
      // '/api'로 시작하는 요청을 백엔드로 프록시
      "/api": {
        target: "http://localhost:8080", // 백엔드 서버 주소

        changeOrigin: true,
        secure: false,
        ws: true, // WebSocket 지원
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
