<template>
    <v-card class="elevation-6">
        <v-toolbar dark color="warning">
            <v-toolbar-title>{{ $t('login') }}</v-toolbar-title>
        </v-toolbar>
        <v-card text>
            <v-form v-model="valid">
                <v-text-field
                    v-model="email"
                    :label="$t('email')"
                    :error-messages="emailErrors.map(error => $t(error))"
                    type="email"
                    prepend-icon="person"
                    reqired
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :label="$t('password')"
                    :error-messages="passwordErrors.map(error => $t(error))"
                    type="password"
                    prepend-icon="lock"
                    reqired
                ></v-text-field>
            </v-form>
        </v-card>
        <v-card-actions>
            <a @click="toPasswordReset">{{ $t('forgotPassword') }}</a><br>
            <v-spacer></v-spacer>
            <a @click="toRegister">{{ $t('register') }}</a>
            <v-spacer></v-spacer>
            <v-btn color="warning" :disabled="isEmpty" @click="login()" >{{ $t('login') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: [],
      valid: true
    }
  },
  computed: {
    isEmpty () {
      return (!this.email || !this.password)
    }
  },
  methods: {
    login () {
      this.emailErrors = []
      this.passwordErrors = []

      this.$apiClient.login(this.email, this.password)
        .then(response => {
          this.$store.commit('showSnackbar', {text: 'message.loginSuccess', color: 'success'})

          this.$router.push({ name: 'Dashboard' })
        })
        .catch(error => {
          this.password = ''

          this.$store.commit('showSnackbar', {text: 'message.loginFailed', color: 'error'})

          switch (error.response.status) {
            case 401:
              this.emailErrors = ['invalidCredentials']
              break
            case 422:
              if (typeof error.response.data.email !== 'undefined') {
                this.emailErrors = error.response.data.email
              }
              if (typeof error.response.data.password !== 'undefined') {
                this.passwordErrors = error.response.data.password
              }
              break
            default:
          }
        })
    },
    toRegister () {
      this.$router.push({name: 'Register'})
    },
    toPasswordReset () {
      this.$router.push({name: 'PasswordResetStart'})
    }
  }
}
</script>
