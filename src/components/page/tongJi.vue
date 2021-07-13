<template>
    <div>
        <el-row>
            <el-col :span="22" :offset="1">
                <div id="main" style="width: 100%;height:90vh;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
    name:'tongJi',
    data(){
        return{
            tongjiData:{
                name:[],
                data:[]
            }
        }
    },
    created:function(){
        let that=this,newVip = [],vipsData = [];
        if(sessionStorage.getItem('vipArr')){
            vipsData = JSON.parse(sessionStorage.getItem('vipArr'));
        }
        vipsData.forEach(function(item){
            for(let key in item.foods){
                newVip.push(item.foods[key])
            }
        })
        newVip = newVip.flat(Infinity);
        let newVip1 = []; //商品合并后的数组
        for(let i = 0,leni = newVip.length;i < leni; i++){
            const result = newVip1.findIndex(ol => { return newVip[i].goodsId === ol.goodsId && newVip[i].goodsName === ol.goodsName })
            if (result !== -1) {
                newVip1[result].count += newVip[i].count
            } else {
                newVip1.push(newVip[i])
            }
        }
        newVip1.sort(function(a,b){
            return b.count - a.count
        })
        let newVip2 = JSON.parse(JSON.stringify(newVip1));
        sessionStorage.setItem('changyong',JSON.stringify(newVip2.splice(0,10)));
        // console.log(newVip1)
        newVip1.forEach(function(item,index){
            if(index <= 9){
                that.tongjiData.name.push(item.goodsName);
                that.tongjiData.data.push(item.count);
            }
        })
    },
    mounted:function(){
        let that = this;
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '热销商品统计(top10)'
            },
            tooltip: {},
            xAxis: {
                data: that.tongjiData.name
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: that.tongjiData.data
            }]
        });
    }
}
</script>

<style scoped>

</style>