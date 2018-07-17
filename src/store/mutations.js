import types from '@/store/mutation-types';
import localData from "@/config/localData";

export const state = {
  apiUrl: "http://test10.jy365.net/api",
  apiUrlAdmin: 'http://test10.jy365.net/api/admin',
  isCollapse: false,
  activeName: 'home',
  tabMenu: {},
  localData: localData,
  reload: false
};

export const mutations = {
  [types.EXPAND_SIDEBAR](state) {
    if (state.isCollapse) {
      state.isCollapse = false;
    } else {
      state.isCollapse = true;
    }
  },
  [types.ADD_TAB](state, item) {
    state.tabMenu = item;
  },
  [types.SET_LOCAL_DATA](state, {
    key,
    arr
  }) {
    if (!state.localData[key]) {
      state.localData[key] = arr;
    }
  },
  [types.SET_TAB_ACTIVE_NAME](state, activeName) {
    state.activeName = activeName;
  },
  [types.SET_RELOAD](state, value) {
    state.reload = value;
  }
};
