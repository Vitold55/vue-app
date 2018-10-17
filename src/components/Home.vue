<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                            v-for="ad in ads"
                            :key="ad.id"
                            :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn :to="'/ad/' + ad.id" class="error">{{ ad.title }}</v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="ad of ads">
                    <v-card>
                        <v-img
                            :src="ad.imageSrc"
                            height="200px"
                        ></v-img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{ ad.title }}</h3>
                                <div>{{ ad.description }}</div>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
                            <v-btn range color="primary">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
      name: 'Home',
      data () {
        return {
          ads: [
            {
              title: 'First ad',
              description: 'First ad description',
              promo: false,
              imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
              id: 1
            },
            {
              title: 'Second ad',
              description: 'Second ad description',
              promo: false,
              imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
              id: 2
            },
            {
              title: 'Third ad',
              description: 'Third ad description',
              promo: false,
              imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
              id: 3
            }
          ]
        }
      }
    }
</script>

<style scoped>
    .car-link{
        background: rgba(0, 0, 0, .5);
        padding: 5px 15px;
        border-radius: 5px 5px 0 0;
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>
