<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 自标题 -->
        <p class="subtitle">
            <span>{{newsinfo.add_time | dateFormat}} </span>
            <span>点击： {{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast }  from 'mint-ui'

//1. 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,  //将URL地址中传递过来的id值，挂载到data上，方便调用
            newsinfo: {}//新闻对象
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){//获取新闻信息
           this.$http.get("getnewsMes.php?id=" + this.id).then(result => {
               console.log(result.body.message)
               if(result.body.status === 0) {
                   this.newsinfo = result.body.message[0]
               }else {
                    Toast('获取新闻失败！')
               }
           })

        }
    },
    components: {
        'comment-box': comment
    }
}
</script>

<style lang="scss" >
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size:14px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 12px;
        color:#2226af;

    }
    .content{
        font-size: 15px;
        line-height: 28px;
        text-indent: 2em;
        img {
            width: 100%
        }
    }
}
</style>