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
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/login">
              <v-toolbar-title>
                <v-btn color="grey">or Login</v-btn>
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
                @input="checkLogin"
                :error-messages="loginErrMsg"
              ></v-text-field>
              <v-flex row class="ma-0">
                <v-text-field
                  class="mr-5"
                  ref="password"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  @input="checkPassword"
                  :error-messages="passwordErrMsg"
                ></v-text-field>
                <v-text-field
                  ref="passwordRepeat"
                  id="password-repeat"
                  name="password"
                  label="Repeat password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="repeatPassword"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  @input="checkRepeatPassword"
                  :error-messages="repeatPasswordErrMsg"
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="registerBtnDisabled"
              color="primary"
              class="mb-2 mr-4"
              @click="clickRegister()"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <PopupMessage
      :classes="popupClasses"
      :title="popupTitle"
      :text="popupText"
      :buttonText="popupButtonText"
      :dialog="popupOpen"
      :setDialog="setDialog"
    />
  </v-container>
</template>

<script>
async function getSHA1(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

async function passwordPwned(paswd) {
  // return true if password was leaked and is in a database
  const hash = await getSHA1(paswd);
  const hash5 = hash.slice(0, 5);
  const hashend = hash.slice(-35).toUpperCase();
  const res = await fetch("https://api.pwnedpasswords.com/range/" + hash5, {
    method: "GET",
  });
  var text = await res.text();
  text = text.replace("\r", "");
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split(":")[0];
    if (lines[i] === hashend) {
      return true;
    }
  }
  return false;
}

import PopupMessage from "./PopupMessage";
export default {
  components: {
    PopupMessage,
  },
  data() {
    return {
      login: "",
      password: "",
      repeatPassword: "",
      showPassword: false,
      loginOk: false,
      passwordOk: false,
      repeatPasswordOk: false,

      loginErrMsg: "",
      passwordErrMsg: "",
      repeatPasswordErrMsg: "",

      loginRules: [this.loginLen],
      passwordRules: [this.passwordLen],
      passwordRepeatRules: [this.repeatPasswordOk],
      popupOpen: false,
      popupTitle: "",
      popupText: "",
      popupButtonText: "",
      popupClasses: "",
      inputToFocus: "login", // login || password
    };
  },
  methods: {
    clickRegister() {
      const success = true;
      if (success) {
        this.popupClasses = "success";
        this.popupTitle = "Successful register!";
        this.popupText =
          "Now after a redirect to login page please enter credentials";
        this.popupButtonText = "Login";
        this.popupOpen = true;
        const errCode = 1;
        this.inputToFocus = {
          0: "login",
          1: "password",
        }[errCode];
        this.$router.push("/");
      } else {
        this.popupClasses = "error";
        this.popupTitle = "Failed register!";
        this.popupText = "The action has failed. Try again now and later.";
        this.popupButtonText = "Ok";
        this.popupOpen = true;
        this.inputToFocus = "login";
      }
    },
    setDialog(d) {
      this.popupOpen = d;
    },
    enterOnRegisterPage(e) {
      if (e.key === "Enter") {
        if (!this.popupOpen) {
          if (!this.registerBtnDisabled) {
            this.clickRegister();
          }
        } else {
          this.popupOpen = false;
        }
      }
    },
    checkLogin(l) {
      if (l.length < 3) {
        this.loginErrMsg = "Login has to be at least 3 charachters long";
        this.loginOk = false;
      } else {
        this.loginErrMsg = "";
        this.loginOk = true;
      }
    },
    async checkPassword(v) {
      if (v.length < 7) {
        this.passwordErrMsg = "Password has to be at least 7 charachters long";
        this.passwordOk = false;
        return;
      }
      if (await passwordPwned(v)) {
        this.passwordErrMsg =
          "This password was leaked thus is a vulnorability";
        this.passwordOk = false;
      } else {
        this.passwordErrMsg = "";
        this.passwordOk = true;
      }
    },
    checkRepeatPassword(v) {
      if (v !== this.password) {
        this.repeatPasswordErrMsg = "Passwords don't match";
        this.repeatPasswordOk = false;
      } else {
        this.repeatPasswordErrMsg = "";
        this.repeatPasswordOk = true;
      }
    },
  },
  computed: {
    registerBtnDisabled() {
      return !(this.loginOk && this.passwordOk && this.repeatPasswordOk);
    },
  },
  mounted() {
    document.addEventListener("keyup", this.enterOnRegisterPage);
  },
  unmounted() {
    document.removeEventListener("keyup", this.enterOnRegisterPage);
  },
};
</script>
