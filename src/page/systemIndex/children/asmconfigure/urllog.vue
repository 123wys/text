<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle clearfix">
        <!-- <span class="f-text">活动注册实时</span> -->
        <span class="s-text">URL搜索</span>
        <input v-model="url" class="s-input" type="text" placeholder="url" style="width: 180px;">
        <button type="button" class="btnQuery" @click="getIlogUrl">查询</button>
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
        <span class="f-text">区块ID搜索：</span>
        <input v-model="asmId" class="s-input" type="text" placeholder="区块ID" style="width: 180px;">
        <button type="button" class="btnQuery" @click="getAsmBlock">查询</button>

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
import { queryAsmBlock, queryIlogUrl } from "../../../../service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

export default {
  name: "urllog",
  data() {
    return {
      //活动注册实时
      activeLoading: false,
      //查询条件
      url: "",
      //表格
      activeTitles: [
        {
          name: "日期",
          tdKey: "log_date"
        },
        {
          name: "URL",
          tdKey: "url"
        },
        {
          name: "PV",
          tdKey: "pv"
        },
        {
          name: "UV",
          tdKey: "uv"
        }
      ],
      activeTableData: [],
      activeCurrentPage: 1,
      activePageSizes: [10, 20, 50],
      activePageSize: 10,
      activeTotal: 0,

      //区块实时
      buttonLoading: false,
      //查询条件
      asmId: "",

      buttonTitles: [
        {
          name: "日期",
          tdKey: "log_date"
        },
        {
          name: "区块ID",
          tdKey: "asm_id"
        },
        {
          name: "名称",
          tdKey: "asm_txt"
        },
        {
          name: "PV",
          tdKey: "pv"
        },
        {
          name: "UV",
          tdKey: "uv"
        }
      ],

      buttonTableData: [],
      buttonCurrentPage: 1,
      buttonPageSizes: [10, 20, 50],
      buttonPageSize: 10,
      buttonTotal: 0
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]) //获取全局appSource os
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
      this.getIlogUrl();
      this.getAsmBlock();
    },

    async getIlogUrl() {
      try {
        this.activeLoading = true;
        let data = await queryIlogUrl({
          url: this.url,
          pageNumber: this.activeCurrentPage,
          pageSize: this.activePageSize
        });
        this.activeLoading = false;
        if (data.success) {
          this.activeTableData = data.model.detail;
          this.activeTotal = data.model.count;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.activeLoading = false;
        this.$refs.Alert.showError();
      }
    },

    async getAsmBlock() {
      try {
        this.buttonLoading = true;
        let data = await queryAsmBlock({
          asmId: this.asmId,
          pageNumber: this.buttonCurrentPage,
          pageSize: this.buttonPageSize
        });
        this.buttonLoading = false;
        if (data.success) {
          this.buttonTableData = data.model.detail;
          this.buttonTotal = data.model.count;
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

    activeSizeChange(val) {
      console.log(val);
      this.activePageSize = val;
      this.activeCurrentPage = 1;
      this.getIlogUrl();
    },
    activeCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.activeCurrentPage = val;
      this.getIlogUrl();
    },

    buttonSizeChange(val) {
      console.log(val);
      this.buttonPageSize = val;
      this.buttonCurrentPage = 1;
      this.getAsmBlock();
    },
    buttonCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.buttonCurrentPage = val;
      this.getAsmBlock();
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