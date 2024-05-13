import axios from "axios";
//引入进度条样式

const $http = axios.create({
    //基础路径
    baseURL: '/api', //基础路径上会携带/api
    timeout: 5000, //超时的时间的设置
})

//第二步:request实例添加请求与响应拦截器
$http.interceptors.request.use((config) => {
    //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    //config配置对象,headers属性请求头,经常给服务器端携带公共参数
    //返回配置对象
    return config
})

//第三步:响应拦截器
$http.interceptors.response.use(
    (response) => {
        //成功回调
        //简化数据
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default $http