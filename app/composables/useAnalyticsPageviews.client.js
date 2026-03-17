export function useAnalyticsPageviews() {
  const route = useRoute()

  onMounted(() => {
    watch(
      () => route.fullPath,
      (path) => {
        if (typeof window === 'undefined') return

        if (
          typeof window.gtag === 'function' &&
          window.GA_MEASUREMENT_ID
        ) {
          window.gtag('config', window.GA_MEASUREMENT_ID, {
            page_path: path,
          })
        }

        if (typeof window.fbq === 'function') {
          window.fbq('track', 'PageView')
        }

        if (
          typeof window.ym === 'function' &&
          window.YM_COUNTER_ID
        ) {
          window.ym(window.YM_COUNTER_ID, 'hit', path)
        }
      },
      { immediate: true }
    )
  })
}