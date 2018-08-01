<template>
  <div>
    <indexHeader :isShowCarousel="true" :carouselList="carouselList">
      <div slot="carousel1">
        <div class="rightHeaderTxt fadeIn">
          <h1>科技驱动双创
            <br> 众安科技X-flow启动初创企业数据赋能计划
          </h1>
          <p>基础版永久免费，让运营更easy</p>
          <span @click="isPhone" class="freeTry"></span>
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
          <span @click="isPhone" class="freeTry">免费试用</span>
        </div>
        <div class="bgWave"></div>
        <div class="electric"></div>
      </div>
    </indexHeader>

    <div class="analysisPlatform">
      <h2>Xflow 流量分析平台</h2>
      <p class="plaFont">
        采用无痕埋点采集技术，全面覆盖APP，H5，Web和小程序等多种平台，实时全量采集用户行为数据，提供全面的数据指标运营体系，方便使用者查看产品及活动的整体情况，并且提供渠道分析，留存分析，用户分群和监控预警等分析工具使得运营流量价值最大化，为企业构建一站式智能流量分析平台。
      </p>
      <div class="lineBox">
        <div class="ballIcon postion01">
          <img class="icon" src="./img/icon01.png">
          <img class="lineBoxDot" src="./img/lineBoxDot.png">
          <p class="hideTxt">颠覆传统数据采集方式，无需埋点， SDK自动部署追踪代码</p>
          <h5 class="bottomTit">无痕埋点</h5>
        </div>
        <div class="ballIcon postion02">
          <img class="icon" src="./img/icon02.png">
          <img class="lineBoxDot" src="./img/lineBoxDot.png">
          <p class="hideTxt">产品、运营可以自主可视化圈选采集模块，无需开发介入埋点，提高数据采集效率</p>
          <h5 class="bottomTit">可视化采集</h5>
        </div>
        <div class="ballIcon postion03">
          <img class="icon" src="./img/icon03.png">
          <img class="lineBoxDot" src="./img/lineBoxDot.png">
          <p class="hideTxt">提供自定义报表分析，智能分析漏斗，智能路径分析和实时大屏等分析工具供产品、运营进行数据精细化运营，提高运营效率</p>
          <h5 class="bottomTit">多种智能分析工具</h5>
        </div>
        <div class="ballIcon postion04">
          <img class="icon" src="./img/icon04.png">
          <img class="lineBoxDot" src="./img/lineBoxDot.png">
          <p class="hideTxt">全量实时数据采集，多种可视化报表， 多维度关键指标分析，构建全面完善的数据化运营分析体系，驱动产品和运营做决策</p>
          <h5 class="bottomTit">全面数据分析体系</h5>
        </div>
      </div>
    </div>
    <div class="ourSever">
      <h2>我们的服务</h2>
      <div class="severItem" id="wuhenmaidian">
        <div class="imgBox imgBox01">
          <img class="img01" src="./img/wuhengmaidian/computer@2x.png">
          <img class="img02" src="./img/wuhengmaidian/cloud01@2x.png">
          <img class="img03" src="./img/wuhengmaidian/cloud02@2x.png">
          <img class="img04" src="./img/wuhengmaidian/pad@2x.png">
          <img class="img05" src="./img/wuhengmaidian/zoom@2x.png">
        </div>

        <div class="severFont severFont01">
          <h3>无痕埋点</h3>
          <p>颠覆传统数据采集方式，无需埋点，SDK自动部署追踪代码，提高数据采集效率</p>
        </div>
      </div>

      <div class="severItem" id="duoweiduzhibiao">
        <div class="imgBox imgBox02">
          <img class="img01" src="./img/zhibiaofenxi/tabel@2x.png">
          <img class="img02" src="./img/zhibiaofenxi/pie@2x.png">
          <img class="img03" src="./img/zhibiaofenxi/pencil@2x.png">
          <img class="img04" src="./img/zhibiaofenxi/lens@2x.png">
          <img class="img05" src="./img/zhibiaofenxi/coin@2x.png">
          <img class="img06" src="./img/zhibiaofenxi/caculator@2x.png">
        </div>

        <div class="severFont severFont02">
          <h3>多维度指标分析</h3>
          <p>提供多种可视化报表，多维度关键指标分析,提供全面数据运营分析体系，帮助产品、运营发现问题，解决问题</p>
        </div>
      </div>

      <div class="severItem clearfix" id="zhinengloudou">
        <div class="imgBox imgBox03">
          <img class="img02" src="./img/zhinengloudou/card@2x.png">
          <img class="img01" src="./img/zhinengloudou/bag@2x.png">
          <img class="img03" src="./img/zhinengloudou/chart@2x.png">
          <img class="img04" src="./img/zhinengloudou/funnel@2x.png">
          <img class="img05" src="./img/zhinengloudou/gear@2x.png">
        </div>

        <div class="severFont severFont03">
          <h3>智能漏斗分析</h3>
          <p>可以通过自定义转化漏斗工具实时分析监控用户每一步转化步骤，优化转化流程和产品功能，提高转化效率，降低获客成本</p>
        </div>
      </div>

      <div class="severItem clearfix" id="yonghudongcha">
        <div class="imgBox imgBox04">
          <img class="img01" src="./img/yonghudongcha/people@2x.png">
          <img class="img02" src="./img/yonghudongcha/info@2x.png">
        </div>

        <div class="severFont severFont04">
          <h3>用户洞察</h3>
          <p>通过用户设备，地域，来源，参与留存和具体行为轨迹等特征对用户洞察，根据用户特征对用户分群，优化个性化精准营销策略</p>
        </div>
      </div>

      <div class="severItem clearfix" id="jiankongyujing">
        <div class="imgBox imgBox05">
          <img class="img01" src="./img/jiankongyujing/shield@2x.png">
          <img class="img02" src="./img/jiankongyujing/C@2x.png">
          <img class="img03" src="./img/jiankongyujing/lock@2x.png">
          <img class="img04" src="./img/jiankongyujing/star@2x.png">
          <img class="img05" src="./img/jiankongyujing/tick@2x.png">
        </div>

        <div class="severFont severFont05">
          <h3>监控预警</h3>
          <p>通过对应用日志收集和分析，提供错误管理和多维度错误日志分析，从而提升应用稳定性；灵活自定义配置预警条件，自动实时预警通知</p>
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
export default {
  name: "index",
  data() {
    return {
      carouselList: ["carousel1", "carousel2"]
    };
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
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
        },
        {
          name: ".img04",
          rangeX: 7,
          rangeY: 7
        },
        {
          name: ".img05",
          rangeX: 4,
          rangeY: 4
        }
      ]);

      //多维度指标分析
      new ShakeWithMouse(".imgBox02", [
        {
          name: ".img02",
          rangeX: 3,
          rangeY: 3
        },
        {
          name: ".img03",
          rangeX: 5,
          rangeY: 5
        },
        {
          name: ".img04",
          rangeX: 7,
          rangeY: 7
        },
        {
          name: ".img05",
          rangeX: 8,
          rangeY: 8
        },
        {
          name: ".img06",
          rangeX: 4,
          rangeY: 4
        }
      ]);

      //智能漏斗分析
      new ShakeWithMouse(".imgBox03", [
        {
          name: ".img01",
          rangeX: 3,
          rangeY: 3
        },
        {
          name: ".img03",
          rangeX: 5,
          rangeY: 5
        },
        {
          name: ".img04",
          rangeX: 7,
          rangeY: 7
        },
        {
          name: ".img05",
          rangeX: 8,
          rangeY: 8
        }
      ]);

      //用户洞察
      new ShakeWithMouse(".imgBox04", [
        {
          name: ".img01",
          rangeX: 6,
          rangeY: 6
        }
      ]);

      //监控预警
      new ShakeWithMouse(".imgBox05", [
        {
          name: ".img02",
          rangeX: 3,
          rangeY: 3
        },
        {
          name: ".img03",
          rangeX: 6,
          rangeY: 6
        },
        {
          name: ".img04",
          rangeX: 4,
          rangeY: 4
        },
        {
          name: ".img05",
          rangeX: 5,
          rangeY: 5
        }
      ]);
    });
  },
  methods: {
    isPhone() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log(111);
        window.open("/static/xflowphone/phoneRegister.html", "_blank");
      } else {
        console.log(222);
        window.open("#/registerAccount", "_blank");
      }
    }
  },
  components: {
    indexHeader,
    indexFooter
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
  right: 355px;
  top: 247px;
  width: 700px;
  text-align: right;
  z-index: 5;
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
  display: block;
  width: 162px;
  height: 48px;
  margin: 43px auto 0 auto;
  background: url("./img/tryBtn.png") no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
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
  z-index: 4;
}

.header .bgSoundWave2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 472px;
  height: 385px;
  background: url("./img/soundeWave2.png") no-repeat top center;
  background-size: 100% 100%;
  z-index: 3;
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
  /*width: 1148px;*/
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
  /*width: 1148px;*/
  margin: 0 auto;
  overflow: hidden;
}

.ourSever h2 {
  font: normal 30px/47px Arial, "microsoft yahei";
  color: #000000;
  text-align: center;
  margin: 50px 0 125px 0;
}

.ourSever .severItem {
  position: relative;
  height: auto;
  width: 850px;
  margin: 0 auto 150px;
}

.ourSever .severItem .imgBox {
  position: relative;
}

.ourSever .severItem .imgBox img {
  position: absolute;
}

.severItem .severFont01 {
  left: 532px;
  top: 111px;
}

.severItem .severFont01 h3 {
  margin-bottom: 36px;
}

.ourSever .severItem .imgBox01 {
  width: 370px;
  height: 300px;
}

.ourSever .severItem .imgBox01 .img01 {
  top: 68px;
  left: 48px;
  width: 247px;
  height: 204px;
}

.ourSever .severItem .imgBox01 .img02 {
  top: 10px;
  left: 0;
  width: 66px;
  height: 40px;
}

.ourSever .severItem .imgBox01 .img03 {
  top: 0;
  left: 30px;
  width: 66px;
  height: 40px;
}

.ourSever .severItem .imgBox01 .img04 {
  top: 172px;
  left: 17px;
  width: 90px;
  height: 115px;
}

.ourSever .severItem .imgBox01 .img05 {
  top: 149px;
  left: 235px;
  width: 110px;
  height: 110px;
}

.ourSever .severItem .imgBox02 {
  left: 525px;
  top: 0;
  width: 320px;
  height: 285px;
}

.severItem .severFont02 {
  left: 0;
  top: 76px;
}

.severItem .severFont02 h3 {
  margin-bottom: 31px;
}

.ourSever .severItem .imgBox02 .img01 {
  top: 0;
  left: 17px;
  width: 188px;
  height: 221px;
}

.ourSever .severItem .imgBox02 .img02 {
  top: 8px;
  left: 218px;
  width: 68px;
  height: 68px;
}

.ourSever .severItem .imgBox02 .img03 {
  top: 197px;
  left: 180px;
  width: 114px;
  height: 8px;
}

.ourSever .severItem .imgBox02 .img04 {
  top: 120px;
  left: 0;
  width: 187px;
  height: 140px;
}

.ourSever .severItem .imgBox02 .img05 {
  top: 120px;
  left: 0;
  width: 64px;
  height: 82px;
}

.ourSever .severItem .imgBox02 .img06 {
  top: 84px;
  left: 226px;
  width: 69px;
  height: 100px;
}

.ourSever .severItem .imgBox03 {
  left: 0;
  top: 0;
  width: 325px;
  height: 280px;
}

.severItem .severFont03 {
  left: 532px;
  top: 62px;
}

.severItem .severFont03 h3 {
  margin-bottom: 26px;
}

.ourSever .severItem .imgBox03 .img01 {
  top: 0;
  left: 213px;
  width: 83px;
  height: 76px;
}

.ourSever .severItem .imgBox03 .img02 {
  top: 37px;
  left: 77px;
  width: 192px;
  height: 220px;
}

.ourSever .severItem .imgBox03 .img03 {
  top: 179px;
  left: 21px;
  width: 91px;
  height: 91px;
}

.ourSever .severItem .imgBox03 .img04 {
  top: 176px;
  left: 240px;
  width: 78px;
  height: 78px;
}

.ourSever .severItem .imgBox03 .img05 {
  top: 31px;
  left: 35px;
  width: 61px;
  height: 62px;
}

.ourSever .severItem .imgBox04 {
  left: 519px;
  top: 0;
  width: 320px;
  height: 330px;
}

.severItem .severFont04 {
  left: 0;
  top: 97px;
}

.severItem .severFont04 h3 {
  margin-bottom: 26px;
}

.ourSever .severItem .imgBox04 .img01 {
  top: 97px;
  left: 108px;
  width: 119px;
  height: 149px;
}

.ourSever .severItem .imgBox04 .img02 {
  top: 0;
  left: 0;
  width: 303px;
  height: 320px;
}

.ourSever .severItem .imgBox05 {
  left: 0;
  top: 0;
  width: 295px;
  height: 270px;
}

.severItem .severFont05 {
  left: 532px;
  top: 24px;
}

.severItem .severFont05 h3 {
  margin-bottom: 26px;
}

.ourSever .severItem .imgBox05 .img01 {
  top: 12px;
  left: 46px;
  width: 191px;
  height: 233px;
}

.ourSever .severItem .imgBox05 .img02 {
  top: 160px;
  left: 236px;
  width: 47px;
  height: 48px;
}

.ourSever .severItem .imgBox05 .img03 {
  top: 110px;
  left: 0;
  width: 90px;
  height: 135px;
}

.ourSever .severItem .imgBox05 .img04 {
  top: 28px;
  left: 27px;
  width: 51px;
  height: 51px;
}

.ourSever .severItem .imgBox05 .img05 {
  top: 0;
  left: 196px;
  width: 82px;
  height: 82px;
}

.ourSever .severItem .severFont {
  position: absolute;
}

.ourSever .severItem .severFont h3 {
  font: bold 24px/29px Arial, "microsoft yahei";
  color: #000000;
}

.ourSever .severItem .severFont p {
  font: normal 14px/24px Arial, "microsoft yahei";
  color: #000000;
  width: 320px;
}
</style>
