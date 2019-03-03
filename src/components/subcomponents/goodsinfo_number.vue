<template>
<!-- 问题，我们不知道什么时候拿到max值，但是，总有一刻，会拿到真正的max
     我们可以使用watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，但是最后一次
     肯定是一个合法的max数值。
 -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
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
        console.log(this.max)
        //mui(Selector).numbox()
    },
    methods:{
        countChanged(){
            //每当文本框数据被修改时，立即把最新数据,通过事件调用，传递给父组件
            console.log(this.$refs.numbox.value)
            this.$emit('getCount', parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        //属性监听 JS   API设置numbox max
        'max': function(newVal, oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal)
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