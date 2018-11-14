<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 v-if="myAds.length > 0 && !loading">
                <h1 class="text--secondary mb-3">Ads list</h1>

                <v-card class="elevation-10 mb-3" v-for="ad in myAds" :key="ad.id">
                    <v-layout row>
                        <v-flex xs4>
                            <v-img
                                :src="ad.imageSrc"
                                height="160px"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ ad.title }}</h2>
                                <p>{{ ad.description }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs12 class="text-xs-center" v-else-if="myAds.length === 0 && !loading">
                <h2 class="mb-4 display-1 orange--text">You don't have any ads</h2>
            </v-flex>
            <v-flex xs12 class="text-xs-center" v-else>
                <div class="text-xs-center pt-5">
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
    export default {
      name: 'AdsList',
      computed: {
        myAds () {
          return this.$store.getters.myAds
        },
        loading () {
          return this.$store.getters.loading
        }
      }
    }
</script>
