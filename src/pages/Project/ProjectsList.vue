<template>
  <v-flex>
    <v-card class="elevation-3">
      <v-toolbar dark color="warning">
        <v-toolbar-title>{{ $t('pages.projects') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list dense>
          <v-list-tile
            v-for="project in projects"
            :key="project.identifier"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ project.label }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ project.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-icon @click.stop="openDeleteDialog(project.uuid)">delete</v-icon>
          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-btn color="warning" :to="{name: 'AddProject'}" >{{ $t('addProject') }}</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('deleteProject')}}</v-card-title>
        <v-card-text>
          {{ $t('text.deleteProject') }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            flat="flat"
            @click="deleteProject()"
          >
            {{ $t('dialog.delete') }}
          </v-btn>
          <v-btn
            flat="flat"
            @click="closeDeleteDialog()"
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
  name: 'ProjectsList',
  data () {
    return {
      projects: [],
      dialog: false,
      projectUuid: null
    }
  },
  mounted () {
    this.getProjects()
  },
  methods: {
    getProjects () {
      this.$apiClient.projectsList()
        .then((projects) => {
          this.projects = projects
        })
    },
    openDeleteDialog (projectUuid) {
      this.dialog = true
      this.projectUuid = projectUuid
    },
    closeDeleteDialog () {
      this.dialog = false
      this.projectUuid = null
    },
    deleteProject () {
      this.dialog = false

      this.$apiClient.deleteProject(this.projectUuid)
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.deleteProjectSuccess', color: 'success'})

          this.getProjects()
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.$store.commit('showSnackbar', {text: 'message.notAllowed', color: 'error'})
            return
          }

          this.$store.commit('showSnackbar', {text: 'message.deleteProjectError', color: 'error'})
        })
        .finally(() => {
          this.projectUuid = null
        })
    }
  }
}
</script>
