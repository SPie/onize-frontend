<template>
  <v-flex>
    <v-card class="elevation-3">
      <v-toolbar dark color="warning">
        <v-toolbar-title>{{ $t('pages.securitySettings') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card class="elevation-0">
          <v-toolbar dark color="warning">
            {{ $t('pages.passwordChange') }}
          </v-toolbar>
          <v-card text>
            <v-form v-model="valid">
              <v-text-field
                v-model="currentPassword"
                :label="$t('currentPassword')"
                :error-messages="currentPasswordErrors.map(error => $t(error))"
                type="password"
                prepend-icon="lock"
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
            <v-card-actions>
              <v-btn color="warning" :disabled="isEmpty" @click="changePassword()" >{{ $t('changePassword') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'SecuritySettings',
  data () {
    return {
      currentPassword: '',
      password: '',
      passwordConfirm: '',
      currentPasswordErrors: [],
      passwordErrors: [],
      passwordConfirmErrors: [],
      valid: true
    }
  },
  computed: {
    isEmpty () {
      return (!this.currentPassword || !this.password || !this.passwordConfirm)
    }
  },
  methods: {
    changePassword () {
      this.currentPasswordErrors = []
      this.passwordErrors = []
      this.passwordConfirmErrors = []

      this.$apiClient.passwordChange(this.currentPassword, this.password, this.passwordConfirm)
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.passwordChangeSuccess', 'color': 'success'})
        })
        .catch(error => {
          this.$store.commit('showSnackbar', {text: 'message.passwordChangeError', color: 'error'})

          if (error.response.status === 422) {
            if (typeof error.response.data.currentPassword !== 'undefined') {
              this.currentPasswordErrors = error.response.data.currentPassword
            }
            if (typeof error.response.data.password !== 'undefined') {
              this.passwordErrors = error.response.data.password
            }
            if (typeof error.response.data.passwordConfirm !== 'undefined') {
              this.passwordConfirmErrors = error.response.data.passwordConfirm
            }
          }
        })
        .finally(() => {
          this.currentPassword = ''
          this.password = ''
          this.passwordConfirm = ''
        })
    }
  }
}
</script>
