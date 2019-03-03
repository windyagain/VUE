//入口文件
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)
// 导入格式化时间的插件
import moment from 'moment'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定会调用main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来
//放到store中

var car = JSON.parse(localStorage.getItem('car') || '[]')
console.log('car')
console.log(localStorage.getItem('car'))
console.log('car')
var store = new Vuex.Store({
    state: {//this.$store.state.***
        car: car   //将购物车商品中的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，
        //咱们可以暂时将这个商品对象，设计成 {id: 商品id, count: 要购买的数量, price: 商品单价, selected: true/false}
    },
    mutations:{//this.$store.commit('方法名称','按需传递唯一的参数')
        addToCar(state, goodsinfo){
            //点击加入购物车，把商品信息，保存到store中的car上
            //1.如果购物车之前就已经有这个对应的商品了，只需要更新数量
            //2.如果没有，则直接把商品数据，push到car中即可。
            var flag = false;//假设在购物车，没有找到对应的商品
            state.car.some(item=>{
                if(item.id== goodsinfo.id){
                    flag = true;
                    item.count += parseInt(goodsinfo.count)
                    return true
                }
            })
            //如果最终循环完毕，还是false，则把商品数据直接push到购物车中
            if(flag == false){
                state.car.push(goodsinfo)
            }


            //当更新car之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters: {//this.$store.getters.***
        //相当于计算属性，也相当于filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c+=item.count;
            })
            return c;
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.count;
            })
            return o
        }
    }
})

//定义全局的过滤器
Vue.filter('dateFormat', function (dateStr, pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dateStr).format(pattern)
})

///导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入所有MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
// 安装一下webPreview
Vue.use(VuePreview)
//安装MintUI，全局
Vue.use(MintUI)

//按需导入Mint-UUI中的组件
/* import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
Vue.component(Header.name, Header)

//安装懒启动 lazyload
Vue.use(Lazyload);

//导入轮播图所需要的文件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button) */

// 1.3 导入自己的router.js路由模块
import router from './router.js'


// 2.1 导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)


//设置请求的根路径
Vue.http.options.root = 'http://192.168.1.129/vue-back/'; //


//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//导入App根组件
import app from './App.vue'



var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    data: {

    },
    router,
    store// 挂在store状态管理对象

})