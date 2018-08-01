<template>
  <div>
    <div class="g-title">实时分析</div>
    <div>
      <div class="g-block" style="height:auto;width:100%;">
        <p class="g-block-title">实时概况</p>
        <div style="padding:12px 10px 10px 10px">
          <table class="g-xflow-table">
              <thead>
              <tr>
                  <th>指标</th>
                  <th>所有页面浏览量</th>
                  <th>访问用户量</th>
                  <th>新访问用户量</th>
              </tr>
              </thead>
              <tbody id="ontime_table"></tbody>
          </table>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="g-title">时段分析</div>
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
    <div>
      <div class="g-block" style="height:330px;width:49.5%;">
        <p class="g-block-title">页面TOP10</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="graph" id="graph-c-main"></div>
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
  webPeriodStatistic,
  xcxRealtimeUrl,
  xcxRealTimePeriod,
  xcxRealTimeSummary
} from "../../../../service/getData";
export default {
  name: "ontime",
  data() {
    return {
      userName: "",
      passWord: "",
      isAutoLogin: true,
      page_pv: [], //页面浏览量
      user_uv: [], //访问用户量
      total_pv: [], //访问量
      Constrastpage_pv: [],
      Constrastuser_uv: [],
      Constrasttotal_pv: [],
      todaySummary: { pv: 0, uv: 0, pv_web: 0, uv_new: 0 },
      yesterdaySummary: { pv: 0, uv: 0, pv_web: 0, uv_new: 0 }
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
      this.renderAll();
    }
  },
  methods: {
    renderAll() {
      this.renderTable();
      this.render2Graph();
      this.renderGraphC();
    },
    render2Graph() {
      let that = this;
      xcxRealTimePeriod({
        appSource: this.appSource
      })
        .then(data => {
          if (data.success) {
            var today_page_pv = {
              count: [],
              record_time: []
            };
            var yesterday_page_pv = {
              count: [],
              record_time: []
            };

            var today_user_uv = {
              count: [],
              record_time: []
            };
            var yesterday_user_uv = {
              count: [],
              record_time: []
            };
            $.each(data.model.today, function(idx, one) {
              today_page_pv.count.push(one.pv);
              today_page_pv.record_time.push(
                one.record_time.slice(-2) + ": 00"
              );

              today_user_uv.count.push(one.uv);
              today_user_uv.record_time.push(
                one.record_time.slice(-2) + ": 00"
              );
            });

            $.each(data.model.yesterday, function(idx, one) {
              yesterday_page_pv.count.push(one.pv);
              yesterday_page_pv.record_time.push(
                one.record_time.slice(-2) + ": 00"
              );

              yesterday_user_uv.count.push(one.uv);
              yesterday_user_uv.record_time.push(
                one.record_time.slice(-2) + ": 00"
              );
            });

            that.renderGraphA(
              today_page_pv,
              yesterday_page_pv,
              "chartsPageCount"
            );
            that.renderGraphB(
              today_user_uv,
              yesterday_user_uv,
              "chartsUserCount"
            );
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

      xcxRealTimeSummary({
        appSource: this.appSource
      })
        .then(data => {
          if (data.success) {
            var page_pv = []; //页面浏览量
            var user_uv = []; //访问用户量
            var total_pv = []; //访问量
            var todaySummary = { pv: 0, uv: 0, pv_web: 0, uv_new: 0 };
            var yesterdaySummary = { pv: 0, uv: 0, pv_web: 0, uv_new: 0 };

            $.each(data.model.today, function(idx, one) {
              page_pv.push(one.pv);
              user_uv.push(one.uv);
              todaySummary.pv += one.pv;
              todaySummary.uv += one.uv;
              todaySummary.uv_new += one.uv_new;
            });
            $.each(data.model.yesterday, function(idx, one) {
              yesterdaySummary.pv += one.pv;
              yesterdaySummary.uv += one.uv;
              yesterdaySummary.uv_new += one.uv_new;
            });

            that.page_pv = page_pv;
            that.user_uv = user_uv;
            that.total_pv = total_pv;
            that.todaySummary = todaySummary;
            that.yesterdaySummary = yesterdaySummary;
            var Tshtml =
              "<tr><td>今日</td><td>" +
              todaySummary.pv +
              "</td><td>" +
              todaySummary.uv +
              "</td><td>" +
              todaySummary.uv_new +
              "</td></tr>";
            var Yshtml =
              "<tr><td>昨日</td><td>" +
              yesterdaySummary.pv +
              "</td><td>" +
              yesterdaySummary.uv +
              "</td><td>" +
              yesterdaySummary.uv_new +
              "</td></tr>";
            var ratio = {};
            ratio.pv = getRatio(todaySummary.pv, yesterdaySummary.pv);
            ratio.uv = getRatio(todaySummary.uv, yesterdaySummary.uv);
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
              getClsByRatio(ratio.uv_new) +
              "'>" +
              ratio.uv_new +
              "%</td></tr>";
            var Total = Tshtml + Yshtml + Rshtml;
            $("#ontime_table").html(Total);

            //  that.renderGraphA();
            //  that.renderGraphB();
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
    renderGraphA(todayData, yesterDayData) {
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
              if(data[0].seriesName = '昨日') {
                data[1] = {
                  color: '#F9D348',
                  value: data[0].value
                }
                data[0].value = '--';
                data[0].color = '#5693FB';
              } else {
                data[1] = {
                  color: '#F9D348',
                  value: '--'
                }
              }
            }
            $("#graph-a-x").text(data[0].axisValue);
            $("#graph-a-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">当前:' +
                data[0].value +
                '</span><i style="background:' +
                data[1].color +
                '"></i><span class="r" color="' +
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
          data: yesterDayData.record_time,
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
            name: "当前",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },
            data: todayData.count
          },
          {
            name: "昨日",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "dashed"
                },
                color: '#F9D348'
              }
            },

            data: yesterDayData.count
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphB(todayData, yesterDayData) {
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
              if(data[0].seriesName = '昨日') {
                data[1] = {
                  color: '#F9D348',
                  value: data[0].value
                }
                data[0].value = '--';
                data[0].color = '#5693FB';
              } else {
                data[1] = {
                  color: '#F9D348',
                  value: '--'
                }
              }
            }
            $("#graph-b-x").text(data[0].axisValue);
            $("#graph-b-v").html(
              '<i style="background:' +
                data[0].color +
                '"></i><span class="l" color="' +
                data[0].color +
                '">当前:' +
                data[0].value +
                '</span><i style="background:' +
                data[1].color +
                '"></i><span class="r" color="' +
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
          data: yesterDayData.record_time,
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
                color: "#5693FB"
              }
            },
            data: todayData.count
          },
          {
            name: "昨日",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  type: "dashed"
                },
                color: '#F9D348'
              }
            },

            data: yesterDayData.count
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphC() {
      let that = this;
      xcxRealtimeUrl({
        appSource: this.appSource
      })
        .then(data => {
          if (data.success) {
            var urlArr = [];
            var pvArr = [];
            $.each(data.model, function(idx, one) {
              urlArr.unshift(one.url);
              pvArr.unshift(one.pv);
            });
            var myChart = echarts.init(document.getElementById("graph-c-main"));
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
                    name: "UV"
                  }
                ],
                right: "0",
                top: 0
              },
              grid: {
                left: "2%",
                right: "2%",
                top: "30px",
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
                    type: "dashed"
                  }
                }
              },
              yAxis: {
                type: "category",
                data: urlArr,
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
                  name: "UV",
                  type: "bar",
                  data: pvArr
                }
              ]
            };
            myChart.setOption(option);
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
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
