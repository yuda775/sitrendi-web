<template>
  <div
    class="flex h-fit flex-col items-center gap-2 rounded border-2 border-slate-200 bg-white px-5 pt-2 sm:flex-row lg:gap-5"
    style="min-width: 300px"
  >
    <div>
      <h3 class="text-2xl font-bold text-slate-700">
        {{ title }}
      </h3>
      <p class="mt-5 text-sm text-slate-500">
        {{ description }}
      </p>
    </div>
    <img
      class="h-full w-36 object-cover"
      :src="imageSrc"
      :alt="altText"
      style="min-height: 210px"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
});
</script>
