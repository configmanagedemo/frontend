"use strict";

import Vue from "vue";
import axios from "axios";
import Element from "element-ui";
import router from "../router/index";
// import "element-ui/lib/theme-chalk/index.css";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.data.errcode == 2000) {
      Element.Message.error("请登录!");
      router.push("/login");
      return response;
    }
    if (response.data.errcode !== 200) {
      Element.Message.error(
        "error!, code: " +
          response.data.errcode +
          ", message: " +
          response.data.errmsg
      );
      return new Promise(() => {}); // stop chain
    }
    return response;
  },
  function(error) {
    Element.Message.error(
      `http error!, message: ${error}`
    );
    console.error(error);
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
