<template>
  <div>
    <div class="top">
      <div class="g-title">地域分布
        <span class="currentDate">当前数据日期：{{currentDate}}</span>
      </div>
      <div class="chooseDate">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="value" type="date" size="small" placeholder="选择日期" @change="getUserMapDate">
        </el-date-picker>
        <span class="choose" v-for="(item,index) in date" v-bind:class="{ active: chooseIndex == index }" @click="change(index,item.id)">{{item.time}}</span>
        <span class="download" @click="goDownloadTwo" style="margin-left: 30px;">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:550px;width:580px;border-right: none;">
        <div class="w-choose">
          <span class="w-active" v-for="(item, index) in Users" v-bind:class="{Active: index == currentIndex}" @click="changeContent(index, item.userId)">{{item.userDetail}}</span>
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

    <div class="top">
      <div class="g-title">使用分析</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="analysisDate" @change="changeAnalysisDate" size="small" type="daterange">
        </el-date-picker>
        <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">单次访问时长</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="Single_dis"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">单次时长趋势</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="Single_trend"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div style="margin-top : 10px">
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">单人时长分布</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="Single_user"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">单人时长趋势</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-d-x"></p>
            <p id="graph-d-v"></p>
          </div>
          <div class="graph" id="Single_user_trend"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="searchTitle clearfix">
      <span class="f-text"></span>
      <ul class="dateRange" style="margin-left: 5px;float: left">
        <li v-for="item in timeRangs" :class="{'dateRangeAct': timeRang == item.value}" @click="chooseTimeRang(item.value)">{{ item.text }}</li>
      </ul>

      <div class="fr">
        <span class="s-text">日期选择：</span>
        <el-date-picker v-model="dateTime" type="date" placeholder="选择日期" @change="changeFreqDate" style="margin-left: 20px">
        </el-date-picker>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">访问频率</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-e-x"></p>
            <p id="graph-e-v"></p>
          </div>
          <div class="graph" id="Cnt_dis"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">访问间隔</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-f-x"></p>
            <p id="graph-f-v"></p>
          </div>
          <div class="graph" id="Use_Internal"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div style="margin-top:10px">
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">会话页面数</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-g-x"></p>
            <p id="graph-g-v"></p>
          </div>
          <div class="graph" id="pageNums"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script>
import { mapState } from "vuex";
import dateFormat from "dateFormat";
import download from "../../svg/download";
import { Download, formatDate,toThousands } from "../../../../config/mUtils";
import {
  webAreaAnalysis,
  webSingleAnalysis,
  webUsageAnalysis,
  webUsageFreqAnalysis,
  webSpaceFreqAnalysis,
  webVisitPvAnalysis
} from "../../../../service/getData";
import alertBox from "../../../../components/common/alertBox/alertBox";

export default {
  name: "useruseZaWeb",
  data() {
    let startDate = new Date();
    let date = dateFormat(startDate, "yyyy-mm-dd");
    startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
    return {
      analysisDate: [
        startDate,
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)
      ],
      value: new Date(new Date() * 1 - 1 * 24 * 3600 * 1000),
      date: [
        { time: "昨日", id: 1 },
        { time: "近7日", id: 7 },
        { time: "近30日", id: 30 }
      ],
      Users: [
        { userDetail: "页面浏览量", userId: "act_user" },
        { userDetail: "访问用户量", userId: "open_user" },
        { userDetail: "网站访问量", userId: "new_user" }
      ],
      datecnt: 1,
      chooseIndex: 0,
      chooseIndexVersion: 0,
      currentIndex: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      currentDate: dateFormat(
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000),
        "yyyy-mm-dd"
      ),
      currentDateVersion: dateFormat(
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000),
        "yyyy-mm-dd"
      ),
      userId: "act_user",
      actNum: 0,
      newNum: 0,
      openNum: 0,
      Yesterday: [],
      Week: [],
      Month: [],
      bizDate: [],
      actUsers: [],
      newUsers: [],
      openCnt: [],
      period: [],
      actData: [],
      newData: [],
      openData: [],

      //使用分析
      //单次访问时长 单次时长趋势
      danciTime: [],
      danrenTime: [],
      danciUv: [],
      danrenUv: [],

      bizdate: [],
      danciTime: [],
      danrenTime: [],

      //访问平率 访问间隔 会话页面数
      timeRangs: [
        { text: "昨日", value: 1 },
        { text: "近7日", value: 7 },
        { text: "近30日", value: 30 }
      ],
      timeRang: 1,
      dateTime: new Date(new Date() * 1 - 24 * 3600 * 1000)
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]),
    analysisStartDate() {
      return formatDate(this.analysisDate[0]);
    },
    analysisEndDate() {
      return formatDate(this.analysisDate[1]);
    },
    freqBizdate() {
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
      this.renderUserMap();
      this.getWebSingleAnalysis();
      this.getWebUsageAnalysis();
      this.getWebUsageFreqAnalysis();
      this.getWebSpaceFreqAnalysis();
      this.getWebVisitPvAnalysis();
    },

    async getWebSingleAnalysis() {
      try {
        let data = await webSingleAnalysis({
          source: this.appSource,
          startDate: this.analysisStartDate,
          endDate: this.analysisEndDate
        });
        if (data.success) {
          this.danciTime = [];
          this.danrenTime = [];
          this.danciUv = [];
          this.danrenUv = [];
          data.model.forEach(ele => {
            this.danciTime.push(ele.danciTime);
            this.danrenTime.push(ele.danrenTime);
            this.danciUv.push(ele.danciUv);
            this.danrenUv.push(ele.danrenUv);
          });
          this.SingleDisChart(this.danciUv, this.danciTime);
          this.SingleUserDisChart(this.danrenUv, this.danrenTime);
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

    async getWebUsageAnalysis() {
      try {
        let data = await webUsageAnalysis({
          source: this.appSource,
          startDate: this.analysisStartDate,
          endDate: this.analysisEndDate
        });
        if (data.success) {
          this.bizdate = [];
          this.danciTime = [];
          this.danrenTime = [];
          data.model.forEach(ele => {
            this.bizdate.push(ele.bizDate);
            this.danciTime.push(ele.danciTime);
            this.danrenTime.push(ele.danrenTime);
          });
          this.SingleTrendChart(this.bizdate, this.danciTime);
          this.SingleUserTrendChart(this.bizdate, this.danrenTime);
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

    async getWebUsageFreqAnalysis() {
      try {
        let data = await webUsageFreqAnalysis({
          source: this.appSource,
          bizdate: this.freqBizdate,
          freq: this.timeRang
        });
        if (data.success) {
          this.visitFreq = [];
          this.visitFreqUv = [];
          data.model.forEach(ele => {
            this.visitFreq.push(ele.visitFreq);
            this.visitFreqUv.push(ele.visitFreqUv);
          });
          this.CntDisChart(this.visitFreqUv, this.visitFreq);
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

    async getWebSpaceFreqAnalysis() {
      try {
        let data = await webSpaceFreqAnalysis({
          source: this.appSource,
          bizdate: this.freqBizdate,
          freq: this.timeRang
        });
        if (data.success) {
          this.spaceFreq = [];
          this.spaceFreqUv = [];
          data.model.forEach(ele => {
            this.spaceFreq.push(ele.spaceFreq);
            this.spaceFreqUv.push(ele.spaceFreqUv);
          });
          this.IntervalChart(this.spaceFreqUv, this.spaceFreq);
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

    async getWebVisitPvAnalysis() {
      try {
        let data = await webVisitPvAnalysis({
          source: this.appSource,
          bizdate: this.freqBizdate,
          freq: this.timeRang
        });
        if (data.success) {
          this.visitPvFreq = [];
          this.visitPvFreqUv = [];
          data.model.forEach(ele => {
            this.visitPvFreq.push(ele.visitPvFreq);
            this.visitPvFreqUv.push(ele.visitPvFreqUv);
          });
          this.pageNumChart(this.visitPvFreqUv, this.visitPvFreq);
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
      this.getWebSingleAnalysis();
      this.getWebUsageAnalysis();
    },

    changeFreqDate() {
      this.getWebUsageFreqAnalysis();
      this.getWebSpaceFreqAnalysis();
      this.getWebVisitPvAnalysis();
    },

    getUserMapDate() {
      this.currentDate = dateFormat(this.value, "yyyy-mm-dd");
      this.renderUserMap();
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

    chooseTimeRang(value) {
      this.timeRang = value;
      this.changeFreqDate();
    },

    change(index, id) {
      this.chooseIndex = index;
      this.datecnt = id;
      this.renderUserMap();
    },

    changeContent(index, userId) {
      this.currentIndex = index;
      this.userId = userId;
      this.userMap();
    },

    renderUserMap() {
      webAreaAnalysis({
        source: this.appSource,
        bizdate: dateFormat(this.currentDate, "yyyymmdd"),
        freq: this.datecnt
      })
        .then(data => {
          if (data.success) {
            let that = this;
            var shtml = "";
            that.actData = [];
            that.newData = [];
            that.openData = [];
            that.actNum = 0;
            that.newNum = 0;
            that.openNum = 0;
            $.each(data.model, function(idx, one) {
              that.actPrivince = one.prov;
              that.actPrivince = that.actPrivince.substring(
                0,
                that.actPrivince.length - 1
              );
              if (that.actPrivince == "新疆维吾尔自治") {
                that.actPrivince = "新疆";
              } else if (that.actPrivince == "内蒙古自治") {
                that.actPrivince = "内蒙古";
              } else if (that.actPrivince == "广西壮族自治") {
                that.actPrivince = "广西";
              } else if (that.actPrivince == "西藏自治") {
                that.actPrivince = "西藏";
              } else if (that.actPrivince == "宁夏回族自治") {
                that.actPrivince = "宁夏";
              }
              var actObj = { name: that.actPrivince, value: parseInt(one.pv) };
              var newObj = { name: that.actPrivince, value: parseInt(one.uv) };
              var openObj = {
                name: that.actPrivince,
                value: parseInt(one.pvWeb)
              };
              that.actData.push(actObj);
              that.newData.push(newObj);
              that.openData.push(openObj);
              if (that.actNum < one.pv) {
                that.actNum = one.pv;
              }
              if (that.newNum < one.uv) {
                that.newNum = one.uv;
              }
              if (that.openNum < one.pvWeb) {
                that.openNum = one.pvWeb;
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
            that.userMap();
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

    userMap() {
      let that = this;
      let dataType = that.userId;
      var maxNum = 0;
      if (dataType == "new_user") {
        var data = that.openData;
        var name = "网站访问量";
        var maxNum = that.openNum;
      } else if (dataType == "act_user") {
        var data = that.actData;
        var name = "页面浏览量";
        var maxNum = that.actNum;
      } else if (dataType == "open_user") {
        var data = that.newData;
        var name = "访问用户量";
        var maxNum = that.newNum;
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

    // 单次时长分布chart
    SingleDisChart(visitCnt, sessionDuration) {
      if (sessionDuration != undefined) {
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
        color: ["#4FA8F9"],
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
          data: sessionDuration,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "PV",
            type: "bar",
            data: visitCnt
          }
        ]
      };
      myChart.setOption(option);
    },

    // 单次时长趋势
    SingleTrendChart(bizDate, singleTrendData) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
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
            name: "时长",
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
            data: singleTrendData
          }
        ]
      };
      myChart.setOption(option);
    },

    // 单人时长分布
    SingleUserDisChart(user_uv, device_duration) {
      // var dataNumber = 1;
      if (device_duration != undefined) {
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
        color: ["#4FA8F9"],
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
          data: device_duration,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "UV",
            type: "bar",
            data: user_uv
          }
        ]
      };
      myChart.setOption(option);
    },

    // 单人时长趋势
    SingleUserTrendChart(bizDate, singleUserData) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
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
            name: "时长",
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
            data: singleUserData
          }
        ]
      };
      myChart.setOption(option);
    },

    // 使用间隔
    IntervalChart(visit_cnt, session_interval) {
      // var dataNumber = 1;
      if (session_interval != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Use_Internal"));
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
          left: "3%",
          right: "4%",
          bottom: "10%",
          top: "10%",
          containLabel: true
        },
        legend: {
          data: [
            {
              icon: "circle",
              name: "uv"
            }
          ],
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: session_interval,
            axisTick: {
              alignWithLabel: true
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
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
          }
        ],
        series: [
          {
            name: "uv",
            type: "bar",
            barWidth: "60%",
            data: visit_cnt
          }
        ]
      };
      myChart.setOption(option);
    },

    // 使用频率
    CntDisChart(uv, open_range) {
      if (open_range != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Cnt_dis"));
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
          left: "3%",
          right: "4%",
          bottom: "10%",
          top: "10%",
          containLabel: true
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
        xAxis: [
          {
            type: "category",
            data: open_range,
            axisTick: {
              alignWithLabel: true
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
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
          }
        ],
        series: [
          {
            name: "UV",
            type: "bar",
            barWidth: "60%",
            data: uv
          }
        ]
      };
      myChart.setOption(option);
    },

    // 会话页面数
    pageNumChart(uv, open_range) {
      if (open_range != undefined) {
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("pageNums"));
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
          left: "3%",
          right: "4%",
          bottom: "10%",
          top: "10%",
          containLabel: true
        },
        legend: {
          data: [
            {
              icon: "circle",
              name: "页面数"
            }
          ],
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: open_range,
            axisTick: {
              alignWithLabel: true
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
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
          }
        ],
        series: [
          {
            name: "页面数",
            type: "bar",
            barWidth: "60%",
            data: uv
          }
        ]
      };
      myChart.setOption(option);
    },

    goDownload() {
      Download(url);
    },
    goDownloadTwo() {
      let url = `/overview/use_situation/region_distributionExport.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
        .appSource}&os=${this.headerTapOs}&datecnt=${datecnt}`;
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
