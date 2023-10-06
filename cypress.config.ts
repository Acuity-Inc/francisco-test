require('dotenv').config();
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_CYPRESS_BASE_URL,
  },
  video: false
})