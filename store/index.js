export const state = () => ({
  loadedImpulses: [],
  selectedImpulse: {},
  mixLevel: 10,
  playing: false,
  playImpulse: 0,
});

export const mutations = {
  setImpulses(state, impulses) {
    state.loadedImpulses = impulses;
  },
  setSelectedImpulse(state, impulse) {
    state.selectedImpulse = impulse;
  },
  setMixLevel(state, level) {
    state.mixLevel = level;
  },
  increaseMixLevel(state) {
    state.mixLevel =
      state.mixLevel >= 20 ? state.mixLevel : (state.mixLevel += 1);
  },
  decreaseMixLevel(state, level) {
    state.mixLevel =
      state.mixLevel <= 1 ? state.mixLevel : (state.mixLevel -= 1);
  },
  togglePlay(state) {
    state.playing = !state.playing;
  },
  playImpulse(state) {
    state.playImpulse = state.playImpulse += 1;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, context) {
    try {
      const data = await this.$axios.$get('/api/impulses');
      commit('setImpulses', data.impulses);
      commit('setSelectedImpulse', data.impulses[0] || {});
    } catch (error) {
      context.error(error);
    }
  },
  async updateImpulses({ commit }) {
    try {
      const { impulses } = await this.$axios.$get('/api/impulses');
      commit('setImpulses', impulses);
    } catch (error) {
      this.context.error(error);
    }
  },
};
