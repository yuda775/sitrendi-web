<template>
  <DefaultLayout>
    <!-- Hero -->
    <section id="hero">
      <div class="container mx-auto md:w-4/5">
        <div class="pt-10 md:grid md:grid-cols-2">
          <div class="px-5 text-center sm:px-0 sm:text-left">
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
            class="ms-auto hidden w-11/12 md:block"
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
          <h3 class="text-3xl font-bold text-slate-700">Apa itu <br /></h3>
          <h2 class="text-4xl font-bold text-blue-500">
            SiTrendi<span>?</span>
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
          <form class="flex items-end justify-center" action="" method="get">
            <input
              class="mt-10 rounded bg-slate-100 p-2 italic placeholder-slate-500 outline outline-1 outline-slate-300 focus:outline-blue-500 md:w-1/2"
              type="text"
              placeholder="Masukkan Nomor Booking"
            />
            <button
              class="ml-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              type="submit"
            >
              Cek Status
            </button>
          </form>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import { RouterLink } from "vue-router";
import DefaultLayout from "@/layouts/Default.vue";
import Card from "@/components/Card.vue";

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
</script>
