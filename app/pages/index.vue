<template>
  <div class="p-6 container-fluid">
    <h1 class="text-3xl font-bold">Главная страница</h1>
    <p class="mt-2">Стартовый Nuxt шаблон KIRANO2.</p>
    <h2>Пример использования иконок:</h2>
    <IconUser />
    <h2>Пример использования картинок (хранятся в assets):</h2>
    <img src="@/app/assets/images/main/photo.jpg" alt="Пример изображения" />
    <h2>Пример использования телефонной формы:</h2>
    <div class="min-h-[350px] bg-zinc-950 text-white flex items-start justify-center p-6">
      <LeadFormTel />
    </div>
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