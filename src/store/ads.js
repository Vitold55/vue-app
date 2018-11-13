import * as fb from 'firebase/app'
import 'firebase/database'

class Ad {
  constructor (title, description, imageSrc = '', owner, promo = false, id = null) {
    this.title = title
    this.description = description
    this.imageSrc = imageSrc
    this.owner = owner
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      console.log(getters.user)
      const ad = new Ad(
        payload.title,
        payload.description,
        payload.imageSrc,
        getters.user.id,
        payload.promo
      )

      try {
        const newAd = await fb.database().ref('ads').push(ad)

        commit('createAd', {
          ...ad,
          id: newAd.key
        })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('setLoading', true)
      commit('clearError')

      let adsResult = []

      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          let ad = ads[key]
          adsResult.push(new Ad(ad.title, ad.description, ad.imageSrc, ad.owner, ad.promo, key))
        })

        commit('loadAds', adsResult)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === parseFloat(adId))
      }
    }
  }
}
