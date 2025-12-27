// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({

//   plugins: [ tailwindcss(),],
//   define:{
//     'process.env': {}
//   }
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
