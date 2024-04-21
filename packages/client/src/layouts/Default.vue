<template>
  <div class="bg-zinc-50">
    <header class="sticky top-0 w-full bg-white shadow shadow-slate-200">
      <nav>
        <div
          class="mx-auto flex items-center justify-between px-5 py-2 sm:px-0 lg:w-4/5"
        >
          <img class="w-36" src="/images/sitrendi-logo.png" alt="logo" />
          <ul class="hidden gap-5 md:flex">
            <li v-for="(link, index) in navLinks" :key="index">
              <a
                :class="{ 'font-bold underline': activeIndex === index }"
                @click="scrollToSection(link.hash, index)"
                class="text-slate-700 hover:font-medium hover:text-black hover:underline"
                >{{ link.text }}</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <slot />

    <footer class="bg-zinc-200">
      <div class="mx-auto flex gap-10 py-5 lg:w-4/5">
        <div>
          <h2
            class="mb-5 text-2xl font-bold text-slate-700 md:text-3xl lg:text-4xl"
          >
            Anda dapat menggunakan lebih banyak fitur di aplikasi seluler
          </h2>
          <img class="w-32" src="/images/play-store.png" alt="play-store" />
        </div>
        <img
          class="hidden rounded-lg object-cover lg:block"
          src="/images/qr-code.png"
          alt="qr-code"
        />
      </div>
      <div
        class="mx-auto flex items-end justify-between border-t border-zinc-400 py-5 lg:w-4/5"
      >
        <div>
          <img class="w-36" src="/images/sitrendi-logo.png" alt="logo" />
          <p class="mt-5 text-slate-700">
            Copyright 2024. All Rights Reserved.
          </p>
        </div>
        <ul class="flex text-slate-700">
          <li class="mx-5 hover:font-bold hover:text-sky-700 hover:underline">
            <a href="https://nuxt.com">FAQ</a>
          </li>
          <li class="mx-5 hover:font-bold hover:text-sky-700 hover:underline">
            <a href="https://nuxt.com">Term of Conditions</a>
          </li>
          <li class="mx-5 hover:font-bold hover:text-sky-700 hover:underline">
            <a href="https://nuxt.com">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";

const navLinks = ref([
  { hash: "#hero", text: "Beranda" },
  { hash: "#about", text: "Tentang Kami" },
  { hash: "#features", text: "Fitur" },
  { hash: "#partners", text: "Mitra" },
  { hash: "#status", text: "Cek Status" },
]);

const activeIndex = ref(-1);

const handleScroll = () => {
  const scrollPosition = window.scrollY + 150;
  const sections = document.querySelectorAll("section");
  activeIndex.value = Array.from(sections).findIndex((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    return scrollPosition >= top && scrollPosition < bottom;
  });
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

const scrollToSection = (hash, index) => {
  const targetSection = document.querySelector(hash);
  if (targetSection) {
    window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
    activeIndex.value = index;
  }
};
</script>
