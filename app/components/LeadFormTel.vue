<template>
  <form
    class="mx-auto max-w-md space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
    @submit.prevent="submit"
  >
    <div>
      <label class="mb-1 block text-sm">Имя</label>
      <input
        v-model.trim="name"
        type="text"
        placeholder="Ваше имя"
        class="h-11 w-full rounded-xl border border-white/10 px-4
               outline-none focus:border-white/30 focus:ring-4 focus:ring-white/10"
      />
    </div>

    <div>
      <label class="mb-1 block text-sm">Телефон</label>

      <!-- Важно: component доступен после подключения плагина -->
      <vue-tel-input
        v-model="phone"
        class="!w-full"
        :inputOptions="{ placeholder: 'Введите номер' }"
        :dropdownOptions="{ showFlags: true, showDialCodeInSelection: true }"
        :validCharactersOnly="true"
        @validate="onValidate"
      />
      <p v-if="phone && !isValid" class="mt-1 text-xs text-red-300">
        Некорректный номер
      </p>
    </div>

    <button
      type="submit"
      :disabled="loading || !name || !isValid"
      class="h-11 w-full rounded-xl font-medium text-zinc-900 transition
             hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span v-if="!loading">Отправить</span>
      <span v-else>Отправляем…</span>
    </button>

    <p v-if="success" class="text-sm text-emerald-300">✅ Отправлено</p>
  </form>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const phone = ref(""); // то, что вводит пользователь
const phoneE164 = ref(""); // нормализованный вид +998901234567
const isValid = ref(false);

const loading = ref(false);
const success = ref(false);

function onValidate(payload) {
  // payload приходит от vue-tel-input
  // обычно есть: valid, number (E.164), country и т.д.
  isValid.value = !!payload?.valid;
  phoneE164.value = payload?.number || "";
}

async function submit() {
  success.value = false;

  if (!name.value || !isValid.value) return;

  loading.value = true;
  try {
    const body = {
      name: name.value,
      phone: phoneE164.value || phone.value,
    };

    // пример отправки
    await $fetch("/api/leads", { method: "POST", body });

    success.value = true;
    name.value = "";
    phone.value = "";
    phoneE164.value = "";
    isValid.value = false;
  } catch (e) {
    // можно вывести ошибку
  } finally {
    loading.value = false;
  }
}
</script>
