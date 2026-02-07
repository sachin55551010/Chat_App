import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0", // make it accessible over network
    allowedHosts: [
      "e837b41a8df6.ngrok-free.app", // 👈 your ngrok host
    ],
  },
});
