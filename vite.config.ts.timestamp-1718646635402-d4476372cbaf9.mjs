// vite.config.ts
import { defineConfig } from "file:///C:/wamp64/www/SoftsheetV2/node_modules/vite/dist/node/index.js";
import react from "file:///C:/wamp64/www/SoftsheetV2/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///C:/wamp64/www/SoftsheetV2/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      // plugin options
      include: ["**/*.tsx", "**/*.css"],
      // Paths to include
      exclude: ["**/*.spec.tsx"],
      // Paths to exclude
      outDir: "dist"
      // Output directory for declaration files
    })
  ],
  build: {
    lib: {
      entry: {
        index: "index.tsx"
      },
      name: "SoftSheet"
      // Replace with your library name
    },
    rollupOptions: {
      // Make sure to externalize React and ReactDOM
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
        format: "umd"
        // Universal Module Definition (UMD)
      }
    },
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3YW1wNjRcXFxcd3d3XFxcXFNvZnRzaGVldFYyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx3YW1wNjRcXFxcd3d3XFxcXFNvZnRzaGVldFYyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi93YW1wNjQvd3d3L1NvZnRzaGVldFYyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgZHRzKHtcbiAgICAgIC8vIHBsdWdpbiBvcHRpb25zXG4gICAgICBpbmNsdWRlOiBbXCIqKi8qLnRzeFwiLCBcIioqLyouY3NzXCJdLCAvLyBQYXRocyB0byBpbmNsdWRlXG4gICAgICBleGNsdWRlOiBbXCIqKi8qLnNwZWMudHN4XCJdLCAvLyBQYXRocyB0byBleGNsdWRlXG4gICAgICBvdXREaXI6IFwiZGlzdFwiLCAvLyBPdXRwdXQgZGlyZWN0b3J5IGZvciBkZWNsYXJhdGlvbiBmaWxlc1xuICAgIH0pLFxuICBdLFxuXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeToge1xuICAgICAgICBpbmRleDogXCJpbmRleC50c3hcIixcbiAgICAgIH0sXG4gICAgICBuYW1lOiBcIlNvZnRTaGVldFwiLCAvLyBSZXBsYWNlIHdpdGggeW91ciBsaWJyYXJ5IG5hbWVcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBSZWFjdCBhbmQgUmVhY3RET01cbiAgICAgIGV4dGVybmFsOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIixcbiAgICAgICAgICBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RE9NXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdDogXCJ1bWRcIiwgLy8gVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uIChVTUQpXG4gICAgICB9LFxuICAgIH0sXG4gICAgc291cmNlbWFwOiB0cnVlLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFRLFNBQVMsb0JBQW9CO0FBQ2xTLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFHaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBO0FBQUEsTUFFRixTQUFTLENBQUMsWUFBWSxVQUFVO0FBQUE7QUFBQSxNQUNoQyxTQUFTLENBQUMsZUFBZTtBQUFBO0FBQUEsTUFDekIsUUFBUTtBQUFBO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU07QUFBQTtBQUFBLElBQ1I7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDLFNBQVMsV0FBVztBQUFBLE1BQy9CLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLEVBQ2I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
