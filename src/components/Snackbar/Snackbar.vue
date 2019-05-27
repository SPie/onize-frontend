<template>
    <v-snackbar top v-model="snackbar.visible" :color="snackbar.color">
        {{ $t(snackbar.text) }}
        <v-btn flat color="accent" @click="closeSnackbar">{{ $t('dialog.close') }}</v-btn>
    </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    snackbar () {
      return this.$store.getters.getSnackbar
    }
  },
  methods: {
    ...mapMutations(['closeSnackbar'])
  }
}
</script>
