import * as fb from 'firebase/app'
import 'firebase/auth'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, id) {
      state.user = new User(id)
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', user.uid)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
