export function usePageSeo() {
  const route = useRoute()
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const fallback = {
    title: 'Компания',
    description: 'Официальный сайт',
    keywords: 'Официальный сайт, компания',
  }

  const seoKey = computed(() => `seo-${route.path}-${locale.value}`)

  const { data, error, refresh } = useFetch(() => `${config.public.apiBase}/seo`, {
    method: 'GET',
    query: computed(() => ({
      url: route.path,
      locale: locale.value,
    })),
    key: seoKey,
    default: () => null,
    server: true,
    watch: [() => route.path, () => locale.value],
  })

  const seo = computed(() => data.value?.data || null)

  const title = computed(() => seo.value?.title || fallback.title)
  const description = computed(() => seo.value?.description || fallback.description)
  const keywords = computed(() => seo.value?.keywords || fallback.keywords)

  useHead(() => ({
    title: title.value,
    meta: [
      {
        name: 'description',
        content: description.value,
      },
      {
        name: 'keywords',
        content: keywords.value,
      },
      {
        property: 'og:title',
        content: title.value,
      },
      {
        property: 'og:description',
        content: description.value,
      },
    ],
  }))

  watch([() => route.path, () => locale.value], () => {
    refresh()
  })

  console.log('SEO route:', route.path)
  console.log('SEO locale:', locale.value)
  console.log('SEO response:', data.value)
  console.log('SEO error:', error.value)
}