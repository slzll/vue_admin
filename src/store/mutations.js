import types from '@/store/mutation-types';
import localData from "@/config/localData";

export const state = {
  apiUrl: "http://test10.jy365.net/api",
  apiUrlAdmin: 'http://test10.jy365.net/api/admin',
  alertOption:{
    show: false,
    title: '',
    type: 'success',
    description: '',
    closable: true,
    closeText: '',
    showIcon: false,
  },
  isCollapse: false,
  activeName: 'home',
  tabMenu: {},
  localData: localData
};

export const mutations = {
  [types.EXPAND_SIDEBAR] (state) {
    if (state.isCollapse){
      state.isCollapse = false;
    } else{
      state.isCollapse = true;
    }
  },
  [types.ADD_TAB] (state, item) {
    state.tabMenu = item;
  },
  [types.SET_LOCAL_DATA] (state, {key, arr}) {
    if (!state.localData[key]){
      state.localData[key] = arr;
    }
  },
  [types.SET_TAB_ACTIVE_NAME] (state, activeName) {
    state.activeName = activeName;
  },
  [types.SET_ALERT_OPTION] (state, { show, title, type, description, closable, closeText, showIcon }) {
    state.alertOption.show = show === false? false:true;
    state.alertOption.title = title || state.alertOption.title;
    state.alertOption.type = type || state.alertOption.type;
    state.alertOption.description = description || state.alertOption.description;
    state.alertOption.closable = closable === false?false:true;
    state.alertOption.closeText = closeText || state.alertOption.closeText;
    state.alertOption.showIcon = (showIcon === false|| !showIcon)?false:true;
  }
};
