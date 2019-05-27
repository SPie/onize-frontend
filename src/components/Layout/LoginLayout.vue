<template>
    <v-app>
        <snackbar></snackbar>
        <v-content>
            <v-container fluid >
                <v-layout align-center justify-center >
                    <v-flex xs12 sm8 md3 >
                        <router-view/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar/Snackbar'
export default {
  name: 'LoginLayout',
  components: {
    Snackbar
  }
}
</script>
