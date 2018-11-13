import * as fb from 'firebase/app'
import 'firebase/database'

class Ad {
  constructor (title, description, imageSrc = '', owner, promo = false, id = null) {
    this.title = title
    this.description = description
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'First ad description',
        promo: true,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        id: 1
      },
      {
        title: 'Second ad',
        description: 'Second ad description',
        promo: false,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        id: 2
      },
      {
        title: 'Third ad',
        description: 'Third ad description',
        promo: true,
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: 3
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
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
