<template>
  <div class='pos'>
    <el-row>
      <el-col :span='10' class='pos-order' id='order'>
        <el-tabs v-model="activeName">
          <el-tab-pane label='点餐' name='dainc'>
            <el-table stripe border :data='tableData' style='width: 100%'>
              <el-table-column prop='goodsName' label='商品名称'>
              </el-table-column>
              <el-table-column prop='count' label='数量' width='70'>
              </el-table-column>
              <el-table-column prop='price' label='金额' width='70'>
              </el-table-column>
              <el-table-column label='操作' width='120' fixed='right'>
                <template slot-scope='scope'>
                  <el-button
                    type='text'
                    size='small'
                    @click.native.prevent='reduce(scope.$index, tableData)'
                    >删除</el-button
                  >
                  <el-button
                    type='text'
                    size='small'
                    @click.native.prevent='add(scope.$index, tableData)'
                    >添加</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class='totalDiv'>
              <span>数量：</span>{{ totalNum }} <span>金额：</span
              >{{ totalMoney }}元
            </div>
            <div style='margin-top: 20px'>
              <el-button type='warning' @click="guadan">挂单</el-button>
              <el-button type='danger' @click="reduceAll">删除</el-button>
              <el-button type='success' @click="successAll">结账</el-button>
              <el-button type='success' @click="dialogFormVisible = true">会员结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label='挂单' name='guad'>
              <el-table stripe border :data='tableDatas' style='width: 100%'>
              <el-table-column prop='goodsName' label='商品名称'>
              </el-table-column>
              <el-table-column prop='count' label='数量' width='70'>
              </el-table-column>
              <el-table-column prop='price' label='金额' width='70'>
              </el-table-column>
              <el-table-column label='操作' width='120' fixed='right'>
                <template>
                  <el-button
                    type='text'
                    size='small' disabled>删除</el-button
                  >
                  <el-button
                    type='text'
                    size='small' disabled>添加</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class='totalDiv'>
              <span>数量：</span>{{ totalNums }} <span>金额：</span
              >{{ totalMoneys }}元
            </div>
            <div style='margin-top: 20px'>
              <el-button type='warning' @click="qxguadan">取消挂单</el-button>
              <el-button type='danger' @click="reduceAlls">删除</el-button>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label='外卖' name='waim'>外卖</el-tab-pane> -->
        </el-tabs>
      </el-col>
      <el-col :span='14'>
        <div class='often-goods'>
          <div class='title'>常用商品</div>
          <div class='often-goods-list'>
            <ul>
              <li
                v-for='(good, index) in oftenGoods'
                :key='index'
                @click='addothenList(good)'
              >
                <span>{{ good.goodsName }}</span>
                <span class='o-price'>￥{{ good.price }}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class='goods-type'>
          <el-tabs>
            <el-tab-pane label='汉堡'>
              <div>
                <ul class='cookList'>
                  <li
                    v-for='(good, index) in type0Goods'
                    :key='index'
                    @click='addothenList(good)'
                  >
                    <span class='foodImg'
                      ><img :src='good.goodsImg' width='100%'
                    /></span>
                    <span class='foodName'>{{ good.goodsName }}</span>
                    <span class='foodPrice'>￥{{ good.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label='小食'>
              <div>
                <ul class='cookList'>
                  <li
                    v-for='(good, index) in type1Goods'
                    :key='index'
                    @click='addothenList(good)'
                  >
                    <span class='foodImg'
                      ><img :src='good.goodsImg' width='100%'
                    /></span>
                    <span class='foodName'>{{ good.goodsName }}</span>
                    <span class='foodPrice'>￥{{ good.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label='饮料'>
              <div>
                <ul class='cookList'>
                  <li
                    v-for='(good, index) in type2Goods'
                    :key='index'
                    @click='addothenList(good)'
                  >
                    <span class='foodImg'
                      ><img :src='good.goodsImg' width='100%'
                    /></span>
                    <span class='foodName'>{{ good.goodsName }}</span>
                    <span class='foodPrice'>￥{{ good.price }}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <!-- 添加 -->
        <el-dialog title="会员号" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="会员编号" :label-width="formLabelWidth">
                <el-input v-model="form.num" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="successAllvip">确 定</el-button>
        </div>
        </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'pos',
  data () {
    return {
      activeName: 'dainc',
      totalNum: 0, //点餐数量
      totalNums: 0,//挂单点餐数量
      totalMoney: 0,//点餐总额
      totalMoneys: 0,//挂单点餐总额
      tableData: [],
      tableDatas: [],
      oftenGoods: [
        {
          goodsId: 1,
          goodsName: '香辣鸡腿堡',
          price: 18
        },
        {
          goodsId: 6,
          goodsName: '魔法鸡块',
          price: 20
        },
        {
          goodsId: 7,
          goodsName: '可乐大杯',
          price: 10
        },
      ],
      type0Goods: [
        
      ],
      type1Goods: [
        
      ],
      type2Goods: [
        
      ],
      dialogFormVisible:false,//弹窗所需项
      formLabelWidth:'120px',//弹窗所需项
      form:{
        num:null,
      },//vip号
    }
  },
  created:function(){
    if(sessionStorage.getItem('foodsArr')){
      this.Common.foodsArr = JSON.parse(sessionStorage.getItem('foodsArr'))
    }
    this.type0Goods = this.Common.foodsArr[0]
    this.type1Goods = this.Common.foodsArr[1]
    this.type2Goods = this.Common.foodsArr[2]
    // 常用商品
    if(sessionStorage.getItem('changyong')){
      this.oftenGoods = JSON.parse(sessionStorage.getItem('changyong'))
    }
  },
  mounted: function () {
    var orderHeight = document.body.clientHeight
    document.querySelector('#order').style.height = orderHeight + 'px'
  },
  methods: {
    addothenList (goods) {
      let isHave = false

      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
          break
        }
      }

      // 存在商品
      if (isHave) {
        let arr = this.tableData.filter((o) => o.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        // 不存在
        let newgood = {
          ...goods,
          count: 1
        }
        this.tableData.push(newgood)
      }
      this.changetotal()
    },
    changetotal: function () {
      this.totalNum = 0
      this.totalMoney = 0
      for (let i = 0; i < this.tableData.length; i++) {
        this.totalNum += this.tableData[i].count
        this.totalMoney += this.tableData[i].price * this.tableData[i].count
      }
    },
    add: function (index, data) {
      this.$set(this.tableData[index], 'count', ++this.tableData[index].count)
      this.changetotal()
    },
    reduce: function (index, data) {
      this.$set(this.tableData[index], 'count', --this.tableData[index].count)
      if (this.tableData[index].count === 0) {
        this.tableData = this.tableData.filter((o) => o.goodsId !== this.tableData[index].goodsId)
      }
      this.changetotal()
    },
    reduceAll: function () {
      this.tableData = []
      this.totalNum = 0
      this.totalMoney = 0
    },
    reduceAlls: function () {
      this.tableDatas = []
      this.totalNums = 0
      this.totalMoneys = 0
    },
    successAll: function () {
      this.$message({
          message: '结账成功，感谢你又为店里贡献了' + this.totalMoney + '元!',
          type: 'success',
      })
      this.tableData = []
      this.totalNum = 0
      this.totalMoney = 0
    },
    successAllvip: function () {
      if(sessionStorage.getItem('vipArr')){
          this.Common.vipArr = JSON.parse(sessionStorage.getItem('vipArr'))
      }
      let currdate = new Date();
      let currdatekey = currdate.getFullYear() + '-' + (currdate.getMonth() + 1) + '-' + currdate.getDate();
      let that = this;
      that.Common.vipArr.forEach(function(item,index){
        if(item['num'] == that.form.num){
          let keyArr = [];
          for(let key in item.foods){
            keyArr.push(key)
          }
          if(keyArr.indexOf(currdatekey) != -1){
            for(let key in item.foods){
              if(key == currdatekey){
                that.tableData.forEach(function(item1,index1){
                  item.foods[key].push(item1)
                })
              }
            }
          }else{
              item.foods[currdatekey] = that.tableData
          }
          that.$message({
             message: '结账成功，感谢你又为店里贡献了' + that.totalMoney + '元!',
             type: 'success',
         })
         sessionStorage.setItem('vipArr',JSON.stringify(that.Common.vipArr))
        that.tableData = []
        that.totalNum = 0
        that.totalMoney = 0
        that.dialogFormVisible =false
        }else{
          that.$message({
              message: '请核对会员账号',
              type: 'warning',
          })
        }
      })
    },
    guadan: function () {
      this.tableDatas = this.tableData
      this.totalNums = this.totalNum
      this.totalMoneys = this.totalMoney
      this.activeName = 'guad'
      this.tableData = []
      this.totalNum = 0
      this.totalMoney = 0
    },
    qxguadan: function () {
      this.tableData = this.tableDatas
      this.totalNum = this.totalNums
      this.totalMoney = this.totalMoneys
      this.activeName = 'dainc'
      this.tableDatas = []
      this.totalNums = 0
      this.totalMoneys = 0
    }
  }
}
</script>

<style>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.often-goods-list li {
  list-style: none;
  float: left;
  border: 1px solid #8baef5;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.o-price {
  color: #8baef5;
}
.goods-type {
  clear: both;
}

.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
    line-height: 16px;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 16px;
  padding-left: 10px;
  color: brown;
  width: 50%;
  text-align: left;
    height: 30px;
  overflow: hidden;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
