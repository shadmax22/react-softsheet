import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      // plugin options
      include: ["**/*.tsx", "**/*.css"], // Paths to include
      exclude: ["**/*.spec.tsx"], // Paths to exclude
      outDir: "dist", // Output directory for declaration files
    }),
  ],

  build: {
    lib: {
      entry: {
        index: "index.tsx",
      },
      name: "SoftSheet", // Replace with your library name
    },
    rollupOptions: {
      // Make sure to externalize React and ReactDOM
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        format: "umd", // Universal Module Definition (UMD)
      },
    },
    sourcemap: true,
  },
});
