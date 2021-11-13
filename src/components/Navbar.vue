<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon
        class="mr-0"
        @click="drawerOpen = !drawerOpen"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase ml-0">
        <router-link to="/">
          <span class="font-weight-light">kwasnyy</span>
          <span class="font-weight-bold">.pl</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerOpen" app class="grey darken-4">
      <v-list v-if="loggedIn">
        <v-list-item router to="/account">
          <v-list-item-action>
            <v-icon class="grey--text text--lighten-2">mdi-account</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="grey--text text--lighten-2">
              {{ username }}
            </v-list-item-title>

            <v-list-item-subtitle>
              Change account settings
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="signOut()">
          <v-list-item-action>
            <v-icon class="grey--text text--lighten-2">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text text--lighten-2">
              Sign out
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <div v-for="link in routeLinks" :key="link.text">
          <v-list-item router :to="link.route">
            <v-list-item-action>
              <v-icon class="grey--text text--lighten-2">{{
                link.icon
              }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text text--lighten-2">
                {{ link.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawerOpen: false,

      routeLinks: [
        {
          text: "Login",
          route: "/login",
          icon: "mdi-google-classroom",
          requiersLogin: false,
        },
        {
          text: "Regsiter",
          route: "/register",
          icon: "mdi-tune",
          requiersLogin: false,
        },
      ],

      requiredLogin: [{}],

      currentPath: this.$route.fullPath,
    };
  },

  watch: {
    $route(to) {
      this.currentPath = to.fullPath;
    },
  },

  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    username() {
      return this.$store.state.username;
    },
  },

  methods: {
    signOut() {
      this.$store.commit("signOut");
    },
  },
};
</script>

<style></style>
