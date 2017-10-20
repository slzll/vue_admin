import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


/**
 * [get 封装get请求]
 * @param  {[string]} url [请求地址]
 * @return {[object]}     [promise]
 */
export function get(url, params) {
    return axios({
        method: 'GET',
        url: url,
        params: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        credentials: {
            withCredentials: true
        }
    }).then((res) => {
        return Promise.resolve(res.data);
    });
}

/**
 * [post 封装post请求]
 * @param  {[string]} url  [请求地址]
 * @param  {[object]} data [数据]
 * @return {[object]}      [promise]
 */
export function post(url, data) {
    return axios({
        method: 'POST',
        url: url,
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        credentials: {
            withCredentials: true
        }
    }).then(res => {
        return Promise.resolve(res.data);
    });
}

/**
 * [all 封装all请求]
 * @param  {[array]} promise  [请求]
 * @return {[object]}      [promise]
 */
export function all(axiosArr) {
  return axios.all(axiosArr);
}
