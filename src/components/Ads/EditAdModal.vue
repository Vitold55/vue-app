<template>
    <v-dialog
        v-model="modal"
        width="500"
    >
        <v-btn class="warning mr-2" slot="activator" >Edit</v-btn>

        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                primary-title
            >
                Edit ad
            </v-card-title>

            <v-card-text>
                <v-text-field
                    name="title"
                    label="Title"
                    type="text"
                    v-model="editedTitle"
                    required
                >
                </v-text-field>
                <v-textarea
                    name="description"
                    label="Description"
                    type="text"
                    v-model="editedDescription"
                    required
                >
                </v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    flat
                    @click="save"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
  export default {
    name: 'EditAdModal',
    props: ['ad'],
    data () {
      return {
        modal: false,
        editedTitle: this.ad.title,
        editedDescription: this.ad.description
      }
    },
    methods: {
      cancel () {
        this.editedTitle = this.ad.title
        this.editedDescription = this.ad.description
        this.modal = false
      },
      save () {
        if (this.editedTitle !== '' && this.editedDescription !== '') {
          this.$store.dispatch('editAd', {
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.ad.id
          })
          this.modal = false
        }
      }
    }
  }
</script>
