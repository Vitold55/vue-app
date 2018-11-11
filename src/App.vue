<template>
    <v-app>

        <v-navigation-drawer
            app
            temporary
            v-model="drawer"
        >
            <v-list>
                <v-list-tile
                    v-for="link in links"
                    :key="link.title"
                    :to="link.url"
                >
                    <v-list-tile-action>
                        <v-icon v-if="link.icon">{{link.icon}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="link.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app dark color="primary">
            <v-toolbar-side-icon
                @click="drawer = !drawer"
                class="hidden-md-and-up"
            ></v-toolbar-side-icon>

            <v-toolbar-title class="white--text">
                <router-link to="/" tag="span" class="pointer">Ad application</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    flat
                    v-for="link of links"
                    :key="link.title"
                    :to="link.url"
                >
                    <v-icon>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>

        <v-footer app></v-footer>

        <!-- Errors displaying -->
        <div v-if="error">
            <v-snackbar
                :multi-line="true"
                :timeout="5000"
                color="error"
                value="true"
            >
                {{ error }}
                <v-btn
                        dark
                        flat
                        @click="closeError"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </div>

    </v-app>

</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      links: [
        {
          icon: 'lock',
          title: 'Login',
          url: '/login'
        },
        {
          icon: 'face',
          title: 'Registration',
          url: '/registration'
        },
        {
          icon: 'bookmark_border',
          title: 'Orders',
          url: '/orders'
        },
        {
          icon: 'note_add',
          title: 'New ad',
          url: '/new'
        },
        {
          icon: 'list',
          title: 'My ads',
          url: '/list'
        }
      ]
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  },
  name: 'App'
}
</script>

<style scoped>
    .pointer{
        cursor: pointer;
    }
</style>
