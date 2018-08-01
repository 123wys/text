<template>
  <div>
    <div class="top">
      <div class="g-title">留存率</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="dateRange" @change="getDate" size="small" type="daterange">
        </el-date-picker>
        <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:390px;width:1160px;">
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="g-block-btn">
            <span v-bind:class="['stayBtn',{'active':stayBtnActive == index}]" v-for="(item,index) in stayBtnList" @click="stayBtnClick(index)">{{item}}</span>
          </div>
          <div class="graph" id="Accept_rateChart"></div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="top">
      <div class="g-title">用户留存率</div>
      <div class="g-title-btn">
        <span v-bind:class="['stayBtn',{'active':userStayBtnActive == index}]" v-for="(item,index) in stayBtnList" @click="userStayBtnClick(index)">{{item}}</span>
      </div>
    </div>
    <div class="g-block" style="width:100%;">
      <div id="bigDataTable" style="">
        <table class="g-xflow-table">
          <thead style="font-size: 14px;">
            <tr colspan="2">
              <th rowspan="2">日期</th>
              <th rowspan="2">用户数</th>
              <th colspan="9">N{{ stayTextType[userStayBtnActive] }}留存率</th>
            </tr>
            <tr>
              <th>+1{{ stayTextType[userStayBtnActive] }}</th>
              <th>+2{{ stayTextType[userStayBtnActive] }}</th>
              <th>+3{{ stayTextType[userStayBtnActive] }}</th>
              <th>+4{{ stayTextType[userStayBtnActive] }}</th>
              <th>+5{{ stayTextType[userStayBtnActive] }}</th>
              <th>+6{{ stayTextType[userStayBtnActive] }}</th>
              <th>+7{{ stayTextType[userStayBtnActive] }}</th>
              <th>+14{{ stayTextType[userStayBtnActive] }}</th>
              <th>+30{{ stayTextType[userStayBtnActive] }}</th>
            </tr>
          </thead>
          <tbody id="user_stay"></tbody>
        </table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>
    </div>
    <div class="top">
      <div class="g-title">用户参与分析</div>
      <div class="block">
        <span class="dateChoose">日期选择</span>
        <el-date-picker v-model="dateRangeTwo" @change="getDateTwo" size="small" type="daterange">
        </el-date-picker>
      </div>
    </div>
    <div>
      <div>
        <div class="g-block" style="height:360px;width:575px;">
          <p class="g-block-title">单次时长分布</p>
          <div class="g-block-graph" style="height:300px;margin-top:-17px">
            <div class="graph" id="Single_dis"></div>
          </div>
        </div>
        <div class="g-block ml10" style="height:360px;width:575px;">
          <p class="g-block-title">单次时长趋势</p>
          <div class="g-block-graph" style="height:280px;">
            <div class="g-block-hover-info">
              <p id="graph-b-x"></p>
              <p id="graph-b-v"></p>
            </div>
            <div class="graph" id="Single_trend"></div>
          </div>
        </div>
        <div class="g-block" style="height:360px;width:575px;margin-top: 10px;">
          <p class="g-block-title">单人时长分布</p>
          <div class="g-block-graph" style="height:300px;margin-top:-21px">
            <div class="graph" id="Single_user"></div>
          </div>
        </div>
        <div class="g-block ml10" style="height:360px;width:575px;margin-top: 10px;">
          <p class="g-block-title">单人时长趋势</p>
          <div class="g-block-graph" style="height:280px;">
            <div class="g-block-hover-info">
              <p id="graph-c-x"></p>
              <p id="graph-c-v"></p>
            </div>
            <div class="graph" id="Single_user_trend"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="top" style="padding: 5px 0">
      <div>
        <span class="currentDate">当期数据日期：{{currentDate}}</span>
      </div>
      <div class="chooseDate">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="value" @change="getDateThree" size="small" type="date">
        </el-date-picker>
        <span class="choose" v-for="(item, index) in date" @click="change(index,item.id)" v-bind:class="{ active: chooseIndex == index }">{{item.time}}</span>
      </div>
    </div>
    <div>
      <div class=" g-block" style="height:360px;width:575px;">
        <p class="g-block-title">使用频率</p>
        <div class="g-block-graph" style="height:300px;margin-top: -21px;">
          <div class="graph" id="Cnt_dis"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:360px;width:575px;">
        <p class="g-block-title">使用间隔</p>
        <div class="g-block-graph" style="height:300px;margin-top: -21px;">
          <div class="graph" id="Use_Internal"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  userRetention,
  singleDis,
  singleTrend,
  singleUser,
  singleUserTrend,
  sessionCntDis,
  intervalReport
} from "../../../../service/getData";
import dateFormat from "dateFormat";
import download from "../../svg/download";
import { Download } from "../../../../config/mUtils";
import alertBox from "../../../../components/common/alertBox/alertBox";

export default {
  data() {
    let startDate = new Date();
    let date = dateFormat(startDate, "yyyy-mm-dd");
    startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
    return {
      dateRange: [startDate, new Date(new Date() * 1 - 24 * 3600 * 1000)],
      dateRangeTwo: [startDate, new Date(new Date() * 1 - 24 * 3600 * 1000)],
      value: "",
      date: [
        { time: "昨日", id: 1 },
        { time: "近7日", id: 7 },
        { time: "近30日", id: 30 }
      ],
      stayBtnActive: 0,
      userStayBtnActive: 0,
      stayBtnList: ["日留存", "周留存", "月留存"],
      stayTextType: ["日", "周", "月"],
      stayFreqType: [1, 7, 30],
      stayFreq: 1,
      stayTableFreq: 1,
      datecnt: 1,
      chooseIndex: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      currentDate: dateFormat(
        new Date(new Date() * 1 - 24 * 3600 * 1000),
        "yyyy-mm-dd"
      ),
      uv1stDay: [],
      uv7thDay: [],
      uv30thDay: [],
      createDate: [],
      sessionDuration: [],
      visitCnt: [],
      singleTrendDateTime: [],
      singleTrendData: [],
      deviceDuration: [],
      userUv: [],
      singleUserDateTime: [],
      singleUserData: [],
      openRange: [],
      UV: [],
      sessionInterval: [],
      cnt: []
    };
  },
  computed: {
    getThisSourceAndOs() {
      return {
        appSource: this.$store.state.appSource,
        headerTapOs: this.$store.state.headerTapOs
      };
    },
    ...mapState(["appSource", "headerTapOs"])
  },
  mounted() {
    this.$nextTick(function() {
      this.renderAll();
    });
  },
  watch: {
    getThisSourceAndOs(v) {
      this.renderAll();
    }
  },
  methods: {
    getDate() {
      if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
        this.render3Graph();
        this.renderUserStayTable();
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
      if (this.dateRangeTwo && this.dateRangeTwo[0] && this.dateRangeTwo[1]) {
        this.renderSingleDis();
        this.renderSingleTrend();
        this.renderSingleUser();
        this.renderIntervalReport();
      }
    },
    getDateThree() {
      this.currentDate = dateFormat(this.value, "yyyy-mm-dd");
      this.renderSessionCntDis();
      this.renderIntervalReport();
    },
    goDownload() {
      var startDate = dateFormat(this.dateRange[0], "yyyymmdd");
      var endDate = dateFormat(this.dateRange[1], "yyyymmdd");
      var userType = "new_user";
      let url = `/overview/retention_involvement/user_retentionExport.json?startDate=${startDate}&endDate=${endDate}&appSource=${
        this.appSource
      }&os=${this.headerTapOs}&userType=${userType}&freq=${this.stayFreq}`;
      Download(url);
    },
    change(index, id) {
      this.chooseIndex = index;
      this.datecnt = id;
      this.renderSessionCntDis();
      this.renderIntervalReport();
    },
    renderAll() {
      this.render3Graph();
      this.renderSingleDis();
      this.renderSingleTrend();
      this.renderSingleUser();
      this.renderSingleUserTrend();
      this.renderSessionCntDis();
      this.renderIntervalReport();
      this.renderUserStayTable();
    },
    renderUserStayTable() {
      userRetention({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRange[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange[1], "yyyymmdd"),
        userType: "new_user",
        freq: this.stayTableFreq
      })
        .then(data => {
          if (data.success && data.model) {
            var shtml = "";
            var uv1 = "";
            var uv2 = "";
            var uv3 = "";
            var uv4 = "";
            var uv5 = "";
            var uv6 = "";
            var uv7 = "";
            var uv14 = "";
            var uv30 = "";
            $.each(data.model, function(idx, one) {
              uv1 = one.freq1UvRate * 100 || 0;
              uv1 = uv1.toFixed(2);

              uv2 = one.freq2UvRate * 100 || 0;
              uv2 = uv2.toFixed(2);

              uv3 = one.freq3UvRate * 100 || 0;
              uv3 = uv3.toFixed(2);

              uv4 = one.freq4UvRate * 100 || 0;
              uv4 = uv4.toFixed(2);

              uv5 = one.freq5UvRate * 100 || 0;
              uv5 = uv5.toFixed(2);

              uv6 = one.freq6UvRate * 100 || 0;
              uv6 = uv6.toFixed(2);

              uv7 = one.freq7UvRate * 100 || 0;
              uv7 = uv7.toFixed(2);

              uv14 = one.freq14UvRate * 100 || 0;
              uv14 = uv14.toFixed(2);

              uv30 = one.freq30UvRate * 100 || 0;
              uv30 = uv30.toFixed(2);
              shtml +=
                "<tr><td>" +
                one.bizdate +
                "</td><td>" +
                one.activeUsers +
                "</td><td>" +
                uv1 +
                "%</td><td>" +
                uv2 +
                "%</td><td>" +
                uv3 +
                "%</td><td>" +
                uv4 +
                "%</td><td>" +
                uv5 +
                "%</td><td>" +
                uv6 +
                "%</td><td>" +
                uv7 +
                "%</td><td>" +
                uv14 +
                "%</td><td>" +
                uv30 +
                "%</td></tr>";
            });
            $("#user_stay").html(shtml);
            $("#user_stay")
              .find("td")
              .each(function(idx, ele) {
                if (parseFloat($(ele).html()) <= 0) {
                  $(ele).addClass("grayTd");
                }
              });
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
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
        });
    },
    render3Graph() {
      userRetention({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRange[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange[1], "yyyymmdd"),
        userType: "new_user",
        freq: this.stayFreq
      })
        .then(data => {
          if (data.success && data.model) {
            var that = this;
            that.uv1stDay = [];
            that.uv7thDay = [];
            that.uv30thDay = [];
            that.createDate = [];
            if (data.model.length == 0) {
              that.AcceptRateChart();
            } else {
              data.model.forEach(one => {
                var oneday = one.freq1UvRate * 100 || 0;
                oneday = parseFloat(oneday.toFixed(2));
                var sevenday = one.freq7UvRate * 100 || 0;
                sevenday = parseFloat(sevenday.toFixed(2));
                var thirtyday = one.freq30UvRate * 100 || 0;
                thirtyday = parseFloat(thirtyday.toFixed(2));

                that.uv1stDay.unshift(oneday);
                that.uv7thDay.unshift(sevenday);
                that.uv30thDay.unshift(thirtyday);
                that.createDate.unshift(one.bizdate);
              });
              that.AcceptRateChart();
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
          console.log(err);
          this.$refs.Alert.showError();
        });
    },
    renderSingleDis() {
      singleDis({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRangeTwo[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRangeTwo[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.sessionDuration = [];
            that.visitCnt = [];
            if (data.model.length == 0) {
              that.SingleDisChart();
            } else {
              data.model.forEach(one => {
                that.sessionDuration.unshift(one.sessionDuration);
                that.visitCnt.unshift(one.visitCnt);
              });
              that.SingleDisChart();
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
        });
    },
    renderSingleTrend() {
      singleTrend({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRangeTwo[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRangeTwo[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.singleTrendDateTime = [];
            that.singleTrendData = [];
            if (data.model.length == 0) {
              that.SingleTrendChart();
            } else {
              data.model.forEach(one => {
                that.singleTrendDateTime.push(one.bizDate);
                that.singleTrendData.push(
                  parseFloat((one.avgSessionDuration / 1000).toFixed(0))
                );
              });
              that.SingleTrendChart();
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
        });
    },
    renderSingleUser() {
      singleUser({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRangeTwo[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRangeTwo[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.deviceDuration = [];
            that.userUv = [];
            if (data.model.length == 0) {
              that.SingleUserDisChart();
            } else {
              data.model.forEach(one => {
                that.deviceDuration.unshift(one.deviceDuration);
                that.userUv.unshift(one.uv);
              });
              that.SingleUserDisChart();
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
        });
    },
    renderSingleUserTrend() {
      singleUserTrend({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRangeTwo[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRangeTwo[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.singleUserDateTime = [];
            that.singleUserData = [];
            if (data.model.length == 0) {
              that.SingleUserTrendChart();
            } else {
              data.model.forEach(one => {
                that.singleUserDateTime.push(one.bizDate);
                that.singleUserData.push(
                  parseFloat((one.avgDeviceDuration / 1000).toFixed(0))
                );
              });
              that.SingleUserTrendChart();
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
        });
    },
    renderSessionCntDis() {
      sessionCntDis({
        appSource: this.appSource,
        os: this.headerTapOs,
        bizDate: dateFormat(this.currentDate, "yyyymmdd"),
        dateCnt: this.datecnt
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.openRange = [];
            that.UV = [];
            if (data.model.length == 0) {
              that.CntDisChart();
            } else {
              data.model.forEach(one => {
                that.openRange.push(one.openRange);
                that.UV.push(one.uv);
              });
              that.CntDisChart();
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
        });
    },
    renderIntervalReport() {
      intervalReport({
        appSource: this.appSource,
        os: this.headerTapOs,
        bizDate: dateFormat(this.currentDate, "yyyymmdd"),
        dateCnt: this.datecnt
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.sessionInterval = [];
            that.cnt = [];
            if (data.model.length == 0) {
              that.IntervalChart();
            } else {
              data.model.forEach(one => {
                that.sessionInterval.push(one.sessionInterval);
                that.cnt.push(one.visitCnt);
              });
              that.IntervalChart();
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
        });
    },

    stayBtnClick(idx) {
      this.stayBtnActive = idx;
      this.stayFreq = this.stayFreqType[idx];
      this.render3Graph();
    },

    userStayBtnClick(idx) {
      this.userStayBtnActive = idx;
      this.stayTableFreq = this.stayFreqType[idx];
      this.renderUserStayTable();
    },

    AcceptRateChart() {
      let that = this;
      var dataNumber = 1;
      if (that.createDate != undefined) {
        if (that.createDate.length <= 8) {
        } else if (that.createDate.length > 8) {
          dataNumber = Math.ceil(that.createDate.length / 8);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Accept_rateChart"));
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
                '">次' +
                that.stayTextType[that.stayBtnActive] +
                ":" +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "80px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.createDate,
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
            name: "次" + that.stayTextType[that.stayBtnActive],
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
            data: that.uv1stDay
          }
        ]
      };
      myChart.setOption(option);
    },
    SingleDisChart() {
      let that = this;
      if (that.sessionDuration != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Single_dis"));
      myChart.clear();
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
              icon: "rect",
              name: "PV"
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
          data: that.sessionDuration,
          axisTick: {
            show: false
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
            lineStyle: {
              color: "#FFF"
            }
          }
        },
        series: [
          {
            name: "PV",
            type: "bar",
            data: that.visitCnt
          }
        ]
      };
      myChart.setOption(option);
    },
    SingleTrendChart() {
      let that = this;
      var dataNumber = 1;
      if (that.singleTrendDateTime != undefined) {
        if (that.singleTrendDateTime.length <= 5) {
        } else if (that.singleTrendDateTime.length > 5) {
          dataNumber = Math.ceil(that.singleTrendDateTime.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Single_trend"));
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
              '<span class="l" color="' +
                data[0].color +
                '"><span style="display:inline-block;width:12px;border: 1.5px solid #5693FB;position: relative;top:-4px;right:2px;"></span>UV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["单次时长"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.singleTrendDateTime,
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
            name: "单次时长",
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
            data: that.singleTrendData
          }
        ]
      };
      myChart.setOption(option);
    },
    SingleUserDisChart() {
      let that = this;
      if (that.deviceDuration != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Single_user"));
      myChart.clear();
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
              icon: "rect",
              name: "PV"
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
          data: that.deviceDuration,
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
            data: that.userUv
          }
        ]
      };
      myChart.setOption(option);
    },
    SingleUserTrendChart() {
      let that = this;
      var dataNumber = 1;
      if (that.singleUserDateTime != undefined) {
        if (that.singleUserDateTime.length <= 5) {
        } else if (that.singleUserDateTime.length > 5) {
          dataNumber = Math.ceil(that.singleUserDateTime.length / 5);
        }
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Single_user_trend"));
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
            $("#graph-c-x").text(
              data[0].axisValue.substring(0, 4) +
                "." +
                data[0].axisValue.substring(4, 6) +
                "." +
                data[0].axisValue.substring(6.8)
            );
            $("#graph-c-v").html(
              '<span class="l" color="' +
                data[0].color +
                '"><span style="display:inline-block;width:12px;border: 1.5px solid #5693FB;position: relative;top:-4px;right:2px;"></span>UV:' +
                data[0].value +
                "</span>"
            );
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: ["单人时长"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.singleUserDateTime,
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
            name: "单人时长",
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
            data: that.singleUserData
          }
        ]
      };
      myChart.setOption(option);
    },
    CntDisChart() {
      //使用频率
      let that = this;
      if (that.openRange != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Cnt_dis"));
      myChart.clear();
      var option = {
        color: ["#4FA8F9"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        legend: {
          data: [
            {
              icon: "rect",
              name: "UV"
            }
          ],
          right: "0",
          top: 0
        },
        xAxis: [
          {
            type: "category",
            data: that.openRange,
            axisLine: {
              lineStyle: {
                color: "#D8E1EB"
              }
            },
            axisLabel: {
              color: "#B2BBC5",
              align: "center"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5"
              }
            }
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            name: "UV",
            type: "bar",
            barWidth: "60%",
            data: that.UV
          }
        ]
      };
      myChart.setOption(option);
    },
    IntervalChart() {
      //使用间隔
      let that = this;
      if (that.sessionInterval != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Use_Internal"));
      myChart.clear();
      var option = {
        color: ["#4FA8F9"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        legend: {
          data: [
            {
              icon: "rect",
              name: "使用间隔"
            }
          ],
          right: "0",
          top: 0
        },
        xAxis: [
          {
            type: "category",
            data: that.sessionInterval,
            axisLine: {
              lineStyle: {
                color: "#D8E1EB"
              }
            },
            axisLabel: {
              color: "#B2BBC5",
              align: "center"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5"
              }
            }
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            name: "使用间隔",
            type: "bar",
            barWidth: "60%",
            data: that.cnt
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

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 300px;
}

.g-block-btn {
  position: absolute;
  left: 200px;
  top: 20px;
  z-index: 99;
}

.top .g-title-btn {
  position: absolute;
  left: 200px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}

span.stayBtn {
  display: inline-block;
  color: #aaa;
  height: 30px;
  padding: 5px 30px;
  margin-left: 10px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  letter-spacing: 0;
  border: 1px solid #aaa;
  border-radius: 4px;
  cursor: pointer;
  &.active {
    color: #5693fb;
    border: 1px solid #5693fb;
  }
}

#user_stay /deep/ td.grayTd {
  background: #ffe;
}

</style>
