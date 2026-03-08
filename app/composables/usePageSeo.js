export function usePageSeo() {
  const route = useRoute()
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const fallback = {
    title: 'Компания',
    description: 'Официальный сайт',
    keywords: 'Официальный сайт, компания',
  }

  const { data } = useFetch(`${config.public.apiBase}/seo`, {
    query: {
      url: route.path,
      locale: locale.value,
    },
    key: `seo-${route.path}-${locale.value}`,
    default: () => null,
    server: true,
  })

  const seo = computed(() => data.value?.data || null)

  const title = computed(() => seo.value?.title || fallback.title)
  const description = computed(() => seo.value?.description || fallback.description)
  const keywords = computed(() => seo.value?.keywords || fallback.keywords)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
  })

  useHead({
    meta: [
      {
        name: 'keywords',
        content: keywords,
      },
    ],
  })
}