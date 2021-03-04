import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedImpulses: [],
      selectedImpulse: {},
    },
    mutations: {
      setImpulses(state, impulses) {
        state.loadedImpulses = impulses;
      },
      setSelectedImpulse(state, impulse) {
        state.selectedImpulse = impulse;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get('http://localhost:3000/api/impulses')
          .then((res) => {
            vuexContext.commit('setImpulses', res.data.impulses);
            vuexContext.commit(
              'setSelectedImpulse',
              res.data.impulses[0],
            );
          })
          .catch((e) => context.error(e));
      },
      setImpulses(vuexContext, impulses) {
        vuexContext.commit('setImpulses', impulses);
      },
      setSelectedImpulse(vuexContext, impulse) {
        vuexContext.commit('setSelectedImpulse', impulse);
      },
    },
    getters: {
      loadedImpulses(state) {
        return state.loadedImpulses;
      },
      selectedImpulse(state) {
        return state.selectedImpulse;
      },
    },
  });
};

export default createStore;
