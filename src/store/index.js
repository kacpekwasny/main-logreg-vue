import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: true,
    userPublicId: "",
    username: "kacper",
    login: "",
    token: "",

    /*
    fetch from backend js file with content for the root route
    {
      "mainContent": [
          {
              "active": true,
              "useTemplateOrHtml": "template",
              "template": {
                  "title": "Payments",
                  "text": "Keep track of payments with your friends",
                  "a-href": "/payments"
              },
              "html": ""
          }
      ]
    }
    */
    mainContent: [],
  },
  mutations: {
    signOut(state) {
      state.loggedIn = false;
      state.login = "";
      state.username = "";
      state.token = "";
    },
    signIn(state, { login, username, token }) {
      state.loggedIn = true;
      state.login = login;
      state.username = username;
      state.token = token;
    },
    setMainContent(state, mainContent) {
      state.mainContent = mainContent;
    },
  },
  actions: {},
  modules: {},
});
