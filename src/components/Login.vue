<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <h1
          v-if="this.$store.state.loggedIn"
          class="mb-5 text-center font-weight-thin"
        >
          You are logged in as
          <span class="font-weight-light">
            {{ this.$store.state.username }}
          </span>
        </h1>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary darken-3">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/register">
              <v-toolbar-title>
                <v-btn color="grey">or Register</v-btn>
              </v-toolbar-title>
            </router-link>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                ref="login"
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
                v-model="login"
                @input="this.checkLogin"
                :error-messages="this.loginErrMsg"
              ></v-text-field>
              <v-text-field
                ref="password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @input="this.checkPassword"
                :error-messages="this.passwordErrMsg"
              ></v-text-field>
              <PopupMessage
                classes="error"
                :title="popupTitle"
                :text="popupText"
                :buttonText="popupButtonText"
                :dialog="popupOpen"
                :setDialog="setDialog"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="loginBtnDisabled"
              color="primary"
              class="mb-2 mr-4"
              @click="clickLogin()"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PopupMessage from "./PopupMessage";
export default {
  components: {
    PopupMessage,
  },
  data() {
    return {
      login: "",
      password: "",
      showPassword: false,

      loginErrMsg: "",
      passwordErrMsg: "",
      loginOk: false,
      passwordOk: false,

      popupOpen: false,
      popupTitle: "",
      popupText: "",
      popupButtonText: "",
      inputToFocus: "login", // login || password
    };
  },
  methods: {
    clickLogin() {
      if (this.login === "kacper" && this.password === "password") {
        this.$store.commit("signIn", {
          login: this.login,
          username: "uname:" + this.login,
          token: "tokenValue",
        });
        this.$router.push("/");
      } else {
        this.popupTitle = "Failed login";
        this.popupText = "Login or Password don't match";
        this.popupButtonText = "ok";
        this.popupOpen = true;
        const errCode = 1;
        this.inputToFocus = {
          0: "login",
          1: "password",
        }[errCode];
      }
    },
    setDialog(d) {
      this.popupOpen = d;
    },
    enterOnLoginPage(e) {
      if (e.key === "Enter") {
        if (!this.popupOpen) {
          if (!this.loginBtnDisabled) {
            this.clickLogin();
          }
        } else {
          this.popupOpen = false;
        }
      }
    },
    checkLogin(v) {
      if (v.length > 0) {
        this.loginErrMsg = "";
        this.loginOk = true;
      } else {
        this.loginErrMsg = "Please fill login";
        this.loginOk = false;
      }
    },
    checkPassword(v) {
      if (v.length > 0) {
        this.passwordErrMsg = "";
        this.passwordOk = true;
      } else {
        this.passwordErrMsg = "Please fill password";
        this.passwordOk = false;
      }
    },
  },
  mounted() {
    document.addEventListener("keyup", this.enterOnLoginPage);
  },
  unmounted() {
    document.removeEventListener("keyup", this.enterOnLoginPage);
  },
  computed: {
    loginBtnDisabled() {
      return !(this.loginOk && this.passwordOk);
    },
  },
};
</script>
