<template>
  <header class="nav">
    <div class="container-fluid">
      <div class="nav__inner">
        <!-- Логотип -->
        <NuxtLink :to="localePath('/')" class="nav__logo" aria-label="Главная страница" @click="closeMenu">
          <img
  :src="logoUrl"
  alt="Logo"
  class="nav__logo-image">
        </NuxtLink>

        <!-- Десктопная навигация -->
        <nav class="nav__desktop" aria-label="Основная навигация">
          <ul class="nav__list">
            <li v-for="item in navItems" :key="item.to || item.label" class="nav__item"
              :class="{ 'nav__item--dropdown': item.children }">
              <NuxtLink v-if="!item.children" :to="localePath(item.to)" class="nav__link">
                {{ item.label }}
              </NuxtLink>

              <!-- Выпадающее меню -->
              <template v-else>
                <button type="button" class="nav__link nav__dropdown-button" :aria-expanded="desktopDropdownOpen"
                  aria-haspopup="true" @click="toggleDesktopDropdown">
                  <span>{{ item.label }}</span>

                  <svg class="nav__dropdown-icon" :class="{
                    'nav__dropdown-icon--active': desktopDropdownOpen,
                  }" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>

                <Transition name="nav-dropdown">
                  <div v-if="desktopDropdownOpen" class="nav__dropdown">
                    <NuxtLink v-for="child in item.children" :key="child.to" :to="localePath(child.to)"
                      class="nav__dropdown-link" @click="closeDesktopDropdown">
                      {{ child.label }}
                    </NuxtLink>
                  </div>
                </Transition>
              </template>
            </li>
          </ul>
        </nav>

        <div class="nav__actions">
          <!-- Переключатель языков -->
          <div class="nav__language">
            <select class="nav__language-select" :value="locale" aria-label="Выбор языка" @change="onLanguageChange">
              <option v-for="language in availableLocales" :key="language.code" :value="language.code">
                {{ language.name }}
              </option>
            </select>

            <svg class="nav__language-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>

          <!-- Бургер -->
          <button type="button" class="nav__burger" aria-label="Открыть меню" :aria-expanded="mobileMenuOpen"
            @click="openMenu">
            <span class="nav__burger-line" />
            <span class="nav__burger-line" />
            <span class="nav__burger-line" />
          </button>
        </div>
      </div>
    </div>

    <!-- Мобильное модальное меню -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="nav-modal" role="dialog" aria-modal="true" aria-label="Мобильное меню">
          <div class="nav-modal__header">
            <NuxtLink :to="localePath('/')" class="nav-modal__logo" aria-label="Главная страница" @click="closeMenu">
              <img
  :src="logoUrl"
  alt="Logo"
  class="nav-modal__logo-image"
>
            </NuxtLink>

            <button type="button" class="nav-modal__close" aria-label="Закрыть меню" @click="closeMenu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="nav-modal__body">
            <nav class="nav-modal__navigation">
              <ul class="nav-modal__list">
                <li v-for="item in navItems" :key="item.to || item.label" class="nav-modal__item">
                  <NuxtLink v-if="!item.children" :to="localePath(item.to)" class="nav-modal__link" @click="closeMenu">
                    {{ item.label }}
                  </NuxtLink>

                  <template v-else>
                    <button type="button" class="nav-modal__link nav-modal__dropdown-button"
                      :aria-expanded="mobileDropdownOpen" @click="mobileDropdownOpen = !mobileDropdownOpen">
                      <span>{{ item.label }}</span>

                      <svg class="nav-modal__dropdown-icon" :class="{
                        'nav-modal__dropdown-icon--active':
                          mobileDropdownOpen,
                      }" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>

                    <Transition name="mobile-submenu">
                      <div v-if="mobileDropdownOpen" class="nav-modal__submenu">
                        <NuxtLink v-for="child in item.children" :key="child.to" :to="localePath(child.to)"
                          class="nav-modal__submenu-link" @click="closeMenu">
                          {{ child.label }}
                        </NuxtLink>
                      </div>
                    </Transition>
                  </template>
                </li>
              </ul>
            </nav>
          </div>

          <div class="nav-modal__footer">
            <span class="nav-modal__language-label">
              {{ t('nav.language') }}
            </span>

            <div class="nav-modal__languages">
              <button v-for="language in availableLocales" :key="language.code" type="button"
                class="nav-modal__language-button" :class="{
                  'nav-modal__language-button--active':
                    locale === language.code,
                }" @click="changeMobileLanguage(language.code)">
                {{ language.name }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import logoUrl from '../assets/icons/main/app.svg'
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const mobileMenuOpen = ref(false)
const desktopDropdownOpen = ref(false)
const mobileDropdownOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.map((language) => {
    if (typeof language === 'string') {
      return {
        code: language,
        name: language.toUpperCase(),
      }
    }

    return language
  })
})

const navItems = computed(() => [
  {
    label: t('nav.about'),
    to: '/about',
  },
  {
    label: t('nav.services'),
    to: '/services',
  },
  {
    label: t('nav.products'),
    to: '/products',
  },
  {
    label: t('nav.contacts'),
    to: '/contacts',
  },
  {
    label: t('nav.news'),
    children: [
      {
        label: t('nav.allNews'),
        to: '/news',
      },
      {
        label: t('nav.articles'),
        to: '/articles',
      },
      {
        label: t('nav.events'),
        to: '/events',
      },
    ],
  },
])

const lockBody = () => {
  if (!import.meta.client) return

  document.body.style.overflow = 'hidden'
}

const unlockBody = () => {
  if (!import.meta.client) return

  document.body.style.overflow = ''
}

const openMenu = () => {
  mobileMenuOpen.value = true
  lockBody()
}

const closeMenu = () => {
  mobileMenuOpen.value = false
  mobileDropdownOpen.value = false
  unlockBody()
}

const toggleDesktopDropdown = () => {
  desktopDropdownOpen.value = !desktopDropdownOpen.value
}

const closeDesktopDropdown = () => {
  desktopDropdownOpen.value = false
}

const onLanguageChange = async (event) => {
  await setLocale(event.target.value)
  closeDesktopDropdown()
}

const changeMobileLanguage = async (languageCode) => {
  await setLocale(languageCode)
  closeMenu()
}

const onEscape = (event) => {
  if (event.key !== 'Escape') return

  closeMenu()
  closeDesktopDropdown()
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
    closeDesktopDropdown()
  },
)

onMounted(() => {
  window.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEscape)
  unlockBody()
})
</script>