<template>
<!-- <div class="goods-list">
    <router-link class="goods-item" v-for="item in goodslist" :key="item.src" :to="'/home/goodsinfo/' + item.id ">
        <img :src="item.img_url" alt="" tag = "div">
         <h1 class="title">{{item.title}}</h1>
         <div class="info">
             <p class="price">
                 <span class="now">￥{{item.sell_price}}</span>
                 <span class="old">￥{{item.market_price}}</span>
             </p>
             <p class="sell">
                 <span>热卖中</span>
                 <span>剩{{item.stock_quantity}}件</span>
             </p>
         </div>
    </router-link> -->
<!-- 在网页中，有两种跳转方式，
方式1，使用a标签的形式，叫做标签跳转
方式2，使用window.location.href的形式，编程式跳转 -->

<div class="goods-list">
    <div class="goods-item" v-for="item in goodslist" :key="item.src" >
        <img :src="item.img_url" alt="" @click="goDetail(item.id)">
         <h1 class="title">{{item.title}}</h1>
         <div class="info">
             <p class="price">
                 <span class="now">￥{{item.sell_price}}</span>
                 <span class="old">￥{{item.market_price}}</span>
             </p>
             <p class="sell">
                 <span>热卖中</span>
                 <span>剩{{item.stock_quantity}}件</span>
             </p>
         </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore"> 加载更多 </mt-button>
</div>




</template>

<script>
export default{
    data(){
        //挂载私有数据
        return {
            pageIndex: 1,
            goodslist: []
        }
    },
    created(){
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            // 获取商品列表
            this.$http.get('getGoodsList.php?pageIndex=' + this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    //this.goodslist = result.body.message
                    this.goodslist = this.goodslist.concat(result.body.message) 
                }
            })    
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList();    
        },
        goDetail(id){
            //使用JS的形式进行路由导航
            //注意，区分this.$route 和this.$router两个对象
            //其中： this.$route是路由参数对象，所有路由中的参数，params, query都属于它
            // 其中：this.$router是一个路由导航对象，用它可以方便使用JS代码，实现路由的前进，后退、页面跳转

            //第一种，最简单的
            //this.$router.push('/home/goodsinfo/' + id)
            //第二种,传递对象
            //this.$router.push({ path: '/home/goodsinfo/' + id })
            //第三种,传递命名的路由
            this.$router.push({ name: "goodsinfo" , params: { id } });
        }
    }
}
</script>


<style lang="less" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width:100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin:0;
                padding:5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size:12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;

            }
        }
    }
}
</style>
