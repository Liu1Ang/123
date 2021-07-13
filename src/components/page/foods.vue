<template>
    <div>
        <el-row>
            <el-button type="primary" round @click="dialogFormVisible = true">添加</el-button>
       </el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="汉堡" name="first">
                 <food-list :fooddata="this.Common.foodsArr[0]" :foodindex="0" @deletedclick="deleteds(arguments)"></food-list>
            </el-tab-pane>
            <el-tab-pane label="小食" name="second">
                <food-list :fooddata="this.Common.foodsArr[1]" :foodindex="1" @deletedclick="deleteds(arguments)"></food-list>
            </el-tab-pane>
            <el-tab-pane label="饮料" name="third">
                <food-list :fooddata="this.Common.foodsArr[2]" :foodindex="2" @deletedclick="deleteds(arguments)"></food-list>
            </el-tab-pane>
        </el-tabs>
        <!-- 添加 -->
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.goodsName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单价" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addfoods">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import foodList from '../common/foodlist'
  export default {
    name:'foods',
    data() {
      return {
         activeName: 'first',//选项卡当前项
         form: {
          goodsName: '',
          price: '',
          type: null,
          goodsId: null,
          goodsImg: null,
        }, //新建商品
         formLabelWidth: '120px', //弹出框项
         dialogFormVisible: false,//弹出框项
      }
    },
    components: {
        foodList,
    },
    methods: {
        handleClick(tab, event) {
        // console.log(tab, event);
        },
        deleteds:function(e){
            this.Common.foodsArr[e[0]].splice(e[1],1);
            this.$message({
                message: '删除成功!',
                type: 'success',
            })
                sessionStorage.setItem('foodsArr',JSON.stringify(this.Common.foodsArr))
        },
        addfoods:function(){
            let foodindex = 0;
            if(this.activeName == 'first'){
                foodindex = 0;
                this.form.goodsImg = require('../../assets/hanbao.jpg')
                this.form.type = "1"
                this.form.goodsId = new Date().getTime()
            }else if(this.activeName == 'second'){
                foodindex = 1;
                this.form.goodsImg = require('../../assets/xiaoshi.jpg')
                this.form.type = "2"
                this.form.goodsId = new Date().getTime()
            }else{
                foodindex = 2;
                this.form.goodsImg = require('../../assets/yinliao.jpg')
                this.form.type = "3"
                this.form.goodsId = new Date().getTime()
            }
            this.Common.foodsArr[foodindex].push(this.form);
            sessionStorage.setItem('foodsArr',JSON.stringify(this.Common.foodsArr))
            this.dialogFormVisible = false;
            this.form={
                    goodsName: '',
                    price: '',
                    type: null,
                    goodsId: null,
                    goodsImg: null,
                }
        },
        
    }
}
</script>

<style scoped>
.el-row{
    position: fixed;
    top: 3px;
    right: 0;
    z-index: 999;
}
.el-row button{
    float: right;
    margin-right: 20px; 
}
.el-button.is-round{
    padding: 8px 23px;
}
.el-tabs__nav-scroll{
    margin-left: 10px;
}
</style>