<template>
  <div>
    <div class="fullTable clearfix">
      <div class="searchTitle clearfix">
        <span class="f-text">错误趋势</span>
        <div class="fr">
          <span class="gray-text">应用版本</span>
          <el-select class="s-select" v-model="version" filterable placeholder="请选择" style="width: 150px;">
            <el-option v-for="item in options" :label="item.appVersion" :value="item.appVersion" :key="item.appVersion">
            </el-option>
          </el-select>

          <span class="gray-text">日期选择</span>
          <el-date-picker v-model="trendDateRang" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <button type="button" class="btnQuery" @click="getErrorCntAll">查询</button>
        </div>
      </div>
      <div class="g-block" style="height:375px;width:100%;">
        <h3 class="trend-title">
          <span v-for="(item ,index) in errorTit" :class="{'active':activeTit == index}" @click="chooseTit(index)">{{ item }}</span>
        </h3>
        <div class="g-block-graph" style="height:270px;" v-loading="trendLoading">
          <div class="g-block-hover-info">
            <p id="graph-a-x"></p>
            <p id="graph-a-v"></p>
          </div>
          <div class="graph" id="graph-a-main"></div>
        </div>
      </div>
    </div>

    <!-- <div class="fullTable">
      <div class="searchTitle clearfix">

        <div class="fr">
          <span class="gray-text">应用版本</span>
          <el-select class="s-select" v-model="detailVersion" filterable placeholder="请选择" style="width: 150px;">
            <el-option v-for="item in detailOptions" :label="item.appVersion" :value="item.appVersion" :key="item.appVersion">
            </el-option>
          </el-select>
          <span class="gray-text">错误内容</span><input v-model="pageId" class="s-input" type="text" placeholder="请输入描述/名称" style="width: 230px;">
          <button type="button" class="btnQuery" style="margin-top: 5px;" @click="">查询</button>
        </div>

      </div>
   
      <div class="tableWrapper">
   <el-table v-loading="detailLoading" :data="detailTableData" style="width: 100%" stripe  border cell-class-name="myTableCell">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column v-for="(item,index) in detailTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50">
        </el-table-column>
      </el-table>
           <el-pagination @size-change="detailSizeChange" @current-change="detailCurrentChange" :current-page="detailCurrentPage" :page-sizes="detailPageSizes" :page-size="detailPageSize" layout="sizes,total,jumper, next, pager, prev" :total="detailTotal">
      </el-pagination>
      </div>


    </div> -->
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  queryAppVersion,
  queryAppVersionSum,
  errorSummary,
  errorCntAll
} from "../../../../service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

export default {
  name: "errorInfoApp",
  data() {
    return {
      //错误趋势
      trendLoading: false,
      options: [],
      version: '',
      trendDateRang: [
        (() => {
          let now = new Date();
          return new Date(now.setMonth(now.getMonth() - 1));
        })(),
        new Date()
      ],
      trendBizDateArr: [],
      trendDeviceCntArr: [],
      trendExceptionCntArr: [],
      trendErrorCount: [],
      errorTit: ["总错误数", "影响用户数"],
      activeTit: 0,

      //错误摘要
      detailLoading: false,
      detailVersion: [],
      detailTitles: [
        {
          name: "日期",
          tdKey: "gmtCreated"
        },
        {
          name: "姓名",
          tdKey: "name" //接口暂无 临时占位
        },
        {
          name: "电话号码",
          tdKey: "phone"
        },
        {
          name: "邮箱",
          tdKey: "yonghumingcheng" //接口暂无 临时占位
        },
        {
          name: "公司/组织",
          tdKey: "company"
        },
        {
          name: "备注信息",
          tdKey: "remark"
        }
      ],
      detailTableData: [],
      detailCurrentPage: 1,
      detailPageSizes: [10, 20, 50],
      detailPageSize: 10,
      detailTotal: 0
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]), //获取全局appSource os

    trendStartDate() {
      return formatDate(this.trendDateRang[0]);
    },
    trendEndDate() {
      return formatDate(this.trendDateRang[1]);
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
      this.getQueryAppVersion();
      // this.getErrorCntAll();
      // this.getQueryAppVersionSum();
    },

    async getQueryAppVersion() {
      try {
        let data = await queryAppVersion({
          appSource: this.appSource,
          os: this.headerTapOs
        });
        if (data.success && data.model) {
          this.options = data.model;
          this.version = data.model.length ? data.model[0].appVersion : '';
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

    async getErrorCntAll() {
      try {
        this.trendLoading = true;
        let data = await errorCntAll({
          appSource: this.appSource,
          os: this.headerTapOs,
          startDate: this.trendStartDate,
          endDate: this.trendEndDate,
          appVersion: this.version
        });
        this.trendLoading = false;
        if (data.success && data.model) {
          data.model.forEach(ele => {
            this.trendBizDateArr.push(ele.bizdate);
            this.trendDeviceCntArr.push(ele.deviceCnt);
            this.trendExceptionCntArr.push(ele.exceptionCnt);
          });
          this.trendErrorCount = this.trendDeviceCntArr;
          this.renderTrend();
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.trendLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getQueryAppVersionSum() {
      try {
        let data = await queryAppVersionSum({
          appSource: this.appSource,
          os: this.headerTapOs
        });
        if (data.success && data.model) {
          this.detailOptions = data.model;
          this.detailVersion = data.model[0].appVersion;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.$refs.Alert.showError();
      }
    },

    async getErrorSummary() {
      try {
        this.detailLoading = true;
        let data = await errorSummary({
          appSource: this.appSource,
          os: this.headerTapOs,
          startDate: this.trendStartDate,
          endDate: this.trendEndDate,
          appVersion: this.version
        });
        this.detailLoading = false;
        if (data.success && data.model) {
          data.model.forEach(ele => {
            this.trendBizDateArr.push(ele.bizdate);
            this.trendDeviceCntArr.push(ele.deviceCnt);
            this.trendExceptionCntArr.push(ele.exceptionCnt);
          });
          this.trendErrorCount = this.trendDeviceCntArr;
          this.renderTrend();
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.detailLoading = false;
        this.$refs.Alert.showError();
      }
    },

    chooseTit(index) {
      if (this.activeTit == index) return;
      this.activeTit = index;
      this.trendErrorCount =
        this.activeTit == 0
          ? this.trendExceptionCntArr
          : this.trendDeviceCntArr;
      this.renderTrend();
    },

    renderTrend() {
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
              data[1] = {
                value: "--"
              };
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
          boundaryGap: false,
          data: this.trendBizDateArr,
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

            data: this.trendErrorCount
          }
        ]
      };
      myChart.setOption(option);
    },

    detailSizeChange(val) {
      console.log(val);
      this.detailPageSize = val;
      this.detailCurrentPage = 1;
    },
    detailCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.detailCurrentPage = val;
    }
  },

  components: {
    alertBox,
    download
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.trend-title {
  display: inline-block;
  border: 1px solid #5693fb;
  border-radius: 4px;
  margin: 15px 10px;
  .active {
    color: #fff;
    background: #5693fb;
  }
  > span {
    display: inline-block;
    text-align: center;
    width: 150px;
    height: 24px;
    line-height: 24px;
    font-family: MicrosoftYaHei;
    font-size: 13px;
    color: #5693fb;
    letter-spacing: -0.08px;
    cursor: pointer;
  }
}
</style>