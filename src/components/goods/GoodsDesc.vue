<template>
    <div class="goods-container">
        <h3>商品图文介绍页面{{info.title}}</h3>

        <hr>
        <p></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {}
        };
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('url?id=' + this.$route.params.id).then(result=>{
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                }
            })
        }
    }

}
</script>
<style lang="less" >
.goods-container {
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
}
</style>

