<template>
<div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论的内容(最多吐槽120字) " maxlen = "120"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(item, i) in comments" :key = "item.add_time">
            <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户： {{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}
            </div>
            <div class="cmt-body">
                {{item.content === 'undefined'?'此用户很懒，啥都没说':item.content}}
            </div>
        </div>

                <div class="cmt-item">
            <div class="cmt-title">
                第1楼&nbsp;&nbsp;用户： 匿名用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:00
            </div>
            <div class="cmt-body">
                锄禾日当午
            </div>
        </div>


                <div class="cmt-item">
            <div class="cmt-title">
                第1楼&nbsp;&nbsp;用户： 匿名用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:00
            </div>
            <div class="cmt-body">
                锄禾日当午
            </div>
        </div>


                <div class="cmt-item">
            <div class="cmt-title">
                第1楼&nbsp;&nbsp;用户： 匿名用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:00
            </div>
            <div class="cmt-body">
                锄禾日当午
            </div>
        </div>
    </div>    
    <mt-button type="danger" size="large" @click="getMore" plain>加载更多</mt-button>
</div>
</template>


<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 16px;
    }
    textarea {
        font-size: 13px;
        height:  85px;
        margin: 0px;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 30px;
                text-indent: 2em;
            }
        }
    }
}

</style>

<script>
import { Toast }  from 'mint-ui'
export default {
    data(){
        return{
            pageIndex: 1, //默认展示第一页数据
            comments: [], //所有的评论数据
            msg: ''
        }
    },
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex=1" + this.pageIndex).then(result =>{
                if(result.body.status === 0){
                   //this.comments = result.body   
                   //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该拼接新数据
                   this.comments = this.comments.concat(result.body)

                }else{
                    Toast('获取评论失败！')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            //参数1： 请求的URL地址；
            //参数2： 提交给服务器的数据对象{content: this.msg}
            //参数3： 定义提交时候，表单中数据的格式 {emulateJSON:true}
            if(this.msg.trim().length ===0 )
            {
                return Toast('评论内容不可为空')
            }
            this.$http.post('api/postcomment' + this.$route.params.id, { content:this.msg.trim() })
            .then(function (result) {
            if(result.body.status === 0){
                //1 .拼接出一个评论对象
                var cmt ={user_name: '匿名用户', add_time: Date.now(), contetn: this.msg.trim()};
                this.comments.unshift(cmt)
                this.msg = '';
            }
        });
        }
    },
    props: ["id"]
}
</script>