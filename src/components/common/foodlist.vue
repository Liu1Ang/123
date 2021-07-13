<template>
    <div class="left-nav">
       
        <ul class="cookList">
            <li
            v-for='(good, index) in fooddata1'
            :key='index'>
                <span class="deleted" @click="deleteds(foodindex,index)">X</span>
                <span class='foodImg'
                    ><img :src='good.goodsImg' width='100%'
                /></span>
                <span class='foodName'>{{ good.goodsName }}</span>
                <span class='foodPrice'>￥{{ good.price }}元</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['fooddata','foodindex'],
    data (){
        return {
            fooddata1:this.fooddata
        }
    },
    methods:{
        deleteds:function(foodindex,index){
            this.$emit('deletedclick',foodindex,index)
        }
    },
    watch:{
        fooddata: {
    　　　　handler(newValue, oldValue) {
    　　　　　　for (let i = 0; i < newValue.length; i++) {
    　　　　　　　　if (oldValue[i] != newValue[i]) {
    　　　　　　　　　　this.fooddata1 = newValue
    　　　　　　　　}
    　　　　　　}
    　　　　},
    　　　　deep: true
    　　}
    }
}
</script>
<style scoped>
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
  position: relative;
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
.deleted{
    position: absolute;
    width: 20px;
    cursor: pointer;
    right: 0;
    color: red;
    background: #fff;
}
</style>
