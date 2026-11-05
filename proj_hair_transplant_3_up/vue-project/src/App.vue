<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatWidget from './components/ChatWidget.vue'
import WhatsappButton from './components/WhatsappButton.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />

    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
    <ChatWidget />
    <WhatsappButton />
  </div>
</template>