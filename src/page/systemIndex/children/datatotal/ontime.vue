<template>
  <div>
    <div class="g-title">实时分析</div>
    <div>
      <div class="g-block" style="height:229px;width:310px;">
        <p class="g-block-title">注册用户</p>
        <div class="bar-self">
          <img src="../../img/bg-1.png" class="user-bg" />
          <div class="graph" id="graph-user-main"></div>
          <div class="number">
            <span class="l" id="graph-user-main-user"></span>
            <span class="r">人</span>
          </div>
          <div class="reg" id="graph-user-main-reg">
            <i></i>
          </div>
        </div>
      </div>
      <div class="g-block ml10" style="height:229px;width:840px;">
        <p class="g-block-title">注册用户</p>
        <div style="padding:12px 10px 0 10px">
          <table class="g-xflow-table">
            <thead>
              <tr>
                <th width="149">指标</th>
                <th width="229">注册用户</th>
                <th width="229">活跃用户</th>
                <th width="212">启动次数|人均</th>
              </tr>
            </thead>
            <tbody id="ontime_table">
            </tbody>
          </table>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="g-title" style="margin-top:20px;">时段分析</div>
    <div>
      <div class="g-block" style="height:330px;width:380px;">
        <p class="g-block-title">注册用户</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="graph-a-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:330px;width:380px;">
        <p class="g-block-title">活跃用户</p>
        <div class="g-block-graph" style="height:270px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="graph-b-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:330px;width:380px;">
        <p class="g-block-title">启动次数</p>
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
    <div class="g-title" style="margin-top:20px;">TOP</div>
    <div>
      <div class="g-block" style="height:360px;width:575px;">
        <p class="g-block-title">渠道注册TOP10</p>
        <div class="g-block-graph" style="height:300px;margin-top:-21px">
          <div class="graph" id="graph-d-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:360px;width:575px;">
        <p class="g-block-title">页面TOP10</p>
        <div class="g-block-graph" style="height:300px;margin-top:-21px">
          <div class="graph" id="graph-e-main"></div>
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
import {
  currentSituation,
  periodAnalysis,
  channelTop10,
  pageTop10
} from "../../../../service/getData";
export default {
  name: "ontime",
  data() {
    return {
      userName: "",
      passWord: "",
      isAutoLogin: true,
      active_users: [],
      new_users: [],
      open_cnt: [],
      register_users: [],
      Constrastactive_users: [],
      Constrastnew_users: [],
      Constrastopen_cnt: [],
      Constrastregister_users: []
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
      this.render3Graph();
      this.renderChannelTop();
      this.renderPageTop();
    },
    renderUserGraph(todayNum, yesterdayNum) {
      $("#graph-user-main-user").text(todayNum);
      let that = this;
      var myChart = echarts.init(document.getElementById("graph-user-main"));
      myChart.clear();
      var option = {
        series: [
          {
            startAngle: 215,
            endAngle: -35,
            name: "市民健康业务域",
            type: "gauge",
            center: ["50%", "50%"], // 默认全局居中
            radius: "87%",
            axisLine: {
              show: false,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, "#ECEEF0"], [1, "#ECEEF0"]],
                width: 14
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              show: false
            }
          },
          {
            startAngle: 215,
            endAngle: -35,
            type: "gauge",
            center: ["50%", "50%"], // 默认全局居中
            radius: "87%",
            axisLine: {
              show: true,
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [0, "#5693FB"],
                  [(todayNum * 1 / yesterdayNum * 1).toFixed(2) * 1, "#5693FB"]
                ],
                width: 14
              }
            },
            splitLine: {
              show: false,
              length: 2
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      };
      myChart.setOption(option);
      var t = 0;
      if (yesterdayNum != 0) {
        t = todayNum / yesterdayNum;
      }
      t > 1 && (t = 1);
      setTimeout(function() {
        $("#graph-user-main-reg").css(
          "transform",
          "rotate(" + (220 * t - 25).toFixed(0) + "deg)"
        );
        $("#graph-user-main-reg").css(
          "-webkit-transform",
          "rotate(" + (220 * t - 25).toFixed(0) + "deg)"
        );
      }, 0);
    },
    renderTable() {
      let that = this;
      currentSituation({
        appSource: this.appSource,
        os: this.headerTapOs
      })
        .then(data => {
          if (data.success) {
            var Ttime = data.model.cur.avg_users;
            var Tave =
              data.model.cur.open_cnt +
              "&nbsp;|&nbsp;" +
              parseFloat(Ttime).toFixed(2);
            var Tshtml =
              '<tr><td>今日</td><td style="text-align:right">' +
              data.model.cur.register_users +
              '</td><td style="text-align:right">' +
              data.model.cur.active_users +
              '</td><td style="text-align:right">' +
              Tave +
              "</td></tr>";
            var Ytime = data.model.last.avg_users;
            var Yave =
              data.model.last.open_cnt +
              "&nbsp;|&nbsp;" +
              parseFloat(Ytime).toFixed(2);
            var Yshtml =
              '<tr><td>昨日</td><td style="text-align:right">' +
              data.model.last.register_users +
              '</td><td style="text-align:right">' +
              data.model.last.active_users +
              '</td><td style="text-align:right">' +
              Yave +
              "</td></tr>";

            if (data.model.ratio.new_users == undefined) {
              data.model.ratio.new_users = "";
            } else {
              data.model.ratio.new_users = data.model.ratio.new_users * 100;
              data.model.ratio.new_users = data.model.ratio.new_users.toFixed(
                2
              );
            }
            if (data.model.ratio.register_users == undefined) {
              data.model.ratio.register_users = 0;
            } else {
              data.model.ratio.register_users =
                data.model.ratio.register_users * 100;
              data.model.ratio.register_users = data.model.ratio.register_users.toFixed(
                2
              );
            }
            if (data.model.ratio.active_users == undefined) {
              data.model.ratio.active_users = 0;
            } else {
              data.model.ratio.active_users =
                data.model.ratio.active_users * 100;
              data.model.ratio.active_users = data.model.ratio.active_users.toFixed(
                2
              );
            }
            if (data.model.ratio.open_cnt == undefined) {
              data.model.ratio.open_cnt = "0";
            } else {
              data.model.ratio.open_cnt = data.model.ratio.open_cnt * 100;
              data.model.ratio.open_cnt = data.model.ratio.open_cnt.toFixed(2);
            }
            if (data.model.ratio.avg_users == undefined) {
              data.model.ratio.avg_users = "0";
            } else {
              data.model.ratio.avg_users = data.model.ratio.avg_users * 100;
              data.model.ratio.avg_users = data.model.ratio.avg_users.toFixed(
                2
              );
            }

            var Rave =
              '<span class="' +
              (data.model.ratio.open_cnt > 0 ? "text-down" : "text-up") +
              '">' +
              data.model.ratio.open_cnt +
              "%</span>" +
              "&nbsp;|&nbsp;" +
              '<span class="' +
              (data.model.ratio.avg_users > 0 ? "text-down" : "text-up") +
              '">' +
              data.model.ratio.avg_users +
              "%</span>";
            if (data.model.ratio.register_users > 0) {
              var regRatio = "text-down";
            } else {
              var regRatio = "text-up";
            }

            if (data.model.ratio.active_users > 0) {
              var actRatio = "text-down";
            } else {
              var actRatio = "text-up";
            }
            var Rshtml =
              "<tr><td>环比</td><td class='" +
              regRatio +
              '\'  style="text-align:right">' +
              data.model.ratio.register_users +
              "%</td><td class='" +
              actRatio +
              '\' style="text-align:right">' +
              data.model.ratio.active_users +
              '%</td><td  style="text-align:right">' +
              Rave +
              "</td></tr>";
            var Total = Tshtml + Yshtml + Rshtml;
            $("#ontime_table").html(Total);
            that.renderUserGraph(
              data.model.cur.register_users,
              data.model.last.register_users
            );
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
            // console.log(data)
            if (!data[1]) {
              if ((data[0].seriesName = "昨日")) {
                data[1] = {
                  color: "#F9D348",
                  value: data[0].value
                };
                data[0].value = "--";
                data[0].color = "#5693FB";
              } else {
                data[1] = {
                  color: "#F9D348",
                  value: "--"
                };
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
            data: that.register_users
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
                color: "#F9D348"
              }
            },

            data: that.Constrastregister_users
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
              if ((data[0].seriesName = "昨日")) {
                data[1] = {
                  color: "#F9D348",
                  value: data[0].value
                };
                data[0].value = "--";
                data[0].color = "#5693FB";
              } else {
                data[1] = {
                  color: "#F9D348",
                  value: "--"
                };
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
            data: that.active_users
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
                color: "#F9D348"
              }
            },

            data: that.Constrastactive_users
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphC() {
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
              if ((data[0].seriesName = "昨日")) {
                data[1] = {
                  color: "#F9D348",
                  value: data[0].value
                };
                data[0].value = "--";
                data[0].color = "#5693FB";
              } else {
                data[1] = {
                  color: "#F9D348",
                  value: "--"
                };
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
            data: that.open_cnt
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
                color: "#F9D348"
              }
            },

            data: that.Constrastopen_cnt
          }
        ]
      };
      myChart.setOption(option);
    },
    render3Graph() {
      periodAnalysis({
        appSource: this.appSource,
        os: this.headerTapOs,
        datecnt: 0
      })
        .then(data => {
          if (data.success) {
            var that = this;
            that.new_users = [];
            that.active_users = [];
            that.open_cnt = [];
            that.register_users = [];

            $.each(data.model, function(idx, one) {
              that.new_users.push(one.new_users);
              that.active_users.push(one.active_users);
              that.open_cnt.push(one.open_cnt);
              that.register_users.push(one.register_users);
            });

            periodAnalysis({
              appSource: this.appSource,
              os: this.headerTapOs,
              datecnt: 1
            })
              .then(data => {
                if (data.success) {
                  var that = this;
                  that.Constrastactive_users = [];
                  that.Constrastnew_users = [];
                  that.Constrastopen_cnt = [];
                  that.Constrastregister_users = [];
                  $.each(data.model, function(idx, one) {
                    that.Constrastnew_users.push(one.new_users);
                    that.Constrastactive_users.push(one.active_users);
                    that.Constrastopen_cnt.push(one.open_cnt);
                    that.Constrastregister_users.push(one.register_users);
                  });

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
              })
              .catch(err => {
                console.log(err);
                this.$refs.Alert.showError();
              });
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
    renderChannelTop() {
      channelTop10({
        appSource: this.appSource,
        os: this.headerTapOs
      })
        .then(data => {
          if (data.success) {
            var that = this;
            var channelArr = [];
            var pvArr = [];
            $.each(data.model, function(idx, one) {
              channelArr.unshift(one.channel);
              pvArr.unshift(one.register_users);
            });

            if (channelArr.length <= 0) {
              $("#graph-d-main").removeAttr("_echarts_instance_");
              $("#graph-d-main").html('<div class="g-nodata">暂无数据...</div>');
              return;
            }
            var myChart = echarts.init(document.getElementById("graph-d-main"));
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
                data: channelArr,
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
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
        });
    },
    renderPageTop() {
      pageTop10({
        appSource: this.appSource,
        os: this.headerTapOs
      })
        .then(data => {
          if (data.success) {
            var that = this;
            var urlArr = [];
            var pvArr = [];
            $.each(data.model, function(idx, one) {
              urlArr.unshift(one.url);
              pvArr.unshift(one.active_users);
            });

            if (urlArr.length <= 0) {
              $("#graph-e-main").removeAttr("_echarts_instance_");
              $("#graph-e-main").html('<div class="g-nodata">暂无数据...</div>');
              return;
            }
            var myChart = echarts.init(document.getElementById("graph-e-main"));
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
                data: urlArr,
                axisTick: {
                  show: false
                },
                axisLabel: {
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
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
        });
    }
  },
  components: {
    alertBox
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
    transform: rotate(-25deg);
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
</style>
