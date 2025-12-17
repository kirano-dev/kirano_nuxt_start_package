<template>
  <div class="p-6 container-fluid">
    <h1 class="text-3xl font-bold">Главная страница</h1>
    <p class="mt-2">Стартовый Nuxt шаблон KIRANO.</p>
    <IconUser />
  </div>
</template>

<script setup>
// Пример отправки запроса API
// const { request } = useApi()
// const data = ref(null)
// const error = ref(null)

// onMounted(async () => {
//   try {
//     data.value = await request('/health')
//   } catch (e) {
//     error.value = e
//   }
// })

// Как работать с SVG в проекте:
import IconUser from '@/app/assets/icons/main/app.svg'

</script>