<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">操作日志概览</span>

        <div class="fr">
          <el-date-picker v-model="handleDateRang" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <button type="button" class="btnQuery" @click="getHandleData">查询</button>
          <span class="download" style="margin-top: 5px;" @click="goHandleDownload">
            <download style="margin-right:5px"></download>下载表格</span>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="handleLoading" :data="handleTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in handleTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="handleCurrentPage" :page-sizes="handlePageSizes" :page-size="handlePageSize" layout="sizes,total,jumper, next, pager, prev" :total="handleTotal">
        </el-pagination>
      </div>

    </div>

    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">用户登录概览</span>

        <div class="fr">
          <el-date-picker v-model="loginDateRang" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <button type="button" class="btnQuery" @click="getLoginData">查询</button>
          <span class="download" style="margin-top: 5px;" @click="goLoginDownload">
            <download style="margin-right:5px"></download>下载表格</span>
        </div>

      </div>

      <div class="tableWrapper">
        <el-table v-loading="loginLoading" :data="loginTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in loginTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="loginSizeChange" @current-change="loginCurrentChange" :current-page="loginCurrentPage" :page-sizes="loginPageSizes" :page-size="loginPageSize" layout="sizes,total,jumper, next, pager, prev" :total="loginTotal">
        </el-pagination>
      </div>

    </div>

    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">试用信息概览</span>

        <div class="fr">
          <button type="button" class="btnQuery" style="margin-top: 5px;" @click="getTryData">查询</button>
          <span class="download fr" style="margin-top: 5px;" @click="goTryDownload">
            <download style="margin-right:5px"></download>下载表格</span>
        </div>

      </div>
      <div class="tableWrapper">
        <el-table v-loading="tryLoading" :data="tryTableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column v-for="(item,index) in tryTitles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="trySizeChange" @current-change="tryCurrentChange" :current-page="tryCurrentPage" :page-sizes="tryPageSizes" :page-size="tryPageSize" layout="sizes,total,jumper, next, pager, prev" :total="tryTotal">
        </el-pagination>
      </div>

    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import { handleQuery, loginQuery, tryQuery } from "../../../../service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

export default {
  name: "userControl",
  data() {
    return {
      //操作日志概览
      handleLoading: false,

      handleTitles: [
        {
          name: "时间",
          tdKey: "gmt_created"
        },
        {
          name: "业务",
          tdKey: "invoke_source"
        },
        {
          name: "账号",
          tdKey: "user_id"
        },
        {
          name: "用户名称",
          tdKey: "user_name"
        },
        {
          name: "模块名称",
          tdKey: "module_name"
        },
        {
          name: "调用方法",
          tdKey: "invoke_method"
        }
      ],
      handleDateRang: [new Date(), new Date()],
      handleTableData: [],
      handleCurrentPage: 1,
      handlePageSizes: [10, 20, 50],
      handlePageSize: 10,
      handleTotal: 0,

      //用户登录概览
      loginLoading: false,

      loginTitles: [
        {
          name: "时间",
          tdKey: "gmt_created"
        },
        {
          name: "业务",
          tdKey: "invoke_source"
        },
        {
          name: "账号",
          tdKey: "user_id"
        },
        {
          name: "用户名称",
          tdKey: "user_name"
        },
        {
          name: "最近一次登录时间",
          tdKey: "gmt_created"
        }
      ],
      loginDateRang: [new Date(), new Date()],
      loginTableData: [],
      loginCurrentPage: 1,
      loginPageSizes: [10, 20, 50],
      loginPageSize: 10,
      loginTotal: 0,

      //使用信息概览
      tryLoading: false,

      tryTitles: [
        {
          name: "日期",
          tdKey: "gmtCreated"
        },
        {
          name: "姓名",
          tdKey: "name"
        },
        {
          name: "电话号码",
          tdKey: "phone"
        },
        {
          name: "邮箱",
          tdKey: "email"
        },
        {
          name: "公司/组织",
          tdKey: "company"
        },
        {
          name: "渠道编号",
          tdKey: "channel_id"
        },
        {
          name: "渠道代码",
          tdKey: "channel_code"
        },
        {
          name: "备注信息",
          tdKey: "remark"
        }
      ],
      tryTableData: [],
      tryCurrentPage: 1,
      tryPageSizes: [10, 20, 50],
      tryPageSize: 10,
      tryTotal: 0
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]), //获取全局appSource os
    handleStartDate() {
      return formatDate(this.handleDateRang[0]);
    },
    handleEndDate() {
      return formatDate(this.handleDateRang[1]);
    },
    loginStartDate() {
      return formatDate(this.loginDateRang[0]);
    },
    loginEndDate() {
      return formatDate(this.loginDateRang[1]);
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
      this.getHandleData();
      this.getLoginData();
      this.getTryData();
    },

    async getHandleData() {
      try {
        this.handleLoading = true;
        let data = await handleQuery({
          startDate: this.handleStartDate,
          endDate: this.handleEndDate,
          pageNumber: this.handleCurrentPage,
          pageSize: this.handlePageSize
        });
        this.handleLoading = false;
        if (data.success) {
          this.handleTableData = data.model.rows;
          this.handleTotal = data.model.total;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.handleLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getLoginData() {
      try {
        this.loginLoading = true;
        let data = await loginQuery({
          startDate: this.loginStartDate,
          endDate: this.loginEndDate,
          pageNumber: this.loginCurrentPage,
          pageSize: this.loginPageSize
        });
        this.loginLoading = false;
        if (data.success) {
          this.loginTableData = data.model.rows;
          this.loginTotal = data.model.total;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.loginLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getTryData() {
      try {
        this.tryLoading = true;
        let data = await tryQuery({
          pageNumber: this.tryCurrentPage,
          pageSize: this.tryPageSize
        });
        this.tryLoading = false;
        if (data.success) {
          this.tryTableData = data.model.rows;
          this.tryTotal = data.model.total;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.tryLoading = false;
        this.$refs.Alert.showError();
      }
    },

    handleSizeChange(val) {
      console.log(val);
      this.handlePageSize = val;
      this.handleCurrentPage = 1;
      this.getHandleData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.handleCurrentPage = val;
      this.getHandleData();
    },

    loginSizeChange(val) {
      console.log(val);
      this.loginPageSize = val;
      this.loginCurrentPage = 1;
      this.getLoginData();
    },
    loginCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.loginCurrentPage = val;
      this.getLoginData();
    },

    trySizeChange(val) {
      console.log(val);
      this.tryPageSize = val;
      this.tryCurrentPage = 1;
      this.getTryData();
    },
    tryCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.tryCurrentPage = val;
      this.getTryData();
    },

    goHandleDownload() {
      let url = `/analysis/user_record/query_export.json?startDate=${
        this.handleStartDate
      }&endDate=${this.handleEndDate}&pageNumber=${
        this.handleCurrentPage
      }&pageSize=${this.handlePageSize}`;
      Download(url);
    },
    goLoginDownload() {
      let url = `/analysis/user_record/query_login_export.json?startDate=${
        this.loginStartDate
      }&endDate=${this.loginEndDate}&pageNumber=${
        this.loginCurrentPage
      }&pageSize=${this.loginPageSize}`;
      Download(url);
    },
    goTryDownload() {
      let url = `/open/contact_us/query_export.json?pageNumber=${
        this.tryStartDate
      }&endDate=${this.tryEndDate}&pageNumber=${this.tryCurrentPage}&pageSize=${
        this.tryPageSize
      }`;
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