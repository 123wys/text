<template>
  <div>
    <div class="top">
      <div class="g-title">加载时间</div>
      <div class="block">
        <span class="dateChoose">HOST:</span>
        <select @change="selectHostChange(selectHost)" v-model="selectHost">
          <option v-for="one in selecetHosts">{{one}}</option>
        </select>
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="dateRange" @change="getDate" size="small" type="daterange">
        </el-date-picker>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">加载时间趋势</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="graph-a-main"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">地域分布</p>
        <div class="g-block-graph" style="height:420px;margin-top:-45px;margin-left:10px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="graph-b-main"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="g-title">Path加载时间分析</div>
    <div>
      <div class="g-block" style="width:100%;">
        <table class="g-xflow-table">
          <thead>
            <tr>
              <th width="40%">Path</th>
              <th width="10%">加载时间(毫秒)</th>
              <th width="10%">成功数</th>
              <th width="10%">失败数(all)</th>
              <th width="10%">失败原因1</th>
              <th width="10%">失败原因2</th>
              <th width="10%">失败率</th>
            </tr>
          </thead>
          <tbody id="loadTimeTable_data1"></tbody>
        </table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="originSizes" :page-size="originSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  netAnalysisHosts,
  loadtimeTrend,
  areaDistribute,
  netAnalysisPath
} from "../../../../service/getData";
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
  name: "ontime",
  data() {
    return {
      dateRange: [
        parseDate(new Date() * 1 - 30 * 24 * 3600 * 1000, 1),
        parseDate(new Date() * 1 - 1 * 24 * 3600 * 1000, 1)
      ],
      selecetHosts: [],
      selectHost: "",
      originSizes: [10, 20, 50],
      total: 0,
      originSize: 10,
      pageNum: 1
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
    handleSizeChange(v) {
      this.originSize = v;
      this.pageNum = 1;
      this.renderTable();
    },
    handleCurrentChange(v) {
      this.pageNum = v;
      this.renderTable();
    },
    getDate(v) {
      this.dateRange = [parseDate(v[0] * 1, 1), parseDate(v[1] * 1, 1)];
      this.renderAll();
    },
    selectHostChange(v) {
      debugger;
      this.selectHost = v;
      //获取下拉列表
      this.renderAll();
    },
    renderAll() {
      let that = this;
      netAnalysisHosts({
        appSource: this.appSource,
        os: this.headerTapOs,
        host: "",
        startDate: that.dateRange[0].split("-").join(""),
        endDate: that.dateRange[1].split("-").join("")
      })
        .then(data => {
          if (data.success) {
            var array = data.model;
            that.selecetHosts = array;
            if (array && array.length > 0) {
              !that.selectHost && (that.selectHost = array[0]);
              that.renderGraphA();
              that.renderGraphB();
              that.renderTable();
            }
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
    renderTable() {
      let that = this;
      netAnalysisPath({
        appSource: this.appSource,
        os: this.headerTapOs,
        host: that.selectHost,
        startDate: that.dateRange[0].split("-").join(""),
        endDate: that.dateRange[1].split("-").join(""),
        pageSize: that.originSize,
        pageNumber: that.pageNum
      })
        .then(data => {
          if (data.success) {
            var shtml = "";
            (data.model.rows || []).forEach(function(one) {
              var errors = one.errors;
              var e1 = "",
                e2 = "";
              if (errors) {
                var ary = errors.split("~~~");
                e1 = ary[0];
                if (ary.length > 1) e2 = ary[1];
              }
              var failCnt = one.all_cnt - one.success_cnt;
              var failRate =
                Math.round(failCnt / one.all_cnt * 10000) / 100.0 + "%";
              shtml =
                shtml +
                '<tr><td class="table_left" title="' +
                one.path +
                '">' +
                one.path +
                "</td><td>" +
                one.load_time.toFixed(2) +
                "</td><td>" +
                one.success_cnt +
                "</td><td>" +
                failCnt +
                "</td><td>" +
                e1 +
                "</td><td>" +
                e2 +
                "</td><td>" +
                failRate +
                "</td></tr>";
            });
            that.total = data.model.total;
            $("#loadTimeTable_data1").html(shtml);
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
    LoadingTimeHost1_Nodata_chart() {},
    LoadingTimeHost1_chart(bizDate_1, loadTime_1) {
      var dataNumber = 1;
      if (bizDate_1 != undefined) {
        if (bizDate_1.length <= 5) {
        } else if (bizDate_1.length > 5) {
          dataNumber = Math.ceil(bizDate_1.length / 5);
        }
      } else {
        $("#graph-a-main").html("");
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
            data = data[0];
            $("#graph-a-x").text(data.axisValue);
            $("#graph-a-v").html(
              '<i style="background:' +
                data.color +
                '"></i><span class="l" color="' +
                data.color +
                '">加载时间:' +
                data.value +
                "</span>"
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          //icon:'image://url'
          //icon:'path://xxxxx'
          data: [{ name: "加载时间", icon: "" }],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: bizDate_1,
          axisLine: {
            lineStyle: {
              color: "#B2BBC5"
            }
          }
    
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
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
            name: "加载时间",
            type: "line",
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },

            data: loadTime_1
          }
        ]
      };
      myChart.setOption(option);
    },
    renderGraphA() {
      let that = this;
      loadtimeTrend({
        appSource: this.appSource,
        os: this.headerTapOs,
        host: that.selectHost,
        startDate: that.dateRange[0].split("-").join(""),
        endDate: that.dateRange[1].split("-").join("")
      })
        .then(data => {
          if (data.success) {
            var loadTime_1 = [];
            var bizDate_1 = [];
            if (data.model.length == 0) {
              that.LoadingTimeHost1_chart();
            } else {
              $.each(data.model, function(idx, one) {
                loadTime_1.push(parseFloat(one.load_time.toFixed(2)));
                bizDate_1.push(one.bizdate);
              });

              that.LoadingTimeHost1_chart(bizDate_1, loadTime_1);
              //-----
            }
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
    renderGraphB() {
      let that = this;
      areaDistribute({
        appSource: this.appSource,
        os: this.headerTapOs,
        host: that.selectHost,
        startDate: that.dateRange[0].split("-").join(""),
        endDate: that.dateRange[1].split("-").join("")
      })
        .then(data => {
          if (data.success) {
            var actObj_1 = {};
            var avgRegion_1 = "";
            var actData_1 = [];
            var proLoadTime_1 = [];
            var bigMap1 = 0;
            $.each(data.model, function(idx, one) {
              avgRegion_1 = one.province;
              proLoadTime_1 = parseFloat(one.load_time.toFixed(2));
              actObj_1 = {
                name: avgRegion_1,
                value: proLoadTime_1,
                showLegendSymbol: false
              };
              if (bigMap1 < proLoadTime_1) {
                bigMap1 = proLoadTime_1;
              }
              actData_1.push(actObj_1);
            });

            var regionChart = echarts.init(
              document.getElementById("graph-b-main")
            );
            regionChart.clear();
            var data_self = actData_1;
            var name_self = "平均加载时长";

            var option = {
              zoom: 1,
              tooltip: {
                trigger: "item"
              },
              legend: {
                enabled: false
              },
              itemStyle: {
                normal: {
                  borderColor: "#FFFFFF",
                  areaStyle: {
                    color: "#EFF7FF"
                  },
                  areaColor: "#FFDA0A",
                  shadowBlur: 0
                },
                emphasis: {
                  borderColor: "#FFFFFF",
                  areaColor: "#FFDA0A"
                }
              },
              visualMap: {
                min: 0,
                max: bigMap1,
                left: "left",
                top: "bottom",
                text: ["高", "低"], // 文本，默认为数值文本
                calculable: true,
                inRange: {
                  color: ["#EFF7FF", "#4dA1FF"]
                }
              },
              toolbox: {
                show: false
              },
              series: [
                {
                  name: name_self,
                  type: "map",
                  mapType: "china",
                  roam: false,
                  showLegendSymbol: false,
                  label: {
                    normal: {
                      show: true
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  itemStyle: {
                    normal: {
                      borderColor: "#fff",
                      color: "#E6EDFC"
                    },
                    emphasis: {
                      label: {
                        show: true,
                        textStyle: {
                          color: "#282E3C"
                        }
                      },
                      color: "#FFDA0A"
                    }
                  },
                  data: data_self
                }
              ]
            };
            /*option = {
              backgroundColor: "#fff",
              title: {
                text: "常住地分布",
                echart: "",
                textStyle: {
                  fontWeight: "normal", //标题颜色
                  color: "#5c5c5c",
                  fontSize: "14px"
                }
              },
              tooltip: {
                trigger: "item",
                formatter: function(v) {
                  if (v.data && v.data.name && v.data.value) {
                    return (
                      " 常住地分布<br/>" + v.data.name + " :" + v.data.value + "%"
                    );
                  } else if (v.data && v.data.name) {
                    return " 常住地分布<br/>" + v.data.name + " :0%";
                  }
                }
              },
              legend: {
                orient: "vertical",
                left: "left",
                data: ["常住地分布"],
                show: false
              },
              visualMap: {
                min: 0,
                max: bigMap1,
                left: "left",
                top: "bottom",
                text: ["高", "低"], // 文本，默认为数值文本
                calculable: true,
                inRange: {
                  color: ["#EFF7FF", "#4dA1FF"]
                }
              },

              series: [
                {
                  name: "百分比",
                  type: "map",
                  mapType: "china",
                  label: {
                    normal: {
                      show: true,
                      color: "#282e3c",
                      fontSize: "9"
                    },
                    emphasis: {
                      show: true,
                      color: "#282e3c",
                      fontSize: "9"
                    }
                  },
                  itemStyle: {
                    normal: {
                      borderColor: "#fff",
                      color: "#E6EDFC"
                    },
                    emphasis: {
                      label: {
                        show: true,
                        textStyle: {
                          color: "#282E3C"
                        }
                      },
                      color: "#FFDA0A"
                    }
                  },
                  data: actData_1
                }
              ]
            };*/
            regionChart.setOption(option);
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
