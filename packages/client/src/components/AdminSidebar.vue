<template>
  <!--sidenav -->
  <div
    class="sidebar-menu fixed left-0 top-0 z-50 h-full w-64 bg-[#f8f4f3] p-4 transition-transform"
  >
    <a href="#" class="flex items-center border-b border-b-gray-800 pb-4">
      <h2 class="text-2xl font-bold text-slate-700">
        SiTrenDi
        <span class="rounded-md bg-[#f84525] px-2 text-white">Admin</span>
      </h2>
    </a>
    <ul class="mt-4">
      <span class="font-bold text-gray-400">ADMIN</span>
      <li class="group mb-1">
        <a
          href=""
          class="flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="ri-home-2-line mr-3 text-lg"></i>
          <span class="text-sm">Dashboard</span>
        </a>
      </li>
      <li class="group mb-1">
        <a
          href=""
          class="sidebar-dropdown-toggle flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="bx bx-user mr-3 text-lg"></i>
          <span class="text-sm">Users</span>
          <i
            class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"
          ></i>
        </a>
        <ul class="mt-2 hidden pl-7 group-[.selected]:block">
          <li class="mb-4">
            <a
              href=""
              class="before:contents-[''] flex items-center text-sm text-gray-900 before:mr-3 before:h-1 before:w-1 before:rounded-full before:bg-gray-300 hover:text-[#f84525]"
              >All</a
            >
          </li>
          <li class="mb-4">
            <a
              href=""
              class="before:contents-[''] flex items-center text-sm text-gray-900 before:mr-3 before:h-1 before:w-1 before:rounded-full before:bg-gray-300 hover:text-[#f84525]"
              >Roles</a
            >
          </li>
        </ul>
      </li>
      <li class="group mb-1">
        <a
          href=""
          class="flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="bx bx-list-ul mr-3 text-lg"></i>
          <span class="text-sm">Activities</span>
        </a>
      </li>
      <span class="font-bold text-gray-400">BLOG</span>
      <li class="group mb-1">
        <a
          href=""
          class="sidebar-dropdown-toggle flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="bx bxl-blogger mr-3 text-lg"></i>
          <span class="text-sm">Post</span>
          <i
            class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"
          ></i>
        </a>
        <ul class="mt-2 hidden pl-7 group-[.selected]:block">
          <li class="mb-4">
            <a
              href=""
              class="before:contents-[''] flex items-center text-sm text-gray-900 before:mr-3 before:h-1 before:w-1 before:rounded-full before:bg-gray-300 hover:text-[#f84525]"
              >All</a
            >
          </li>
          <li class="mb-4">
            <a
              href=""
              class="before:contents-[''] flex items-center text-sm text-gray-900 before:mr-3 before:h-1 before:w-1 before:rounded-full before:bg-gray-300 hover:text-[#f84525]"
              >Categories</a
            >
          </li>
        </ul>
      </li>
      <li class="group mb-1">
        <a
          href=""
          class="flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="bx bx-archive mr-3 text-lg"></i>
          <span class="text-sm">Archive</span>
        </a>
      </li>
      <span class="font-bold text-gray-400">PERSONAL</span>
      <li class="group mb-1">
        <a
          href=""
          class="flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="bx bx-bell mr-3 text-lg"></i>
          <span class="text-sm">Notifications</span>
          <span
            class="ml-auto rounded-full bg-red-200 px-2 py-0.5 text-xs font-medium tracking-wide text-red-600 md:block"
            >5</span
          >
        </a>
      </li>
      <li class="group mb-1">
        <a
          href=""
          class="flex items-center rounded-md px-4 py-2 font-semibold text-gray-900 hover:bg-gray-950 hover:text-gray-100 group-[.active]:bg-gray-800 group-[.selected]:bg-gray-950 group-[.active]:text-white group-[.selected]:text-gray-100"
        >
          <i class="bx bx-envelope mr-3 text-lg"></i>
          <span class="text-sm">Messages</span>
          <span
            class="ml-auto rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium tracking-wide text-green-600 md:block"
            >2 New</span
          >
        </a>
      </li>
    </ul>
  </div>
  <div
    class="sidebar-overlay fixed left-0 top-0 z-40 h-full w-full bg-black/50 md:hidden"
  ></div>
  <!-- end sidenav -->
</template>
