<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatWidget from './components/ChatWidget.vue'
import WhatsappButton from './components/WhatsappButton.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-stone-100 text-stone-900">
    <Navbar />

    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <Footer />
    <WhatsappButton />
    <ChatWidget />
  </div>
</template>