<template>
  <v-flex>
    <v-card class="elevation-3">
      <v-toolbar dark color="warning">
        <v-toolbar-title>{{ $t('pages.addProject') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="label"
            :label="$t('label')"
            :error-messages="labelErrors.map(error => $t(error))"
            type="text"
            prepend-icon="label"
          ></v-text-field>
          <v-textarea
            v-model="description"
            :label="$t('description')"
            :error-messages="descriptionErrors.map(error => $t(error))"
            prepend-icon="description"
          ></v-textarea>
        </v-form>
        <v-card-actions>
          <v-btn color="warning" :disabled="isEmpty" @click="addProject()" >{{ $t('add') }}</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'AddProject',
  data () {
    return {
      label: '',
      description: '',
      labelErrors: [],
      descriptionErrors: []
    }
  },
  computed: {
    isEmpty () {
      return (!this.label)
    }
  },
  methods: {
    addProject () {
      this.labelErrors = []
      this.descriptionErrors = []

      this.$apiClient.addProject(this.label, this.description)
        .then(response => {
          this.$store.commit('showSnackbar', {text: 'message.addProjectSuccess', color: 'success'})

          this.$router.push({name: 'ProjectsList'})
        })
        .catch(error => {
          this.label = ''
          this.description = ''

          this.$store.commit('showSnackbar', {text: 'message.addProjectError', color: 'error'})

          if (error.response.status === 422) {
            if (typeof error.response.data.label !== 'undefined') {
              this.labelErrors = error.response.data.label
            }
            if (typeof error.response.data.description !== 'undefined') {
              this.descriptionErrors = error.response.data.description
            }
          }
        })
    }
  }
}
</script>
