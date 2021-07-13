<template>
    <div>
        <el-row>
            <el-col :span='16' class='pos-order' id='orders'>
                <el-row>
                    <el-col :span='20' :offset="2">
                        <div v-if="currVips">
                            <p>客户名称：{{currVips.name}}</p>
                            <p>客户编号：{{currVips.num}}</p>
                            <p>加入日期：{{currVips.date}}</p>
                            <p>购买记录：</p>
                        </div>
                        <div id="goumaijilv">
                            <el-collapse v-model="activeName" accordion>
                                <el-collapse-item v-for="(value,key,index) in currVips.foods" :key="index" :title="key" :name="index+1">
                                    <ul>
                                        <li v-for="(item,index) in value" :key="index">
                                            <span>{{item.goodsName}}</span>
                                            <span>{{item.count}}</span>
                                            <span>￥{{item.price}}</span>
                                        </li>
                                        <li>
                                            <span>&nbsp;</span>
                                            <span>&nbsp;</span>
                                            <span style="color:red">总计：￥{{value[0].moneys}}</span>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </el-collapse> 
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span='8' class='pos-order' id='order'>
                 <el-row>
                     <el-col :span='12'>
                        <el-input v-model="searchinput"></el-input>
                     </el-col>
                     <el-col :span='6'>
                         <el-button type="primary" round @click="searchbtn">搜索</el-button>
                     </el-col>
                     <el-col :span='6'>
                        <el-button type="primary" round @click="vipbox">添加</el-button>
                     </el-col>
                </el-row>
                <div id="viplistbox">
                    <div v-for="(item,index) in vipsData" :key="index" >
                        <div @click="xiangqin(item)">
                            <el-card shadow="hover">
                                <p>会员名：{{item.name}}</p>
                                <p>加入日期：{{item.date}}</p>
                                <p>会员编号：{{item.num}}</p>
                            </el-card>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 添加 -->
        <el-dialog title="新增会员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="会员名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员编号" :label-width="formLabelWidth">
                <el-input v-model="form.num" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="加入日期" :label-width="formLabelWidth">
                <el-input v-model="form.date" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addvips">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'vip',
    data(){
        return{
            form:{
                date:null,
                name:'',
                num:null,
                foods:{}
            },//vip新建数据
            dialogFormVisible:false,//弹窗所需项
            searchinput:'',//搜索项
            formLabelWidth:'120px',//弹窗所需项
            vipsData:[],//vip数据列表
            activeName:'1',//手风琴当前项
            currVip:{},
        }
    },
    computed:{
        currVips:function(){
            let totalm = 0,that=this,newVip = {foods:{}
            };
            for(let key in that.currVip.foods){
                let newfoods = [],data=that.currVip.foods[key],moneys = 0;
               for(let i = 0,leni = data.length;i < leni; i++){
                   const result = newfoods.findIndex(ol => { return data[i].goodsId === ol.goodsId && data[i].goodsName === ol.goodsName })
                    if (result !== -1) {
                        newfoods[result].count += data[i].count
                    } else {
                        newfoods.push(data[i])
                    }
                }
                newfoods.forEach(function(item){
                    moneys += (item.count * item.price)
                })
                newVip.foods[key] = newfoods;
                newVip.foods[key][0]['moneys'] = moneys;
            }
            that.currVip.foods = newVip.foods;
            // console.log(that.currVip)
            return that.currVip
        }
    },
    created:function(){
        this.vipsData = this.Common.vipArr;
        if(sessionStorage.getItem('vipArr')){
            this.vipsData = JSON.parse(sessionStorage.getItem('vipArr'))
        }
    },
    mounted: function () {
        var orderHeight = document.body.clientHeight
        document.querySelector('#order').style.height = orderHeight + 'px'
        document.querySelector('#orders').style.height = orderHeight + 'px'
        document.querySelector('#viplistbox').style.height = (orderHeight - 60) + 'px'
        document.querySelector('#goumaijilv').style.height = (orderHeight - 200) + 'px';
    },
    methods:{
        addvips:function(){
            this.vipsData.push(this.form);
            sessionStorage.setItem('vipArr',JSON.stringify(this.vipsData));
            this.dialogFormVisible = false;
            this.form = {
                date:null,
                name:'',
                num:null,
                foods:{}
            }
        },
        vipbox:function(){
            let currdate = new Date();
            this.form.date = currdate.getFullYear() + '-' + (currdate.getMonth() + 1) + '-' + currdate.getDate();
            this.form.num = currdate.getFullYear() + '' + currdate.getTime();
            this.dialogFormVisible = true;
        },
        xiangqin:function(item){
            this.currVip = item;
        },
        searchbtn:function(){
            if(this.searchinput != ''){
                this.vipsData = this.vipsData.filter(item => item.num == this.searchinput)
            }else{
                this.vipsData = JSON.parse(sessionStorage.getItem('vipArr'));
            }
        }
    }
}
</script>

<style scoped>
#order{
    padding-top: 10px;
}

.el-card{
    margin-top: 10px;
    background:#e4e2d7;
    cursor: pointer;
}
p{
    text-align: left;
    overflow: hidden;
}
#viplistbox,#goumaijilv{
    overflow: auto;
}
#goumaijilv ul{
    padding: 0 10px;
}
#goumaijilv li{
    line-height: 30px;
    border-bottom: 1px solid #ddd;
    list-style-type: none;
}
#goumaijilv li span{
    display: inline-block;
    width: 30%;
    text-align: left;
}
</style>