<template>
  <Nav />
  <slot />
  <Footer />
</template>

<script setup>
usePageSeo();
useAnalytics();
useAnalyticsPageviews();
</script>
