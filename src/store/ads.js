import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

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
    },
    editAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')

      const ad = new Ad(
        payload.title,
        payload.description,
        '',
        getters.user.id,
        payload.promo
      )

      try {
        const newAd = await fb.database().ref('ads').push(ad)

        const image = payload.image
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`ads/${newAd.key}${imageExt}`).put(image)
        const filePath = fileData.metadata.name
        const imageSrc = await fb.storage().ref('ads').child(filePath).getDownloadURL()

        await fb.database().ref('ads').child(newAd.key).update({imageSrc})

        commit('createAd', {
          ...ad,
          id: newAd.key,
          imageSrc
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
    },
    async editAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('ads').child(id).update({
          title,
          description
        })

        commit('editAd', {title, description, id})
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
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
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
