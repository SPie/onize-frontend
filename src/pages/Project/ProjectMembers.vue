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
  </v-flex>
</template>

<script>
export default {
  name: 'ProjectMembers',
  data () {
    return {
      project: null
    }
  },
  computed: {
    hasMembers () {
      return (this.project !== 'undefined' && this.project.members !== 'undefined' && this.project.members.length > 0)
    },
    hasPendingInvites () {
      return (this.project !== 'undefined' && this.project.projectInvites !== 'undefined' && this.project.projectInvites.length > 0)
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
    }
  }
}
</script>
