<template>
  <header class="site-header" >
    <div class="site-header-container" >
      <div class="header-menu" >
        <ul v-if="urlLink">
          <li  class="">
            <router-link tag="a" :to="urlLink.DITICH">Di Tích </router-link>
          </li>
          <li  class="">
            <router-link tag="a" :to="urlLink.DISAN">Di sản văn hóa </router-link>
          </li>
          <li  class="">
             <router-link tag="a" :to="urlLink.THAMQUAN">Tham quan ảo </router-link>
          </li>
        
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { ROUTE_MAP } from "@/utils/constants";
import { mapGetters } from "vuex";
const router = ROUTE_MAP
export default {
  data() {
    return {
      urlLink:router
    }
  },
  mounted() {
    
  },
  methods: {
    showmenu() {
      this.$store.dispatch("ShowMenuBar");
    },
  },
  computed: {
    ...mapGetters(["getInforUser"]),
  },
};
</script>

<style></style>
