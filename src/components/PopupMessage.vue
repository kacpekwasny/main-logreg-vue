<template>
  <v-dialog v-model="dialogOpen" width="500">
    <v-card>
      <v-card-title
        v-if="title != undefined && title.length > 0"
        :class="[classes, titleStaticClasses]"
      >
        {{ title }}
      </v-card-title>

      <v-card-text v-if="text != undefined && text.length > 0" class="mt-4">
        {{ text }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions v-if="buttonText != undefined && buttonText.length > 0">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="setDialog(false)">
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    classes: String,
    dialog: Boolean,
    setDialog: Function,

    title: String,
    text: String,
    buttonText: String,
  },
  data() {
    return {
      titleStaticClasses: "text-h5 grey lighten-2",
    };
  },
  computed: {
    dialogOpen: {
      get() {
        return this.dialog;
      },
      set(d) {
        this.setDialog(d);
      },
    },
  },
};
</script>

<style></style>
