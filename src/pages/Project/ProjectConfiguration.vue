<template>
  <v-flex>
    <v-card class="elevation-3" v-if="project">
      <v-toolbar dark color="warning">
        <v-toolbar-title>{{ $t('pages.projectConfiguration') }} {{ project.label }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-card class="elevation-3">
          <v-toolbar dark color="warning">
            <v-toolbar-title>{{ $t('projectMetaDataElements') }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list dense>
              <v-list-tile
                v-for="metaDataElement in project.projectMetaDataElements"
                :key="metaDataElement.name"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ metaDataElement.label }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-title>{{ metaDataElement.name }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-title>{{ metaDataElement.fieldType }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-title>{{ metaDataElement.required }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-title>{{ metaDataElement.inList }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="warning" @click.stop="openProjectMetaDataElementDialog()">{{ $t('addProjectMetaDataElement') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="projectMetaDataDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">{{ $t('pages.addProjectMetaDataElement')}}</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="label"
              :label="$t('label')"
              :error-message="labelErrors.map(error => $t(error))"
            ></v-text-field>
            <v-text-field
              v-model="name"
              :label="$t('name')"
              :error-message="nameErrors.map(error => $t(error))"
            ></v-text-field>
            <v-select
              v-model="fieldType"
              :label="$t('fieldType')"
              :error-message="fieldTypeErrors.map(error => $t(error))"
              :items="fieldTypes"
            ></v-select>
            <v-switch
              v-model="required"
              :label="$t('required')"
              color="warning"
            ></v-switch>
            <v-switch
              v-model="inList"
              :label="$t('inList')"
              color="warning"
            ></v-switch>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="warning"
            flat="flat"
            :disabled="isEmpty"
            @click="addProjectMetaDataElement()"
          >
            {{ $t('dialog.add') }}
          </v-btn>
          <v-btn
            flat="flat"
            @click="closeProjectMetaDataElementDialog()"
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
  name: 'ProjectConfiguration',
  data () {
    return {
      project: null,
      projectMetaDataDialog: false,
      name: null,
      label: null,
      required: false,
      inList: false,
      fieldType: null,
      nameErrors: [],
      labelErrors: [],
      requiredErrors: [],
      inListErrors: [],
      positionErrors: [],
      fieldTypeErrors: [],

      fieldTypes: ['text', 'number', 'date', 'email']
    }
  },
  computed: {
    isEmpty () {
      return this.name === null
    }
  },
  beforeMount () {
    this.getProject()
  },
  methods: {
    getProject () {
      let projectUuid = this.$store.getters.getProjectUuid
      if (!projectUuid) {
        this.$router.push({name: 'ProjectsList'})
      }

      this.$apiClient.projectDetails(projectUuid)
        .then(project => {
          this.project = project
        })
    },
    openProjectMetaDataElementDialog () {
      this.projectMetaDataDialog = true
    },
    closeProjectMetaDataElementDialog () {
      this.clearInput()
      this.clearErrors()
    },
    addProjectMetaDataElement () {
      this.clearErrors()

      this.$apiClient.addProjectMetaDataElement(this.project.uuid, this.name, this.label, this.required, this.inList, this.project.projectMetaDataElements.length, this.fieldType)
        .then(() => {
          this.$store.commit('showSnackbar', {text: 'message.addMetaDataElementSuccess', color: 'success'})
          this.closeProjectMetaDataElementDialog()
          this.getProject()
        })
        .catch(error => {
          this.clearInput()

          this.$store.commit('showSnackbar', {text: 'message.addMetaDataElementError', color: 'error'})

          if (error.status === 422) {
            if (typeof error.response.data.name !== 'undefined') {
              this.nameErrors = error.response.data.name
            }
            if (typeof error.response.data.label !== 'undefined') {
              this.labelErrors = error.response.data.label
            }
            if (typeof error.response.data.required !== 'undefined') {
              this.requiredErrors = error.response.data.required
            }
            if (typeof error.response.data.inList !== 'undefined') {
              this.inListErrors = error.response.data.inList
            }
            if (typeof error.response.data.fieldType !== 'undefined') {
              this.fieldTypeErrors = error.response.data.fieldType
            }
          }
        })
    },
    clearInput () {
      this.name = null
      this.label = null
      this.required = false
      this.inList = false
      this.fieldType = null
      this.projectMetaDataDialog = false
    },
    clearErrors () {
      this.nameErrors = []
      this.labelErrors = []
      this.requiredErrors = []
      this.inListErrors = []
      this.fieldTypeErrors = []
    }
  }
}
</script>
