<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">实时查询</span>

        <div class="fr">
          <input v-model="activeSearch" class="s-input" type="text" placeholder="页面/按钮名称" style="width: 250px;">
          <button type="button" class="btnQuery" @click="getActiveData">查询</button>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="activeLoading" :data="activeTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in activeTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="activeSizeChange" @current-change="activeCurrentChange" :current-page="activeCurrentPage" :page-sizes="activePageSizes" :page-size="activePageSize" layout="sizes,total,jumper, next, pager, prev" :total="activeTotal">
        </el-pagination>
      </div>

    </div>

    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">概览查询</span>

        <div class="fr">
          <el-date-picker v-model="overviewDate" type="date" placeholder="选择日期">
          </el-date-picker>

          <input v-model="overviewSearch" class="s-input" type="text" placeholder="页面/按钮名称" style="width: 250px;">

          <button type="button" class="btnQuery" @click="getOverviewData">查询</button>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="overviewLoading" :data="overviewTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in overviewTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="overviewSizeChange" @current-change="overviewCurrentChange" :current-page="overviewCurrentPage" :page-sizes="overviewPageSizes" :page-size="overviewPageSize" layout="sizes,total,jumper, next, pager, prev" :total="overviewTotal">
        </el-pagination>
      </div>

    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import { visualEvaluate, visualOverview } from "../../../../service/getData";
import { formatDate } from "../../../../config/mUtils";

export default {
  name: "visualize",
  data() {
    return {
      //实时统计
      activeLoading: false,

      activeTitles: [
        {
          name: "日期",
          tdKey: "bizdate"
        },
        {
          name: "操作系统",
          tdKey: "os"
        },
        {
          name: "页面名称",
          tdKey: "page_class_desc"
        },
        {
          name: "按钮名称",
          tdKey: "button_name"
        },
        {
          name: "页面PV",
          tdKey: "pv"
        },
        {
          name: "页面UV",
          tdKey: "uv"
        },
        {
          name: "按钮PV",
          tdKey: "buttonPv"
        },
        {
          name: "按钮UV",
          tdKey: "buttonUv"
        }
      ],
      activeTotalData: [], //前端分页 所有数据
      activeTableData: [],
      activeCurrentPage: 1,
      activePageSizes: [10, 20, 50],
      activePageSize: 10,
      activeTotal: 0,
      activeSearch: "",

      //概览统计
      overviewLoading: false,

      overviewTitles: [
        {
          name: "日期",
          tdKey: "bizdate"
        },
        {
          name: "操作系统",
          tdKey: "os"
        },
        {
          name: "页面名称",
          tdKey: "viewPathName"
        },
        {
          name: "按钮名称",
          tdKey: "buttonName"
        },
        {
          name: "页面PV",
          tdKey: "pv"
        },
        {
          name: "页面UV",
          tdKey: "uv"
        },
        {
          name: "按钮PV",
          tdKey: "buttonPv"
        },
        {
          name: "按钮UV",
          tdKey: "buttonUv"
        }
      ],
      overviewDate: new Date(new Date() * 1 - 24 * 60 * 60 * 1000),
      overviewTableData: [],
      overviewCurrentPage: 1,
      overviewPageSizes: [10, 20, 50],
      overviewPageSize: 10,
      overviewTotal: 0,
      overviewSearch: ""
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]), //获取全局appSource os
    endDate() {
      return formatDate(this.overviewDate);
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
      this.getActiveData();
      this.getOverviewData();
    },

    async getActiveData() {
      try {
        if (this.activeTotalData.length) {
          this.getActivePageData();
          return
        }
        this.activeLoading = true;
        let data = await visualEvaluate({
          appSource: this.appSource,
          os: this.headerTapOs,
          buttonName: this.activeSearch
        });
        this.activeLoading = false;
        if (data.success) {
          if (data.model) {
            this.activeTotalData = data.model;
            this.getActivePageData();
          }
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        console.log(error);
        this.activeLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getOverviewData() {
      try {
        this.overviewLoading = true;
        let data = await visualOverview({
          bizdate: this.endDate,
          appSource: this.appSource,
          os: this.headerTapOs,
          buttonName: this.overviewSearch
        });
        this.overviewLoading = false;
        if (data.success) {
          if (data.model) {
            this.overviewTableData = data.model.rows;
            this.overviewTotal = data.model.total;
          }
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.overviewLoading = false;
        this.$refs.Alert.showError();
      }
    },

    getActivePageData() {
      //前端分页
      if(!this.activeTotalData) return;
      this.activeLoading = true;
      this.activeTotal = this.activeTotalData.length;
      let from = (this.activeCurrentPage - 1) * this.activePageSize;
      let to = this.activeCurrentPage * this.activePageSize - 1;
      this.activeLoading = false;
      this.activeTableData = this.activeTotalData.slice(from, to);
    },

    activeSizeChange(val) {
      console.log(val);
      this.activePageSize = val;
      this.activeCurrentPage = 1;
      this.getActiveData();
    },
    activeCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.activeCurrentPage = val;
      this.getActiveData();
    },

    overviewSizeChange(val) {
      console.log(val);
      this.overviewPageSize = val;
      this.overviewCurrentPage = 1;
      this.getOverviewData();
    },
    overviewCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.overviewCurrentPage = val;
      this.getOverviewData();
    }
  },

  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>