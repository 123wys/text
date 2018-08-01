<template>
  <div id="trendZaWeb">
    <div class="top">
      <div class="g-title">流量趋势</div>
      <div class="block">
        <span class="dateChoose">日期选择</span>
        <el-date-picker v-model="value" @change="getDate" size="small" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:330px;width:49.5%;">
        <p class="g-block-title">页面浏览量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="graph-a-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:330px;width:49.5%;">
        <p class="g-block-title">访问用户量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="graph-b-main"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div style="margin-top:20px;">
      <div class="g-block" style="height:330px;width:49.5%;">
        <p class="g-block-title">网站访问量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="graph-c-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:330px;width:49.5%;">
        <p class="g-block-title">新访问用户量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-d-x"></p>
            <p id="graph-d-v"></p>
          </div>
          <div class="graph" id="graph-d-main"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div style="margin-top:20px;">
      <div class="g-block" style="height:330px;width:49.5%;">
        <p class="g-block-title">每次会话浏览页数</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-e-x"></p>
            <p id="graph-e-v"></p>
          </div>
          <div class="graph" id="graph-e-main"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="top">
      <div class="g-title">TOP页面</div>
      <div class="chooseDate">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="value1" @change="getDate1" size="small" type="date">
        </el-date-picker>
        <span class="choose" v-for="(item, index) in date" @click="changeTable1Frep(index,item.id)" v-bind:class="{ active: chooseIndex == index }">{{item.time}}</span>
        <span class="download" @click="goDownloadTwo" style="margin-left: 30px;">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
      <!--<div class="block">-->
      <!--<span class="dateChoose">日期选择</span>-->
      <!--<el-date-picker v-model="value1" @change="getDate1" size="small" type="date">-->
      <!--</el-date-picker>-->
      <!--<span class="dateChoose" @click="changeTable1Frep(1)" style="cursor:pointer">昨日</span>-->
      <!--<span class="dateChoose" @click="changeTable1Frep(7)" style="cursor:pointer">近7日</span>-->
      <!--<span class="dateChoose" @click="changeTable1Frep(30)" style="cursor:pointer">近30日</span>-->
      <!--</div>-->
    </div>
    <div>
      <div class="g-block" style="height:auto;width:49.5%;">
        <p class="g-block-title">受访页面Top10</p>
        <div style="padding:12px 10px 10px 10px">
          <table class="g-xflow-table">
            <thead>
              <tr>
                <th width="50%">受访页面</th>
                <th width="25%">页面浏览量</th>
                <th width="25%">占比</th>
              </tr>
            </thead>
            <tbody id="Totaltrend_table"></tbody>
          </table>
        </div>
      </div>
      <div class="g-block ml10" style="height:auto;width:49.5%;">
        <p class="g-block-title">入口页面Top10</p>
        <div style="padding:12px 10px 10px  10px">
          <table class="g-xflow-table">
            <thead>
              <tr>
                <th width="50%">入口页面</th>
                <th width="25%">页面浏览量</th>
                <th width="25%">占比</th>
              </tr>
            </thead>
            <tbody id="TotalTrend"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="g-title">页面分析</div>
      <div class="block">
        <span class="dateChoose">日期选择</span>
        <el-date-picker v-model="value2" @change="getDate2" size="small" type="daterange">
        </el-date-picker>
        <span class="download" @click="goDownloadThree">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:auto;width:100%;">
        <p class="g-block-title">页面概览</p>
        <div style="padding:12px 10px 10px  10px">
          <table class="g-xflow-table">
            <thead>
              <tr>
                <th width="10%">日期</th>
                <th width="20%">页面URL</th>
                <th width="10%">页面浏览量</th>
                <th width="10%">用户访问量</th>
                <th width="10%">贡献下游流量</th>
                <th width="10%">入口页次数</th>
                <th width="10%">退出页次数</th>
                <th width="10%">平均停留时长</th>
                <th width="10%">退出率</th>
              </tr>
            </thead>
            <tbody style="display: none;" v-show="list.length">
              <tr v-for="(item,$index) in list">
                <td v-bind:title="item.bizdate"> {{ item.bizdate }}</td>
                <td v-bind:title="item.url"> {{ item.url}}</td>
                <td v-bind:title="item.pv"> {{ doThousands(item.pv) }}</td>
                <td v-bind:title="item.uv"> {{ doThousands(item.uv) }}</td>
                <td v-bind:title="item.pv_down"> {{ doThousands(item.pv_down) }}</td>
                <td v-bind:title="item.en_url_uv"> {{ doThousands(item.en_url_uv) }}</td>
                <td v-bind:title="item.exit_pv"> {{ doThousands(item.exit_pv) }}</td>
                <td v-bind:title="item.loadtime"> {{ item.loadtime }}</td>
                <td v-bind:title="item.exit_rate"> {{ item.exit_rate }}</td>
              </tr>
            </tbody>
          </table>

          <el-pagination @size-change="changePageSize" @current-change="pageGoTo" :current-page="pageGO" :page-sizes="pageSizeList" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:auto;width:100%;">
        <p class="g-block-title">域名概览</p>
        <div style="padding:12px 10px 10px  10px">
          <table class="g-xflow-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>域名</th>
                <th>页面浏览量</th>
                <th>用户访问量</th>
                <th>平均停留时长</th>
                <th>退出率</th>
              </tr>
            </thead>
            <tbody id="loadTimeTable_data3" style="display: none;" v-show="list.length">
              <tr v-for="(item,$index) in list2">
                <td v-bind:title="item.bizdate"> {{ item.bizdate }}</td>
                <td v-bind:title="item.host"> {{ item.host}}</td>
                <td v-bind:title="item.pv"> {{ doThousands(item.pv)}}</td>
                <td v-bind:title="item.uv"> {{ doThousands(item.uv) }}</td>
                <td v-bind:title="item.loadTime"> {{ item.loadtime }}</td>
                <td v-bind:title="item.exitRate"> {{ item.exit_rate }}</td>
              </tr>
            </tbody>

          </table>
          <el-pagination @size-change="changePageSize2" @current-change="pageGoTo2" :current-page="pageGO2" :page-sizes="pageSizeList2" :page-size="pageSize2" layout="sizes,total,jumper, next, pager, prev" :total="total2">
          </el-pagination>

        </div>
      </div>
      <div class="clear"></div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import { webTrendAnalysis } from "../../../../service/getData";
import download from "../../svg/download";
import { Download, toThousands } from "../../../../config/mUtils";
import { formatDate } from "../../../../config/mUtils";
let Gajax = function(ob, cachekey, errorFun, errorSkip) {
  //ob.url =  ob.url;
  ob.url = "" + ob.url;
  if (cachekey && store.get(cachekey)) {
    ob.success(store.get(cachekey));
    return;
  }
  if (typeof ob.error != "function") {
    ob.error = function() {
      // alert('系统错误');
    };
  }
  var tsuccessFn = ob.success;
  var tfailureFn = ob.failure;
  ob.success = function(data) {
    if (typeof data == "string") {
      data = JSON.parse(data);
    }
    if (data.code == -1) {
      window.location.reload();
      return;
    }
    if (errorSkip == true) {
      return;
    }
    if (!data.success) {
      if (tfailureFn != undefined) tfailureFn(data);
      // alert(data.message);
      return;
    }
    tsuccessFn(data, data);
    if (cachekey && typeof cachekey === "string") {
      store.set(cachekey, data);
    }
  };
  ob.type = "POST";
  $.ajax(ob);
};

let parseDate = function(longtime, f) {
  if (!longtime) {
    return "";
  }
  var dd = new Date(longtime);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  var h = dd.getHours();
  var i = dd.getMinutes();
  var s = dd.getSeconds();
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  if (h < 10) h = "0" + h;
  if (i < 10) i = "0" + i;
  if (s < 10) s = "0" + s;
  if (f == 1) {
    return y + "-" + m + "-" + d;
  }
  return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
};

export default {
  name: "trendZaWeb",
  data() {
    return {
      table1Frep: 1,
      freq: 1,
      list: [],
      pageNumber: 1,
      pageSize: 10,
      pageSizeList: [10, 20, 50],
      pageGO: 1,
      total: 0,
      date: [
        { time: "昨日", id: 1 },
        { time: "近7日", id: 7 },
        { time: "近30日", id: 30 }
      ],
      chooseIndex: 0,
      list2: [],
      pageNumber2: 1,
      pageSize2: 10,
      pageSizeList2: [10, 20, 50],
      pageGO2: 1,
      total2: 0,
      value: [
        new Date(new Date() * 1 - 31 * 24 * 3600 * 1000),
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)
      ],
      value1: new Date(new Date() * 1 - 1 * 24 * 3600 * 1000),
      value2: [
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000),
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)
      ]
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"])
  },
  mounted() {
    this.$nextTick(function() {
      $(".Usermap_choose").click(function() {
        $(".Usermap_choose").removeClass("Usermap_typeAct");
        $(this).addClass("Usermap_typeAct");
        pageAnalysis();
        getOverview();
        getUrl();
        enterPages();
      });
      this.renderAll();
    });
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      this.renderAll();
    }
  },
  methods: {
    changeTable1Frep(index, id) {
      this.chooseIndex = index;
      this.table1Frep = id;
      this.renderTable1();
    },
    /*****Top10 */
    renderTable1() {
      var endDate = this.value1;
      var source = this.appSource;
      var freq = this.table1Frep;
      Gajax({
        url: "/overview/web_situation/web_page_analysis.json",
        data: { bizdate: formatDate(endDate), source: source, freq: freq },
        cache: false,
        success: function(data) {
          if (data.success) {
            var shtml = "";
            $.each(data.model, function(idx, one) {
              shtml =
                shtml +
                '<tr role="row" class="odd"><td class="table_left" title="' +
                one.url +
                '">' +
                one.url +
                "</td><td>" +
                toThousands(one.pv) +
                "</td><td>" +
                one.prop +
                "</td></tr>";
            });
            $("#Totaltrend_table").html(shtml);
          }
        }
      });

      Gajax({
        url: "/overview/web_situation/entr_page_analysis.json",
        data: { bizdate: formatDate(endDate), source: source, freq: freq },
        cache: false,
        success: function(data) {
          if (data.success) {
            var shtml = "";
            $.each(data.model, function(idx, one) {
              shtml =
                shtml +
                '<tr role="row" class="odd"><td class="table_left" title="' +
                one.url +
                '">' +
                one.url +
                "</td><td>" +
                toThousands(one.enUrlPv) +
                "</td><td>" +
                one.prop +
                "</td></tr>";
            });
            $("#TotalTrend").html(shtml);
          }
        }
      });
    },
    getOverview() {
      let that = this;
      Gajax({
        url: "/overview/web_situation/web_overview_analysis.json",
        data: {
          appSource: that.appSource,
          freq: that.freq,
          startDate: formatDate(that.value2[0]),
          endDate: formatDate(that.value2[1]),
          pageNumber: that.pageNumber,
          pageSize: that.pageSize
        },
        cache: false,
        success: function(data) {
          if (data.success) {
            that.list = data.model.rows;
            that.total = data.model.total;
          }
        }
      });
    },
    getUrl() {
      let that = this;
      Gajax({
        url: "/overview/web_situation/web_host_analysis.json",
        data: {
          appSource: that.appSource,
          startDate: formatDate(that.value2[0]),
          endDate: formatDate(that.value2[1]),
          pageNumber: that.pageNumber2,
          pageSize: that.pageSize2
        },
        cache: false,
        success: function(data) {
          if (data.success) {
            that.list2 = data.model.rows;
            that.total2 = data.model.total;
          }
        }
      });
    },

    doThousands(item) {
      return toThousands(item);
    },
    getOnTime: function() {
      let that = this;
      this.initParam();
      this.initParam2();
      getOverview();
      getUrl();
    },
    initParam: function() {
      this.list = [];
      this.pageNumber = 1;
      this.pageSize = 10;
      this.pageGO = 1;
    },
    pageGoTo: function(v) {
      this.pageNumber = v;
      this.getOverview();
    },
    changePageSize: function(v) {
      this.pageSize = v;
      this.pageNumber = 1;
      this.getOverview();
    },
    goDownload: function() {
      let that = this;
      let startDate = formatDate(that.value[0]);
      let endDate = formatDate(that.value[1]);
      let url = `/overview/web_situation/web_trend_situation_export.json?startDate=${startDate}&endDate=${endDate}&source=${that.appSource}`;
      Download(url);
    },
    goDownloadThree: function() {
      let that = this;
      let startDate = formatDate(that.value2[0]);
      let endDate = formatDate(that.value2[1]);
      let url = `/overview/web_situation/web_overview_analysis_export.json?startDate=${startDate}&endDate=${endDate}&appSource=${that.appSource}&freq=${that.table1Frep}`;
      Download(url);
    },
    initParam2: function() {
      this.list2 = [];
      this.pageNumber2 = 1;
      this.pageSize2 = 10;
      this.pageGO2 = 1;
    },
    pageGoTo2: function(v) {
      this.pageNumber2 = v;
      this.getUrl();
    },
    changePageSize2: function(v) {
      this.pageSize2 = v;
      this.pageNumber2 = 1;
      this.getUrl();
    },
    goDownloadTwo: function() {
      let that = this;
      let biedate = formatDate(this.value1);
      let url = `/overview/web_situation/web_page_analysis_export.json?bizdate=${biedate}&source=${that.appSource}&freq=${that.table1Frep}`;
      Download(url);
    },
    getDate() {
      this.render5Graph();
    },
    getDate1() {
      this.renderTable1();
    },
    getDate2() {
      this.renderTable2();
    },
    renderAll() {
      this.render5Graph();
      // 页面分析
      this.renderTable2();
      //Top10
      this.renderTable1();
    },
    renderTable2() {
      this.getOverview();
      this.getUrl();
    },
    render5Graph() {
      let that = this;
      webTrendAnalysis({
        startDate: formatDate(this.value[0]),
        endDate: formatDate(this.value[1]),
        source: this.appSource
      })
        .then(data => {
          if (data.success) {
            var newData1 = [];
            var newData2 = [];
            var newData3 = [];
            var newData4 = [];
            var newData5 = [];

            var bizDate = [];
            $.each(data.model, function(idx, one) {
              newData1.push(one.pv); //页面浏览量
              newData2.push(one.uv); //网站访问量
              newData3.push(one.pvWeb); //访问用户量
              newData4.push(one.uvNew); //新用户访问量
              newData5.push(one.pvSid);
              bizDate.push(one.bizDate);
            });
            that.pageCharts1(newData1, bizDate);
            that.pageCharts2(newData2, bizDate);
            that.pageCharts3(newData3, bizDate);
            that.pageCharts4(newData4, bizDate);
            that.pageCharts5(newData5, bizDate);
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    pageCharts1(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("graph-a-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-a-x").text(
              data[0].axisValue.substring(0, 4) +
                "." +
                data[0].axisValue.substring(4, 6) +
                "." +
                data[0].axisValue.substring(6.8)
            );
            $("#graph-a-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">PV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          data: ["PV"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: bizDate,
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            interval: dataNumber
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "80px",
          bottom: "0%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            type: "dashed"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "PV",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },
    pageCharts2(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("graph-b-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-b-x").text(data[0].axisValue);
            $("#graph-b-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">UV:' +
                data[0].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          data: ["UV"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: bizDate,
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            interval: dataNumber
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "80px",
          bottom: "0%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            type: "dashed"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "UV",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },
    pageCharts3(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("graph-c-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-c-x").text(
              data[0].axisValue.substring(0, 4) +
                "." +
                data[0].axisValue.substring(4, 6) +
                "." +
                data[0].axisValue.substring(6.8)
            );
            $("#graph-c-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">pvWeb:' +
                data[0].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["pvWeb"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: bizDate,
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            interval: dataNumber
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "80px",
          bottom: "0%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "pvWeb",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },
    pageCharts4(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("graph-d-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-d-x").text(
              data[0].axisValue.substring(0, 4) +
                "." +
                data[0].axisValue.substring(4, 6) +
                "." +
                data[0].axisValue.substring(6.8)
            );
            $("#graph-d-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">uvNew:' +
                data[0].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["uvNew"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: bizDate,
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            interval: dataNumber
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "80px",
          bottom: "0%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "uvNew",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },
    pageCharts5(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("graph-e-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-e-x").text(data[0].axisValue);
            $("#graph-e-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">pvSid:' +
                data[0].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["pvSid"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: bizDate,
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            interval: dataNumber
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "80px",
          bottom: "0%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "pvSid",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },
    renderTable() {
      let that = this;
      function getRatio(f, s) {
        if (s == undefined || f == undefined || s == 0) return "--";
        return ((f / s - 1) * 100).toFixed(2);
      }
      function getClsByRatio(ratio) {
        if (ratio == undefined || ratio == "--") return "";
        return ratio > 0 ? "text-up" : "text-down";
      }

      webPeriodStatistic({
        datecnt: 1,
        source: this.appSource
      })
        .then(data => {
          if (data.success) {
            var page_pv = []; //页面浏览量
            var user_uv = []; //访问用户量
            var total_pv = []; //访问量
            var Constrastpage_pv = [];
            var Constrastuser_uv = [];
            var Constrasttotal_pv = [];
            var todaySummary = { pv: 0, uv: 0, pv_web: 0, uv_new: 0 };
            var yesterdaySummary = { pv: 0, uv: 0, pv_web: 0, uv_new: 0 };

            $.each(data.model.today, function(idx, one) {
              page_pv.push(one.pv);
              user_uv.push(one.uv);
              total_pv.push(one.pv_web);
              todaySummary.pv += one.pv;
              todaySummary.uv += one.uv;
              todaySummary.pv_web += one.pv_web;
              todaySummary.uv_new += one.uv_new;
            });
            $.each(data.model.yesterday, function(idx, one) {
              Constrastpage_pv.push(one.pv);
              Constrastuser_uv.push(one.uv);
              Constrasttotal_pv.push(one.pv_web);
              yesterdaySummary.pv += one.pv;
              yesterdaySummary.uv += one.uv;
              yesterdaySummary.pv_web += one.pv_web;
              yesterdaySummary.uv_new += one.uv_new;
            });

            that.page_pv = page_pv;
            that.user_uv = user_uv;
            that.total_pv = total_pv;
            that.Constrastpage_pv = Constrastpage_pv;
            that.Constrastuser_uv = Constrastuser_uv;
            that.Constrasttotal_pv = Constrasttotal_pv;
            that.todaySummary = todaySummary;
            that.yesterdaySummary = yesterdaySummary;

            var Tshtml =
              "<tr><td>今日</td><td>" +
              todaySummary.pv +
              "</td><td>" +
              todaySummary.uv +
              "</td><td>" +
              todaySummary.pv_web +
              "</td><td>" +
              todaySummary.uv_new +
              "</td></tr>";
            var Yshtml =
              "<tr><td>昨日</td><td>" +
              yesterdaySummary.pv +
              "</td><td>" +
              yesterdaySummary.uv +
              "</td><td>" +
              yesterdaySummary.pv_web +
              "</td><td>" +
              yesterdaySummary.uv_new +
              "</td></tr>";
            var ratio = {};
            ratio.pv = getRatio(todaySummary.pv, yesterdaySummary.pv);
            ratio.uv = getRatio(todaySummary.uv, yesterdaySummary.uv);
            ratio.pv_web = getRatio(
              todaySummary.pv_web,
              yesterdaySummary.pv_web
            );
            ratio.uv_new = getRatio(
              todaySummary.uv_new,
              yesterdaySummary.uv_new
            );
            var Rshtml =
              "<tr><td>环比</td><td class='" +
              getClsByRatio(ratio.pv) +
              "'>" +
              ratio.pv +
              "%</td><td class='" +
              getClsByRatio(ratio.uv) +
              "'>" +
              ratio.uv +
              "%</td><td class='" +
              getClsByRatio(ratio.pv_web) +
              "'>" +
              ratio.pv_web +
              "%</td><td class='" +
              getClsByRatio(ratio.uv_new) +
              "'>" +
              ratio.uv_new +
              "%</td></tr>";
            var Total = Tshtml + Yshtml + Rshtml;
            $("#ontime_table").html(Total);

            //that.renderGraphA();
            // that.renderGraphB();
            // that.renderGraphC();
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    renderGraphA() {
      let that = this;
      var myChart = echarts.init(document.getElementById("graph-a-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-a-x").text(data[0].axisValue);
            $("#graph-a-v").html(
              '<span class="l" color="' +
                data[0].color +
                '">UV:' +
                data[0].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["当前", "昨日"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
          ],
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            align: "right"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "80",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "当前",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "dashed"
                }
              }
            },
            data: that.page_pv
          },
          {
            name: "昨日",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },

            data: that.dataYesterday
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphB() {
      let that = this;
      var myChart = echarts.init(document.getElementById("graph-b-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-b-x").text(data[0].axisValue);
            $("#graph-b-v").html(
              '<span class="l" color="' +
                data[0].color +
                '">当前:' +
                data[0].value +
                '</span><span class="r" color="' +
                data[1].color +
                '">昨日:' +
                data[1].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["当前", "昨日"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
          ],
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            align: "right"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "80",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "当前",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "dashed"
                }
              }
            },
            data: that.user_uv
          },
          {
            name: "昨日",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },

            data: that.Constrastuser_uv
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphC() {
      console.log("renderGraphC");
      let that = this;
      var myChart = echarts.init(document.getElementById("graph-c-main"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-c-x").text(data[0].axisValue);
            $("#graph-c-v").html(
              '<span class="l" color="' +
                data[0].color +
                '">当前:' +
                data[0].value +
                '</span><span class="r" color="' +
                data[1].color +
                '">昨日:' +
                data[1].value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["当前", "昨日"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
          ],
          axisLine: {
            lineStyle: {
              color: "#D8E1EB"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            align: "right"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "80",
          containLabel: true
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisLabel: {
            color: "#B2BBC5"
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "当前",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "dashed"
                }
              }
            },
            data: that.user_uv
          },
          {
            name: "昨日",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },

            data: that.Constrastuser_uv
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  components: {
    alertBox,
    download
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.bar-self {
  width: 70.8%;
  margin-top: 18px;
  margin: 0 auto;
  position: relative;
  .user-bg {
    width: 100%;
  }
  .graph {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 218px;
  }
  .number {
    position: absolute;
    top: 60%;
    left: 0;
    width: 100%;
    text-align: center;
    .l {
      font-size: 40px;
      color: #5693fb;
      letter-spacing: 0.01px;
    }
    .r {
      font-size: 12px;
      color: #232425;
    }
  }
  .reg {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    top: 56%;
    left: 0;
    transform: rotate(-35deg);
    > i {
      display: block;
      background: #5693fb;
      height: 38px;
      width: 38px;
      border-radius: 19px;
      border: 4px solid #fff;
    }
  }
}

.Usermap_type .Usermap_typeAct {
  color: #5282ef;
  opacity: 1;
}
</style>
