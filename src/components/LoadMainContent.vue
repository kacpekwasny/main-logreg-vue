<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <ul>
          <li
            v-for="content in mainContent.filter((v) => v.active)"
            :key="content.title"
            class="mb-10"
          >
            <div
              v-if="content.useTemplateOrHtml === 'template'"
              class="contentBigOnHover"
            >
              <a :href="content.template.aHref">
                <v-card>
                  <v-card-title
                    primary-title
                    class="font-weight-light display-1"
                  >
                    {{ content.template.title }}
                  </v-card-title>
                  <v-card-text> {{ content.template.text }} </v-card-text>
                </v-card>
              </a>
            </div>
            <div
              v-else-if="content.useTemplateOrHtml === 'html'"
              class="contentBigOnHover"
            >
              <v-card>
                <div v-html="content.html" />
              </v-card>
            </div>
            <div v-else>
              Wrong "useTemplateOrHtml" attribute value:
              {{ content.useTemplateOrHtml }}
            </div>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    mainContent: Array,
  },
};
</script>

<style lang="scss">
.contentBigOnHover {
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
