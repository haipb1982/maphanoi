<template>
    <component :is="layout">
      <router-view />
    </component>
</template>

<script>
import { mapGetters } from "vuex";
const default_layout = "default";
export default {
  name: "App",
  head() {
    return {
      bodyAttrs: {
        "data-sidebar-size": this.getShowMenuBar ? "condensed" : "default", //how to get classes already setted in default.vue like my has-navbar-fixed-top class
      },
    };
  },

  data() {
    return {};
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
    ...mapGetters(["getShowMenuBar"]),
  },
  mounted(){
    // console.log("$route.params.maptype App ", this.$route.params.maptype )
    // this.$route.go('disanvanhoa')
    this.$router.push({ name: 'thamquanao' })
  }
};
</script>

<style>


</style>
