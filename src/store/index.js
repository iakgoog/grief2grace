import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const nine = 'https://i.imgbox.com/KD31xDMd.png'
// ๙ => 'https://i.imgbox.com/KD31xDMd.png'
// firebase => 'https://i.imgbox.com/nIf0vAHB.png'
// vue => 'https://i.imgbox.com/g2FVLYSw.png'

const state = {
  beforeCropImage: null,
  mainImage: null,
  smallImages: [],
  isAnimatingMode: false
}

const actions = {
  setBeforeCropImage: ({ commit }, image) => commit('setBeforeCropImage', image),
  setMainImage: ({ commit }, image) => commit('setMainImage', image),
  addSmallImages: ({ commit }, image) => commit('addSmallImages', image),
  removeSmallImages: ({ commit }, image) => commit('removeSmallImages', image),
  setAnimatingMode: ({ commit }, status) => commit('setAnimatingMode', status)
}

const mutations = {
  setBeforeCropImage (state, image) {
    state.beforeCropImage = image
  },
  setMainImage (state, image) {
    state.mainImage = image
  },
  addSmallImages (state, image) {
    state.smallImages.push(image)
  },
  removeSmallImage (state, image) {
    const index = state.smallImages.indexOf(image)
    state.smallImages.splice(index, 1)
  },
  setAnimatingMode (state, status) {
    state.isAnimatingMode = status
  }
}

const getters = {
  beforeCropImage () {
    return state.beforeCropImage
  },
  mainImage () {
    return state.mainImage
  },
  smallImages () {
    return state.smallImages
  },
  displayImage (state) {
    return state.mainImage || ''
  },
  isAnimatingMode () {
    return state.isAnimatingMode
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
