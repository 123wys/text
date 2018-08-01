<template>
  <div>
    <indexHeader>
      <h1 class="fadeIn" slot="sol-centerTxt">互联网保险行业</h1>
      <router-link to="registerAccount" target="_blank" class="freeTry fadeIn" slot="sol-freeTryBtn"></router-link>
      <div class="centerBox fadeIn" slot="bg">
        <div class="bgBox"></div>
        <div class="dataBG"></div>
        <div class="shieldBG"></div>
      </div>
      <div class="solutionBg" slot="bg2"></div>
    </indexHeader>

    <div class="challenge">
      <div class="challengeBG"></div>
      <h2>互联网保险行业面临的挑战</h2>
      <div class="contentBox">
        <ul class="clearfix">
          <li>
            <img class="icon01" src="./img/icon01@2x.png" alt="">
            <p>用户保险意识低<br/>对保险存有误解购买意愿不强烈<br/>导致获客成本很高</p>
          </li>
          <li>
            <img class="icon02" src="./img/icon02@2x.png" alt="">
            <p>保险产品繁多<br/>条款深奥复杂<br/>投保支付流程繁琐</p>
          </li>
          <li>
            <img class="icon03" src="./img/icon03@2x.png" alt="">
            <p>用户和企业之间互动比较少<br/>一般只发生在投保和理赔中间<br/>导致用户粘性比较差</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="solutionBox">
      <h3>互联网保险行业场景解决方案</h3>
      <div class="item item01">
        <img class="img01" src="./img/img01@2x.png" alt="">
        <img class="img02" src="./img/img02@2x.png" alt="">
        <div class="content contentLeft">
          <span class="shortLine shortLineLeft"></span>
          <h1>优化渠道推广，降低获客成本</h1>
          <p>通过监控不同渠道的投放转化效果，建立渠道投放效果模型，对渠道进行优胜劣汰，精细化运营，及时调整推广策略，从而降低获客成本，提升ROI</p>
        </div>
      </div>

      <div class="item item02">
        <img class="img03" src="./img/img03@2x.png" alt="">
        <div class="content contentRight">
          <span class="shortLine shortLineRight"></span>
          <h1>智能漏斗转化分析，提升用户转化率</h1>
          <p>通过用户行为路径分析和漏斗转化分析，监控用户从投保到支付每个步骤，定位用户流失节点，进而优化用户产品体验，从而提高用户购买转化率</p>
        </div>
      </div>

      <div class="item item03">
        <img class="img04" src="./img/img04@2x.png" alt="">
        <img class="img05" src="./img/img05@2x.png" alt="">
        <div class="content contentLeft">
          <span class="shortLine shortLineLeft"></span>
          <h1>全面用户洞察，提升用户留存率</h1>
          <p>通过用户设备，地域，来源，参与留存和具体行为轨迹等特征对用户全面洞察，根据用户特征对用户分群，后续可以对用户进行个性化精准营销策略，增加用户和企业之间的互动，提高用户留存率，进而提高用户复购率</p>
        </div>
      </div>
    </div>

    <div class="them">
      <h4>他们都在使用X-flow</h4>
      <div class="slideBox">
        <span class="leftBtn"></span>
        <span class="rightBtn"></span>
        <div class="screen">
          <div class="imgBox">
            <img :src="item"  v-for="item in slideList">
          </div>
        </div>
      </div>
    </div>

    <indexFooter></indexFooter>
  </div>
</template>
<script type="text/ecmascript-6">
import indexHeader from "../../components/header/indexHeader.vue";
import indexFooter from "../../components/footer/indexFooter.vue";
import { ShakeWithMouse } from "../../config/mUtils";
import { SlideBox } from "../../config/mUtils";
export default {
  name: "solution",
  data(){
    return {
      slideList:[
        require("./img/them06@2x.png"),
        require("./img/them01@2x.png"),
        require("./img/them02@2x.png"),
        require("./img/them03@2x.png"),
        require("./img/them04@2x.png"),
        require("./img/them05@2x.png")
      ]
    }
  },
  mounted() {
    this.$nextTick(function(){
       //headerBG
    new ShakeWithMouse(".centerBox", [
      {
        name: ".bgBox",
        rangeX: 3,
        rangeY: 3
      },
      {
        name: ".dataBG",
        rangeX: 7,
        rangeY: 7
      },
      {
        name: ".shieldBG",
        rangeX: 5,
        rangeY: 5
      }
    ]);

    // footer slider
    new SlideBox(".slideBox");

    })
  },
  components: {
    indexHeader,
    indexFooter
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.header {
  max-width: 1920px;
}

.header .solutionBg {
  position: absolute;
  top: 0;
  left: 50%;
  background: url("./img/headerBG@2x.png") center center no-repeat;
  background-size: 100% 100%;
  width: 1920px;
  height: 700px;
  margin-left: -960px;
  z-index: 1;
}

.header .topBar.active {
  background: #25304f;
}

.header .headBox h1 {
  position: absolute;
  top: 45.3%;
  left: 58%;
  font: normal 32px/38px "Tensentype-JiaLiCuHeiJ";
  color: #fff;
  white-space: nowrap;
  text-align: center;
}

.header .headBox .freeTry {
  position: absolute;
  top: 54.7%;
  left: 58%;
  margin: 0 0;
}

.header .centerBox {
  position: absolute;
  top: 23.2%;
  left: 17.2%;
  width: 745px;
  height: 363px;
}

.header .bgBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 745px;
  height: 363px;
  background: url("./img/bgBox@2x.png") no-repeat center center;
  background-size: 100% 100%;
}

.header .dataBG {
  position: absolute;
  top: 36px;
  left: 250px;
  width: 322px;
  height: 273px;
  background: url("./img/data@2x.png") no-repeat center center;
  background-size: 100% 100%;
}

.header .shieldBG {
  position: absolute;
  top: 234px;
  left: 557px;
  width: 77px;
  height: 94px;
  background: url("./img/shield@2x.png") no-repeat center center;
  background-size: 100% 100%;
}

.header .headBox .freeTry {
  position: absolute;
  top: 54.7%;
  left: 58%;
  width: 145px;
  height: 34px;
  background: url(../../images/tryBtn@2x.png) no-repeat center center;
  background-size: 100% 100%;
}

.header .headBox .freeTry:hover {
  color: #fff;
  opacity: 0.8;
  filter: alpha(opacity=80);
}

.challenge {
  position: relative;
  width: 100%;
  height: 596px;
}

.challengeBG {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1920px;
  height: 596px;
  background: url("./img/challengeBG@2x.png") no-repeat left 130px;
  background-size: contain;
}

.challenge h2 {
  position: absolute;
  top: 144px;
  left: 50%;
  transform: translateX(-50%);
  font: normal 30px/40px "MicrosoftYaHei";
  color: #000;
  text-align: center;
}

.challenge .contentBox {
  position: absolute;
  top: 274px;
  left: 50%;
  width: 820px;
  transform: translateX(-50%);
}

.challenge .contentBox li {
  position: relative;
  float: left;
  width: 253px;
  height: 260px;
  margin-right: 30px;
  text-align: center;
}

.challenge .contentBox li:last-child {
  margin-right: 0;
}

.challenge .contentBox .icon01 {
  width: 108px;
  height: 84px;
}

.challenge .contentBox .icon02 {
  width: 105px;
  height: 78px;
}

.challenge .contentBox .icon03 {
  width: 97px;
  height: 69px;
}

.challenge .contentBox p {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 126px;
  white-space: nowrap;
  font: normal 12px/18px "MicrosoftYaHei";
  color: #000;
  text-align: center;
}

.solutionBox {
  position: relative;
  width: 875px;
  margin: 0 auto;
  padding-bottom: 130px;
}

.solutionBox h3 {
  margin-top: 130px;
  font: normal 30px/40px "MicrosoftYaHei";
  color: #000;
  text-align: center;
}

.solutionBox .item {
  position: relative;
  margin-top: 150px;
}

.solutionBox .item01 {
  height: 280px;
}

.solutionBox .item02 {
  height: 250px;
}

.solutionBox .item03 {
  height: 320px;
}

.solutionBox .item .content {
  position: absolute;
  top: 0;
  text-align: left;
}

.solutionBox .item .contentLeft {
  left: 0;
}

.solutionBox .item .contentRight {
  right: 0;
}

.solutionBox .item .content .shortLine {
  position: absolute;
  top: 0;
  display: block;
  width: 32px;
  height: 5px;
  background: #4da1ff;
}

.solutionBox .item .content .shortLineLeft {
  left: 2px;
}

.solutionBox .item .content .shortLineRight {
  right: 7px;
}

.solutionBox .item .content h1 {
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 26px;
  width: 390px;
  font: normal 24px/29px "Tensentype-JiaLiCuHeiJ";
  letter-spacing: 0;
  color: #000;
}

.solutionBox .item .content p {
  width: 390px;
  font: normal 14px/23px "MicrosoftYaHei";
  color: #000;
}

.solutionBox .item .img01 {
  position: absolute;
  right: 0;
  top: 0;
  width: 414px;
  height: 211px;
}

.solutionBox .item .img02 {
  position: absolute;
  right: 280px;
  top: 120px;
  width: 160px;
  height: 160px;
}

.solutionBox .item .img03 {
  position: absolute;
  left: 0;
  top: 0;
  width: 417px;
  height: 241px;
}

.solutionBox .item .img04 {
  position: absolute;
  right: 134px;
  top: 0;
  width: 310px;
  height: 207px;
}

.solutionBox .item .img05 {
  position: absolute;
  right: 0;
  top: 102px;
  width: 279px;
  height: 211px;
}

.them {
  padding: 130px 0 142px;
  background: #f7f9fb;
}

.them h4 {
  font: normal 30px/40px "Tensentype-JiaLiCuHeiJ";
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
</style>
