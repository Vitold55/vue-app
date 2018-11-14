export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    async createOrder ({commit}, payload) {
      commit('createOrder', payload)

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 4000)
      })
    }
  },
  getters: {}
}
