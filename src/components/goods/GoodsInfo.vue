<template>
    <div class="goodsinfo-container">
<transition 
@before-enter="beforeEnter"
@enter="enter"
@after-enter="afterEnter">
<div class="ball" v-show="ballFlag" ref="ball"></div>
</transition>
        

        <!-- 商品轮播图区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu"></swiper>
					</div>
				</div>
			</div>


        <!-- 商品购买区域 -->
                <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>
                        市场价： <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
						</p>
                        <p>购买数量：<numbox @getCount="getSelectedCount" 
                        :max="goodsinfo.stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                            <!-- 如何实现加入购物车时候，拿到选择的数量 -->
                            <!-- 1. 经过分析发现：按钮属于goodsinfo页面，数组属于numberbox组件
                            2.由于涉及到了父子组件的嵌套，所以，无法直接在goodsinfo页面中获得选中商品商品数量值
                            3.涉及到子组件向父组件传值（事件传值）
                            4.事件调用本质：父向子传递方法，子调用这个方法，同时把数据当做参数，传递给这个方法 -->
                        </p>
					</div>
				</div>
                </div>

        <!-- 商品参数区域 -->
                <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{goodsinfo.add_time}}</p>
					</div>
				</div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
                </div>
    </div>
</template>


<script>


//导入轮播图组件
import swiper from '../subcomponents/swiper.vue'

import numbox from '../subcomponents/goodsinfo_number.vue'

export default {
    data(){
        return {
            //将路由参数对象中的id挂载到data上，方便后期调用
            id: this.$route.params.id,
            lunbotu: [],
            goodsinfo: [],
            ballFlag: false,   //控制小球隐藏显示
            SelectedCount: 1 //默认用户买1个
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu(){
            this.$http.get("getLunboGoods.php?id=" + this.id).then(result => {
              if(result.body.status === 0){
                  //console.log(result.body.message)
                  //先循环轮播图数组的每一项，为item添加img属性，因为伦布图组件中，只认识
                  //item.img ,不认识img.src
                   this.lunbotu = result.body.message;        
                  this.lunbotu.forEach(item=>{
                      item.img = item.src;
                  })
                 
              }  
            })
        },
        getGoodsInfo(){
            this.$http.get('getGoodsInfo.php?id='+ this.id).then(result => {
                this.goodsinfo = result.body.message[0];
            })
        },
        goDesc(id){
            //点击使用编程式导航跳转到这个图文界面
            this.$router.push({name: 'goodsdesc', params: {id}})
        },
        goComment(id){
            //点击跳转到 评论页面
            this.$router.push({name: 'goodscomment', params: {id}})
        },
        addToShopCar(){
            //添加到购物车
            this.ballFlag = ! this.ballFlag
            //{id: 商品id, count: 要购买的数量, price: 商品单价, selected: true/false}
            //凭借出一个要保存到奥store中car 数组的商品对象
            var  goodsinfo = {
                id: this.id, 
                count: this.SelectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
                }
            //调用store中的mutations来将商品加入商品购物车
            this.$store.commit('addToCar', goodsinfo);
        },
        beforeEnter(el) {
            el.style.transform="translate(0,0)"
        },
        enter(el, done){
            el.offsetWidth;

            // 小球动画优化思路：
            // 1.先分析导致动画不准确的 本质原因： 我们把小球最终位移到的位置，已经局限在了某一
            //分辨率下的滚动条未滚动的情况下
            //2.只要分辨率和测试的时候不一样，或者滚动条有一定的距离之后，问题就出现了。
            //3.我们经过分析，得到结论： 不能把位置的横纵坐标直接写死了。而是
            //应该更具不同的情况，动态计算这个坐标值。
            //解决思路： 得到徽标的横纵坐标，再得到小球的横纵坐标。让后让y值求差
            //x值也求差，得到的结果就是横纵坐标要唯一的举例
            //5 如何获取徽标和小球的位置？？？  domObject.getBoundingClintRect()


            //获取小球在页面中的位置
            const  ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            this.SelectedCount = count;
            console.log('father get data'+ this.SelectedCount)
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="less" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow:hidden;

}
.now_price{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.mui-card-footer{
    display: block;
    button{
        margin:15px 0;
    }
}
.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 392px;
    left: 148px;
}
</style>
