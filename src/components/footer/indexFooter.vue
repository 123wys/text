<template>
  <div class="footer">
      <div class="footBox clearfix">
        <div class="footLeft fl">
          <ul class="indexTit">
            <li class="tit">
              <router-link :to="{ path:'/index' }">首页</router-link>
            </li>
          </ul>

          <ul>
            <li class="tit" v-on:click="learnMore('wuhenmaidian')">产品功能</li>
            <li v-on:click="learnMore('wuhenmaidian')">
              <a href="javascript:void(0);">无痕埋点</a>
            </li>
            <li v-on:click="learnMore('duoweiduzhibiao')">
              <a href='javascript:void(0);'>多维分析</a>
            </li>
            <li v-on:click="learnMore('zhinengloudou')">
              <a href='javascript:void(0);'>智能分析</a>
            </li>
            <li v-on:click="learnMore('yonghudongcha')">
              <a href='javascript:void(0);'>用户洞察</a>
            </li>
            <li v-on:click="learnMore('jiankongyujing')">
              <a href='javascript:void(0);'>监控预警</a>
            </li>
          </ul>

          <ul>
            <li class="tit">解决方案</li>
            <li>
              <router-link :to="{ path:'/solution' }">互联网保险</router-link>
            </li>
            <!--<li>互联网金融</li>-->
            <!--<li>电子商务</li>-->
          </ul>

          <ul>
            <li class="tit">
              <router-link :to="{ path:'/aboutUs' }">关于我们</router-link>
            </li>
          </ul>

          <ul>
            <li class="tit">
              <router-link :to="{ path:'/contactUs' }">联系我们</router-link>
            </li>
          </ul>
        </div>

        <div class="footRight fr">
          <img class="xflowIcon" src="./img/footerLogo@2x.png" alt="x-flow">
          <div class="topBox clearfix">
            <div class="left fl">
              <ul>
                <li>公司：</li>
                <li>邮箱：</li>
              </ul>
            </div>
            <div class="right fl">
              <ul>
                <li>众安信息科技服务有限公司</li>
                <li>xflow_support@zhongan.io</li>
              </ul>
            </div>
          </div>
          <div class="bottomBox clearfix">
            <div class="left fl">
              <ul>
                <li>地址：</li>
              </ul>
            </div>
            <div class="right fl">
              <ul class="ul_overflow">
                <li>众安信息技术服务有限公司</li>
                <li>深圳市前海深港合作区前湾一路1号A栋201室（深圳总公司）</li>
                <li>众安信息技术服务有限公司上海分公司</li>
                <li>上海市虹口区东大名路391-393号4楼A4109室</li>
                <li>上海市黄浦区圆明园路209号真光大楼</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "indexFooter",
  data() {
    return {};
  },
  methods: {
    learnMore(id) {
      if (this.$route.path != "/index") {
        id && this.$router.push({ path: "index", query: { learnMore: id } });
        return;
      }
      id && $(window).scrollTop(document.getElementById(id).offsetTop - 50);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.footer {
  position: relative;
  width: 100%;
  max-width: 1920px;
  height: 310px;
  margin: 0 auto;
  background: #3c465e;
}

.footer a {
  color: #fff;
}

.footer .footBox {
  position: absolute;
  left: 50%;
  top: 0;
  width: 1148px;
  height: 100%;
  margin-left: -574px;
  overflow: hidden;
  text-align: left;
  color: #fff;
}

.footer .footLeft {
  margin: 50px 0 0 120px;
  width: 630px;
}

.footer .footRight {
  width: 348px;
  margin: 50px 50px 0 0;
  font-size: 12px;
  line-height: 20px;
}

.footer .footLeft ul {
  float: left;
  margin-right: 58px;
}

.footer .footLeft ul .tit {
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 33px;
}

.footer .footLeft .indexTit {
  margin-right: 75px;
}

.footer .footLeft ul li {
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 20px;
}

.footer .footRight .xflowIcon {
  display: block;
  width: 104px;
  height: 23px;
  margin-bottom: 30px;
}

.footer .footRight .topBox {
  padding-bottom: 10px;
  border-bottom: 1px solid #505665;
  margin-bottom: 10px;
}

.footer .footRight .right {
  margin-left: 5px;
}
  .ul_overflow li{

  }
</style>
