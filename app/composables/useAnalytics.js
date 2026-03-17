export function useAnalytics() {
  const config = useRuntimeConfig()

  const { data, error } = useFetch(() => `${config.public.apiBase}/analytics`, {
    method: 'GET',
    key: 'global-analytics',
    server: true,
    lazy: false,
    default: () => null,
  })

  const analytics = computed(() => data.value?.data?.analytics || {})

  const googleAnalytics = computed(() => analytics.value?.google_analytics || '')
  const yandexMetrika = computed(() => analytics.value?.yandex_metrika || '')
  const facebookPixel = computed(() => analytics.value?.facebook_pixel || '')

  useHead(() => {
    const script = []
    const noscript = []

    if (googleAnalytics.value) {
      script.push({
        id: 'ga-src',
        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics.value}`,
        async: true,
      })

      script.push({
        id: 'ga-inline',
        innerHTML: `
          window.GA_MEASUREMENT_ID = '${googleAnalytics.value}';
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${googleAnalytics.value}');
        `,
      })
    }

    if (yandexMetrika.value) {
      script.push({
        id: 'ym-inline',
        innerHTML: `
          window.YM_COUNTER_ID = ${Number(yandexMetrika.value)};
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${Number(yandexMetrika.value)}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `,
      })

      noscript.push({
        id: 'ym-noscript',
        innerHTML: `<div><img src="https://mc.yandex.ru/watch/${Number(yandexMetrika.value)}" style="position:absolute; left:-9999px;" alt="" /></div>`,
      })
    }

    if (facebookPixel.value) {
      script.push({
        id: 'fb-inline',
        innerHTML: `
          window.FB_PIXEL_ID = '${facebookPixel.value}';
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${facebookPixel.value}');
          fbq('track', 'PageView');
        `,
      })

      noscript.push({
        id: 'fb-noscript',
        innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${facebookPixel.value}&ev=PageView&noscript=1" />`,
      })
    }

    return {
      script,
      noscript,
      __dangerouslyDisableSanitizersByTagID: {
        'ga-inline': ['innerHTML'],
        'ym-inline': ['innerHTML'],
        'ym-noscript': ['innerHTML'],
        'fb-inline': ['innerHTML'],
        'fb-noscript': ['innerHTML'],
      },
    }
  })

  watchEffect(() => {
    if (error.value) {
      console.error('Analytics error:', error.value)
    }
  })
}