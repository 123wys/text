<template>
  <div>
    <div class="top">
      <div class="g-title">整体趋势</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="dateRange" @change="getDate" size="small" type="daterange">
        </el-date-picker>
        <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">激活用户</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="Totaltrend_content"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">注册用户</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="Totaltrendreg_content"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">活跃用户</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="Totaltrendact_content"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">启动次数</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-d-x"></p>
            <p id="graph-d-v"></p>
          </div>
          <div class="graph" id="Totaltrendopen_content"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="top">
      <div class="g-title">整体趋势明细</div>
    </div>
    <div class="g-block" style="width:100%;">
      <div class="top" style="padding: 10px;">
        <div></div>
        <!-- <div class="rightBlock">
          <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
        </div> -->
      </div>
      <div id="bigDataTable" style="padding: 10px;">
        <table class="g-xflow-table">
          <thead>
            <tr style="font-size: 14px;">
              <th>日期</th>
              <th>激活用户</th>
              <th>注册</th>
              <th>活跃用户</th>
              <th>启动次数</th>
              <th>累计激活数</th>
              <th>累计注册数</th>
            </tr>
          </thead>
          <tbody id="user_stay">

          </tbody>
        </table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
        <!--没有分页-->
      </div>
    </div>
    <div class="top">
      <div class="g-title">TOP
        <span class="currentDate">当期数据日期：{{currentDate}}</span>
      </div>
      <div class="chooseDate">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="value" type="date" size="small" @change="getDateTwo" placeholder="选择日期">
        </el-date-picker>
        <span class="choose" v-for="(item,index) in date" v-bind:class="{ active: chooseIndex == index }" @click="change(index,item.id)">{{item.time}}</span>
      </div>
    </div>
    <div class="g-block" style="height:360px;width:575px;">
      <p class="g-block-title">页面TOP10</p>
      <div class="g-block-graph" style="height:320px;margin-top:-21px">
        <div class="graph" id="Total_Topten"></div>
      </div>
    </div>
    <div class="g-block ml10" style="height:360px;width:575px;">
      <p class="g-block-title">活跃机型TOP10</p>
      <div class="g-block-graph" style="height:320px;margin-top:-21px">
        <div class="graph" id="Total_Toptype">
        </div>
      </div>
    </div>
    <div class="g-block" style="height:360px;width:575px;margin-top: 10px;">
      <p class="g-block-title">活跃渠道TOP10</p>
      <div class="g-block-graph" style="height:320px;margin-top:-21px">
        <div class="graph" id="Totlal_TopAct"></div>
      </div>
    </div>
    <div class="g-block ml10" style="height:360px;width:575px;margin-top: 10px;">
      <p class="g-block-title">注册渠道TOP10</p>
      <div class="g-block-graph" style="height:320px;margin-top:-21px">
        <div class="graph" id="Totlal_TopReg"></div>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { overallTrend, trendTop10 } from "../../../../service/getData";
import dateFormat from "dateFormat";
import alertBox from "../../../../components/common/alertBox/alertBox";
import download from "../../svg/download";
import { Download, toThousands } from "../../../../config/mUtils";
export default {
  name: "overtrend",
  data() {
    let startDate = new Date();
    startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
    return {
      dateRange: [startDate, new Date(new Date() - 1 * 24 * 3600 * 1000)],
      value: "",
      date: [
        { time: "昨日", id: 1 },
        { time: "近7日", id: 7 },
        { time: "近30日", id: 30 }
      ],
      datecnt: 1,
      currentDate: dateFormat(
        new Date(new Date() * 1 - 24 * 3600 * 1000),
        "yyyy-mm-dd"
      ),
      chooseIndex: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      newData: [],
      openData: [],
      regData: [],
      actData: [],
      bizDate: [],
      pagePV: [],
      pageUV: [],
      pageID: [],
      deviceModel: [],
      deviceX: [],
      actUsernum: [],
      actUserX: [],
      regUsernum: [],
      regX: []
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"])
  },
  mounted() {
    this.$nextTick(function() {
      this.renderAll();
    });
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      Object.assign(this.$data, this.$options.data()); //初始化data
      this.renderAll();
    }
  },
  methods: {
    getDate() {
      if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
        this.renderOverallTrend();
      }
    },
    handleSizeChange(v) {
      this.pageSize = v;
      var page = this.currentPage;
      var size = this.pageSize;
      var s = (page - 1) * size;
      var e = page * size - 1;
      $("#user_stay tr").hide();
      for (var i = s; i <= e; i++) {
        $("#user_stay")
          .find("tr")
          .eq(i)
          .show();
      }
    },
    handleCurrentChange(v) {
      this.currentPage = v;
      var page = this.currentPage;
      var size = this.pageSize;
      var s = (page - 1) * size;
      var e = page * size - 1;
      $("#user_stay tr").hide();
      for (var i = s; i <= e; i++) {
        $("#user_stay")
          .find("tr")
          .eq(i)
          .show();
      }
    },
    getDateTwo() {
      this.currentDate = dateFormat(this.value, "yyyy-mm-dd");
      this.renderTrendTop10();
    },
    goDownload() {
      var startDate = dateFormat(this.dateRange[0], "yyyymmdd");
      var endDate = dateFormat(this.dateRange[1], "yyyymmdd");
      let url = `/overview/overall_trend/overallTrendExport.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
        .appSource}&os=${this.headerTapOs}`;
      Download(url);
    },
    change(index, id) {
      this.chooseIndex = index;
      this.datecnt = id;
      this.renderTrendTop10();
    },
    renderAll() {
      this.renderOverallTrend();
      this.renderTrendTop10();
    },
    renderOverallTrend() {
      overallTrend({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRange[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.newData = [];
            that.openData = [];
            that.regData = [];
            that.actData = [];
            that.bizDate = [];
            var shtml = "";
            if (data.model.length == 0) {
              that.renderGraphA();
              that.renderGraphB();
              that.renderGraphC();
              that.renderGraphD();
              shtml = "";
              $("#user_stay").html(shtml);
            } else {
              data.model.forEach(one => {
                that.newData.push(one.newUsers);
                that.openData.push(one.openCnt);
                that.regData.push(one.regCnt);
                that.actData.push(one.actUsers);
                that.bizDate.push(one.bizdate);
                shtml =
                  '<tr role="row" style="display:none" class="odd"><td>' +
                  one.bizdate +
                  "</td><td>" +
                  toThousands(one.newUsers) +
                  "</td><td>" +
                  toThousands(one.regCnt) +
                  "</td><td>" +
                  toThousands(one.actUsers) +
                  "</td><td>" +
                  toThousands(one.openCnt) +
                  "</td><td>" +
                  toThousands(one.actAllUsers) +
                  "</td><td>" +
                  toThousands(one.regTotalCnt) +
                  "</td></tr>" +
                  shtml;
              });
              $("#user_stay").html(shtml);
              var page = this.currentPage;
              var size = this.pageSize;
              var s = (page - 1) * size;
              var e = page * size - 1;
              $("#user_stay tr").hide();
              for (var i = s; i <= e; i++) {
                $("#user_stay")
                  .find("tr")
                  .eq(i)
                  .show();
              }
              this.total = data.model.length;
              that.renderGraphA();
              that.renderGraphB();
              that.renderGraphC();
              that.renderGraphD();
            }
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    renderTrendTop10() {
      trendTop10({
        appSource: this.appSource,
        os: this.headerTapOs,
        bizdate: dateFormat(this.currentDate, "yyyymmdd"),
        datecnt: this.datecnt
        //          appSource: 'za',
        //          os: 'ios',
        //          bizdate: '20161226',
        //          datecnt: 7
      })
        .then(data => {
          if (data.success) {
            let that = this;
            that.pagePV = [];
            that.pageUV = [];
            that.pageID = [];
            that.actUsernum = [];
            that.actUserX = [];
            that.deviceModel = [];
            that.deviceX = [];
            that.regUsernum = [];
            that.regX = [];
            let os = this.headerTapOs;
            if (data.model.pageview.length != 0) {
              $.each(data.model.pageview, function(idx, one) {
                that.pagePV.unshift(one.pv);
                that.pageUV.unshift(one.uv);
                that.pageID.unshift(one.pageId);
              });
              that.totalTopten();
            } else {
              that.totalTopten();
            }
            if (data.model.deviceModel.length != 0) {
              $.each(data.model.deviceModel, function(idx, one) {
                that.deviceModel.unshift(one.num);
                that.deviceX.unshift(one.deviceModel);
              });
              that.TotalToptype();
            } else {
              that.TotalToptype();
            }
            if (data.model.actUser.length != 0) {
              $("#Totlal_TopAct")
                .parents(".g-block")
                .show();
              $.each(data.model.actUser, function(idx, one) {
                that.actUsernum.unshift(one.num);
                that.actUserX.push(one.channelId);
              });
            }
            that.TotlalTopAct();
            if (os == "ios") {
              $("#Totlal_TopAct")
                .parents(".g-block")
                .hide();
            } else {
              $("#Totlal_TopAct")
                .parents(".g-block")
                .show();
            }
            if (data.model.regUser.length != 0) {
              $("#Totlal_TopReg")
                .parents(".g-block")
                .show();
              $.each(data.model.regUser, function(idx, one) {
                that.regUsernum.unshift(one.num);
                that.regX.unshift(one.channelId);
              });
            }
            that.TotlalTopReg();
            if (os == "ios") {
              $("#Totlal_TopReg")
                .parents(".g-block")
                .hide();
            } else {
              $("#Totlal_TopAct")
                .parents(".g-block")
                .show();
            }
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    renderGraphA() {
      let that = this;
      var dataNumber = 1;
      if (that.bizDate != undefined) {
        if (that.bizDate.length <= 5) {
        } else if (that.bizDate.length > 5) {
          dataNumber = Math.ceil(that.bizDate.length / 5);
        }
      } else {
        return;
      }
      if (that.newData.length == 0) {
        $("#Totaltrend_content").removeAttr("_echarts_instance_");
        $("#Totaltrend_content").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(document.getElementById("Totaltrend_content"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        color: ["#5693FB"],
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
                '">UV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["UV"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.bizDate,
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
            name: "UV",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "solid"
                }
              }
            },
            data: that.newData
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphB() {
      let that = this;
      var dataNumber = 1;
      if (that.bizDate != undefined) {
        if (that.bizDate.length <= 5) {
        } else if (that.bizDate.length > 5) {
          dataNumber = Math.ceil(that.bizDate.length / 5);
        }
      } else {
        return;
      }
      if (that.regData.length == 0) {
        $("#Totaltrendreg_content").removeAttr("_echarts_instance_");
        $("#Totaltrendreg_content").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(
        document.getElementById("Totaltrendreg_content")
      );
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        color: ["#5693FB"],
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#graph-b-x").text(
              data[0].axisValue.substring(0, 4) +
                "." +
                data[0].axisValue.substring(4, 6) +
                "." +
                data[0].axisValue.substring(6.8)
            );
            $("#graph-b-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">UV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["UV"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.bizDate,
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
            name: "UV",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "solid"
                }
              }
            },
            data: that.regData
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphC() {
      let that = this;
      var dataNumber = 1;
      if (that.bizDate != undefined) {
        if (that.bizDate.length <= 5) {
        } else if (that.bizDate.length > 5) {
          dataNumber = Math.ceil(that.bizDate.length / 5);
        }
      } else {
        return;
      }
      if (that.actData.length == 0) {
        $("#Totaltrendact_content").removeAttr("_echarts_instance_");
        $("#Totaltrendact_content").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(
        document.getElementById("Totaltrendact_content")
      );
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        color: ["#5693FB"],
        tooltip: {
          trigger: "axis",
          showContent: true,
          formatter: function(data) {
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
                '">UV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["UV"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.bizDate,
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
            name: "UV",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "solid"
                }
              }
            },
            data: that.actData
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphD() {
      let that = this;
      var dataNumber = 1;
      if (that.bizDate != undefined) {
        if (that.bizDate.length <= 5) {
        } else if (that.bizDate.length > 5) {
          dataNumber = Math.ceil(that.bizDate.length / 5);
        }
      } else {
        return;
      }
      if (that.openData.length == 0) {
        $("#Totaltrendopen_content").removeAttr("_echarts_instance_");
        $("#Totaltrendopen_content").html(
          '<div class="g-nodata">暂无数据...</div>'
        );
        return;
      }
      let myChart = echarts.init(
        document.getElementById("Totaltrendopen_content")
      );
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        color: ["#5693FB"],
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
                '">PV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["PV"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.bizDate,
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
          left: "0",
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
            name: "PV",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "solid"
                }
              }
            },
            data: that.openData
          }
        ]
      };
      myChart.setOption(option);
    },
    totalTopten() {
      let that = this;
      if (!that.pagePV.length || !that.pageUV.length || !that.pageID.length) {
        $("#Total_Topten").removeAttr("_echarts_instance_");
        $("#Total_Topten").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(document.getElementById("Total_Topten"));
      var option = {
        title: {
          text: null,
          subtext: null
        },
        color: ["#4F7FF2", "#7CD500"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            {
              icon: "circle",
              name: "PV"
            },
            {
              icon: "circle",
              name: "UV"
            }
          ],
          right: "0",
          top: 0
        },
        grid: {
          left: "2%",
          right: "5%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#B2BBC5",
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#B2BBC5",
              type: "solid"
            }
          }
        },
        yAxis: {
          type: "category",
          data: that.pageID,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            formatter: function(c) {
              var strL = c.length;
              if (strL > 12) {
                var str = c.substr(strL - 12, 12);
              } else {
                var str = c;
              }
              return str;
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "PV",
            type: "bar",
            data: that.pagePV
          },
          {
            name: "UV",
            type: "bar",
            data: that.pageUV
          }
        ]
      };
      myChart.setOption(option);
    },
    TotalToptype() {
      let that = this;
      if (!that.deviceModel.length || !that.deviceX.length) {
        $("#Total_Toptype").removeAttr("_echarts_instance_");
        $("#Total_Toptype").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(document.getElementById("Total_Toptype"));
      let option = {
        title: {
          text: null,
          subtext: null
        },
        color: ["#4F7FF2"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          right: "0",
          top: 0
        },
        grid: {
          left: "2%",
          right: "5%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#B2BBC5",
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#B2BBC5",
              type: "solid"
            }
          }
        },
        yAxis: {
          type: "category",
          data: that.deviceX,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            formatter: function(c) {
              var strL = c.length;
              if (strL > 12) {
                var str = c.substr(strL - 12, 12);
              } else {
                var str = c;
              }
              return str;
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "UV",
            type: "bar",
            data: that.deviceModel
          }
        ]
      };
      myChart.setOption(option);
    },
    TotlalTopAct() {
      let that = this;
      if (!that.actUsernum.length || !that.actUserX.length) {
        $("#Totlal_TopAct").removeAttr("_echarts_instance_");
        $("#Totlal_TopAct").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(document.getElementById("Totlal_TopAct"));
      var option = {
        title: {
          text: null,
          subtext: null
        },
        color: ["#4F7FF2"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          right: "0",
          top: 0
        },
        grid: {
          left: "2%",
          right: "5%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#B2BBC5",
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#B2BBC5",
              type: "solid"
            }
          }
        },
        yAxis: {
          type: "category",
          data: that.actUserX,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            formatter: function(c) {
              var strL = c.length;
              if (strL > 12) {
                var str = c.substr(strL - 12, 12);
              } else {
                var str = c;
              }
              return str;
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "UV",
            type: "bar",
            data: that.actUsernum
          }
        ]
      };
      myChart.setOption(option);
    },
    TotlalTopReg() {
      let that = this;
      if (!that.regUsernum.length || !that.regX.length) {
        $("#Totlal_TopReg").removeAttr("_echarts_instance_");
        $("#Totlal_TopReg").html('<div class="g-nodata">暂无数据...</div>');
        return;
      }
      var myChart = echarts.init(document.getElementById("Totlal_TopReg"));
      let option = {
        title: {
          text: null,
          subtext: null
        },
        color: ["#4F7FF2"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          right: "0",
          top: 0
        },
        grid: {
          left: "2%",
          right: "5%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#B2BBC5",
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#B2BBC5",
              type: "solid"
            }
          }
        },
        yAxis: {
          type: "category",
          data: that.regX,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#B2BBC5",
              type: "dashed"
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            formatter: function(c) {
              var strL = c.length;
              if (strL > 12) {
                var str = c.substr(strL - 12, 12);
              } else {
                var str = c;
              }
              return str;
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "UV",
            type: "bar",
            data: that.regUsernum
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
.currentDate {
  font-size: 13px;
  color: #99a9bf;
  letter-spacing: 0;
  line-height: 14px;
}
.rightBlock {
  align-self: right;
}
</style>
