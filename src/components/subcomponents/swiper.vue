<template>
    <div>
         <!-- 轮播图区域 -->
         <!-- 谁使用此轮播图组件，谁为我们传递lunbotulist -->
         <!-- 此时，应该是父组件向子组件传值来设置 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用key -->
        <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
            <img :src="item.url" alt="" :class="{'full': isfull}">
        </mt-swipe-item>
        <!-- <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item> -->
        </mt-swipe>
    </div>

    <!-- 分析：为什么商品详情中的轮播图不好看？
    1.首页中的图片，它的宽和高，都是使用了100%的宽度
    2.在商品详情页面中国，轮播图的图片如果也使用 宽高100%，页面不好看 
    3.商品详情页面中的轮播图，期望高度是100%，但是宽度为自适应
    4.结论： 首页中的轮播图和详情页中的轮播图，分歧点是 宽度到底是100%还是自适应
    5.既然两个轮播图，其他方面都是没有冲突的，只是宽度有分歧，我们定义一个属性，让使用轮播图的调用者，手动指定是否为100%
    -->
</template>

<script>

export default {
    props: ["lunbotuList", "isfull"]
}
</script>

<style lang="less" scoped>
.mint-swipe{
    height: 200px;
    
    .mint-swipe-item{
        text-align:center;
        img{
            //width: 100%;
            height: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>
