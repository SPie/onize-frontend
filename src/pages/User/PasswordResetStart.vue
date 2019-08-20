<template>
    <v-card class="elevation-0">
        <v-toolbar dark color="warning">
            <v-toolbar-title>{{ $t('passwordReset') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid">
                <v-text-field
                    v-model="email"
                    :label="$t('email')"
                    :error-messages="emailErrors.map(error => $t(error))"
                    type="email"
                    prepend-icon="person"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <a @click="toLogin">{{ $t('login') }}</a>
            <v-spacer></v-spacer>
            <v-btn color="warning" :disabled="isEmpty" @click="sendReset()" >{{ $t('send') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
  name: 'PasswordResetStart',
  data () {
    return {
      email: '',
      emailErrors: [],
      valid: true
    }
  },
  computed: {
    isEmpty () {
      return !this.email
    }
  },
  methods: {
    sendReset () {
      let finishUrl = process.env.BASE_URL + '/' + this.$router.resolve({name: 'PasswordResetFinish'}).href + '?token=TOKEN'
      this.emailErrors = []
      this.$apiClient.startPasswordReset(this.email, finishUrl)
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.startedPasswordResetSuccess', color: 'success'})
        })
        .catch(() => {
          this.$store.commit('showSnackbar', {text: 'message.startedPasswordResetError', color: 'error'})
        })
        .finally(() => {
          this.email = ''
        })
    },
    toLogin () {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
