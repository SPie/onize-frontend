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
            <v-list-tile :to="{name: 'ProjectDetails'}" v-if="hasProject">
              <v-list-tile-content>
                <v-list-tile-title class="title">{{ $t('pages.project') }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ project.label }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{name: 'ProjectMembers'}" v-if="hasProject">
              <v-list-tile-title class="title">{{ $t('pages.projectMembers') }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile :to="{name: 'ProjectConfiguration'}" v-if="hasProject">
              <v-list-tile-title class="title">{{ $t('pages.projectConfiguration') }}</v-list-tile-title>
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
          <v-list dense>
            <v-list-tile :to="{name: 'ProjectsList'}">
              <v-list-tile-title class="title">{{ $t('pages.projects') }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
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
      drawer: null,
      project: null
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
    },
    hasProject () {
      return this.project !== 'undefined' && this.project
    }
  },
  beforeMount () {
    this.getProject()
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
    },
    getProject () {
      let projectUuid = this.$store.getters.getProjectUuid

      if (projectUuid !== 'undefined') {
        this.$apiClient.projectDetails(projectUuid)
          .then(project => {
            this.project = project
          })
      }
    }
  }
}
</script>
