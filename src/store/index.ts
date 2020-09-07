import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 1,
    demo: 100
  },
  getters: {

  },
  mutations: {
    increment(state) {
      state.count++
      state.demo++
    }
  },
  actions: {
    addDemo(content) {
      content.commit('increment')
    }
  },
  modules: {
  }
})
