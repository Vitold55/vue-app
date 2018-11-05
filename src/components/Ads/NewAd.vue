<template>
    <v-container>
        <v-layout row>
            <v-flex  xs12 sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form v-model="valid" ref="form" class="mb-3">
                    <v-text-field
                        name="title"
                        label="Title"
                        type="text"
                        v-model="title"
                        required
                        :rules="[v => !!v || 'Title is required']"
                    >
                    </v-text-field>
                    <v-textarea
                        name="description"
                        label="Description"
                        type="text"
                        v-model="description"
                        required
                        :rules="[v => !!v || 'Description is required']"
                    >
                    </v-textarea>
                </v-form>

                <div class="mb-3">
                    <v-btn
                        color="blue-grey"
                        class="warning"
                    >
                        Upload
                        <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                </div>
                
                <div>
                    <img src="" alt="">
                </div>

                <div>
                    <v-switch
                        label="Add to promo?"
                        v-model="promo"
                        color="primary"
                    ></v-switch>
                </div>

                <div>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="success"
                        @click="createAd"
                        :disabled="!valid"
                    >
                        Create ad
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      name: 'NewAd',
      data () {
        return {
          title: '',
          description: '',
          promo: false,
          valid: false
        }
      },
      methods: {
        createAd () {
          if (this.$refs.form.validate()) {
            const ad = {
              title: this.title,
              description: this.description,
              promo: this.promo,
              imageSrc: 'https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2018/01/vue-spa-with-laravel.png?resize=2200%2C1125'
            }

            this.$store.dispatch('createAd', ad)
          }
        }
      }
    }
</script>
