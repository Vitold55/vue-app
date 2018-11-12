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
      if (id !== null) {
        state.user = new User(id)
      } else {
        state.user = null
      }
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
    },
    async loginUser ({commit}, {email, password}) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', user.uid)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLogin ({commit}, payload) {
      commit('setUser', new User(payload.id))
    },
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
