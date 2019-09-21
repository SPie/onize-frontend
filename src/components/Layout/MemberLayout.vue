<template>
    <v-app>
        <snackbar></snackbar>
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            width="200"
            app
            fixed
        >
          <v-list dense>
            <v-list-tile :to="{name: 'ProjectsList'}">
              <v-list-tile-title class="title">
                Projects
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            fixed
            dark
            color="warning"
        >
            <v-toolbar-title>
                Onize
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn icon large slot="activator">
                    <v-avatar>
                        <img :src="avatarHash" />
                    </v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="avatarHash" />
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ authenticatedUserEmail }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="settingsLink">
                        <v-list-tile-title>
                            {{ $t('settings')}}
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="logoutLink">
                        <v-list-tile-title>
                            {{ $t('logout')}}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout align-center justify-center >
                  <v-flex md8>
                    <router-view/>
                  </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar/Snackbar'
import MD5 from 'js-md5'
export default {
  name: 'MemberLayout',
  components: {
    Snackbar
  },
  data () {
    return {
      drawer: null
    }
  },
  computed: {
    avatarHash () {
      let authenticatedser = this.authenticatedUser()

      return 'https://www.gravatar.com/avatar/' + (authenticatedser ? MD5(authenticatedser.email) : '') + '?d=identicon'
    },
    authenticatedUserEmail () {
      let authenticatedUser = this.authenticatedUser()

      if (authenticatedUser) {
        return authenticatedUser.email
      }

      return ''
    }
  },
  methods: {
    authenticatedUser () {
      return this.$store.getters.getAuthenticatedUser
    },
    settingsLink () {
      this.$router.push({name: 'SecuritySettings'})
    },
    logoutLink () {
      this.$apiClient.logout()
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.logoutSuccess', color: 'success'})
          this.$store.commit('setAuthToken', null)

          this.$router.push({name: 'Login'})
        })
        .catch(() => {
          this.$store.commit('showSnackbar', {text: 'message.logoutError', color: 'error'})
        })
    }
  }
}
</script>
