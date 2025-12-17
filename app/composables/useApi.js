export function useApi() {
  const config = useRuntimeConfig()

  const request = (url, opts = {}) => {
    return $fetch(url, {
      baseURL: config.public.apiBase || '/api',
      credentials: 'include',
      ...opts,
      headers: {
        ...(opts.headers || {}),
      },
    })
  }

  return { request }
}
