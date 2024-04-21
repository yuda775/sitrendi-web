<template>
  <DefaultLayout>
    <section class="py-10">
      <form class="container mx-auto md:w-4/5" @submit.prevent="handleSubmit">
        <RouterLink
          class="mb-4 block text-sm text-sky-700 hover:underline"
          to="/"
          >Kembali</RouterLink
        >
        <div class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <h2 class="mb-5 block text-xl font-bold text-gray-700">
            Formulir Registrasi
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="namaLembaga" class="block text-gray-700"
                >Nama Lembaga</label
              >
              <InputText
                id="namaLembaga"
                v-model="form.namaLembaga"
                placeholder="Masukkan Nama Lembaga"
                required
              />
            </div>
            <div>
              <label for="namaPetugas" class="block text-gray-700"
                >Nama Petugas</label
              >
              <InputText
                id="namaPetugas"
                v-model="form.namaPetugas"
                placeholder="Masukkan Nama Petugas"
                required
              />
            </div>
            <div>
              <label for="jenjangPendidikan" class="block text-gray-700"
                >Jenjang Pendidikan</label
              >
              <Dropdown
                id="jenjangPendidikan"
                v-model="form.jenjangPendidikan"
                :options="jenjangPendidikan"
                optionValue="code"
                optionLabel="name"
                placeholder="Pilih Jenjang Pendidikan"
                required
                class="rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="emailPetugas" class="block text-gray-700"
                >Email Petugas</label
              >
              <InputText
                id="emailPetugas"
                type="email"
                v-model="form.emailPetugas"
                placeholder="Masukkan Email Petugas"
                required
              />
            </div>
            <div>
              <label for="alamatLembaga" class="block text-gray-700"
                >Alamat Lembaga</label
              >
              <Textarea
                id="alamatLembaga"
                v-model="form.alamatLembaga"
                placeholder="Masukkan Alamat Lembaga"
                required
              />
            </div>
            <div>
              <label for="teleponPetugas" class="block text-gray-700"
                >Telepon Petugas</label
              >
              <InputText
                id="teleponPetugas"
                v-model="form.teleponPetugas"
                placeholder="Masukkan Telepon Petugas"
                @keypress="allowNumbersOnly"
                required
              />
            </div>
          </div>
          <Button
            :loading="loading"
            type="submit"
            class="ml-auto mt-4 block bg-blue-600 px-4 py-2 font-medium text-white"
            label="Submit"
            :icon="loading ? 'pi pi-spin pi-spinner' : ''"
          />
        </div>
      </form>

      <!-- Notifikasi -->
      <div
        v-if="showNotification"
        :class="res.success ? 'bg-green-500' : 'bg-red-500'"
        class="fixed right-5 top-20 rounded-b border-t-4 px-4 py-3 text-white shadow-md"
        role="alert"
        transition="fade"
      >
        <p class="font-bold">Notifikasi</p>
        <p>{{ notificationMessage }}</p>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "@/layouts/Default.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const showNotification = ref(false);
const notificationMessage = ref("");
const loading = ref(false);

const form = ref({
  namaLembaga: "",
  jenjangPendidikan: "",
  emailPetugas: "",
  namaPetugas: "",
  teleponPetugas: "",
  alamatLembaga: "",
  statusKonfirmasi: "menunggu konfirmasi",
  kodeBooking: "",
});

const jenjangPendidikan = [
  { name: "SD / SDIT", code: "sd" },
  { name: "SMP / MTs", code: "smp" },
  { name: "SMA / SMK / MA", code: "sma" },
];

const res = ref("");

const handleSubmit = async () => {
  try {
    loading.value = true;
    if (
      !form.value.namaLembaga ||
      !form.value.jenjangPendidikan ||
      !form.value.emailPetugas ||
      !form.value.namaPetugas ||
      !form.value.teleponPetugas ||
      !form.value.alamatLembaga
    ) {
      loading.value = false;
      showNotification.value = true;
      notificationMessage.value = "Harap lengkapi semua kolom yang diperlukan.";
      setTimeout(() => {
        showNotification.value = false;
      }, 5000);
      return;
    }

    // Proses permintaan
    const { data } = await axios.post(
      import.meta.env.VITE_APP_API_URL + "/register",
      form.value,
    );
    res.value = data;

    showNotification.value = true;
    notificationMessage.value = Array.isArray(res.value.message)
      ? res.value.message[0].msg
      : res.value.message;

    setTimeout(() => {
      showNotification.value = false;
    }, 5000);
  } catch (error) {
    console.error("Error during form submission:", error);
  } finally {
    loading.value = false;
  }
};

const allowNumbersOnly = (event) => {
  if (isNaN(Number(event.key))) {
    event.preventDefault();
  }
};
</script>

<style scoped>
label {
  @apply block text-base font-medium text-gray-700;
}

::placeholder {
  @apply text-sm italic text-gray-400;
}

input,
textarea {
  @apply w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
