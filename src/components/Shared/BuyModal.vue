<template>
    <v-dialog
        v-model="modal"
        width="400"
    >
        <v-btn class="success" slot="activator" >Buy</v-btn>

        <v-card>
            <v-card-title
                class="headline grey lighten-2"
                primary-title
            >
                Buy ad
            </v-card-title>

            <v-card-text>
                <v-text-field
                    name="name"
                    label="Name"
                    type="text"
                    v-model="name"
                    required
                >
                </v-text-field>
                <v-text-field
                    name="phone"
                    label="Phone"
                    type="text"
                    v-model="phone"
                    required
                >
                </v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="close">
                    Close
                </v-btn>
                <v-btn
                    color="primary"
                    @click="buy"
                    :loading="localLoading"
                    :disabled="localLoading ||  this.name === '' || this.phone === ''"
                >
                    But it!
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
  export default {
    name: 'BuyModal',
    props: ['ad'],
    data () {
      return {
        modal: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      close () {
        this.name = ''
        this.phone = ''
        this.modal = false
      },
      buy () {
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.owner
          })
            .finally(() => {
              this.name = ''
              this.phone = ''
              this.localLoading = false
              this.modal = false
            })
        }
      }
    }
  }
</script>
