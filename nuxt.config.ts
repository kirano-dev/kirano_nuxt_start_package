// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from 'node:path'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    langDir: resolve(__dirname, 'app/locales'),
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'uz', name: "O'zbek", file: 'uz.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    vueI18n: './i18n.config.js',
  },
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
