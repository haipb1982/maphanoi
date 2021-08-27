<template>
    <div id="wrapper">
      <main class="site-main">
         <slot />
      </main>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
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

  },
  computed: {
    ...mapGetters(["getShowMenuBar"]),
  },
};
</script>

<style>
@import url('/assets/css/jquery.fancybox.css');
@import url('/assets/css/custom-theme.css');

</style>
