<template>
    <component :is="layout"></component>
</template>

<script>

import LoginLayout from '@/components/Layout/LoginLayout'
import MemberLayout from '@/components/Layout/MemberLayout'
import Snackbar from '@/components/Snackbar/Snackbar'

export default {
  name: 'App',
  components: {
    Snackbar,
    'login-layout': LoginLayout,
    'member-layout': MemberLayout
  },
  computed: {
    layout () {
      return this.$store.getters.getToken ? 'member-layout' : 'login-layout'
    }
  }
}
</script>

<style>

</style>
