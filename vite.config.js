import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240, // 压缩阈值，小于这个值的文件将不会被压缩（默认10k）
      algorithm: "gzip", // 压缩算法
      ext: ".gz", // 压缩后文件的后缀
      deleteOriginFile: true, // 是否删除原文件
      // 包括/排除路径
      include: /\.(js|css|html)$/,
      exclude: /node_modules/,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1500, //加大限制的大小将500kb改成1500kb或者更大
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
