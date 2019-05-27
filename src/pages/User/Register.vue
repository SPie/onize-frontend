<template>
    <v-card class="elevation-0">
        <v-toolbar dark color="warning">
            <v-toolbar-title>{{ $t('register') }}</v-toolbar-title>
        </v-toolbar>
        <v-card text>
            <v-form v-model="valid">
                <v-text-field
                    v-model="email"
                    :label="$t('email')"
                    :error-messages="emailErrors.map(error => $t(error))"
                    type="email"
                    prepend-icon="person"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :label="$t('password')"
                    :error-messages="passwordErrors.map(error => $t(error))"
                    type="password"
                    prepend-icon="lock"
                ></v-text-field>
                <v-text-field
                    v-model="passwordConfirm"
                    :label="$t('passwordConfirm')"
                    :error-messages="passwordConfirmErrors.map(error => $t(error))"
                    type="password"
                    prepend-icon="lock"
                ></v-text-field>
            </v-form>
        </v-card>
        <v-card-actions>
            <a @click="toLogin">{{ $t('login') }}</a>
            <v-spacer></v-spacer>
            <v-btn color="warning" :disabled="isEmpty" @click="register()" >{{ $t('register') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      emailErrors: [],
      passwordErrors: [],
      passwordConfirmErrors: [],
      valid: true
    }
  },
  computed: {
    isEmpty () {
      return (!this.email || !this.password || !this.passwordConfirm)
    }
  },
  methods: {
    register () {
      this.emailErrors = []
      this.passwordErrors = []
      this.passwordConfirmErrors = []

      this.$apiClient.register(this.email, this.password, this.passwordConfirm)
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.registerSuccess', color: 'success'})

          this.$router.push({name: 'Dashboard'})
        })
        .catch(error => {
          this.password = ''
          this.passwordConfirm = ''

          this.$store.commit('showSnackbar', {text: 'message.registerError', color: 'error'})

          switch (error.response.status) {
            case 422:
              if (typeof error.response.data.email !== 'undefined') {
                this.emailErrors = error.response.data.email
              }
              if (typeof error.response.data.password !== 'undefined') {
                this.passwordErrors = error.response.data.password
              }
              if (typeof error.response.data.passwordConfirm !== 'undefined') {
                this.passwordConfirmErrors = error.response.data.passwordConfirm
              }
              break
            default:
          }
        })
    },
    toLogin () {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
