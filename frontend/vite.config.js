import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { transformSync } from "esbuild";
import path from "node:path";

const jsAsJsxPlugin = {
  name: "js-as-jsx",
  enforce: "pre",
  transform(code, id) {
    if (!id.endsWith(".js") && !id.endsWith(".jsx")) {
      return null;
    }

    if (!id.includes(`${path.sep}src${path.sep}`)) {
      return null;
    }

    const result = transformSync(code, {
      loader: "jsx",
      jsx: "automatic",
      sourcemap: true,
    });

    return {
      code: result.code,
      map: result.map,
    };
  },
};

export default defineConfig({
  plugins: [
    jsAsJsxPlugin,
    react({
      jsxRuntime: "automatic",
      include: [/\.(js|jsx)$/],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.(js|jsx)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["home-refine-hub-1.onrender.com"],
  },
});
