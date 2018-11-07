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
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        console.log('User', user)
        commit('setUser', user.uid)
      } catch (error) {
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
