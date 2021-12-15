import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import mapdata from './mapdata/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mapdata
  },
  strict: process.env.DEV,
})
