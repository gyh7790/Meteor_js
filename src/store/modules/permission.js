const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = routes
  }
}

const actions = {
  setRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
