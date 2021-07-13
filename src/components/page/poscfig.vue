<template>
    <div class="poscfig">
        <el-row>
            <el-col :span="20" :offset="1">
                <div>
                    主题色：
                    <input type="color" v-model="color">
                </div>
                <div style="margin-top:10px;">
                    统计模块：<el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                </div>
                <div style="margin-top:10px;">
                    <el-row>
                        <el-button round size="small" @click="removebtn">恢复默认</el-button>
                        <el-button type="primary" round size="small" @click="submitbtn">保存设置</el-button>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'poscfig',
    data(){
        return{
            color:this.Common.configArr.color,
            value:this.Common.configArr.isTongji
        }
    },
    watch:{
        'color':function(newVal,oldVal){
            document.querySelector('.left-nav').style.background = newVal;
            this.color = newVal;
        }
    },
    methods:{
        submitbtn:function(){
            this.Common.configArr.color = this.color;
            this.Common.configArr.isTongji = this.value;
            sessionStorage.setItem('configArr',JSON.stringify(this.Common.configArr));
            window.location.reload()
        },
        removebtn:function(){
            this.Common.configArr = {
                'color':'#409EFF',
                'isTongji':true
            }
            sessionStorage.setItem('configArr',JSON.stringify(this.Common.configArr));
            window.location.reload()
        }
    }
}
</script>

<style scoped>
.poscfig{
    padding-top: 20px;
    text-align: left;
}
</style>