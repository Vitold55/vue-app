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
    createAd ({commit}, payload) {
      payload.id = Math.ceil(Math.random() * 1000)

      commit('createAd', payload)
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
