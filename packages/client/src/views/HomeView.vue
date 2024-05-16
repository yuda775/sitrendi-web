<template>
  <DefaultLayout>
    <!-- Hero -->
    <section id="hero">
      <div class="container mx-auto md:w-4/5">
        <div class="pt-10 md:grid md:grid-cols-2">
          <div class="pb-10 text-center sm:px-0 sm:text-left">
            <h1
              class="text-4xl font-bold text-slate-700 sm:text-6xl md:text-5xl"
            >
              Transformasikan pesantren Anda ke era
              <span class="text-sky-700">digital</span>
            </h1>
            <p class="my-5 text-lg text-slate-600 md:text-lg lg:text-xl">
              Solusi Digital untuk Pesantren Modern. Kemudahan transaksi
              keuangan dan pencatatan akuntansi yang inovatif dan terpercaya.
            </p>
            <RouterLink
              class="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              to="/registrasi"
              >Daftar sekarang</RouterLink
            >
          </div>
          <img
            class="ms-auto mt-auto hidden w-11/12 md:block"
            src="/images/sitrendi-about.png"
            alt="phone-about"
          />
        </div>
      </div>
    </section>

    <!-- About -->
    <section id="about" class="bg-zinc-200">
      <div
        class="container mx-auto items-center gap-10 px-5 py-10 md:grid md:grid-cols-2 md:px-0 lg:w-4/5"
      >
        <div class="mx-auto">
          <h3 class="text-4xl font-bold text-slate-700">Apa itu <br /></h3>
          <h2 class="text-5xl font-bold text-sky-700">
            SiTrendi<span class="text-slate-700">?</span>
          </h2>
        </div>
        <p class="text-gray-800 lg:text-lg">
          SiTrendi (Sistem Pesantren Digital) adalah layanan Aplikasi Digital
          yang memberikan solusi inovatif dalam hal pelayanan sistem transaksi
          keuangan digital, pencatatan dan laporan keuangan yang dapat
          terintegrasi dengan layanan sistem digital lainnya, seperti School
          Management System, Multi Biller Digital, dan lainnya
        </p>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="my-20">
      <div class="mx-auto lg:w-4/5">
        <h2 class="text-center text-4xl font-bold text-slate-700">
          Mengapa perlu menggunakan
          <span class="text-sky-700">SiTrendi</span>?
        </h2>
        <div class="mt-10 grid grid-cols-1 gap-2 md:grid-cols-2 md:px-10">
          <Card
            v-for="(card, index) in cards"
            :key="index"
            :title="card.title"
            :description="card.description"
            :image-src="card.imageSrc"
            :alt-text="card.altText"
          />
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section id="partners" class="my-20 bg-zinc-200">
      <div
        class="mx-auto grid-cols-2 items-center gap-10 py-5 md:grid lg:w-4/5"
      >
        <div>
          <h2 class="text-4xl font-bold text-slate-700">Mitra Kami</h2>
          <p class="mt-5 text-lg text-gray-700">
            Kami bekerjasama dengan berbagai pihak, baik dari segi teknis
            aplikasi seperti Payment Gateway Multi Bank, Biller PPOB untuk
            pembayaran tagihan sehari-hari, Penyedia Jaringan Komunikasi
            Internet di berbagai pelosok Nusantara, hingga bekerjasama dengan
            berbagai Stakeholder dalam dunia pondok pesantren, baik organisasi
            keagaaman, pemerintah dan lain halnya.
          </p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-10">
          <div class="" v-for="(partner, index) in partners" :key="index">
            <img
              class="w-[120px]"
              :src="partner.imageSrc"
              :alt="partner.altText"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Check Implementation Status -->
    <section id="status" class="my-20">
      <div class="mx-auto lg:w-4/5">
        <h2 class="text-center text-4xl font-bold text-slate-700">
          Cek Status Implementasi
        </h2>
        <div>
          <form
            @submit.prevent="checkImplementation"
            class="flex items-end justify-center"
          >
            <input
              class="mt-10 rounded bg-slate-100 p-2 italic placeholder-slate-500 outline outline-1 outline-slate-300 focus:outline-blue-500 md:w-1/2"
              type="number"
              v-model="kodeBooking"
              placeholder="Masukkan Kode Booking"
              required
            />
            <button
              class="ml-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              type="submit"
              label="Show"
            >
              Cek Status
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div class="card justify-content-center flex">
      <Dialog
        v-model:visible="visible"
        modal
        header="Cek Status Implementasi"
        :style="{ width: '35rem' }"
      >
        <div v-if="modal.success === false">
          <p class="text-center text-red-500">Nomor Booking Tidak Ditemukan</p>
        </div>

        <table v-if="modal.success === true" class="table-auto">
          <tr>
            <td class="px-4 py-2">Pesantren</td>
            <td class="px-4 py-2">: {{ modal.pesantren }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Jenjang Pendidikan</td>
            <td class="px-4 py-2">: {{ modal.jenjangPendidikan }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Alamat</td>
            <td class="px-4 py-2">: {{ modal.alamat }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Status Implementasi</td>
            <td
              class="px-4 py-2"
              :class="
                modal.statusImplementasi === 'Belum di Implementasi'
                  ? 'text-red-500'
                  : 'text-green-500'
              "
            >
              <span class="text-black">:</span>
              {{ modal.statusImplementasi }}
            </td>
          </tr>
        </table>
      </Dialog>
    </div>
  </DefaultLayout>
</template>

<script setup>
import Dialog from "primevue/dialog";
import DefaultLayout from "@/layouts/Default.vue";
import Card from "@/components/Card.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

const cards = [
  {
    title: "Dana Keluar & Masuk Jelas",
    description:
      "Solusi Digital untuk Pesantren Modern. ital dengan kemudahan transaksi keuangan dan pencatatan akuntansi yang inovatif dan terpercaya",
    imageSrc: "/images/sitrendi-phone-features1.png",
    altText: "phone-1",
  },
  {
    title: "Bayar SPP, Laundry, Tagian, Infak",
    description:
      "Solusi Digital untuk Pesantren Modern. ital dengan kemudahan transaksi keuangan dan pencatatan akuntansi yang inovatif dan terpercaya",
    imageSrc: "/images/sitrendi-phone-features2.png",
    altText: "phone-2",
  },
  {
    title: "Pantau Keuangan Santri",
    description:
      "Solusi Digital untuk Pesantren Modern. ital dengan kemudahan transaksi keuangan dan pencatatan akuntansi yang inovatif dan terpercaya",
    imageSrc: "/images/sitrendi-phone-features3.png",
    altText: "phone-3",
  },
  {
    title: "OTP & Kode Keamanan",
    description:
      "Solusi Digital untuk Pesantren Modern. ital dengan kemudahan transaksi keuangan dan pencatatan akuntansi yang inovatif dan terpercaya",
    imageSrc: "/images/sitrendi-phone-features4.png",
    altText: "phone-4",
  },
];

const partners = [
  {
    imageSrc: "/images/logo-otto.png",
    altText: "partner-1",
  },
  {
    imageSrc: "/images/logo-prima.png",
    altText: "partner-2",
  },
  {
    imageSrc: "/images/logo-rajabiller.png",
    altText: "partner-3",
  },
  {
    imageSrc: "/images/logo-midtrans.png",
    altText: "partner-4",
  },
  {
    imageSrc: "/images/logo-doku.png",
    altText: "partner-5",
  },
];

const kodeBooking = ref("");
const visible = ref(false);
const modal = ref({
  show: false,
  success: false,
  pesantren: "",
  jenjangPendidikan: "",
  alamat: "",
  statusImplementasi: "",
});

const checkImplementation = async () => {
  const { data: response } = await axios.post(
    import.meta.env.VITE_APP_API_URL + "/checkBooking",
    { kodeBooking: kodeBooking.value },
  );

  console.log(response);

  visible.value = true;
  modal.value.show = true;
  modal.value.success = response.success;

  if (!response.success) {
    return;
  }

  modal.value.pesantren = response.data.nama;
  modal.value.jenjangPendidikan = response.data.jenjangPendidikan;
  modal.value.alamat = response.data.alamat;
  modal.value.statusImplementasi = response.data.bookings[0].statusImplementasi;
};

const allowNumbersOnly = (event) => {
  if (isNaN(Number(event.key))) {
    event.preventDefault();
  }
};
</script>
