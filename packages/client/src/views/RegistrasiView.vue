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
              <label for="namaPesantren" class="block text-gray-700"
                >Nama Pesantren</label
              >
              <InputText
                id="namaPesantren"
                v-model="form.namaPesantren"
                placeholder="Masukkan Nama Pesantren"
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
              <label for="alamatPesantren" class="block text-gray-700"
                >Alamat Pesantren</label
              >
              <Textarea
                id="alamatPesantren"
                v-model="form.alamatPesantren"
                placeholder="Masukkan Alamat Pesantren"
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

      <!-- modal  -->
      <Dialog
        v-model:visible="visible"
        modal
        header="Daftar Booking Berhasil"
        :style="{ width: '40rem' }"
      >
        <h3 class="px-6 text-lg font-medium leading-6 text-slate-800">
          Terima Kasih Telah Mendaftar!
        </h3>
        <div class="px-7 py-3">
          <p class="text-sm text-gray-500">
            Pendaftaran Anda untuk implementasi SiTrendi telah kami terima. Kode
            booking telah dikirim ke email Anda. Silakan cek email Anda untuk
            melihat detail lebih lanjut dan mengikuti instruksi untuk proses
            selanjutnya.
          </p>
        </div>
        <div class="px-7 py-3 text-left">
          <ul class="ml-5 list-disc text-left text-sm text-gray-500">
            <li>
              Verifikasi Email: Pastikan Anda telah menerima email dari kami dan
              melakukan verifikasi jika diperlukan.
            </li>
            <li>
              Tunggu Konfirmasi: Tim kami akan mengulas pendaftaran Anda dan
              menghubungi Anda dalam waktu 1-3 hari kerja untuk mengkonfirmasi
              jadwal implementasi.
            </li>
          </ul>
        </div>
      </Dialog>
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
import Dialog from "primevue/dialog";

const showNotification = ref(false);
const notificationMessage = ref("");
const loading = ref(false);
const visible = ref(false);

const form = ref({
  namaPesantren: "",
  jenjangPendidikan: "",
  emailPetugas: "",
  namaPetugas: "",
  teleponPetugas: "",
  alamatPesantren: "",
  statusKonfirmasi: "menunggu konfirmasi",
  kodeBooking: "",
});

const jenjangPendidikan = [
  { name: "SDIT", code: "SDIT" },
  { name: "MTs", code: "MTs" },
  { name: "MA", code: "MA" },
];

const res = ref("");

const handleSubmit = async () => {
  try {
    loading.value = true;
    if (
      !form.value.namaPesantren ||
      !form.value.jenjangPendidikan ||
      !form.value.emailPetugas ||
      !form.value.namaPetugas ||
      !form.value.teleponPetugas ||
      !form.value.alamatPesantren
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
      import.meta.env.VITE_APP_API_URL + "/bookingImplementasi",
      form.value,
    );
    res.value = data;

    visible.value = true;

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
