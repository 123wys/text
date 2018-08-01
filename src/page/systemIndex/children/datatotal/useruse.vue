<template>
  <div>
    <div class="top">
      <div class="g-title">用户活跃趋势</div>
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
        <p class="g-block-title">活跃用户-日活</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="Usertrend_chart"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">活跃用户-周活</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="Usertrendweek_chart"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">活跃用户-月活</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="Usertrendmonth_chart"></div>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="g-title">时段分析</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="dateRangeTwo" @change="getDateTwo" size="small" type="daterange">
        </el-date-picker>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">激活用户</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-d-x"></p>
            <p id="graph-d-v"></p>
          </div>
          <div class="graph" id="User_Timeanalysis_activeuser"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">活跃用户</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-e-x"></p>
            <p id="graph-e-v"></p>
          </div>
          <div class="graph" id="User_Timeanalysis_animationuser"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">启动次数平均</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-f-x"></p>
            <p id="graph-f-v"></p>
          </div>
          <div class="graph" id="User_Timeanalysis_startuser"></div>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="g-title">地域分布
        <span class="currentDate">当前数据日期：{{currentDate}}</span>
      </div>
      <div class="chooseDate">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="value" type="date" size="small" placeholder="选择日期" @change="getDateThree">
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
                <th>新增用户</th>
                <th>新增占比</th>
                <th>活跃用户</th>
                <th>活跃占比</th>
                <th>启动次数</th>
              </tr>
            </thead>
            <tbody id="user_stay">
              <!--<tr v-for="item in tableData" >-->
              <!--<td>{{item.region}}</td>-->
              <!--<td>{{item.newUsers}}</td>-->
              <!--<td>{{item.newrate}}</td>-->
              <!--<td>{{item.actUsers}}</td>-->
              <!--<td>{{item.actrate}}</td>-->
              <!--<td>{{item.openCnt}}</td>-->
              <!--</tr>-->
            </tbody>
          </table>
        </div>
        <el-pagination style="padding: 5px 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>
      <div class="clear"></div>
    </div>
    <div v-show="headerTapOs != 'all'">
      <div class="top">
        <div class="g-title">版本分析
        </div>
        <div class="chooseDate">
          <span class="dateChoose">日期选择：</span>
          <el-date-picker v-model="dateRange3" type="daterange" size="small" placeholder="选择日期" @change="getDate3">
          </el-date-picker>
        </div>
      </div>
      <div class="g-block" style="height:330px;width:100%;">
        <p class="g-block-title">页面浏览量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="Active_User"></div>
        </div>
      </div>
      <div class="g-block" style="height:330px;width:100%;margin-top:20px;">
        <p class="g-block-title">活跃用户</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="Lively_User"></div>
        </div>
      </div>
      <div class="g-block" style="height:330px;width:100%;margin-top:20px;">
        <p class="g-block-title">启动次数</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="Launch_Time"></div>
        </div>
      </div>
      <div class="top">
        <div class="g-title nobefore">
        </div>
        <div class="chooseDate">
          <span class="dateChoose">日期选择：</span>
          <el-date-picker v-model="currentDateVersion" type="date" size="small" placeholder="选择日期" @change="getDateFour">
          </el-date-picker>
          <span class="choose" v-for="(item,index) in date" v-bind:class="{ active: chooseIndexVersion == index }" @click="changeVersion(index,item.id)">{{item.time}}</span>
        </div>
      </div>
      <div>
        <div class="g-block" style="height:330px;width:49.5%;">
          <p class="g-block-title">TOP10激活版本</p>
          <div class="g-block-graph" style="height:270px;">
            <div class="g-block-hover-info">
              <p id="graph-a-x"></p>
              <p id="graph-a-v"></p>
            </div>
            <div class="graph" id="Active_pageTop"></div>
          </div>
        </div>
        <div class="g-block ml10" style="height:330px;width:49.5%;">
          <p class="g-block-title">TOP10活跃版本</p>
          <div class="g-block-graph" style="height:270px;">
            <div class="g-block-hover-info">
              <p id="graph-a-x"></p>
              <p id="graph-b-v"></p>
            </div>
            <div class="graph" id="Lively_pageTop"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div style="margin-top:10px">
        <div class="g-block" style="height:330px;width:49.5%;">
          <p class="g-block-title">TOP10启动版本</p>
          <div class="g-block-graph" style="height:270px;">
            <div class="g-block-hover-info">
              <p id="graph-a-x"></p>
              <p id="graph-a-v"></p>
            </div>
            <div class="graph" id="Launch_pageTop"></div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script>
import { mapState } from "vuex";
import dateFormat from "dateFormat";
import download from "../../svg/download";
import { Download,toThousands } from "../../../../config/mUtils";
import {
  activeTrend,
  useAnalysis,
  regionDistribution,
  versionDistribution,
  versiontop10
} from "../../../../service/getData";
import alertBox from "../../../../components/common/alertBox/alertBox";

export default {
  name: "useruse",
  data() {
    let startDate = new Date();
    let date = dateFormat(startDate, "yyyy-mm-dd");
    startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
    return {
      dateRange: [startDate, new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)],
      dateRangeTwo: [
        startDate,
        new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)
      ],
      dateRange3: [startDate, new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)],
      value: "",
      date: [
        { time: "昨日", id: 1 },
        { time: "近7日", id: 7 },
        { time: "近30日", id: 30 }
      ],
      Users: [
        { userDetail: "激活用户", userId: "new_user" },
        { userDetail: "活跃用户", userId: "act_user" },
        { userDetail: "启动次数", userId: "open_user" }
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
      userId: "new_user",
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
      openData: []
      // tableData: [],
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
      }
    },
    getDate3() {
      this.renderGraphVersionA();
    },
    getDate4() {
      this.renderGraphVersionB();
    },
    getDateTwo() {
      if (this.dateRangeTwo && this.dateRangeTwo[0] && this.dateRangeTwo[1]) {
        this.renderAnalysis();
      }
    },
    Draw_pageTop(id, versionArr, uvArr, name) {
      if (!id) {
        return;
      }
      if (versionArr.length <= 0 || uvArr.length <= 0) {
        echarts.dispose(document.getElementById(id));
        return;
      }

      var myChart = echarts.init(document.getElementById(id));
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
              name: name
            }
          ],
          right: "0",
          top: 0
        },
        grid: {
          left: "2%",
          right: "2%",
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
          data: versionArr,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function(c) {
              return c.substring(0, 12);
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: name,
            type: "bar",
            data: uvArr
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphVersionB() {
      let that = this;
      versiontop10({
        appSource: this.appSource,
        os: this.headerTapOs,
        freq: that.date[that.chooseIndexVersion].id,
        bizdate: dateFormat(that.currentDateVersion, "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var Active_versionArr = [];
            var Active_uvArr = [];

            var Lively_versionArr = [];
            var Lively_uvArr = [];

            var Launch_versionArr = [];
            var Launch_uvArr = [];

            $.each(data.model.activation, function(idx, ele) {
              Active_versionArr.unshift(ele.app_version);
              Active_uvArr.unshift(ele.act_uv);
            });

            $.each(data.model.active, function(idx, ele) {
              Lively_versionArr.unshift(ele.app_version);
              Lively_uvArr.unshift(ele.uv);
            });

            $.each(data.model.startup, function(idx, ele) {
              Launch_versionArr.unshift(ele.app_version);
              Launch_uvArr.unshift(ele.pv);
            });

            that.Draw_pageTop(
              "Active_pageTop",
              Active_versionArr,
              Active_uvArr,
              "激活数"
            );
            that.Draw_pageTop(
              "Lively_pageTop",
              Lively_versionArr,
              Lively_uvArr,
              "活跃数"
            );
            that.Draw_pageTop(
              "Launch_pageTop",
              Launch_versionArr,
              Launch_uvArr,
              "启动数"
            );
            //----------------------
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
          this.$refs.Alert.showError();
          this.isOK = true;
        });
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
    getDateThree() {
      this.currentDate = dateFormat(this.value, "yyyy-mm-dd");
      this.redderUserMap();
    },
    getDateFour() {
      this.renderGraphVersionB();
    },
    goDownload() {
      var startDate = dateFormat(this.dateRange[0], "yyyymmdd");
      var endDate = dateFormat(this.dateRange[1], "yyyymmdd");
      var userType = "new_user";
      let url = `/overview/use_situation/active_trendExport.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
        .appSource}&os=${this.headerTapOs}&userType=${userType}`;
      Download(url);
    },
    goDownloadTwo() {
      var startDate = dateFormat(this.dateRange[0], "yyyymmdd");
      var endDate = dateFormat(this.dateRange[1], "yyyymmdd");
      var datecnt = this.datecnt;
      let url = `/overview/use_situation/region_distributionExport.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
        .appSource}&os=${this.headerTapOs}&datecnt=${datecnt}`;
      Download(url);
    },
    change(index, id) {
      this.chooseIndex = index;
      this.datecnt = id;
      this.redderUserMap();
    },
    changeContent(index, userId) {
      this.currentIndex = index;
      this.userId = userId;
      this.userMap();
    },
    renderAll() {
      this.render3Graph();
      this.renderAnalysis();
      this.redderUserMap();
      this.renderGraphVersionA();
      this.renderGraphVersionB();
    },

    changeVersion(index) {
      this.chooseIndexVersion = index;
      this.renderGraphVersionB();
    },

    Draw_Charts(id, legendData, xAxisData, seriesData, colors) {
      if (!id) {
        return;
      }
      var dataNumber = 1;
      if (xAxisData.length > 0) {
        if (xAxisData.length > 5) {
          dataNumber = Math.ceil(xAxisData.length / 5);
        }
      } else if (!xAxisData.length) {
        echarts.dispose(document.getElementById(id));
        return;
      }

      var myChart = echarts.init(document.getElementById(id));
      myChart.clear();
      var options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },

        color: colors,

        legend: {
          type: "scroll",
          orient: "vertical",
          top: "20",
          right: "1%",
          align: "auto",
          data: legendData
          // backgroundColor: '#f00'
        },

        grid: {
          left: "0",
          right: "8%",
          top: "20px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
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

        series: seriesData
      };
      myChart.setOption(options);
    },
    renderGraphVersionA() {
      let that = this;
      versionDistribution({
        appSource: this.appSource,
        startDate: dateFormat(this.dateRange3[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange3[1], "yyyymmdd"),
        freq: 1,
        os: this.headerTapOs
      })
        .then(data => {
          if (data.success) {
            var versions = [];
            var dates = [];
            var firstLoop = true;
            var active_Data = [];
            var lively_Data = [];
            var launch_Data = [];
            var active_DataY = [];
            var lively_DataY = [];
            var launch_DataY = [];
            var active_model = {};
            var lively_model = {};
            var launch_model = {};

            $.each(data.model, function(idx, ele) {
              active_DataY = [];
              lively_DataY = [];
              launch_DataY = [];
              $.each(ele, function(i, e) {
                active_DataY.push(e.act_uv);
                lively_DataY.push(e.uv);
                launch_DataY.push(e.pv);

                if (firstLoop) {
                  dates.push(e.bizdate);
                }
              });

              versions.push(idx); //所有版本号

              //激活用户chart  series属性 的 data
              active_model = {
                name: "",
                type: "line",
                data: "",
                smooth: true,
                showSymbol: false
              };
              active_model.name = idx;
              active_model.data = active_DataY;

              //活跃用户chart  series属性 的 data
              lively_model = {
                name: "",
                type: "line",
                data: "",
                smooth: true,
                showSymbol: false
              };
              lively_model.name = idx;
              lively_model.data = lively_DataY;

              //启动次数chart  series属性 的 data
              launch_model = {
                name: "",
                type: "line",
                data: "",
                smooth: true,
                showSymbol: false
              };
              launch_model.name = idx;
              launch_model.data = launch_DataY;

              active_Data.push(active_model);
              lively_Data.push(lively_model);
              launch_Data.push(launch_model);

              firstLoop = false;
            });

            var colors = [
              "#F47958",
              "#FDD36C",
              "#B6D949",
              "#3A95B3",
              "#8873A2",
              "#D16A7C",
              "#F9AD79",
              "#EACF5E",
              "#9CC677",
              "#748CB2"
            ];

            that.Draw_Charts(
              "Active_User",
              versions,
              dates,
              active_Data,
              colors
            );
            that.Draw_Charts(
              "Lively_User",
              versions,
              dates,
              lively_Data,
              colors
            );
            that.Draw_Charts(
              "Launch_Time",
              versions,
              dates,
              launch_Data,
              colors
            );
            //----------------------
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
    render3Graph() {
      activeTrend({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRange[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.Yesterday = [];
            that.Week = [];
            that.Month = [];
            that.bizDate = [];
            if (data.model.length == 0) {
              that.renderGraphA();
              that.renderGraphB();
              that.renderGraphC();
            } else {
              data.model.forEach(one => {
                that.Yesterday.push(one.actUsers);
                that.Week.push(one.actD7Users);
                that.Month.push(one.actD30Users);
                that.bizDate.push(one.bizdate);
              });
              that.renderGraphA();
              that.renderGraphB();
              that.renderGraphC();
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
    renderAnalysis() {
      useAnalysis({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRangeTwo[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRangeTwo[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.actUsers = [];
            that.newUsers = [];
            that.openCnt = [];
            that.period = [];
            if (data.model.length == 0) {
              that.renderGraphD();
              that.renderGraphE();
              that.renderGraphF();
            } else {
              data.model.forEach(one => {
                that.newUsers.push(one.newUsers);
                that.actUsers.push(one.actUsers);
                that.openCnt.push(one.openCnt);
                that.period.push(one.period);
              });
              that.renderGraphD();
              that.renderGraphE();
              that.renderGraphF();
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
    redderUserMap() {
      regionDistribution({
        appSource: this.appSource,
        os: this.headerTapOs,
        bizdate: dateFormat(this.currentDate, "yyyymmdd"),
        datecnt: this.datecnt
        //          appSource: 'za',
        //          os: 'ios',
        //          bizdate: '20161227',
        //          datecnt: 1
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
              var actPrivince = one.region;
              actPrivince = actPrivince.substring(0, actPrivince.length - 1);
              if (actPrivince == "新疆维吾尔自治") {
                actPrivince = "新疆";
              } else if (actPrivince == "内蒙古自治") {
                actPrivince = "内蒙古";
              } else if (actPrivince == "广西壮族自治") {
                actPrivince = "广西";
              } else if (actPrivince == "西藏自治") {
                actPrivince = "西藏";
              } else if (actPrivince == "宁夏回族自治") {
                actPrivince = "宁夏";
              }
              var actObj = {
                name: actPrivince,
                value: parseInt(one.actUsers)
              };
              var newObj = {
                name: actPrivince,
                value: parseInt(one.newUsers)
              };
              var openObj = {
                name: actPrivince,
                value: parseInt(one.openCnt)
              };
              that.actData.push(actObj);
              that.newData.push(newObj);
              that.openData.push(openObj);
              if (that.actNum < one.actUsers) {
                that.actNum = one.actUsers;
              }
              if (that.newNum < one.newUsers) {
                that.newNum = one.newUsers;
              }
              if (that.openNum < one.openCnt) {
                that.openNum = one.openCnt;
              }
              var newrate = one.newUsersPercent * 100;
              newrate = newrate.toFixed(2) + "%";

              var actrate = one.actUsersPercent * 100;
              actrate = actrate.toFixed(2) + "%";
              shtml =
                shtml +
                "<tr><td style='line-height: 40px;'>" +
                one.region +
                "</td><td style='line-height: 40px;'>" +
                toThousands(one.newUsers) +
                "</td><td style='line-height: 40px;'>" +
                newrate +
                "</td><td style='line-height: 40px;'>" +
                toThousands(one.actUsers) +
                "</td><td style='line-height: 40px;'>" +
                actrate +
                "</td><td style='line-height: 40px;'>" +
                one.openCnt +
                "</td></tr>";
              //              tableData.push({region: one.region, newUsers: one.newUsers, newrate: newrate, actUsers: one.actUsers, actrate: actrate, openCnt: one.openCnt});
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
          this.$refs.Alert.showError();
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
      var myChart = echarts.init(document.getElementById("Usertrend_chart"));
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
            data: that.Yesterday
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
      var myChart = echarts.init(
        document.getElementById("Usertrendweek_chart")
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
            data: that.Week
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
      var myChart = echarts.init(
        document.getElementById("Usertrendmonth_chart")
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
            data: that.Month
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphD() {
      let that = this;
      var myChart = echarts.init(
        document.getElementById("User_Timeanalysis_activeuser")
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
            $("#graph-d-x").text(data[0].axisValue);
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
            interval: 4
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
            data: that.newUsers
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphE() {
      let that = this;
      var myChart = echarts.init(
        document.getElementById("User_Timeanalysis_animationuser")
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
            $("#graph-e-x").text(data[0].axisValue);
            $("#graph-e-v").html(
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
            interval: 4
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
            data: that.actUsers
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphF() {
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
      var myChart = echarts.init(
        document.getElementById("User_Timeanalysis_startuser")
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
            $("#graph-f-x").text(data[0].axisValue);
            $("#graph-f-v").html(
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
            data: that.openCnt
          }
        ]
      };
      myChart.setOption(option);
    },
    userMap() {
      let that = this;
      let dataType = that.userId;
      if (dataType == "new_user") {
        var data = that.newData;
        var name = "激活用户";
        var maxNum = that.newNum;
      } else if (dataType == "act_user") {
        var data = that.actData;
        var name = "活跃用户";
        var maxNum = that.actNum;
      } else if (dataType == "open_user") {
        var data = that.openData;
        var name = "启动次数";
        var maxNum = that.openNum;
      }
      var myChart = echarts.init(document.getElementById("User_map"));
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
