let user = false;
let foodsArr = [
    [
        {
            type:1,
            goodsId: 1,
            goodsName: '香辣鸡腿堡',
            goodsImg:require('../assets/hanbao.jpg'),
            price: 18
        }
    ],
    [
        {
            type:2,
            goodsId: 6,
            goodsName: '魔法鸡块',
            goodsImg:require('../assets/xiaoshi.jpg'),
            price: 20
        }
    ],
    [
        {
            type:3,
            goodsId: 7,
            goodsName: '可乐大杯',
            goodsImg:require('../assets/yinliao.jpg'),
            price: 10
        }
    ],
];
if(sessionStorage.getItem('foodsArr')){
    foodsArr = JSON.parse(sessionStorage.getItem('foodsArr'))
}
let vipArr = [
    {
        date:'2020-11-15',
        name:'超级大会员',
        num:'0000000000000',
        foods:{
            '2020-11-16':[
                            {
                                count: 1,
                                goodsName: '可乐大杯',
                                price:10,
                                goodsId:7
                            },
                        ],
            '2020-11-18':[
                            {
                                count: 2,
                                goodsName: '可乐大杯',
                                price:10,
                                goodsId:7
                            },
                        ]
        }
    }
];
let configArr = {
        'color':'#409EFF',
        'isTongji':true
    }
if(sessionStorage.getItem('configArr')){
    configArr = JSON.parse(sessionStorage.getItem('configArr'))
}
export default{
    user,foodsArr,vipArr,configArr
}