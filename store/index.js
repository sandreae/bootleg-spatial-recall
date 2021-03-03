import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedImpulses: [],
    },
    mutations: {
      setImpulses(state, impulses) {
        state.loadedImpulses = impulses;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get('http://localhost:3000/api/impulses')
          .then((res) => {
            vuexContext.commit('setImpulses', res.data.impulses);
          })
          .catch((e) => context.error(e));
      },
      setImpulses(vuexContext, impulses) {
        vuexContext.commit('setImpulses', impulses);
      },
    },
    getters: {
      loadedImpulses(state) {
        return state.loadedImpulses;
      },
    },
  });
};

export default createStore;
