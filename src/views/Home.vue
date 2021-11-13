<template>
  <LoadMainContent :mainContent="this.$store.state.mainContent" />
</template>

<script>
import LoadMainContent from "@/components/LoadMainContent";
export default {
  name: "Home",

  components: {
    LoadMainContent,
  },
};
</script>
