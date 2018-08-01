<template>
  <div>
    <div class="top">
      <div class="g-title">流量趋势</div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker v-model="dateRange" size="small" type="daterange">
        </el-date-picker>
        <button type="button" class="btnQuery" @click="getAllResource">查询</button>
        <span class="download" @click="downLoadTrend">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;">
        <p class="g-block-title">页面浏览量</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="trendTable1"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;">
        <p class="g-block-title">访问用户量</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-b-x"></p>
            <p id="graph-b-v"></p>
          </div>
          <div class="graph" id="trendTable2"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">新访问用户量</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="trendTable3"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">分享次数</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-d-x"></p>
            <p id="graph-d-v"></p>
          </div>
          <div class="graph" id="trendTable4"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:420px;width:575px;margin-top: 10px;">
        <p class="g-block-title">分享人数</p>
        <div class="g-block-graph" style="height:360px;">
          <div class="g-block-hover-info">
            <p id="graph-c-x"></p>
            <p id="graph-c-v"></p>
          </div>
          <div class="graph" id="trendTable5"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="top">
      <div class="g-title">页面分析</div>
      <div class="block clearfix">
        <el-date-picker class="fl" v-model="endDate" size="small" type="date">
        </el-date-picker>

        <button type="button" class="btnQuery fl" @click="pageAnalysis">查询</button>
        <ul class="dateRange fl" style="margin-left: 5px;">
          <li v-for="item in date" :class="{'dateRangeAct': datecnt == item.id}" @click="chooseTimeRang(item.id)">{{ item.time }}</li>
        </ul>
        <span class="download fl" @click="downLoadAnalysis">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div class="g-block" style="width:575px">
      <div class="top" style="padding: 10px;width:575px">
        <div style="font-size: 14px;">受访页面Top10</div>
      </div>
      <div>
        <table class="g-xflow-table fl" style="height:420px;width:575px">
          <thead>
            <tr style="font-size: 14px;">
              <th>受访页面</th>
              <th>页面浏览量</th>
              <th>占比</th>
            </tr>
          </thead>
          <tbody id="TotalTrend">

          </tbody>
        </table>
        <!--没有分页-->
      </div>
    </div>

    <div class="g-block " style="width:575px;margin-left:10px">

      <div class="top" style="padding: 10px;width:575px">
        <div style="font-size: 14px;">受访页面Top10</div>
      </div>

      <div>
        <table class="g-xflow-table" style="height:420px;width:575px">
          <thead>
            <tr>
              <th width="50%">入口页面</th>
              <th width="25%">页面浏览量</th>
              <th width="25%">占比</th>
            </tr>
          </thead>
          <tbody id="Totaltrend_table">

          </tbody>
        </table>
      </div>

    </div>

    <div class="top">
      <div class="g-title">页面概览</div>
    </div>
    <div class="g-block" style="width:100%">
      <div class="top" style="padding: 10px;">
        <div style="font-size: 14px;">受访页面Top10</div>
      </div>
      <div>
        <table class="g-xflow-table" style="height:420px;">
          <thead>
            <tr style="font-size: 14px;">
              <th>日期</th>
              <th>页面路径</th>
              <th>访问页面</th>
              <th>访问人数</th>
              <th>次均时长</th>
              <th>入口页次数</th>
              <th>退出率</th>
              <th>分享次数</th>
              <th>分享人数</th>
            </tr>
          </thead>
          <tbody id="loadTimeTable_data2">

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
import { overallTrend, trendTop10 } from "../../../../service/getData";
import alertBox from "../../../../components/common/alertBox/alertBox";
import download from "../../svg/download";
import { Download, G, formatDate } from "../../../../config/mUtils";
export default {
  name: "microTrend",
  data() {
    let startDate = new Date();
    startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
    return {
      dateRange: [startDate, new Date(new Date() - 1 * 24 * 3600 * 1000)],
      value: [new Date(new Date() - 1 * 24 * 3600 * 1000)],
      endDate: new Date(new Date() - 1 * 24 * 3600 * 1000),
      date: [
        { time: "昨日", id: 1 },
        { time: "近7日", id: 7 },
        { time: "近30日", id: 30 }
      ],
      datecnt: 1,
      chooseIndex: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      newData: [],
      openData: [],
      regData: [],
      actData: [],
      bizDate: [],
      pagePV: [],
      pageUV: [],
      pageID: [],
      deviceModel: [],
      deviceX: [],
      actUsernum: [],
      actUserX: [],
      regUsernum: [],
      regX: []
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]),
    trendStartDate() {
      return formatDate(this.dateRange[0]);
    },
    trendEndDate() {
      return formatDate(this.dateRange[1]);
    },
    analysisEndDate() {
      return formatDate(this.endDate);
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.initPage();
    });
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      Object.assign(this.$data, this.$options.data()); //初始化data
      this.initPage();
    }
  },

  methods: {
    initPage() {
      this.getAllResource();
      this.pageAnalysis();
      this.getOverview();
    },
    //全部来源
    getAllResource: function() {
      let _this = this;
      G.ajax({
        url: "/overview/xcx_trend/flow.json",
        data: {
          startDate: this.trendStartDate,
          endDate: this.trendEndDate,
          appSource: this.appSource
        },
        cache: false,
        success: function(data) {
          if (data.success) {
            var newData1 = [];
            var newData2 = [];
            var newData3 = [];
            var newData4 = [];
            var newData5 = [];

            var bizDate = [];
            $.each(data.model, function(idx, one) {
              newData1.push(one.pv); //页面浏览量
              newData2.push(one.uv); //网站访问量
              newData3.push(one.uvNew); //访问用户量
              newData4.push(one.pvShare); //新用户访问量
              newData5.push(one.uvShare);
              bizDate.push(one.bizdate);
            });
            _this.pageCharts1(newData1, bizDate);
            _this.pageCharts2(newData2, bizDate);
            _this.pageCharts3(newData3, bizDate);
            _this.pageCharts4(newData4, bizDate);
            _this.pageCharts5(newData5, bizDate);
          }
        }
      });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getOverview();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOverview();
    },

    chooseTimeRang(value) {
      this.datecnt = value;
    },

    // 网页分析  受访页面top10
    pageAnalysis: function() {
      G.ajax({
        url: "/overview/xcx_trend/page_top10.json",
        data: {
          bizdate: this.analysisEndDate,
          appSource: this.appSource,
          freq: this.datecnt
        },
        cache: false,
        success: function(data) {
          if (data.success) {
            var shtml = "";
            $.each(data.model.entryUrl, function(idx, one) {
              one.ratio = parseFloat(one.ratio) * 100;
              one.ratio = G.fixNum(one.ratio, 2) + "%";
              shtml =
                shtml +
                '<tr role="row" class="odd"><td class="table_left" title="' +
                one.url +
                '">' +
                one.url +
                "</td><td>" +
                one.pv +
                "</td><td>" +
                one.ratio +
                "</td></tr>";
            });
            $("#Totaltrend_table").html(shtml);

            var shtml1 = "";
            $.each(data.model.url, function(idx, one) {
              one.ratio = parseFloat(one.ratio) * 100;
              one.ratio = G.fixNum(one.ratio, 2) + "%";
              shtml1 =
                shtml1 +
                '<tr role="row" class="odd"><td class="table_left" title="' +
                one.url +
                '">' +
                one.url +
                "</td><td>" +
                one.pv +
                "</td><td>" +
                one.ratio +
                "</td></tr>";
            });
            $("#TotalTrend").html(shtml1);
          }
        }
      });
    },

    getOverview: function() {
      let _this = this;
      G.ajax({
        url: "/overview/xcx_trend/page.json",
        data: {
          bizdate: this.analysisEndDate,
          appSource: this.appSource,
          freq: this.datecnt,
          pageNumber: this.currentPage,
          pageSize: this.pageSize
        },
        cache: false,
        success: function(data) {
          if (data.success) {
            _this.total = data.model.total;
            var shtml = "";
            var num = "";
            $.each(data.model.rows, function(idx, one) {
              num = parseInt(idx) + 1 * 1;
              one.loadtime = G.fixNum(one.loadtime, 2);
              one.exitRate = G.fixNum(one.exitRate, 2) + "%";
              shtml =
                shtml +
                '<tr role="row" class="odd"><td>' +
                num +
                '</td><td class="table_left" title="' +
                one.url +
                '">' +
                one.url +
                "</td><td>" +
                one.pv +
                "</td><td>" +
                one.uv +
                "</td><td>" +
                one.loadtime +
                "</td><td>" +
                one.enUrlPv +
                "</td><td>" +
                one.exitRate +
                "</td><td>" +
                one.pvShare +
                "</td><td>" +
                one.uvShare +
                "</td></tr>";
            });
            $("#loadTimeTable_data2").html(shtml);
          }
        }
      });
    },

    pageCharts1: function(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        $("#trendTable1").empty();
        return;
      }
      var myChart = echarts.init(document.getElementById("trendTable1"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#3F8BED"],
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          show: false,
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: bizDate,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: dataNumber
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
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "PV",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                opacity: 0.3
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },

    pageCharts2: function(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        $("#trendTable2").empty();
        return;
      }
      var myChart = echarts.init(document.getElementById("trendTable2"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#3F8BED"],
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          show: false,
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: bizDate,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: dataNumber
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
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "UV",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                opacity: 0.3
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },

    pageCharts3: function(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        $("#trendTable3").empty();
        return;
      }
      var myChart = echarts.init(document.getElementById("trendTable3"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#3F8BED"],
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          show: false,
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: bizDate,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: dataNumber
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
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "UV_New",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                opacity: 0.3
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },

    pageCharts4: function(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        $("#trendTable4").empty();
        return;
      }
      var myChart = echarts.init(document.getElementById("trendTable4"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#3F8BED"],
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          show: false,
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: bizDate,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: dataNumber
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
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "PV_Share",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                opacity: 0.3
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },

    pageCharts5: function(newData, bizDate) {
      var dataNumber = 1;
      if (bizDate != undefined) {
        if (bizDate.length <= 5) {
        } else if (bizDate.length > 5) {
          dataNumber = Math.ceil(bizDate.length / 5);
        }
      } else {
        $("#trendTable5").empty();
        return;
      }
      var myChart = echarts.init(document.getElementById("trendTable5"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#3F8BED"],
        legend: {
          data: [
            {
              icon: "circle",
              name: "UV"
            }
          ],
          show: false,
          bottom: "0px"
        },
        xAxis: [
          {
            type: "category",
            data: bizDate,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: dataNumber
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
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "UV_Share",
            type: "line",
            smooth: true,
            showSymbol: false,
            areaStyle: {
              normal: {
                opacity: 0.3
              }
            },
            data: newData
          }
        ]
      };
      myChart.setOption(option);
    },

    downLoadTrend() {
      let url = `/overview/xcx_trend/flow_export.json?startDate=${this
        .trendStartDate}&endDate=${this.trendEndDate}&appSource=${this
        .appSource}`;
      Download(url);
    },

    downLoadAnalysis() {
      let url = `/overview/xcx_trend/page_export.json?bizdate=${this
        .analysisEndDate}&pageSize=${this.pageSize}&pageNumber=${this
        .currentPage}&appSource=${this.appSource}`;
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


</style>
