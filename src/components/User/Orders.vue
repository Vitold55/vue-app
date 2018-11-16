<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Orders</h1>

                <v-list subheader two-line v-if="orders.length > 0 && !loader" v-for="order in orders" :key="order.id">

                    <v-list-tile>
                        <v-list-tile-action>
                            <v-checkbox
                                color="primary"
                                @click.prevent="markDone(order)"
                                :input-value="order.done"
                            >
                            </v-checkbox>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ order.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>

                </v-list>

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
    export default {
      name: 'Orders',
      computed: {
        orders () {
          return this.$store.getters.orders
        },
        loader () {
          return this.$store.getters.loader
        }
      },
      methods: {
        markDone (order) {
          if (order.done) {
            return
          }
          this.$store.dispatch('markOrderDone', order.id)
        }
      },
      created () {
        if (this.$store.getters.isUserLoggedIn) {
          this.$store.dispatch('fetchOrders')
        } else {
          this.$router.push('/')
        }
      }
    }
</script>
