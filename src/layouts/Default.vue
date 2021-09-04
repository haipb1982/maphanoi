<template>
    <div id="wrapper">
      <Header />
      <main class="site-main">
         <slot />
      </main>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import Header from '../components/Client/Header.vue'
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/jquery.fancybox.css",
        },
        {
          rel: "stylesheet",
          href: "/custom-theme.css",
        }
      ],
      script: [{ type: "application/ld+json", json: this.structuredData }],
    };
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(["getShowMenuBar"]),
  },
};
</script>

<style>
@import '../assets/css/jquery.fancybox.css';
@import '../assets/css/custom-theme.css';

</style>
