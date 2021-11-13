<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view class="ma-3"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    //
  }),
  async beforeMount() {
    const mainContent = await fetch(
      process.env.VUE_APP_FETCH_MAIN_MAIN_CONTENT
    );
    const json = await mainContent.json();
    console.log(json);
    this.$store.commit("setMainContent", json.mainContent);
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: inherit !important;
}
ul {
  list-style: none;
}
</style>
