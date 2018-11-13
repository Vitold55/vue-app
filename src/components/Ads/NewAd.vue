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
                        @click="triggerUpload"
                    >
                        Upload
                        <v-icon right dark>cloud_upload</v-icon>
                    </v-btn>
                    <input type="file" accept="image/*" ref="fileInput" style="display: none" @change="fileUpload">
                </div>

                <div>
                    <img :src="imageSrc" alt="" v-if="imageSrc" width="200">
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
                        :loading="loading"
                        class="success"
                        @click="createAd"
                        :disabled="!valid || !image || loading"
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
          valid: false,
          image: null,
          imageSrc: ''
        }
      },
      computed: {
        loading () {
          return this.$store.getters.loading
        }
      },
      methods: {
        createAd () {
          if (this.$refs.form.validate() && this.image) {
            const ad = {
              title: this.title,
              description: this.description,
              promo: this.promo,
              image: this.image
            }

            this.$store.dispatch('createAd', ad)
              .then(() => {
                this.$store.dispatch('setLoading', false)
                this.$router.push('/list')
              })
              .catch(() => {})
          }
        },
        triggerUpload () {
          this.$refs.fileInput.click()
        },
        fileUpload (e) {
          const file = e.target.files[0]

          const reader = new FileReader()
          reader.onload = () => {
            this.imageSrc = reader.result
          }
          reader.readAsDataURL(file)
          this.image = file
        }
      }
    }
</script>
