<template>

  <div>
    <indexHeader>
      <div slot="rightHeaderTxt" class="rightHeaderTxt fadeIn">
        <h1>科技驱动双创
          <br> 众安科技X-flow启动初创企业数据赋能计划
        </h1>
        <p>基础版永久免费，让运营更easy</p>
        <router-link to="registerAccount" target="_blank" class="freeTry " slot="freeTryBtn"></router-link>
      </div>
      <div slot="bg" class="centerBox">
        <div class="bgSoundWave1"></div>
        <div class="bgSoundWave2"></div>
      </div>
      <div class="headBoxBG" slot="bg2"></div>
    </indexHeader>
    <!-- 
    <indexHeader :isShowCarousel="true" :carouselList="carouselList">
      <div slot="carousel1">
        <div class="rightHeaderTxt fadeIn">
          <h1>科技驱动双创
            <br> 众安科技X-flow启动初创企业数据赋能计划
          </h1>
          <p>基础版永久免费，让运营更easy</p>
          <router-link to="registerAccount" class="freeTry" target="_blank"></router-link>
        </div>

        <div class="centerBox">
          <div class="bgSoundWave1"></div>
          <div class="bgSoundWave2"></div>
        </div>

        <div class="headBoxBG"></div>
      </div>

      <div slot="carousel2">
        <div class="centerHeaderTxt">
          <h1>智能流量分析,驱动流量价值最大化</h1>
          <router-link to="registerAccount" class="freeTry" target="_blank">免费试用</router-link>
        </div>
        <div class="bgWave"></div>
        <div class="electric"></div>
      </div>
    </indexHeader> -->

    <div class="contactContent">
      <div class="ourSever">
        <h2>面向企业</h2>
        <div class="severItem" id="wuhenmaidian">
          <div class="imgBox imgBox01">
            <img class="img01" src="./img/faceObject@2x.png">
            <img class="img02" src="./img/magnifier@2x.png">
            <img class="img03" src="./img/mouseClick.png">
            <!--<img class="img04" src="./img/wuhengmaidian/pad@2x.png">-->
            <!--<img class="img05" src="./img/wuhengmaidian/zoom@2x.png">-->
          </div>

          <div class="severFont severFont01">
            <h3>初创企业资质</h3>
            <p>注册资本≤人民币300万；<br /> 成立时间≤2年；
              <br /> 上年营业收入≤200万；
              <br /> 单一企业使用场地面积≤1000平米
            </p>
            <h3 class="h_second">0运营基础企业资质</h3>
            <p>
              现有平台上线≤6个月；<br /> 现有线上运营团队≤10人
            </p>
          </div>
        </div>

        <h2>数据赋能</h2>
        <div class="severItem">
          <div>
            <div class="hint_box">
              <div class="hint_img"><img src="./img/1.svg" /></div>
              <div class="hint_text">X-flow流量分析产品基础版永久免费使用权</div>
            </div>
            <div class="hint_box">
              <div class="hint_img"><img src="./img/2.svg" /></div>
              <div class="hint_text">专人帮助梳理流量分析情况并提出专家意见</div>
            </div>
            <div class="hint_box">
              <div class="hint_img"><img src="./img/3.svg" /></div>
              <div class="hint_text">众安科技明星品牌案例宣传资源</div>
            </div>
            <div class="hint_box">
              <div class="hint_img"><img src="./img/4.svg" /></div>
              <div class="hint_text">线上／线下活动优先免费参与权；使用其他众安产品有折扣优惠</div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="bg_text">
        采用无痕埋点采集技术，全面覆盖APP，H5，Web和小程序等多种平台，实时全量采集用户行为数据，提供全面的数据指标运营体系，方便使用者查看产品及活动的整体情况，并且提供渠道分析，留存分析，用户分群和监控预警等分析工具使得运营流量价值最大化，为企业构建一站式智能流量分析平台。
      </div>
    </div>

    <div class="adv-carousel">
      <div class="adv-carousel-content">
        <div class="them">
          <h4>合作伙伴</h4>
          <div class="slideBox">
            <span class="leftBtn"></span>
            <span class="rightBtn"></span>
            <div class="screen">
              <div class="imgBox">
                <img :src="item" v-for="item in slideList">
              </div>
            </div>
          </div>
          <div class="bg_text moreDeatils">
            更多孵化器合作企业，可联系邮箱：xflow_support@zhongan.io
          </div>
        </div>
      </div>
    </div>
    <ContactUs></ContactUs>
    <indexFooter></indexFooter>
  </div>
</template>
<script type="text/ecmascript-6">
import indexHeader from "../../components/header/indexHeader.vue";
import indexFooter from "../../components/footer/indexFooter.vue";
import { ShakeWithMouse } from "../../config/mUtils";
import { SlideBox } from "../../config/mUtils";
import ContactUs from "../../components/contactUs/contactUs.vue";
export default {
  name: "registerAccount",
  data() {
    return {
      slideList: [
        require("./img/them06@2x.png"),
        require("./img/them01@2x.png"),
        require("./img/them02@2x.png"),
        require("./img/them03@2x.png"),
        require("./img/them04@2x.png"),
        require("./img/them05@2x.png")
      ], 
      carouselList: ["carousel1", "carousel2"]
    };
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = "static/xflowphone/phoneRegister.html";
      }

      if (this.$route.query.learnMore) {
        console.log(this.$route.query.learnMore);
        $(window).scrollTop(
          document.getElementById(this.$route.query.learnMore).offsetTop - 50
        );
      }

      //header声波背景1
      new ShakeWithMouse(".headBox", [
        {
          name: ".bgSoundWave1",
          rangeX: 4,
          rangeY: 4
        }
      ]);

      //header声波背景2
      new ShakeWithMouse(".headBox", [
        {
          name: ".bgSoundWave2",
          rangeX: 7,
          rangeY: 7
        }
      ]);

      //header光电背景
      new ShakeWithMouse(".headBox", [
        {
          name: ".bgWave",
          rangeX: 3
        }
      ]);

      //header波浪背景
      new ShakeWithMouse(".headBox", [
        {
          name: ".electric",
          rangeX: 4,
          rangeY: 4
        }
      ]);

      //无痕埋点
      new ShakeWithMouse(".imgBox01", [
        {
          name: ".img02",
          rangeX: 3,
          rangeY: 3
        },
        {
          name: ".img03",
          rangeX: 5,
          rangeY: 5
        }
      ]);

      // footer slider
      new SlideBox(".slideBox");
    });
  },
  components: {
    ContactUs,
    indexHeader,
    indexFooter
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.el-carousel_item {
  width: 175px;
  height: 200px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.headBoxBG {
  position: absolute;
  top: 0;
  left: 50%;
  width: 1920px;
  height: 100%;
  margin-left: -960px;
  background: url("./img/headerBG.png") no-repeat center center;
  background-size: 100% 100%;
  z-index: 2;
}

.header .headBox .rightHeaderTxt {
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 247px;
  width: 700px;
  text-align: right;
  z-index: 7;
}

.header .rightHeaderTxt h1 {
  float: right;
  font: normal 36px/47px "microsoft yahei";
  color: #fff;
  letter-spacing: 0;
}

.header .rightHeaderTxt p {
  float: right;
  width: 100%;
  margin-top: 20px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  line-height: 26px;
  color: #fffefe;
  letter-spacing: 0;
}

.header .rightHeaderTxt .freeTry {
  float: right;
  display: none;
  width: 162px;
  height: 48px;
  margin: 43px auto 0 auto;
  background: url("./img/tryBtn.png") no-repeat center center;
  background-size: 100% 100%;
}

.header .headBox .freeTry:hover {
  color: #fff;
  opacity: 0.8;
  filter: alpha(opacity=80);
}

@media screen and (max-width: 1280px) {
  .header .headBox .rightHeaderTxt {
    text-align: left;
  }

  .header .rightHeaderTxt .freeTry {
    float: left;
  }
}

.header {
  .centerHeaderTxt {
    position: absolute;
    top: 290px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 7;
    > h1 {
      font-family: MicrosoftYaHei;
      font-size: 36px;
      color: #fffefe;
      letter-spacing: 0;
    }
    .freeTry {
      display: block;
      width: 145px;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      margin: 40px auto 0;
      color: #fff;
      border-radius: 30px;
      background-image: linear-gradient(
        -28deg,
        #7285f9 0%,
        #5c92ff 49%,
        #21a9f6 100%
      );
    }
  }
}

.header .centerBox {
  position: absolute;
  top: 192px;
  left: 461px;
  width: 472px;
  height: 385px;
}

.header .bgSoundWave1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 318px;
  height: 343px;
  background: url("./img/soundeWave1.png") no-repeat top center;
  background-size: 100% 100%;
  z-index: 3;
}

.header .bgSoundWave2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 472px;
  height: 385px;
  background: url("./img/soundeWave2.png") no-repeat top center;
  background-size: 100% 100%;
  z-index: 2;
}

.header .bgWave {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1920px;
  height: 260px;
  background: url("./img/wave@2x.png") no-repeat top center;
  background-size: 100% 100%;
  z-index: 6;
}

.header .electric {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 990px;
  height: 502px;
  background: url("./img/lightelec@2x.png") no-repeat top center;
  background-size: 100% 100%;
  z-index: 4;
}

.analysisPlatform {
  position: relative;
  padding-top: 124px;
  width: 1148px;
  height: 983px;
  margin: 0 auto;
}

.analysisPlatform h2 {
  font: normal 30px/47px Arial, "microsoft yahei";
  color: #000;
  text-align: center;
  margin: 0 auto 33px;
}

.analysisPlatform .plaFont {
  font: normal 14px/24px "microsoft yahei";
  color: #000;
  text-align: left;
  width: 836px;
  margin: 0 auto 130px;
}

.analysisPlatform .lineBox {
  position: absolute;
  top: 490px;
  left: 50%;
  margin-left: -960px;
  width: 1920px;
  height: 493px;
  background: url("./img/line.png") no-repeat left top;
  background-size: 100% 100%;
  z-index: 1;
}

.analysisPlatform .ballIcon {
  position: absolute;
  width: 216px;
  height: 300px;
  text-align: center;
  z-index: 2;
}

.analysisPlatform .postion01 {
  top: 74px;
  left: 510px;
}

.analysisPlatform .postion02 {
  top: 81px;
  left: 771px;
}

.analysisPlatform .postion03 {
  top: -1px;
  left: 1030px;
}

.analysisPlatform .postion04 {
  top: -103px;
  left: 1287px;
}

.analysisPlatform .ballIcon .icon {
  position: relative;
  display: block;
  width: 90px;
  height: 102px;
  margin: 0 auto;
  transition: All 0.5s ease-in-out;
  -webkit-transition: All 0.5s ease-in-out;
  -moz-transition: All 0.5s ease-in-out;
  -o-transition: All 0.5s ease-in-out;
  z-index: 8;
}

.analysisPlatform .postion01:hover .icon {
  transform: translateY(-65px);
  -moz-transform: translateY(-65px);
  -webkit-transform: translateY(-65px);
  -o-transform: translateY(-65px);
  transition-duration: 0.5s;
}

.analysisPlatform .postion02:hover .icon {
  transform: translateY(-106px);
  -moz-transform: translateY(-106px);
  -webkit-transform: translateY(-106px);
  -o-transform: translateY(-106px);
  transition-duration: 0.6s;
}

.analysisPlatform .postion03:hover .icon {
  transform: translateY(-150px);
  -moz-transform: translateY(-150px);
  -webkit-transform: translateY(-150px);
  -o-transform: translateY(-150px);
  transition-duration: 0.8s;
}

.analysisPlatform .postion04:hover .icon {
  transform: translateY(-132px);
  -moz-transform: translateY(-132px);
  -webkit-transform: translateY(-132px);
  -o-transform: translateY(-132px);
  transition-duration: 0.7s;
}

.analysisPlatform .ballIcon .lineBoxDot {
  position: absolute;
  top: 154px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
}

.analysisPlatform .ballIcon .bottomTit {
  position: absolute;
  font: bold 18px/26px "microsoft yahei";
  color: #000;
  bottom: 66px;
  left: 50%;
  white-space: nowrap;
  transform: translateX(-50%);
}

.analysisPlatform .ballIcon .hideTxt {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 156px;
  font: normal 14px/20px "MicrosoftYaHei";
  text-align: left;
  color: #000;
  opacity: 0;
  -webkit-transition: All 0.5s ease-in-out;
  -moz-transition: All 0.5s ease-in-out;
  -o-transition: All 0.5s ease-in-out;
}

.analysisPlatform .ballIcon:hover .hideTxt {
  opacity: 100;
}

.analysisPlatform .postion01 .hideTxt {
  width: 137px;
  top: 70px;
}

.analysisPlatform .postion02 .hideTxt {
  width: 149px;
  top: 34px;
}

.analysisPlatform .postion03 .hideTxt {
  width: 156px;
  top: -9px;
}

.analysisPlatform .postion04 .hideTxt {
  width: 153px;
  top: 10px;
}

.ourSever {
  margin: 0 auto;
  overflow: hidden;
}

.ourSever h2 {
  font: normal 30px/47px Arial, "microsoft yahei";
  color: #000000;
  text-align: center;
  margin: 130px 0 125px 0;
}

.ourSever .severItem {
  position: relative;
  height: auto;
  width: 1000px;
  margin: 0 auto 150px;
}

.ourSever .severItem .imgBox {
  position: relative;
}

.ourSever .severItem .imgBox img {
  position: absolute;
}

.severItem .severFont01 {
  right: 30px;
  top: 111px;
}

.severItem .severFont01 h3 {
  margin-bottom: 25px;
}

.ourSever .severItem .imgBox01 {
  width: 520px;
  height: 557px;
}

.ourSever .severItem .imgBox01 .img01 {
  width: 520px;
  height: 557px;
}

.ourSever .severItem .imgBox01 .img02 {
  top: 270px;
  left: -60px;
  width: 235px;
  height: 235px;
}

.ourSever .severItem .imgBox01 .img03 {
  top: 345px;
  right: 0px;
  width: 145px;
  height: 140px;
}

.ourSever .severItem .severFont {
  position: absolute;
}

.ourSever .severItem .severFont h3 {
  font: bold 24px/29px Arial, "microsoft yahei";
  color: #000000;
}

.ourSever .severItem .severFont p {
  opacity: 0.4;
  font: 24px/29px Arial, "microsoft yahei";
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  width: 255px;
}
.adv-carousel {
  height: 580px;
  width: 100%;
  background: #f7f9fb;
}
.adv-carousel-content {
  width: 1000px;
  margin: 0 auto;
}
.them {
  padding: 130px 0 142px;
  background: #f7f9fb;
}

.them h4 {
  font: normal 30px/47px Arial, "microsoft yahei";
  text-align: center;
}

.them .slideBox {
  position: relative;
  margin: 92px auto 0;
  width: 950px;
  background: transparent;
}

.them .slideBox .leftBtn {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -16px;
  width: 32px;
  height: 32px;
  background: url("./img/leftBtn@2x.png") no-repeat center center;
  background-size: 100% 100%;
}

.them .slideBox .rightBtn {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -16px;
  width: 32px;
  height: 32px;
  background: url("./img/rightBtn@2x.png") no-repeat center center;
  background-size: 100% 100%;
}

.them .slideBox .screen {
  margin: 0 auto;
  width: 90%;
  height: 175px;
  overflow: hidden;
  white-space: nowrap;
}

.them .slideBox .imgBox {
  position: relative;
  left: 0;
  top: 0;
}

.them .slideBox .imgBox img {
  width: 202px;
  height: 175px;
  vertical-align: middle;
}

.h_second {
  margin-top: 55px;
}
.hint_box {
  width: 250px;
  height: 300px;
  background: #ffffff;
  border: 1px solid #e9ebee;
  border-right: none;
  box-sizing: border-box;
  float: left;
}
.hint_box:nth-child(4) {
  border-right: 1px solid #e9ebee;
}
.hint_img {
  width: 86px;
  height: 108px;
  margin: 50px auto auto;
}

.hint_img img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.hint_img:hover img {
  transform: scale(1.2, 1.2);
  -moz-transform: scale(1.2, 1.2);
  -webkit-transform: scale(1.2, 1.2);
  -o-transform: scale(1.2, 1.2);
  transition-duration: 0.5s;
}

.hint_box .hint_text {
  width: 160px;
  height: auto;
  margin: 43px auto auto;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  line-height: 24px;
  text-align: center;
}
.contactContent {
  width: 100%;
  height: auto;
  background: url("./img/Bitmap@2x.png");
  background-position: bottom;
  background-size: 100% 508px;
  background-repeat: no-repeat;
  padding-bottom: 160px;
}
.bg_text {
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  width: 851px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
.moreDeatils {
  font-size: 16px;
  color: #999999;
  margin-top: 30px;
}
</style>


