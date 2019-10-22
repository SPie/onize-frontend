<template>
  <v-flex v-if="project">
    <v-card class="elevation-3">
      <v-toolbar dark color="warning">
        <v-toolbar-title>{{ $t('pages.project') }} {{ project.label }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card class="elevation-0" v-if="hasMembers">
          <v-toolbar dark color="warning">
            {{ $t('members') }}
          </v-toolbar>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ project.user.email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="member in project.members"
              :key="member.uuid"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ member.email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-btn color="warning" @click.stop="openInviteDialog()">{{ $t('inviteUser') }}</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="elevation-0" v-if="hasPendingInvites">
          <v-toolbar dark color="warning">
            {{ $t('pendingInvites') }}
          </v-toolbar>
          <v-list dense>
            <v-list-tile
              v-for="projectInvite in project.projectInvites"
              :key="projectInvite.email"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ projectInvite.email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="inviteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('inviteUser')}}</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              :label="$t('email')"
              :error-messages="emailErrors.map(error => $t(error))"
              type="email"
              prepend-icon="email"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="warning"
            flat="flat"
            :disabled="isEmailEmpty"
            @click="invite()"
          >
            {{ $t('dialog.invite') }}
          </v-btn>
          <v-btn
            flat="flat"
            @click="closeInviteDialog()"
          >
            {{ $t('dialog.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
export default {
  name: 'ProjectMembers',
  data () {
    return {
      project: null,
      inviteDialog: false,
      email: null,
      emailErrors: []
    }
  },
  computed: {
    hasMembers () {
      return (this.project !== 'undefined' && this.project.members !== 'undefined' && this.project.members.length > 0)
    },
    hasPendingInvites () {
      return (this.project !== 'undefined' && this.project.projectInvites !== 'undefined' && this.project.projectInvites.length > 0)
    },
    isEmailEmpty () {
      return !this.email
    }
  },
  beforeMount () {
    let projectUuid = this.$store.getters.getProjectUuid
    if (!projectUuid) {
      this.$router.push({name: 'ProjectsList'})
    }

    this.getProject(projectUuid)
  },
  methods: {
    getProject (uuid) {
      this.$apiClient.projectDetails(uuid)
        .then(project => {
          this.project = project
        })
    },
    openInviteDialog () {
      this.email = null
      this.inviteDialog = true
    },
    closeInviteDialog () {
      this.email = null
      this.inviteDialog = false
    },
    invite () {
      this.emailErrors = []

      let inviteUrl = process.env.BASE_URL + '/' + this.$router.resolve({name: 'ProjectInviteFinish'}).href + '?token=TOKEN'
      this.$apiClient.projectInvite(this.project.uuid, this.email, inviteUrl)
        .then(() => {
          this.getProject(this.project.uuid)

          this.$store.commit('showSnackbar', {text: 'message.projectInviteSuccess', color: 'success'})

          this.closeInviteDialog()
        })
        .catch(error => {
          this.email = null

          this.$store.commit('showSnackbar', {text: 'message.projectInviteError', color: 'error'})

          if (error.response.status === 422) {
            if (typeof error.response.data.email !== 'undefined') {
              this.emailErrors = error.response.data.email
              return
            }
          }

          if (error.response.status === 409) {
            this.emailErrors = ['validation.alreadyMember']
            return
          }

          this.closeInviteDialog()
        })
    }
  }
}
</script>
