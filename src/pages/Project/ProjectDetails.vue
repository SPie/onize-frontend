<template>
  <v-flex v-if="project">
    <v-card class="elevation-3">
      <v-toolbar dark color="warning">
        <v-toolbar-title>{{ $t('pages.project') }} {{ project.label }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p>
          {{ project.description }}
        </p>
        <p>
          {{ $t('owner') }}: {{ project.user.email }}
        </p>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'ProjectDetails',
  data () {
    return {
      project: null
    }
  },
  beforeMount () {
    let projectUuid = this.$store.getters.getProjectUuid
    if (!projectUuid) {
      this.$router.push({name: 'ProjectsList'})
    }

    this.$apiClient.projectDetails(projectUuid)
      .then(project => {
        this.project = project
      })
  }
}
</script>
