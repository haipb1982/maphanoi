import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import quanLy from './quan-ly/index'
import customer from './customer/index'
import user from './user/index'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    quanLy,
    customer,
    user
  },
  strict: process.env.DEV,
})
