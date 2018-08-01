<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle clearfix">
        <span class="f-text">活动注册实时</span>
        <span class="s-text">业务名称:</span>
        <el-select class="s-select" v-model="activeBizId" filterable placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :label="item.name" :value="item.bizId" :key="item.bizId">
          </el-option>
        </el-select>
        <span class="s-text">关键词:</span>
        <input v-model="channel" class="s-input" type="text" placeholder="活动名称" style="width: 180px;">
        <button type="button" class="btnQuery" @click="getRegisiterQuery">查询</button>

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
        <span class="f-text">区块实时</span>
        <span class="s-text">关键词:</span>
        <input v-model="url" class="s-input" type="text" placeholder="URL" style="width: 180px;">
        <span class="s-text">区块ID:</span>
        <input v-model="asmId" class="s-input" type="text" placeholder="区块ID" style="width: 180px;">
        <button type="button" class="btnQuery" @click="getAsmQuery">查询</button>

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
import { regisiterQuery, asmQuery } from "../../../../service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

export default {
  name: "activeOntime",
  data() {
    return {
      //活动注册实时
      activeLoading: false,
      //查询条件
      options: [{ name: "马上金", bizId: 1 }, { name: "贷款超市", bizId: 2 }],
      activeBizId: "",
      channel: "",
      //表格
      activeTitles: [
        {
          name: "日期",
          tdKey: "record_time"
        },
        {
          name: "活动名称",
          tdKey: "channel"
        },
        {
          name: "PV",
          tdKey: "pv"
        },
        {
          name: "UV",
          tdKey: "uv"
        },
        {
          name: "注册量",
          tdKey: "register_cnt"
        }
      ],
      activeDateRang: [
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000),
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000)
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
      url: "",

      buttonTitles: [
        {
          name: "日期",
          tdKey: "record_time"
        },
        {
          name: "URL",
          tdKey: "url"
        },
        {
          name: "区块ID",
          tdKey: "asm_id"
        },
        {
          name: "PV",
          tdKey: "pv"
        },
        {
          name: "UV",
          tdKey: "uv"
        },
    
      ],
      buttonDateRang: [
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000),
        new Date(new Date() * 1 - 24 * 60 * 60 * 1000)
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
      this.getRegisiterQuery();
      this.getAsmQuery();
    },

    async getRegisiterQuery() {
      try {
        this.activeLoading = true;
        let data = await regisiterQuery({
          bizId: this.activeBizId,
          channel: this.channel,
          pageNumber: this.activeCurrentPage,
          pageSize: this.activePageSize
        });
        this.activeLoading = false;
        if (data.success) {
          this.activeTableData = data.model.rows;
          this.activeTotal = data.model.total;
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

    async getAsmQuery() {
      try {
        this.buttonLoading = true;
        let data = await asmQuery({
          asm_id: this.asmId,
          url: this.url,
          pageNumber: this.buttonCurrentPage,
          pageSize: this.buttonPageSize
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

    activeSizeChange(val) {
      console.log(val);
      this.activePageSize = val;
      this.activeCurrentPage = 1;
      this.getRegisiterQuery();
    },
    activeCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.activeCurrentPage = val;
      this.getRegisiterQuery();
    },

    buttonSizeChange(val) {
      console.log(val);
      this.buttonPageSize = val;
      this.buttonCurrentPage = 1;
      this.getAsmQuery();
    },
    buttonCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.buttonCurrentPage = val;
      this.getAsmQuery();
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