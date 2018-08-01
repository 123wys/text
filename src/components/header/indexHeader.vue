<template>
  <div class="header">
    <div class="headBox">
      <!-- topBar -->
      <div class="topBar">
        <div class="clearfix fadeInDown topTitBox">
          <img src="./img/logo@2x.png" class="logoImg fl goIndex" title="xflow">
          <div class="headTap clearfix">
            <dl>
              <dt class="goIndex">
                <router-link :to="{ path:'/index' }">首页</router-link>
              </dt>
              <!--<dd></dd>-->
            </dl>
            <dl style="position: static">
              <dt>产品功能
                <i class="downTriangle"></i>
              </dt>
              <dd>
                <div class="productFunc">
                  <dl>
                    <dt><img style="width:36px;height: 29px;" src="./img/tit02.png" alt=""></dt>
                    <dd class="clearfix">
                      <ul>
                        <li class="Tit">无痕埋点</li>
                        <li>全量实时采集</li>
                        <li>SDK自动追踪代码</li>
                        <li class="learnMore" v-on:click="learnMore('wuhenmaidian')">了解更多
                          <i class="rightArrow"></i>
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl>
                    <dt><img style="width:32px;height: 32px;" src="./img/tit01.png" alt=""></dt>
                    <dd class="clearfix">
                      <ul>
                        <li class="Tit">多维分析</li>
                        <li>多种可视化报表</li>
                        <li>多维度指标分析</li>
                        <li>数据化运营分析体系</li>
                        <li class="learnMore" v-on:click="learnMore('duoweiduzhibiao')">了解更多
                          <i class="rightArrow"></i>
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl>
                    <dt><img style="width:32px;height: 28px;" src="./img/tit03.png" alt=""></dt>
                    <dd class="clearfix">
                      <ul>
                        <li class="Tit">智能分析</li>
                        <li>智能漏斗分析</li>
                        <li>智能路径分析</li>
                        <li>实时大屏分析</li>
                        <li class="learnMore" v-on:click="learnMore('zhinengloudou')">了解更多
                          <i class="rightArrow"></i>
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl>
                    <dt><img style="width:31px;height: 30px;" src="./img/tit04.png" alt=""></dt>
                    <dd class="clearfix">
                      <ul>
                        <li class="Tit">用户洞察</li>
                        <li>用户属性信息</li>
                        <li>用户行为轨迹</li>
                        <li>用户操作日志</li>
                        <li>用户留存分析</li>
                        <li class="learnMore" v-on:click="learnMore('yonghudongcha')">了解更多
                          <i class="rightArrow"></i>
                        </li>
                      </ul>
                    </dd>
                  </dl>

                  <dl>
                    <dt><img style="width:30px;height: 31px;" src="./img/tit05.png" alt=""></dt>
                    <dd class="clearfix">
                      <ul>
                        <li class="Tit">监控预警</li>
                        <li>APP性能监控分析</li>
                        <li>错误日志监控</li>
                        <li>自定义监控预警</li>
                        <li class="learnMore" v-on:click="learnMore('jiankongyujing')">了解更多
                          <i class="rightArrow"></i>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>解决方案
                <i class="downTriangle"></i>
              </dt>
              <dd>
                <ul class="solution">
                  <li id="goSolution" style="cursor:pointer">
                    <router-link :to="{ path:'/solution'}">互联网保险行业</router-link>
                  </li>
                  <!--<li>互联网金融行业</li>-->
                  <!--<li>电商行业</li>-->
                </ul>
              </dd>
            </dl>
            <dl>
              <dt id="aboutUs" style="cursor:pointer">
                <router-link :to="{ path:'/aboutUs'}">关于我们</router-link>
              </dt>
              <!--<dd></dd>-->
            </dl>
            <dl>
              <dt id="contactUs" style="cursor:pointer">
                <router-link :to="{ path:'/contactUs'}">联系我们</router-link>
              </dt>
              <!--<dd></dd>-->
            </dl>
          </div>
          <div class="fr linkBox">
            <span v-on:click="goLogin" title="登录" class="loginBtn"></span>
            <a class="help" href="/assist/help" title="帮助中心">帮助中心</a>
          </div>
        </div>
      </div>

      <!-- 轮播 -->
      <el-carousel height="700px" class="carousel" :interval="5000" v-if="isShowCarousel">
        <el-carousel-item v-for="item in carouselList" :key="item">
          <slot :name="item"></slot>
        </el-carousel-item>
      </el-carousel>
      <!-- slots -->
      <div class="texts">

      </div>
      <slot name="centerTxt"></slot>
      <slot name="txtDetail"></slot>
      <slot name="freeTryBtn"></slot>
      <slot name="rightHeaderTxt"></slot>
      <slot name="sol-centerTxt"></slot>
      <slot name="contactForm"></slot>
      <slot name="sol-freeTryBtn"></slot>
      <slot name='bg'></slot>
    </div>
    <slot name='bg2'></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import { Cookie } from "../../config/mUtils";
export default {
  name: "indexHeader",
  props: {
    isShowCarousel: {
      //每一列标题
      type: Boolean,
      default: false
    },
    carouselList: {
      //每一列标题
      type: Array,
      default() {
        return ["carousel1", "carousel2"];
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    // header 下拉动画
    $(".headTap > dl").mouseenter(function(e) {
      $(this)
        .children("dl > dd")
        .stop()
        .slideDown(300);
      $(this)
        .find(".downTriangle")
        .addClass("active");
    });
    $(".headTap > dl").mouseleave(function(e) {
      $(this)
        .children("dl > dd")
        .stop()
        .slideUp(300);
      $(this)
        .find(".downTriangle")
        .removeClass("active");
    });

    $(".headTap > dl").mousemove(function(e) {
      e.stopPropagation();
      return false;
    });

    //初始化 topbar

    if ($(window).scrollTop() > 100) {
      $(".topBar").addClass("active");
    } else {
      $(".topBar").removeClass("active");
    }

    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $(".topBar").addClass("active");
      } else {
        $(".topBar").removeClass("active");
      }
    });
  },
  methods: {
    learnMore(id) {
      if (this.$route.path != "/index") {
        id && this.$router.push({ path: "index", query: { learnMore: id } });
        return;
      }
      id && $(window).scrollTop(document.getElementById(id).offsetTop - 50);
    },
    goLogin(id) {
      const isAutoLogin = Cookie.getCookie(this.$store.state.userSid);
      if (!!isAutoLogin) {
        this.$router.push({ path: "systemIndex" });
      } else {
        this.$router.push({ path: "login" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.carousel /deep/ .el-carousel__arrow--left {
  left: 380px;
}

.carousel /deep/ .el-carousel__arrow--right {
  right: 380px;
}

.carousel /deep/ .el-icon-arrow-left:before,
.carousel /deep/ .el-icon-arrow-right:before {
  color: rgba(255, 255, 255, 0.685);
}

.carousel /deep/ .el-carousel__arrow {
  background-color: rgba(179, 182, 185, 0.31);
}

.carousel /deep/ .el-carousel__arrow:hover {
  background-color: rgba(179, 182, 185, 0.41);
}

.carousel {
  height: 700px;
  background: #010b24;
  .bannerImg {
    width: 1920px;
    height: 700px;
  }
}

.header {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 700px;
  background: #010b24;
  overflow: hidden;
}

.header .headBox {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1920px;
  height: 100%;
  margin-left: -960px;
  z-index: 9;
}

.header .topBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: transparent;
  transition: all 0.5s ease-in-out;
  z-index: 999999;
}

.header .headBox .logoImg {
  position: relative;
  display: block;
  margin: 33px 0 0 100px;
  width: 104px;
  height: 23px;
  z-index: 999;
  transition: all 0.5s ease-in-out;
}

.header .headBox .active .logoImg {
  margin-top: 14px;
}

.header .headBox .active .headTap {
  margin-top: 14px;
}

.header .headBox .active .linkBox {
  margin-top: 14px;
}

.header .headBox .linkBox {
  position: relative;
  margin-top: 34px;
  z-index: 999;
  transition: all 0.5s ease-in-out;
}

.header .headBox .linkBox .help {
  display: inline-block;
  font: normal 14px/19px "microsoft yahei";
  color: #fff;
  margin: 3px 97px 0 20px;
}

.header .headBox .linkBox a:hover {
  color: #24a0da;
}

.header .headBox .linkBox .loginBtn {
  vertical-align: top;
  display: inline-block;
  width: 68px;
  height: 25px;
  background: url("./img/loginBtn@2x.png") no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
}

.header .headBox .linkBox .loginBtn:hover {
  color: #fff;
  opacity: 0.8;
  filter: alpha(opacity=80);
}

.header .topTxt {
  // position: relative;
  // z-index: 9;

      height: 500px;
    width: 1148px;
    margin: 0 auto;
    position: relative;
}

.header .headTap {
  float: left;
  font: normal 14px/19px "microsoft yahei";
  margin: 37px 0 0 52px;
  color: #fff;
  transition: all 0.5s ease-in-out;
}

.header .headTap a {
  color: #fff;
  font: normal 14px/19px "microsoft yahei";
}

.header .headTap > dl {
  float: left;
  display: block;
  margin-right: 35px;
}

.header .headTap > dl > dt {
  position: relative;
  height: 25px;
  padding: 0 5px;
  z-index: 99;
}

.header .headTap > dl > dd {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 290px;
  background: rgba(18, 32, 59, 0.85);
  box-shadow: 7px 1px 51px 5px rgba(0, 0, 0, 0.24);
  z-index: 1;
}

.header .headTap > dl:hover > dt {
  border-bottom: 2px #24a0da solid;
}

.header .headTap .downTriangle {
  position: relative;
  top: -1px;
  margin-left: 5px;
  display: inline-block;
  height: 5px;
  width: 6px;
  background: url("./img/pulldown@2x.png") no-repeat top center;
  background-size: 100% 100%;
}

.header .headTap .downTriangle.active {
  background-image: url("./img/packup@2x.png");
}

.header .topBar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: transparent;
  transition: all 0.5s ease-in-out;
  z-index: 999999;
}

.header .topBar.active {
  background: #25304f;
}

.header .topTitBox {
  width: 1148px;
  margin: 0 auto;
}

.header .productFunc {
  margin-top: 110px;
  text-align: center;
}

.header .productFunc dl {
  display: inline-block;
  vertical-align: top;
  margin: 0 20px;
}

.header .productFunc dl ul {
  position: relative;
  transition: all 0.5s ease-in-out;
}

.header .productFunc dl dd:hover ul {
  transform: translateY(-20px);
}

.header .headTap .learnMore {
  position: relative;
  margin-top: 16px;
  opacity: 0;
  cursor: pointer;
  filter: alpha(opacity=0);
  transition: all 0.5s ease-in-out;
}

.header .headTap .solution {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -134px;
}

.header .headTap .solution li:hover {
  color: #239dd7;
  a {
    color: #239dd7;
  }
}

.header .headTap .solution li:hover:after {
  display: inline-block;
  position: relative;
  top: 2px;
  left: 5px;
  width: 13px;
  height: 13px;
  background: url("./img/learnMore.png") no-repeat center center;
  background-size: 100% 100%;
  content: "";
}

.header .productFunc dl dd:hover ul .learnMore {
  margin-top: 0;
  opacity: 100;
  filter: alpha(opacity=100);
}

.header .solution:hover .learnMore {
  margin-top: 30px;
  opacity: 100;
  filter: alpha(opacity=100);
}

.header .productFunc .Tit {
  margin-bottom: 8px;
  color: #fff;
  font: bold 14px/20px "PingFangSC-Semibold";
}

.header .productFunc ul li {
  font: normal 12px/22px "MicrosoftYaHei";
}

.header .learnMore {
  font: normal 12px/18px "MicrosoftYaHei";
  color: #239dd7;
}

.header .headTap .rightArrow {
  display: inline-block;
  position: relative;
  top: 2px;
  left: 5px;
  width: 13px;
  height: 13px;
  background: url("./img/learnMore.png") no-repeat center center;
  background-size: 100% 100%;
}

.header .headTap .solution li {
  margin-top: 30px;
  font: 14px/20px PingFangSC-Semibold;
}

.header .headTap > dl > dd ul li:hover {
  /*color: #5c91ff;*/
}

.header .productFunc ul .Tit:hover {
  color: #fff;
}

.header .productFunc > dl > dt {
  height: 62px;
}
</style>
