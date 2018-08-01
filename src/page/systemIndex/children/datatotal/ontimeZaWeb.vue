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
                  <th>页面浏览量</th>
                  <th>访问用户量</th>
                  <th>网站访问量</th>
                  <th>新访问用户量</th>
              </tr>
              </thead>
              <tbody id="ontime_table"></tbody>
          </table>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="g-title"  style="margin-top:20px;">时段分析</div>
    <div>
      <div class="g-block" style="height:330px;width:380px;">
        <p class="g-block-title">页面浏览量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="graph-a-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:330px;width:380px;">
        <p class="g-block-title">访问用户量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="graph-b-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:330px;width:380px;">
        <p class="g-block-title">访问量</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="graph-c-main"></div>
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
import { webPeriodStatistic } from "../../../../service/getData";
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

            that.renderGraphA();
            that.renderGraphB();
            that.renderGraphC();
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
              if(data[0].seriesName = '昨日') {
                data[1] = {
                  color: '#F9D348',
                  value: data[0].value
                }
                data[0].value = '--';
                data[0].color = '#5693FB';
              } else {
                  console.log(11)
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
                color: "#5693FB"
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
                lineStyle: {
                  type: "dashed"
                },
                color: '#F9D348'
              }
            },

            data: that.Constrastpage_pv
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
                color: "#5693FB"
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
                lineStyle: {
                  type: "dashed"
                },
                color: '#F9D348'
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
            $("#graph-c-x").text(data[0].axisValue);
            $("#graph-c-v").html(
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
                color: "#5693FB"
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
                lineStyle: {
                  type: "dashed"
                },
                color: '#F9D348'
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
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
