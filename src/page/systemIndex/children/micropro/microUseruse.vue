<template>
  <div>
    <div class="top">
      <div class="g-title">时段分析</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="analysisDateRang" @change="changeAnalysisDate" size="small" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <span class="download" @click="goDownloadAnalysis">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;" id="analysisNewUser">
        <p class="g-block-title">新用户访问</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p class="graph-left"></p>
            <p class="graph-right"></p>
          </div>
          <div class="graph graph-wrapper"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;" id="analysisActUser">
        <p class="g-block-title">活跃用户</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p class="graph-left"></p>
            <p class="graph-right"></p>
          </div>
          <div class="graph graph-wrapper"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="top">
      <div class="g-title">地域分布
        <span class="currentDate">当前数据日期：{{mapDateTimeF}}</span>
      </div>
      <div class="chooseDate">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="mapDateTime" type="date" size="small" placeholder="选择日期" @change="changeUserMapDate()">
        </el-date-picker>
        <span class="choose" v-for="item in mapTimeRangs" :class="{'active': mapTimeRang == item.value}" @click="changeUserMapDate(item.value)">{{ item.text }}</span>

        <span class="download" @click="goDownloadMap" style="margin-left: 30px;">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:550px;width:580px;border-right: none;">
        <div class="w-choose">
          <span class="w-active" v-for="(item, index) in mapUserType" v-bind:class="{Active: index == currentIndex}" @click="changeUserType(index, item.userId)">{{item.userDetail}}</span>
        </div>
        <div class="g-block-graph" style="height:460px;">
          <div class="graph" id="User_map"></div>
        </div>
      </div>
      <div class="g-block" style="height:550px;width:580px;border-left: none;">
        <div id="bigDataTable" style="padding: 10px;overflow: auto;height:490px;">
          <table class="g-xflow-table">
            <thead>
              <tr style="font-size: 14px;">
                <th>地区</th>
                <th>页面浏览量</th>
                <th>访问用户量</th>
                <th>网站访问量</th>
                <th>新访问用户量</th>
              </tr>
            </thead>
            <tbody id="user_stay">
            </tbody>
          </table>
        </div>
        <el-pagination style="padding: 5px 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>
      <div class="clear"></div>
    </div>

    <div class="searchTitle clearfix">
      <span class="f-text"></span>
      <ul class="dateRange" style="margin-left: 5px;float: left">
        <li v-for="item in mapTimeRangs" :class="{'dateRangeAct': topTimeRang == item.value}" @click="changeTopDate(item.value)">{{ item.text }}</li>
      </ul>

      <div class="fr">
        <span class="s-text">日期选择：</span>
        <el-date-picker v-model="topDateTime" type="date" placeholder="选择日期" @change="changeTopDate()" style="margin-left: 20px">
        </el-date-picker>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">Top10活跃机型</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p class="graph-left"></p>
            <p class="graph-right"></p>
          </div>
          <div class="graph graph-wrapper" id="Cnt_dis"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">终端分布</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p class="graph-left"></p>
            <p class="graph-right"></p>
          </div>
          <div class="graph graph-wrapper" id="Use_Internal"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script>
import { mapState } from "vuex";
import download from "../../svg/download";
import { Download, formatDate, toThousands } from "../../../../config/mUtils";
import {
  hourSummary,
  deviceTop10,
  terminalSummary,
  areaSummary
} from "../../../../service/getData";
import alertBox from "../../../../components/common/alertBox/alertBox";

export default {
  name: "microUseruse",
  data() {
    return {
      //时段分析
      totalTimes: [
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

      analysisDateRang: [
        (() => {
          let now = new Date();
          return new Date(now.setMonth(now.getMonth() - 1));
        })(),
        new Date()
      ],

      //地域分布
      mapTimeRangs: [
        { text: "昨日", value: 1 },
        { text: "近7日", value: 7 },
        { text: "近30日", value: 30 }
      ],
      mapTimeRang: 1,
      mapDateTime: new Date(new Date() * 1 - 24 * 3600 * 1000),
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      currentIndex: 0,
      userId: "act_user",
      mapUserType: [
        { userDetail: "页面浏览量", userId: "act_user" },
        { userDetail: "访问用户量", userId: "open_user" },
        { userDetail: "新增用户量", userId: "new_user" }
      ],
      actData: [],
      newData: [],
      openData: [],
      actNum: 0,
      newNum: 0,
      openNum: 0,
      //Top10活跃机型
      topTimeRang: 1,
      topDateTime: new Date(new Date() * 1 - 24 * 3600 * 1000)
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]),
    analysisStartDate() {
      return formatDate(this.analysisDateRang[0]);
    },
    analysisEndDate() {
      return formatDate(this.analysisDateRang[1]);
    },
    mapDateTimeF() {
      return formatDate(this.mapDateTime);
    },
    topDateTimeF() {
      return formatDate(this.topDateTime);
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
      this.getHourSummary();
      this.getAreaSummary();
      this.getDeviceTop10();
      this.getTerminalSummary();
    },

    async getHourSummary() {
      //时段分析
      try {
        let data = await hourSummary({
          appSource: this.appSource,
          startDate: this.analysisStartDate,
          endDate: this.analysisEndDate
        });
        if (data.success) {
          this.userNewUv = [];
          this.userUv = [];
          data.model.forEach(ele => {
            this.userNewUv.push(ele.uvNew);
            this.userUv.push(ele.uv);
          });
          this.drawAnalysisCharts(this.userNewUv, "analysisNewUser"); //新用户访问
          this.drawAnalysisCharts(this.userUv, "analysisActUser"); //活跃用户
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

    async getAreaSummary() {
      //地域分布
      try {
        let data = await areaSummary({
          appSource: this.appSource,
          bizdate: this.mapDateTimeF,
          freq: this.mapTimeRang
        });
        if (data.success) {
          this.drawMapTable(data);
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

    async getDeviceTop10() {
      //Top10机型
      try {
        let data = await deviceTop10({
          appSource: this.appSource,
          bizdate: this.topDateTimeF,
          freq: this.topTimeRang
        });
        if (data.success) {
          this.drawTopActive(data);
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

    async getTerminalSummary() {
      //终端分布
      try {
        let data = await terminalSummary({
          appSource: this.appSource,
          bizdate: this.topDateTimeF,
          freq: this.topTimeRang
        });
        if (data.success) {
          this.drawDeviceDis(data);
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

    changeAnalysisDate() {
      this.getHourSummary();
    },

    changeUserMapDate(value) {
      value && (this.mapTimeRang = value);
      this.getAreaSummary();
    },

    changeUserType(idx, userId) {
      this.currentIndex = idx;
      this.userId = userId;
      this.drawMap();
    },

    changeTopDate(val) {
      val && (this.topTimeRang = val);
      this.getDeviceTop10();
      this.getTerminalSummary();
    },

    //新访问用户 活跃用户图表
    drawAnalysisCharts(seriesData, id) {
      let myChart = echarts.init($("#" + id).find(".graph-wrapper")[0]);
      myChart.clear();
      let option = {
        tooltip: {
          trigger: "axis",
          formatter: function(data) {
            if (!data[1]) {
              data[1] = {
                value: "--"
              };
            }
            $("#" + id)
              .find(".graph-left")
              .text(
                data[0].axisValue.substring(0, 4) +
                  "." +
                  data[0].axisValue.substring(4, 6) +
                  "." +
                  data[0].axisValue.substring(6.8)
              );
            $("#" + id)
              .find(".graph-left")
              .html(
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
        color: ["#3F8BED"],
        legend: {
          data: ["UV"],
          right: "0",
          top: "0"
        },
        xAxis: [
          {
            type: "category",
            data: this.totalTimes,
            axisLine: {
              show: false
            },
            axisLabel: {
              interval: 4
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#666666"
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: null,
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#666666"
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "uv",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                opacity: 0.3
              }
            },
            data: seriesData
          }
        ]
      };
      myChart.setOption(option);
    },

    drawMapTable(data) {
      var shtml = "";
      this.actData = [];
      this.newData = [];
      this.openData = [];
      this.actNum = 0;
      this.newNum = 0;
      this.openNum = 0;
      data.model.forEach(one => {
        this.actPrivince = one.prov;
        this.actPrivince = this.actPrivince.substring(
          0,
          this.actPrivince.length - 1
        );
        if (this.actPrivince == "新疆维吾尔自治") {
          this.actPrivince = "新疆";
        } else if (this.actPrivince == "内蒙古自治") {
          this.actPrivince = "内蒙古";
        } else if (this.actPrivince == "广西壮族自治") {
          this.actPrivince = "广西";
        } else if (this.actPrivince == "西藏自治") {
          this.actPrivince = "西藏";
        } else if (this.actPrivince == "宁夏回族自治") {
          this.actPrivince = "宁夏";
        }
        var actObj = { name: this.actPrivince, value: parseInt(one.pv) };
        var newObj = { name: this.actPrivince, value: parseInt(one.uv) };
        var openObj = {
          name: this.actPrivince,
          value: parseInt(one.pvWeb)
        };
        this.actData.push(actObj);
        this.newData.push(newObj);
        this.openData.push(openObj);
        if (this.actNum < one.pv) {
          this.actNum = one.pv;
        }
        if (this.newNum < one.uv) {
          this.newNum = one.uv;
        }
        if (this.openNum < one.pvWeb) {
          this.openNum = one.pvWeb;
        }
        shtml =
          shtml +
          "<tr><td style='line-height: 40px;'>" +
          one.prov +
          "</td><td style='line-height: 40px;'>" +
          toThousands(one.pv) +
          "</td><td style='line-height: 40px;'>" +
          toThousands(one.uv) +
          "</td><td style='line-height: 40px;'>" +
          toThousands(one.pvWeb) +
          "</td><td style='line-height: 40px;'>" +
          toThousands(one.uvNew) +
          "</td></tr>";
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
      this.drawMap();
    },

    drawMap() {
      let dataType = this.userId;
      var maxNum = 0;
      if (dataType == "new_user") {
        var data = this.openData;
        var name = "网站访问量";
        var maxNum = this.openNum;
      } else if (dataType == "act_user") {
        var data = this.actData;
        var name = "页面浏览量";
        var maxNum = this.actNum;
      } else if (dataType == "open_user") {
        var data = this.newData;
        var name = "访问用户量";
        var maxNum = this.newNum;
      }
      var myChart = echarts.init(document.getElementById("User_map"));
      myChart.clear();
      var option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          enabled: false
        },
        visualMap: {
          min: 0,
          max: maxNum,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ["#D7DFE5", "#A3BED8", "#458FEC"]
          }
        },
        series: [
          {
            name: name,
            type: "map",
            mapType: "china",
            showLegendSymbol: false,
            roam: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
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

    //Top10活跃机型
    drawTopActive(data) {
      this.deviceModel = [];
      this.deviceX = [];
      if (data.success) {
        data.model.forEach(ele => {
          this.deviceModel.unshift(ele.uv);
          this.deviceX.unshift(ele.deviceModel);
        });
        this.Total_Toptype(this.deviceModel, this.deviceX);
      }
    },

    Total_Toptype(deviceModel, deviceX) {
      if (
        deviceModel == undefined ||
        deviceX == undefined ||
        deviceModel.length < 1
      ) {
        $("#Cnt_dis").empty();
        return;
      }
      let myChart = echarts.init(document.getElementById("Cnt_dis"));
      myChart.clear();
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
          bottom: "0px"
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "8%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: deviceX,
          z: 10,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function(c) {
              for (var i in c) {
                return c.substring(0, 12);
              }
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
            data: deviceModel
          }
        ]
      };
      myChart.setOption(option);
    },

    //终端分布
    drawDeviceDis(data) {
      this.os = [];
      this.uv = [];
      if (data.success) {
        data.model.forEach(ele => {
          let obj = {};
          obj.value = ele.uv;
          obj.name = ele.os;
          this.uv.unshift(obj);
          this.os.unshift(ele.os);
        });
        this.deviceDistribution(this.uv, this.os);
      }
    },

    deviceDistribution(uv, os) {
      if (uv == undefined || os == undefined || uv.length < 1) {
        $("#Use_Internal").empty();
        return;
      }
      let myChart = echarts.init(document.getElementById("Use_Internal"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: os,
          show: false
        },
        color: ["#F47958", "#4F7FF2"],
        series: [
          {
            name: "终端分布",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: uv
          }
        ]
      };
      myChart.setOption(option);
    },

    goDownloadAnalysis() {
      let url = `/overview/xcx_user_situation/hour_summary_export.json?startDate=${
        this.analysisStartDate
      }&endDate=${this.analysisEndDate}&appSource=${this.appSource}`;
      Download(url);
    },
    goDownloadMap() {
      let url = `/overview/xcx_user_situation/area_export.json?bizdate=${
        this.mapDateTimeF
      }&appSource=${this.appSource}&pageSize=${this.pageSize}&pageNumber=${
        this.pageNumber
      }&freq=${this.mapTimeRang}`;
      Download(url);
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

.w-choose {
  width: 575px;
  text-align: center;
  padding-top: 20px;
  .w-active {
    display: inline-block;
    width: 115px;
    height: 23px;
    line-height: 23px;
    text-align: center;
    border: 1px solid #5693fb;
    cursor: pointer;
    font-size: 13px;
    &:nth-child(1) {
      border-right: none;
    }
    &:nth-child(2) {
      border-right: none;
    }
  }
  .Active {
    background: #5693fb;
    border: 1px solid #5693fb;
    color: #fff;
  }
}

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 300px;
}
</style>
