<template>
    <v-card class="elevation-0">
        <v-toolbar dark color="warning">
            <v-toolbar-title>{{ $t('passwordReset') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid">
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
        </v-card-text>
        <v-card-actions>
            <a @click="toLogin">{{ $t('login') }}</a>
            <v-spacer></v-spacer>
            <v-btn color="warning" :disabled="isEmpty" @click="changePassword()" >{{ $t('changePassword') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'PasswordResetFinish',
  data () {
    return {
      password: '',
      passwordConfirm: '',
      passwordErrors: [],
      passwordConfirmErrors: [],
      valid: true
    }
  },
  computed: {
    isEmpty () {
      return (!this.password || !this.passwordConfirm)
    }
  },
  methods: {
    verifyToken () {
      this.$apiClient.verifyPasswordResetToken(this.$route.query.token)
        .catch(() => {
          this.$store.commit('showSnackbar', {text: 'message.verifyPasswordResetError', color: 'error'})
          this.$router.push({name: 'PasswordResetStart'})
        })
    },
    changePassword () {
      this.passwordErrors = []
      this.passwordConfirmErrors = []

      this.$apiClient.finishPasswordReset(this.$route.query.token, this.password, this.passwordConfirm)
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.finishPasswordResetSuccess', color: 'success'})
          this.$router.push({name: 'Login'})
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$store.commit('showSnackbar', {text: 'message.finishPasswordResetError', color: 'error'})
            this.$router.push({name: 'PasswordResetStart'})
          }

          if (error.response.status === 422) {
            if (typeof error.response.data.password !== 'undefined') {
              this.passwordErrors = error.response.data.password
            }
            if (typeof error.response.data.passwordConfirm !== 'undefined') {
              this.passwordConfirmErrors = error.response.data.passwordConfirm
            }
          }
        })
        .finally(() => {
          this.password = ''
          this.passwordConfirm = ''
        })
    },
    toLogin () {
      this.$router.push({name: 'Login'})
    }
  },
  beforeMount () {
    this.verifyToken()
  }
}
</script>
