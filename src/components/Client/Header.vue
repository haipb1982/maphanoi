<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
