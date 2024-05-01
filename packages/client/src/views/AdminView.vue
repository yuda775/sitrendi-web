<template>
  <aside>
    <AdminSidebar />
  </aside>
  <main
    class="main min-h-screen w-full bg-gray-200 transition-all md:ml-64 md:w-[calc(100%-256px)]"
  >
    <header class="sticky top-0 z-40 bg-white">
      <AdminNavbar />
    </header>

    <content>
      <div class="p-6">
        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            class="rounded-md border border-gray-100 bg-white px-6 pt-3 shadow-md shadow-black/5"
          >
            <div class="mb-6 flex justify-between">
              <div>
                <div class="mb-1 flex items-center">
                  <div class="text-2xl font-semibold">2</div>
                </div>
                <div class="text-sm font-medium text-gray-400">Users</div>
              </div>
            </div>
          </div>
          <div
            class="rounded-md border border-gray-100 bg-white px-6 pt-3 shadow-md shadow-black/5"
          >
            <div class="mb-4 flex justify-between">
              <div>
                <div class="mb-1 flex items-center">
                  <div class="text-2xl font-semibold">100</div>
                  <div
                    class="ml-2 rounded bg-emerald-500/10 p-1 text-[12px] font-semibold leading-none text-emerald-500"
                  >
                    +30%
                  </div>
                </div>
                <div class="text-sm font-medium text-gray-400">Companies</div>
              </div>
            </div>
          </div>
          <div
            class="rounded-md border border-gray-100 bg-white px-6 pt-3 shadow-md shadow-black/5"
          >
            <div class="mb-6 flex justify-between">
              <div>
                <div class="mb-1 text-2xl font-semibold">100</div>
                <div class="text-sm font-medium text-gray-400">Blogs</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            class="rounded-md border border-gray-100 bg-white p-6 shadow-md shadow-black/5 lg:col-span-2"
          ></div>
          <div
            class="rounded-md border border-gray-100 bg-white px-6 pt-3 shadow-md shadow-black/5"
          ></div>
        </div>
      </div>
    </content>
  </main>
</template>

<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminNavbar from "@/components/AdminNavbar.vue";
</script>
