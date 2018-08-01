<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">页面查询</span>
        <input v-model="pageUrl" class="s-input" type="text" placeholder="页面url" style="width: 250px;">

        <div class="fr">
          <el-date-picker v-model="pageDateRang" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <button type="button" class="btnQuery" @click="getPageData">查询</button>
          <span class="download" style="margin-top: 5px;" @click="goPageDownload">
            <download style="margin-right:5px"></download>下载表格</span>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="pageLoading" :data="pageTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in pageTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="pageCurrentPage" :page-sizes="pagePageSizes" :page-size="pagePageSize" layout="sizes,total,jumper, next, pager, prev" :total="pageTotal">
        </el-pagination>
      </div>

    </div>

    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">区块查询</span>
        <input v-model="asmId" class="s-input" type="text" placeholder="区块ID" style="width: 250px;">

        <div class="fr">
          <el-date-picker v-model="buttonDateRang" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <button type="button" class="btnQuery" @click="getButtonData">查询</button>
          <span class="download" style="margin-top: 5px;" @click="goButtonDownload">
            <download style="margin-right:5px"></download>下载表格</span>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="buttonLoading" :data="buttonTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in buttonTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="buttonSizeChange" @current-change="buttonCurrentChange" :current-page="buttonCurrentPage" :page-sizes="buttonPageSizes" :page-size="buttonPageSize" layout="sizes,total,jumper, next, pager, prev" :total="buttonTotal">
        </el-pagination>
      </div>

    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import { pageOverview, buttonOverview } from "../../../../service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

export default {
  name: "visualizeSearchZaWeb",
  data() {
    return {
      //页面查询
      pageLoading: false,

      pageTitles: [
        {
          name: "日期",
          tdKey: "bizdate"
        },
        {
          name: "页面URL",
          tdKey: "url"
        },
        {
          name: "页面浏览量",
          tdKey: "pv"
        },
        {
          name: "用户访问量",
          tdKey: "uv"
        },
        {
          name: "贡献下游流量",
          tdKey: "pv_down"
        },
        {
          name: "入口页次数",
          tdKey: "en_url_uv"
        },
        {
          name: "退出页次数",
          tdKey: "exit_pv"
        },
        {
          name: "平均停留时长",
          tdKey: "loadtime"
        },
        {
          name: "退出率",
          tdKey: "exit_rate"
        }
      ],
      pageDateRang: [
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000),
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000)
      ],
      pageTableData: [],
      pageCurrentPage: 1,
      pagePageSizes: [10, 20, 50],
      pagePageSize: 10,
      pageTotal: 0,
      pageUrl: "",

      //区块查询
      buttonLoading: false,

      buttonTitles: [
        {
          name: "日期",
          tdKey: "bizdate"
        },
        {
          name: "平台",
          tdKey: "platform"
        },
        {
          name: "URL",
          tdKey: "url"
        },
        {
          name: "页面",
          tdKey: "pageName"
        },
        {
          name: "区域",
          tdKey: "areaName"
        },
        {
          name: "ASM_ID",
          tdKey: "asmId"
        },
        {
          name: "ASM_TXT",
          tdKey: "asmTxt"
        },
        {
          name: "点击人数",
          tdKey: "uv"
        },
        {
          name: "点击次数",
          tdKey: "pv"
        }
      ],
      buttonDateRang: [
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000),
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000)
      ],
      buttonTableData: [],
      buttonCurrentPage: 1,
      buttonPageSizes: [10, 20, 50],
      buttonPageSize: 10,
      buttonTotal: 0,
      asmId: ""
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]), //获取全局appSource os
    pageStartDate() {
      return formatDate(this.pageDateRang[0]);
    },
    pageEndDate() {
      return formatDate(this.pageDateRang[1]);
    },
    buttonStartDate() {
      return formatDate(this.buttonDateRang[0]);
    },
    buttonEndDate() {
      return formatDate(this.buttonDateRang[1]);
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
      this.getPageData();
      this.getButtonData();
    },

    async getPageData() {
      try {
        this.pageLoading = true;
        let data = await pageOverview({
          appSource: this.appSource,
          startDate: this.pageStartDate,
          endDate: this.pageEndDate,
          pageNumber: this.pageCurrentPage,
          pageSize: this.pagePageSize,
          url: this.pageUrl
        });
        this.pageLoading = false;
        if (data.success) {
          this.pageTableData = data.model.rows;
          this.pageTotal = data.model.total;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.pageLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getButtonData() {
      try {
        this.buttonLoading = true;
        let data = await buttonOverview({
          appSource: this.appSource,
          startDate: this.buttonStartDate,
          endDate: this.buttonEndDate,
          pageNumber: this.buttonCurrentPage,
          pageSize: this.buttonPageSize,
          asmId: this.asmId
        });
        this.buttonLoading = false;
        if (data.success) {
          this.buttonTableData = data.model.rows;
          this.buttonTotal = data.model.total;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.buttonLoading = false;
        this.$refs.Alert.showError();
      }
    },

    pageSizeChange(val) {
      console.log(val);
      this.pagePageSize = val;
      this.pageCurrentPage = 1;
      this.getPageData();
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageCurrentPage = val;
      this.getPageData();
    },

    buttonSizeChange(val) {
      console.log(val);
      this.buttonPageSize = val;
      this.buttonCurrentPage = 1;
      this.getButtonData();
    },
    buttonCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.buttonCurrentPage = val;
      this.getButtonData();
    },

    goPageDownload() {
      let url = `/track/data/page_overview_export.json?appSource=${this
        .appSource}&startDate=${this.pageStartDate}&endDate=${this
        .pageEndDate}&url=${this.pageUrl}`;
      Download(url);
    },
    goButtonDownload() {
      let url = `/track/data/button_overview_export.json?appSource=${this
        .appSource}&startDate=${this.buttonStartDate}&endDate=${this
        .buttonEndDate}&asmId=${this.asmId}`;
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

</style>