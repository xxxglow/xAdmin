import axios from "axios"
import {Loading, Message} from 'element-ui'

let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    })
}
function  endLoading() {
    loading.close()
}

//请求拦截 设置统一header
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();
    if(localStorage.eleToken)
        config.headers.Authorization = localStorage.eleToken
    return config
}, error => {
    return Promise.reject(error)
});

// 响应拦截 401 token过期处理
axios.interceptors.response.use(response => {
    // 结束动画
    endLoading();
    return response;
}, error => {
    // 错误提醒
    endLoading();
    Message.error(error.response.data);

    // 获取错误状态码
    const {status} = error.response;
    if (status ==401) {
        Message.error('token失效，请重新登录！');
        // 清除token
        localStorage.removeItem('eleToken');
        // 跳转到登录页面
        router.push('/login');
    }

    return Promise.reject(error)
});


export default axios
