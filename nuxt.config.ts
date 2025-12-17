// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'node:path'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    './app/assets/styles/main.scss',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
  alias: {
    '@': resolve(__dirname, '.'),
    '@app': resolve(__dirname, 'app'),
  },
  vite: {
    plugins: [svgLoader()],
  },
})
