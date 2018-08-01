<template>
  <div>
    <div class="fullTable clearfix">
      <div class="searchTitle clearfix">
        <span class="f-text">页面加载趋势</span>
        <div class="fr">
          <span class="gray-text">日期选择</span>
          <el-date-picker v-model="nativeDateRang" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <button type="button" class="btnQuery" @click="getPageLoadTrend">查询</button>
        </div>
      </div>

      <div class="g-block" style="height:375px;width:100%;">
        <h2 class="g-bigTit">Native 加载时间趋势</h2>
        <div class="g-block-graph" style="height:270px;" v-loading="nativeLoading">
          <div class="g-block-hover-info">
            <p id="graph-Native-x"></p>
            <p id="graph-Native-v"></p>
          </div>
          <div class="graph" id="graph-Native"></div>
        </div>
      </div>

      <div class="g-block" style="height:375px;width:100%;margin-top:15px">
        <h2 class="g-bigTit">H5 加载时间趋势</h2>
        <div class="g-block-graph" style="height:270px;" v-loading="hfiveLoading">
          <div class="g-block-hover-info">
            <p id="graph-hfive-x"></p>
            <p id="graph-hfive-v"></p>
          </div>
          <div class="graph" id="graph-hfive"></div>
        </div>
      </div>
    </div>
    <!-- fullTable -->

    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">Native页面加载时间Top10</span>

        <div class="fr">
          <el-date-picker v-model="topDateTime" placeholder="选择日期">
          </el-date-picker>

          <button type="button" class="btnQuery" @click="getUrlLoadTrend">查询</button>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="topLoading" :data="topNativeTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in topTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- fullTable -->

    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">H5页面加载时间Top10</span>
      </div>

      <div class="tableWrapper">
        <el-table v-loading="topLoading" :data="tophfiveTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in tophfiveTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- fullTable -->
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import { pageLoadTrend, urlLoadTrend } from "../../../../service/getData";
import { formatDate } from "../../../../config/mUtils";

export default {
  name: "pageLoadPer",
  data() {
    return {
      //Native 加载时间趋势
      nativeLoading: false,
      nativeDateRang: [
        (() => {
          let now = new Date();
          return new Date(now.setMonth(now.getMonth() - 1));
        })(),
        new Date(new Date() * 1 - 24 * 3600 * 1000)
      ],
      nativeDateArr: [],
      nativeCountArr: [],
      //H5 加载时间趋势
      hfiveLoading: false,

      hfiveDateArr: [],
      hfiveCountArr: [],

      // top10
      topLoading: false,

      topTitles: [
        {
          name: "Native页面",
          tdKey: "url"
        },
        {
          name: "加载时间",
          tdKey: "loadTime"
        },
        {
          name: "IP",
          tdKey: "ip" //接口暂无 临时占位
        },
        {
          name: "省份",
          tdKey: "province"
        },
        {
          name: "城市",
          tdKey: "city" //接口暂无 临时占位
        }
      ],
      topDateTime: new Date(new Date() * 1 - 24 * 3600 * 1000),
      topNativeTableData: [],
      //H5 Top10
      tophfiveTitles: [
        {
          name: "H5页面",
          tdKey: "url"
        },
        {
          name: "加载时间",
          tdKey: "loadTime"
        },
        {
          name: "IP",
          tdKey: "ip" //接口暂无 临时占位
        },
        {
          name: "省份",
          tdKey: "province"
        },
        {
          name: "城市",
          tdKey: "city" //接口暂无 临时占位
        }
      ],
      tophfiveTableData: []
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]), //获取全局appSource os
    nativeStartDate() {
      return formatDate(this.nativeDateRang[0]);
    },
    nativeEndDate() {
      return formatDate(this.nativeDateRang[1]);
    },
    topDate() {
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
      this.getPageLoadTrend();
      this.getUrlLoadTrend();
    },

    async getPageLoadTrend() {
      try {
        this.nativeLoading = true;
        let data = await pageLoadTrend({
          startDate: this.nativeStartDate,
          endDate: this.nativeEndDate,
          appSource: this.appSource,
          os: this.headerTapOs
        });
        this.nativeLoading = false;
        if (data.success) {
          data.model.forEach(ele => {
            switch (ele.type) {
              case "H5":
                this.hfiveDateArr.push(ele.bizdate);
                this.hfiveCountArr.push(ele.loadtimeAvg);
                break;

              case "Native":
                this.nativeDateArr.push(ele.bizdate);
                this.nativeCountArr.push(ele.loadtimeAvg);
                break;
            }
          });
          this.renderNative();
          this.renderhFive();
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.nativeLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getUrlLoadTrend() {
      try {
        this.topLoading = true;
        let data = await urlLoadTrend({
          endDate: this.topDate,
          appSource: this.appSource,
          os: this.headerTapOs
        });
        this.topLoading = false;
        if (data.success) {
          this.topNativeTableData = data.model;
          this.tophfiveTableData = data.model;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.topLoading = false;
        this.$refs.Alert.showError();
      }
    },

    renderNative() {
      var myChart = echarts.init(document.getElementById("graph-Native"));
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
              data[1] = {
                value: "--"
              };
            }
            $("#graph-Native-x").text(data[0].axisValue);
            $("#graph-Native-v").html(
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
                '">'
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          data: ["当前"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap:  true,
          data: this.nativeDateArr,
          axisLine: {
            lineStyle: {
              color: "#D8E1EB",
            }
          },
          axisLabel: {
            color: "#B2BBC5",
            align: "right",
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
            name: "数量",
            type: "line",
            smooth: true,
            showSymbol: false,
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },

            data: this.nativeCountArr
          }
        ]
      };
      myChart.setOption(option);
    },

    renderhFive() {
      var myChart = echarts.init(document.getElementById("graph-hfive"));
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
              data[1] = {
                value: "--"
              };
            }
            $("#graph-hfive-x").text(data[0].axisValue);
            $("#graph-hfive-v").html(
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
                '">'
            );
            //写内容xxxx
            return "";
          }
        },
        legend: {
          data: ["当前"],
          right: "0",
          top: "0"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.hfiveDateArr,
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
            name: "数量",
            type: "line",
            smooth: true,
            showSymbol: false,
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#5693FB"
              }
            },

            data: this.hfiveCountArr
          }
        ]
      };
      myChart.setOption(option);
    },

    topSizeChange(val) {
      console.log(val);
      this.topPageSize = val;
      this.topCurrentPage = 1;
    },
    topCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.topCurrentPage = val;
    }
  },

  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>