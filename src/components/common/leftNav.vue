<template>
    <div class="left-nav">
        <ul>
            <li>
                <router-link to='/'>
                    <i class="icon iconfont icon-goumai"></i>
                    <div>收银</div>
                </router-link>
            </li>
            <li>
                <router-link to='/foods'>
                    <i class="icon iconfont icon-hanbao"></i>
                    <div>商品</div>
                </router-link>
            </li>
            <li>
                <router-link to='/vip'>
                    <i class="icon iconfont icon-huiyuanqia"></i>
                    <div>会员</div>
                </router-link>
            </li>
            <li v-show="this.Common.configArr.isTongji">
                <router-link to='/tongJi'>
                    <i class="icon iconfont icon-tongji"></i>
                    <div>统计</div>
                </router-link>
            </li>
            <li>
                <router-link to='/poscfig'>
                    <i class="icon iconfont icon-gongnengjianyi"></i>
                    <div>设置</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    mounted:function(){
        document.querySelector('.left-nav').style.background = this.Common.configArr.color;
    }
}
</script>
<style scoped>
.left-nav {
    color: #fff;
    font-size: 10px;
    height: 100%;
    background-color: #1D8CE0;
    float: left;
    width: 5%;
}
.iconfont {
    font-size: 24px;
}
.left-nav ul {
    padding: 0;
    margin: 0;
}
.left-nav li {
    list-style: 'none';
    text-align: center;
    border-bottom: 1px solid inherit;
    padding:10px;
}
a {
    display: block;
    color: #fff;
    text-decoration: none;
}
</style>
