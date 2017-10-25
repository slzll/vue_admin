import types from '@/store/mutation-types';

export const expandSidebar = ({ commit }) => {
  commit(types.EXPAND_SIDEBAR);
};

export const addTab = ({ commit }, item) => {
  commit(types.ADD_TAB,item);
};

export const setLocalData = ({ commit }, { key, arr }) => {
  commit(types.SET_LOCAL_DATA, { key, arr })
};

export const setActiveName = ({ commit }, activeName) => {
  commit(types.SET_TAB_ACTIVE_NAME, activeName)
};

export const setAlertOption = ({ commit },options) =>{
  commit(types.SET_ALERT_OPTION, options);
  setTimeout(() => {
    commit(types.SET_ALERT_OPTION, {show: false})
  }, 5000)
};
