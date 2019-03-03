<template>

    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
                <!-- 分析：子组件什么时候把数据传递给父组件 -->
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui(".mui-numbox").numbox();
        //console.log(this.max)
        //mui(Selector).numbox()
    },
    methods:{
        countChanged(){
           //数量改变了
        }
    }


}
</script>

<style lang="less" scoped>

</style>


<!-- 
    Vuex是为了保存组件之间共享数据而诞生的，如果组件之间有要共享的数据，可以直接挂在到vuex，而不必
    通过父子组件之间传值了，如果组件的数据不需要共享，这些不需要恭喜的私有数据，没有必要放到vuex中
    只有共享的数据，才有权利放到vuex中。
    组件内部私有的数据，只要放到组件的data中即可。
    props和data和vuex的区别

    Vuex相当一个全局的数据共享仓库。

 -->