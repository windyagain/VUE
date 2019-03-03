<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch ></mt-switch>
                        <img src="/src/images/sj1.jpg">
                        <div class="info">
                            <h1>小米（Mi）小米Note 16G双网通版</h1>
                            <p>
                                <span class="price">$2199</span>
                                <!-- <numbox :initcount="$store.getters.getGoodsCount[item.id]"></numbox> -->
                                <numbox></numbox>
                              <!--   问题：如何从购物车中获取所有商品的数量？
                                1.我们可以先创建一个空对象，然后循环购物车所有商品数据，把当前循环这条商品的ID作为对象的属性值。这样，当把所有的商品循环一遍，就会得到一个对象
                                {88: 2, 89:1, 90:1} 
                                
                                -->
                                <a href="">删除<!-- {{ $store.getters.getGoodsCount[item.id] }} --></a>
                            </p>
                        </div>
					</div>
				</div>
		    </div>
        </div>

        <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
					</div>
				</div>
		    </div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'

export default{
    data(){
        return {
            goodslist: [] //购物车中商品数据
        }
    },
    methods:{
        getGoodsList(){
            //1. 获取到store中所有商品的id，然后拼接出一个字符串
            var idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id)).then(result=>{
                if(result.body.status === 0)
                this.goodslist = result.body.message;// 再进行渲染，没写接口就不渲染了。
            });
            if(idArr.length <= 0)
            return ;
            this.$http.get('url+id=' + idArr.join(","))
        }
    },
    components: {
        numbox
    },
    props:["initcount"]
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
        width: 60px;
        height: 60px;
        }
        h1{
        font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;font-weight: bold;
            }
        }
    }

}

</style>