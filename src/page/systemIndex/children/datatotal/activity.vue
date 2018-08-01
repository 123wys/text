<template>
  <div>
    <div class="top">
      <div class="g-title">渠道趋势</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="dateRange" @change="getDate" size="small" type="daterange">
        </el-date-picker>
        <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div class="g-block" style="height:450px;width:1160px;">
      <p class="g-block-title">注册用户</p>
      <div class="g-block-graph" style="height:410px;margin-top: -21px;">
        <div class="graph" id="Qudao_trend"></div>
      </div>
    </div>
    <div class="g-block" style="height:450px;width:1160px;margin-top: 10px;">
      <p class="g-block-title">激活用户</p>
      <div class="g-block-graph" style="height:410px;margin-top: -21px;">
        <div class="graph" id="Qudao_open"></div>
      </div>
    </div>
    <div class="g-block" style="height:450px;width:1160px;margin-top: 10px;">
      <p class="g-block-title">活跃用户</p>
      <div class="g-block-graph" style="height:410px;margin-top: -21px;">
        <div class="graph" id="Qudao_act"></div>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:360px;width:575px;margin-top: 10px;">
        <p class="g-block-title">注册用户占比</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="RegUser_pie"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:360px;width:575px;margin-top: 10px;">
        <p class="g-block-title">活跃用户占比</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="ActiveUser_pie"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="top">
      <div class="g-title">整体趋势明细</div>
    </div>
    <div class="g-block" style="width:100%;">
      <div id="bigDataTable" style="">
        <table class="g-xflow-table">
          <thead>
            <tr style="font-size: 14px;">
              <th>日期</th>
              <th>系统</th>
              <th>渠道</th>
              <th>激活用户</th>
              <th>活跃用户</th>
              <th>累计激活用户</th>
              <th>注册</th>
              <th>累计注册</th>
            </tr>
          </thead>
          <tbody id="user_stay">
       
          </tbody>
        </table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { channelTrendTop, channelTrend } from "../../../../service/getData";
import download from "../../svg/download";
import dateFormat from "dateFormat";
import { Download } from "../../../../config/mUtils";
import alertBox from "../../../../components/common/alertBox/alertBox";
export default {
  data() {
    let startDate = new Date();
    startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
    return {
      dateRange: [startDate, new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)],
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      bizDate: [],
      quDao: [],
      totalQUdaodata: [],
      totalregQUdaodata: [],
      totalnewQUdaodata: [],
      timechart: [],
      regPie: [],
      openPie: []
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
    getDate() {
      if (this.dateRange && this.dateRange[0] && this.dateRange[1]) {
        this.renderAll();
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
    goDownload() {
      var startDate = dateFormat(this.dateRange[0], "yyyymmdd");
      var endDate = dateFormat(this.dateRange[1], "yyyymmdd");
      let url = `/overview/channel_activity/channel_trendExport.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
        .appSource}&os=${this.headerTapOs}`;
      Download(url);
    },
    renderAll() {
      this.renderChannelTrendTop();
      this.renderChannelTrend();
    },
    renderChannelTrendTop() {
      let that = this;
      channelTrendTop({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRange[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            let that = this;
            that.totalQUdaodata = [];
            that.totalregQUdaodata = [];
            that.totalnewQUdaodata = [];
            that.timechart = [];
            $.each(data.model.detail, function(idx, one) {
              var newdate = one.bizdate;
              if (that.bizDate[0] != newdate) {
                that.bizDate.unshift(newdate);
              }
            });
            $.each(data.model.detail, function(idx, one) {
              if (that.bizDate[0] == one.bizdate) {
                that.quDao.push(one.channelId);
              }
            });
            var TotalArr = [];
            var Totalreg = [];
            var Totalnew = [];
            $.each(that.quDao, function(idx, one) {
              var qu_Daoname = one;
              var arr = [];
              var regUsersarr = [];
              var newDevicesarr = [];
              $.each(data.model.detail, function(idx, one) {
                if (one.channelId == qu_Daoname) {
                  arr.push(one.actUsers);
                  regUsersarr.push(one.regUsers);
                  newDevicesarr.push(one.newDevices);
                }
              });
              TotalArr.push(arr);
              Totalreg.push(regUsersarr);
              Totalnew.push(newDevicesarr);
            });
            that.timechart = that.bizDate.reverse();
            $.each(that.quDao, function(idx, one) {
              var serobj = {};
              var regobj = {};
              var newobj = {};
              serobj = {
                name: one,
                data: TotalArr[idx],
                type: "line",
                smooth: true,
                showSymbol: false,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: "solid"
                    }
                  }
                }
              };
              regobj = {
                name: one,
                data: Totalreg[idx],
                type: "line",
                smooth: true,
                showSymbol: false,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: "solid"
                    }
                  }
                }
              };
              newobj = {
                name: one,
                data: Totalnew[idx],
                type: "line",
                smooth: true,
                showSymbol: false,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: "solid"
                    }
                  }
                }
              };
              that.totalQUdaodata.push(serobj);
              that.totalregQUdaodata.push(regobj);
              that.totalnewQUdaodata.push(newobj);
            });
            that.QudaoTrend();
            that.QudaoAct();
            that.QudaoOpen();
          } else {
            that.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            that.$refs.Alert.showError(data.message);
          }
        })
        .catch(err => {
          this.$refs.Alert.showError();
        });
    },
    renderChannelTrend() {
      let that = this;
      channelTrend({
        appSource: this.appSource,
        os: this.headerTapOs,
        startDate: dateFormat(this.dateRange[0], "yyyymmdd"),
        endDate: dateFormat(this.dateRange[1], "yyyymmdd")
      })
        .then(data => {
          if (data.success) {
            let that = this;
            that.regPie = [];
            that.openPie = [];
            var shtml = "";
            var labelXfalse = {
              normal: {
                show: false,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            };

            $.each(data.model.regRatio, function(idx, one) {
              var regSmall = {};
              if (idx < 12) {
                regSmall = {
                  name: one.channelId,
                  value: one.regUsers
                };
              } else {
                regSmall = {
                  name: one.channelId,
                  value: one.regUsers,
                  itemStyle: labelXfalse
                }; //记得修改
              }
              that.regPie.push(regSmall);
            });

            $.each(data.model.senRatio, function(idx, one) {
              var openSmall = {};
              if (idx < 12) {
                openSmall = {
                  name: one.channelId,
                  value: one.newDevices
                };
              } else {
                openSmall = {
                  name: one.channelId,
                  value: one.newDevices,
                  itemStyle: labelXfalse
                };
              }
              that.openPie.push(openSmall);
            });
            var i = 0;
            data.model.detail.forEach(one => {
              if (one.newDevices != 0 && one.regUsers != 0) {
                i++;
                shtml =
                  shtml +
                  "<tr><td>" +
                  one.bizdate +
                  "</td><td>" +
                  one.os +
                  "</td><td>" +
                  one.channelId +
                  "</td><td>" +
                  one.newDevices +
                  "</td><td>" +
                  one.actUsers +
                  "</td><td>" +
                  one.allDevices +
                  "</td><td>" +
                  one.regUsers +
                  "</td><td>" +
                  one.allUsers +
                  "</td></tr>";
              }
            });
            this.total = i;
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
            that.RegUser_pie();
            that.ActiveUser_pie();
          } else {
            that.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            that.$refs.Alert.showError(data.message);
          }
        })
        .catch(err => {
          that.$refs.Alert.showError();
        });
    },
    QudaoTrend() {
      let that = this;
      var dataNumber = 1;
      if (that.timechart != undefined) {
        if (that.timechart.length <= 5) {
        } else if (that.timechart.length > 5) {
          dataNumber = Math.ceil(that.timechart.length / 5);
        }
      } else {
        return;
      }
      var xNum = [];
      if (that.totalregQUdaodata.length > 0) {
        $.each(that.totalregQUdaodata, function(idx, one) {
          var obj = {
            name: one.name
          };
          xNum.push(obj);
        });
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Qudao_trend"));
      myChart.clear();
      var option = {
        title: {
          left: "0%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        color: [
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
        ],
        legend: {
          data: xNum,
          right: "0",
          top: 0
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: that.timechart,
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
        series: that.totalregQUdaodata
      };
      myChart.setOption(option);
    },
    QudaoOpen() {
      let that = this;
      var dataNumber = 1;
      if (that.timechart != undefined) {
        if (that.timechart.length <= 5) {
        } else if (that.timechart.length > 5) {
          dataNumber = Math.ceil(that.timechart.length / 5);
        }
      } else {
        return;
      }
      var xNum = [];
      if (that.totalnewQUdaodata.length > 0) {
        $.each(that.totalnewQUdaodata, function(idx, one) {
          var obj = {
            name: one.name
          };
          xNum.push(obj);
        });
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Qudao_open"));
      myChart.clear();
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        color: [
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
        ],
        legend: {
          data: xNum,
          right: "0",
          top: 0
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: that.timechart,
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
        series: that.totalnewQUdaodata
      };
      myChart.setOption(option);
    },
    QudaoAct() {
      let that = this;
      var dataNumber = 1;
      if (that.timechart != undefined) {
        if (that.timechart.length <= 5) {
        } else if (that.timechart.length > 5) {
          dataNumber = Math.ceil(that.timechart.length / 5);
        }
      } else {
        return;
      }
      var xNum = [];
      if (that.totalQUdaodata.length > 0) {
        $.each(that.totalQUdaodata, function(idx, one) {
          var obj = {
            name: one.name
          };
          xNum.push(obj);
        });
      } else {
        return;
      }
      var myChart = echarts.init(document.getElementById("Qudao_act"));
      myChart.clear();
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line"
          }
        },
        color: [
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
        ],
        legend: {
          data: xNum,
          right: "0",
          top: 0
        },
        grid: {
          left: "1%",
          right: "2%",
          top: "60px",
          bottom: "0%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: that.timechart,
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
        series: that.totalQUdaodata
      };
      myChart.setOption(option);
    },
    RegUser_pie() {
      let that = this;
      var myChart = echarts.init(document.getElementById("RegUser_pie"));
      myChart.clear();
      let arr = [];
      that.regPie.forEach(value => {
        arr.push(value);
      });
      console.log(that.regPie);
      let option = {
        title: {
          text: null,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          enabled: false
        },
        color: [
          "#748CB2",
          "#9CC677",
          "#EACF5E",
          "#F9AD79",
          "#D16A7C",
          "#8873A2",
          "#3A95B3",
          "#B6D949",
          "#FDD36C",
          "#F47958"
        ],
        series: [
          {
            name: "注册用户占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "45%"],
            data: that.regPie,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    ActiveUser_pie() {
      let that = this;
      var myChart = echarts.init(document.getElementById("ActiveUser_pie"));
      myChart.clear();
      let option = {
        title: {
          text: null,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          enabled: false
        },
        color: [
          "#748CB2",
          "#9CC677",
          "#EACF5E",
          "#F9AD79",
          "#D16A7C",
          "#8873A2",
          "#3A95B3",
          "#B6D949",
          "#FDD36C",
          "#F47958"
        ],
        series: [
          {
            name: "激活用户占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "45%"],
            data: that.openPie,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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

<style>

</style>
