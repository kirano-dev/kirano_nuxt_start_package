<template>
  <header class="nav">
    <div class="container-fluid flex items-center justify-between py-4">
      <nav class="flex items-center gap-8 text-white">
        <NuxtLink :to="localePath('/about')" class="nav-link">
          {{ t('nav.about') }}
        </NuxtLink>

        <NuxtLink :to="localePath('/projects')" class="nav-link">
          {{ t('nav.projects') }}
        </NuxtLink>
      </nav>

      <select
        class="h-10 rounded-lg bg-white/10 text-white border border-white/15 px-3
               outline-none focus:ring-2 focus:ring-white/20"
        :value="locale"
        @change="onChange"
      >
        <option v-for="l in locales" :key="l.code" :value="l.code" class="text-black">
          {{ l.name }}
        </option>
      </select>
    </div>
  </header>
</template>

<script setup>
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const onChange = (e) => {
  setLocale(e.target.value)
}
</script>

<style scoped lang="scss">
.nav-link {
  @apply uppercase tracking-wide hover:opacity-80 transition;
}
.nav-link.router-link-active {
  @apply underline underline-offset-4;
}
</style>
