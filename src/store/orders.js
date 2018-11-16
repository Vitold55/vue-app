import * as fb from 'firebase/app'
import 'firebase/database'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    },
    updateOrder (state, id) {
      let order = state.orders.find(order => order.id === id)
      order.done = true
    }
  },
  actions: {
    async createOrder ({commit, router}, payload) {
      const order = new Order(payload.name, payload.phone, payload.adId)
      await fb.database().ref(`users/${payload.ownerId}/orders`).push(order)
    },
    async fetchOrders ({commit, getters}) {
      commit('setLoading', true)
      commit('clearError')

      let ordersRes = []

      try {
        const fbVal = await fb.database().ref(`users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()

        Object.keys(orders).forEach(key => {
          const order = orders[key]
          ordersRes.push(new Order(order.name, order.phone, order.adId, order.done, key))
        })

        commit('loadOrders', ordersRes)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async markOrderDone ({commit, getters}, id) {
      commit('setLoading', true)
      commit('clearError')

      try {
        await fb.database().ref(`users/${getters.user.id}/orders`).child(id).update({done: true})
        commit('updateOrder', id)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
