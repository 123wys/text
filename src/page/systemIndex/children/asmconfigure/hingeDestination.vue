<template>
  <div>
    <div class="searchTitle clearfix">
      <span style=" font-size: 14px;
        color: #99A9BF;padding-left:20px;">URL:</span>
      <el-select class="s-select urlSelect" v-model="url" filterable placeholder="请选择">
        <el-option v-for="item in options" :label="item.rootUrlName +'(' + item.rootUrl +')'" :value="item.rootUrl" :key="item.rootUrl">
        </el-option>
      </el-select>

      <el-date-picker v-model="dateTime" type="date" placeholder="选择日期" style="margin-left: 20px">
      </el-date-picker>
      <button type="button" class="btnQuery" @click="getRootData">确定</button>
      <span class="download" @click="goDownload">
        <download style="margin-right:5px"></download>下载表格</span>
    </div>

    <div class="ontimeChartContent" id="Accept_rateChart" style="margin-top: 10px;padding-top: 40px;height: auto;width: 100%;overflow: auto;text-align: center;text-align: -webkit-center;">
      <div id="path-analysis" style="border:none;height:800px;width: 100%;">
        <div id="drawing" style="position: relative" class="drawing">
          <svg id="svg" height="100%" version="1.1" width="100%" xmlns="http://www.w3.org/2000/svg"></svg>
          <div class="html" id="html"></div>

        </div>
      </div>
    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  queryRootUrls,
  appFirstSiteAnalysis,
  appNextSiteAnalysis
} from "../../../..//service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

export default {
  name: "hingeDestination",
  data() {
    return {
      options: [],
      url: "",
      dateTime: "",

      DATA_2: [],
      svgPath: []
    };
  },

  computed: {
    ...mapState(["appSource", "headerTapOs"]),
    formatedDate() {
      return formatDate(this.dateTime);
    }
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      Object.assign(this.$data, this.$options.data()); //初始化data
      this.initPage();
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.initPage();
    });
  },

  methods: {
    initPage() {
      this.getRootUrl();
      var _this = this;

      window.showNext = function(
        that,
        top,
        left,
        level,
        data,
        curUrl,
        lastUrl
      ) {
        var tFun = function(data) {
          _this.svgPath[level] = [];
          _this.svgPath.forEach(function(item, idx) {
            if (idx > level) {
              delete _this.svgPath[idx];
            }
          });
          var tleft = left;
          left = left + 120 + 180;
          //get data

          var sHtml = "";
          var dom = document.getElementById("_leveldiv_" + level);
          var html = document.getElementById("html");
          if (!dom) {
            var cls = "";
            if (level == 0) {
              cls = "_item_0";
            }
            if (level == 1) {
              cls = "_item_1";
            }
            if (level > 1) {
              cls = "_item_2";
            }
            sHtml = '<div class="' + cls + '" id="_leveldiv_' + level + '">';
          } else {
            dom.innerHTML = "";
            //删除子目录
            var tdom = null;
            for (var i = level; i < 1000; i++) {
              tdom = document.getElementById("_leveldiv_" + i);
              if (tdom == null) {
                break;
              }
              tdom.innerHTML = "";
            }
          }
          var firstTop = top - 66 * data.length / 2 + 56 / 2;
          if (firstTop < 0) {
            firstTop = 0;
          }
          data.forEach(function(item, idx) {
            if (item.text == "其他") {
              sHtml += _this.otherItem(firstTop, left, item.data.b);
            } else if (item.text == "离开网站") {
              sHtml += _this.exitItem(firstTop, left, item.data.d);
            } else if (item.text == "没有数据") {
              sHtml += _this.noneItem(firstTop, left);
            } else if (level == 0) {
              sHtml += _this.normalItem2(
                firstTop,
                left,
                level + 1,
                item.text,
                item.url,
                item.data
              );
            } else {
              sHtml += _this.normalItem(
                firstTop,
                left,
                level + 1,
                item.text,
                item.url,
                item.data
              );
            }
            if (level != 1) {
              _this.svgPath[level].push([
                tleft + 180,
                top + 56 / 2,
                left,
                firstTop + 56 / 2
              ]);
            }
            firstTop += 66;
          });
          if (!dom) {
            sHtml += "</div>";
            html.innerHTML = html.innerHTML + sHtml;
          } else {
            dom.innerHTML = sHtml;
          }
          //render svg
          _this.renderSvg();
        };
        if (level <= 1) {
          tFun(data);
        }
        if (level == 2) {
          data = _this.DATA_2;
          tFun(data);
        }
        if (level > 2) {
          // var date = G.fixSelectDate($("#path_time").val());
          var dgurl = _this.url;

          if (dgurl == "") {
            return;
          }

          _this.getNextData(
            {
              rootUrl: dgurl,
              curUrl: curUrl,
              lastUrl: lastUrl,
              step: level - 1
            },
            function(data) {
              var model1 = data.model.flowList;
              var data1 = [];

              if (model1.length == 0) {
                data1 = [
                  {
                    text: "没有数据",
                    url: "没有数据"
                  }
                ];
              } else {
                model1.forEach(function(one, idx) {
                  data1.push({
                    text: one.curUrl,
                    url: one.curUrl,
                    data: {
                      a: one.nextUrlPv,
                      b: (one.nextRatio * 1.0 * 100).toFixed(2) + "%",
                      c: one.pvTotal,
                      d: (one.exitRatio * 1.0 * 100).toFixed(2) + "%",
                      curUrl: one.curUrl,
                      lastUrl: one.lastUrl
                    }
                  });
                });
              }
              data = data1;
              tFun(data);
              var totalWidth = $("#drawing").width();
              var leftWidth = totalWidth - 1000;
              $("#Accept_rateChart").animate({ scrollLeft: leftWidth });
            }
          );
        }
      };
    },
    async getRootUrl() {
      try {
        let data = await queryRootUrls({ appSource: this.appSource });
        if (data.success) {
          this.options = data.model;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.$refs.Alert.showError();
      }
    },

    async getRootData() {
      try {
        if (!this.checkParams()) return;
        let data = await appFirstSiteAnalysis({
          bizdate: this.formatedDate,
          rootUrl: this.url,
          step: 1
        });
        // console.log(data);
        if (!data.success) {
          $("#drawing").hide();
          return;
        } else {
          $("#drawing").show();
        }

        if (data.success) {
          data = data.model;
          if (data == undefined || data.length == 0) {
            $("#drawing").hide();
            return;
          } else {
            $("#drawing").show();
          }
          var model0 = data[0].flowList;
          var data0 = [];
          model0.forEach(function(one, idx) {
            data0.push({
              text: one.curUrl,
              url: one.curUrl,
              data: {
                a: one.lastUrlPv,
                b: (one.nextRatio * 1.0 * 100).toFixed(2) + "%",
                c: "--",
                d: "--"
              }
            });
          });
          this.initA(data0);

          var model1 = data[1].flowList;
          var data1 = [];
          model1.forEach(function(one, idx) {
            data1.push({
              text: one.curUrl,
              url: one.curUrl,
              data: {
                a: "--",
                b: "--",
                c: one.pvTotal,
                d: (one.exitRatio * 1.0 * 100).toFixed(2) + "%"
              }
            });
          });
          this.init(data1);
          var model2 = data[2].flowList;
          var data2 = [];
          model2.forEach(function(one, idx) {
            data2.push({
              text: one.curUrl,
              url: one.curUrl,
              data: {
                a: one.nextUrlPv,
                b: (one.nextRatio * 1.0 * 100).toFixed(2) + "%",
                c: one.pvTotal,
                d: (one.exitRatio * 1.0 * 100).toFixed(2) + "%",
                curUrl: one.curUrl,
                lastUrl: one.lastUrl
              }
            });
          });
          this.DATA_2 = data2;
          showNext(this, 0, 300, 2, null, "undefined", "undefined");
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        console.log(error);
        this.$refs.Alert.showError();
      }
    },

    async getNextData(
      urls = {
        rootUrl: "",
        curUrl: "",
        lastUrl: "",
        step: ""
      },
      callback
    ) {
      try {
        if (!this.checkParams()) return;
        let data = await appNextSiteAnalysis({
          bizdate: this.formatedDate,
          rootUrl: urls.rootUrl,
          curUrl: urls.curUrl,
          lastUrl: urls.lastUrl,
          step: urls.step
        });
        // console.log(data);
        if (data.success) {
          typeof callback === "function" && callback.call(this, data);
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        console.log(error);
        this.$refs.Alert.showError();
      }
    },

    checkParams() {
      if (!this.url) {
        this.$refs.Alert.resetTxts({
          warnTit: "错误",
          warnTxt: "请先选择URL！"
        });
        this.$refs.Alert.showWarn();
        return false;
      }

      if (!this.dateTime) {
        this.$refs.Alert.resetTxts({
          warnTit: "错误",
          warnTxt: "请先选择时间！"
        });
        this.$refs.Alert.showWarn();
        return false;
      }

      return true;
    },

    normalItem(top, left, level, text, url, data) {
      if (url) {
        if (url.indexOf("http:") == 0 || url.indexOf("https:") == 0) {
        } else {
          url = "http://" + url;
        }
      }
      text = this.limitText(text);
      var sHtml =
        '<div class="item _level_' +
        level +
        '" style="top:' +
        top +
        "px;left:" +
        left +
        'px;"><a href="' +
        url +
        '" title="' +
        url +
        '" target="_blank"><span>' +
        text +
        '</span></a><div class="hoverdom"><div class="before"></div>' +
        '<div class="main"><div>带去浏览量:&nbsp;<b>' +
        data.a +
        "</b></div><div>占比:&nbsp;" +
        data.b +
        "</div><div>浏览量:&nbsp;<b>" +
        data.c +
        "</b></div>" +
        "<div>退出率:&nbsp;<b>" +
        data.d +
        "</b></div>" +
        '</div></div><div class="hoverdom2"><a href="javascript:void(0)"' +
        ' onclick="showNext(this,' +
        (top - 100) +
        "," +
        left +
        "," +
        level +
        ",null,'" +
        data.curUrl +
        "','" +
        data.lastUrl +
        "')\">&gt;</a></div></div>";
      return sHtml;
    },

    normalItem2(top, left, level, text, url, data) {
      if (url) {
        if (url.indexOf("http:") == 0 || url.indexOf("https:") == 0) {
        } else {
          url = "http://" + url;
        }
      }
      text = this.limitText(text);
      var sHtml =
        '<div class="item _level_' +
        level +
        '" style="top:' +
        top +
        "px;left:" +
        left +
        'px;"><a href="' +
        url +
        '" title="' +
        url +
        '" target="_blank"><span>' +
        text +
        '</span></a><div class="hoverdom"><div class="before"></div>' +
        '<div class="main"><div>带去浏览量:&nbsp;<b>' +
        data.a +
        "</b></div><div>占比:&nbsp;<b>" +
        data.b +
        "</b></div><div>浏览量:&nbsp;<b>" +
        data.c +
        "</b></div>" +
        "<div>退出率:&nbsp;<b>" +
        data.d +
        "</b></div>" +
        '</div></div><div class="hoverdom2"></div></div>';
      return sHtml;
    },

    exitItem(top, left, percent) {
      var sHtml =
        '<div class="item2" style="top:' +
        top +
        "px;left:" +
        left +
        'px;"><div class="a1">离开网站</div><div class="a2"><span>退出率</span>&nbsp;&nbsp;<span>' +
        percent +
        "</span></div></div>";
      return sHtml;
    },
    otherItem(top, left, percent) {
      var sHtml =
        '<div class="item2" style="top:' +
        top +
        "px;left:" +
        left +
        'px;"><div class="a1">其他</div><div class="a2"><span>占比</span>&nbsp;&nbsp;<span>' +
        percent +
        "</span></div></div>";
      return sHtml;
    },

    noneItem(top, left) {
      var sHtml =
        '<div class="item2" style="top:' +
        top +
        "px;left:" +
        left +
        'px;"><div class="a1">没有数据</div><div class="a2"><span></span>&nbsp;&nbsp;<span></span></div></div>';
      return sHtml;
    },

    limitText(text) {
      var _LIMIT_LEN = 60;
      if (!text) text = "";
      return text.substr(0, _LIMIT_LEN);
    },

    drawLine(x, y, x1, y1) {
      var sHtml =
        '<path fill="#daecff" stroke="#000000" d="M' +
        x +
        " " +
        y +
        " L" +
        x1 +
        "," +
        y1 +
        " V" +
        (x1 + 10) +
        " " +
        (y1 + 10) +
        " L" +
        x +
        " " +
        y +
        ' Z" stroke-width="0" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);position:absolute"></path>';
      var base = x - 0;
      x = 0;
      y = y - base;
      x1 = x1 - base;
      y1 = y1 - base;
      sHtml =
        '<path d="M ' +
        (x + base) +
        "," +
        (y + base) +
        " Q " +
        ((x1 - x) * 0.3 + base) +
        "," +
        (y + base) +
        " " +
        ((x + x1) / 2 + base) +
        "," +
        ((y + y1) / 2 + base) +
        " T " +
        (x1 + base) +
        "," +
        (y1 + base) +
        '" stroke="#ccc" fill="none" style="-webkit-tap-highlight-color: #ccc;position:absolute"></path>';
      return sHtml;
    },
    drawLine2(x1, y, x, y1) {
      var sHtml =
        '<path fill="#daecff" stroke="#000" d="M' +
        x +
        " " +
        y +
        " L" +
        x1 +
        "," +
        y1 +
        " V" +
        (x1 + 10) +
        " " +
        (y1 + 10) +
        " L" +
        x +
        " " +
        y +
        ' Z" stroke-width="0" style="-webkit-tap-highlight-color: #000;position:absolute"></path>';
      var base = x - 0;
      x = 0;
      y = y - base;
      x1 = x1 - base;
      y1 = y1 - base;
      sHtml =
        '<path d="M ' +
        (x + base) +
        "," +
        (y + base) +
        " Q " +
        ((x1 - x) * 0.3 + base) +
        "," +
        (y + base) +
        " " +
        ((x + x1) / 2 + base) +
        "," +
        ((y + y1) / 2 + base) +
        " T " +
        (x1 + base) +
        "," +
        (y1 + base) +
        '" stroke="#ccc" fill="none" style="-webkit-tap-highlight-color: #ccc;position:absolute"></path>';
      return sHtml;
    },

    renderSvg() {
      var maxRight = 0;
      var maxHeight = 0;
      var gHtml = "";
      var _this = this;
      this.svgPath.forEach(function(item, idx) {
        if (idx == 0) {
          item.forEach(function(ditem, didx) {
            if (ditem[2] > maxRight) {
              maxRight = ditem[2];
            }
            if (ditem[3] > maxHeight) {
              maxHeight = ditem[3];
            }
            gHtml += _this.drawLine2(
              ditem[0] + 300,
              ditem[1] + 100,
              ditem[2] + 300,
              ditem[3]
            );
          });
        } else {
          item.forEach(function(ditem, didx) {
            if (ditem[2] > maxRight) {
              maxRight = ditem[2];
            }
            if (ditem[3] > maxHeight) {
              maxHeight = ditem[3];
            }
            gHtml += _this.drawLine(
              ditem[0],
              ditem[1] + 100,
              ditem[2],
              ditem[3]
            );
          });
        }
      });
      $("#svg").html(gHtml);
      $("#drawing").width(maxRight + 210);
      $("#drawing").height(maxHeight + 90 + 56 / 2);
    },

    initA(data) {
      showNext("", 0, -300, 0, data);
    },
    init(data) {
      showNext("", 100, 3, 1, data);
    },

    goDownload() {
      let url = `/asm/flow_updown_url/export.json?rootUrl=${this
        .url}&bizdate=${this.formatedDate}`;

      Download(url);
    }
  },
  components: {
    alertBox,
    download
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.urlSelect {
  width: 400px;
}

.urlSelect .el-input__inner {
  width: 100%;
}

.drawing {
  font-size: 12px;
  width: 100%;
  height: 100%;
}

.item {
  height: 50px;
  width: 175px;
  position: absolute;
  border-radius: 2px;
  text-align: left;
}

._item_0 .item {
  background: #fff4dc;
  box-shadow: 0 2px 4px 0 rgba(192, 168, 102, 0.5);
}

._item_1 .item {
  background: #5399ef;
  border: 1px solid #5399ef;
  border-radius: 2px;
}

._item_2 .item {
  background: #caddf5;
  border-radius: 2px;
}

._item_0 .item a {
  background: #fff4dc;
  color: #666666;
}

._item_0 .item a {
  color: #666666;
}

._item_1 .item a {
  color: #fff;
}

._item_2 .item a {
  color: #666666;
}

.item a {
  text-decoration: none;
  display: block;
  height: 50px;
  width: 158px;
  float: left;
  font-size: 12px;
  overflow: hidden;
}

.item a span {
  display: inline-block;
  margin: 7px;
  width: 146px;
  word-wrap: break-word;
  /*text-shadow: 1px 1px 1px #eee;*/
  line-height: 14px;
}

.item .hoverdom {
  display: none;
}

.item:hover .hoverdom {
  display: block;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(79, 127, 242, 0.5);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  width: 125px;
  position: absolute;
  top: -30px;
  left: -135px;
  z-index: 99;
  padding: 12px;
}

.item:hover .hoverdom .main {
  text-align: left;
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
  color: #7f9db9;
  font-size: 10px;
}

.item:hover .hoverdom .main > div b {
  font-family: "Arial-BoldMT";
  font-size: 12px;
  color: #233f00;
  line-height: 18px;
}

.item:hover .hoverdom .before {
  height: 10px;
  width: 10px;
  position: absolute;
  top: 50%;
  right: -10px;
  margin-top: -7px;
  background: url("../../img/ss.png") no-repeat;
  background-size: 10px 11px;
}

.item .hoverdom2 {
  display: none;
}

.item:hover .hoverdom2 {
  display: block;
  float: right;
  height: 50px;
  width: 15px;
}

.item:hover .hoverdom2 a {
  height: 48px;
  width: 15px;
  background: #5399ef;
  text-align: center;
  display: block;
  line-height: 50px;
  color: #fff;
  text-decoration: none;
}
/****/
.item2 {
  background: #e9e9e9;
  border-radius: 2px;
  height: 50px;
  width: 175px;
  text-align: left;
  position: absolute;
}

.item2 .a1 {
  font-size: 12px;
  margin-top: 10px;
  margin-left: 7px;
  color: #666666;
}

.item2 .a2 {
  font-size: 10px;
  margin-left: 7px;
  color: #666666;
}
/*****/
.item3 {
  background: #f5f7f7;
  height: 56px;
  width: 175px;
  text-align: center;
  position: absolute;
}

.item3 .a1 {
  color: #878f99;
  font-size: 14px;
  font-weight: bold;
  margin: 12px 8px 5px;
}

.item3 .a2 {
  color: #8ba9c5;
  font-size: 12px;
  text-align: center;
}

.clear {
  clear: both;
}

.ontimeChartContent {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb:vertical {
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(129, 129, 129, 0.5);
  }
}
</style>
