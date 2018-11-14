<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="ad && !loading">
                    <v-img
                        :src="ad.imageSrc"
                        height="300px"
                    ></v-img>
                    <v-card-text>
                        <h1>{{ ad.title }}</h1>
                        <p>{{ ad.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <EditAdModal :ad="ad" v-if="isMyAd"></EditAdModal>
                        <AppBuyModal :ad="ad"></AppBuyModal>
                    </v-card-actions>
                </v-card>
                <div v-else class="text-xs-center pt-5">
                    <v-progress-circular
                            :size="100"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import EditAdModal from './EditAdModal'

    export default {
      name: 'Ad',
      props: ['id'],
      computed: {
        ad () {
          const id = this.id

          return this.$store.getters.adById(id)
        },
        loading () {
          return this.$store.getters.loading
        },
        isMyAd () {
          return this.$store.getters.user.id === this.ad.owner
        }
      },
      components: {
        EditAdModal
      }
    }
</script>
