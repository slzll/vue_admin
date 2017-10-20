// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './style.less';
import store from '@/store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
/*Date格式化*/
Date.prototype.format = function (str) {
  let year = this.getFullYear();
  let month = this.getMonth()+1;
  let dmonth = month.toString().length==1?'0'+month:month;
  let day = this.getDate();
  let dday = day.toString().length == 1?'0'+day:day;
  let hour = this.getHours();
  let minute = this.getMinutes();
  let seconds = this.getSeconds();
  let formatStr = str;
  formatStr = formatStr.replace(/yyyy|YYYY/,year);
  formatStr = formatStr.replace(/MM/,dmonth);
  formatStr = formatStr.replace(/dd/,dday);
  formatStr = formatStr.replace(/hh/,hour);
  formatStr = formatStr.replace(/mm/,minute);
  formatStr = formatStr.replace(/ss/,seconds);
  return formatStr;
};
/*string转Date*/
String.prototype.parseDate = function (format) {
  let value = this.match(/(-\d+|\d+)/)[1];
  return new Date(parseInt(value)).format(format || "yyyy/MM/dd hh:mm:ss");
};

Vue.use(Vuex);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
