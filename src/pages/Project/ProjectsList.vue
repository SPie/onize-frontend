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
            <v-list-tile-title>{{ project.label }}</v-list-tile-title>
            <v-list-tile-content>{{ project.description }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'ProjectsList',
  data () {
    return {
      projects: []
    }
  },
  mounted () {
    this.$apiClient.projectsList()
      .then((response) => {
        this.projects = response.projects
      })
  }
}
</script>
