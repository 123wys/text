<template>
  <div>
    <div class="searchTitle clearfix">
      <span class="f-text"></span>
      <ul class="dateRange" style="margin-left: 5px;float: left">
        <li v-for="item in timeRangs" :class="{'dateRangeAct': timeRang == item.value}" @click="chooseTimeRang(item.value)">{{ item.text }}</li>
      </ul>

      <div class="fr">
        <span class="urlTxt">目标节点:</span>
        <el-select class="s-select" v-model="selectedNodeId" filterable placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.pathName" :value="item.id">
          </el-option>
        </el-select>
        <router-link class="blueTxt" :to="{ path:'smartPathEdit' }">添加</router-link>

        <el-date-picker v-model="dateTime" type="date" placeholder="选择日期" style="margin-left: 60px">
        </el-date-picker>
        <button type="button" class="btnQuery" @click="doReportQuery">确定</button>
        <!-- <span class="download" @click="goDownload">
        <download style="margin-right:5px"></download>下载表格</span> -->
      </div>
    </div>

    <div class="box" v-loading="loading">
      <p v-if="!stepList.length">暂无数据</p>
      <ul v-if="stepList.length">
        <li class="clearfix" v-for='(item,index) in stepList'>
          <div class="left">
            <h4>{{ '路径' + (index + 1) + ":"}}</h4>
            <span class="radio">{{ item.totalRatio }}</span>
          </div>
          <div class="center clearfix">
            <div class="itemBox" v-for="(step,index) in item.steps">
              <span class="tit">
                {{ stepTxtList[index] }}
              </span>
              <p class="content" :title="step.urlName">{{ step.urlName }}</p>
            </div>
          </div>
          <div class="right">
            <button type="button" class="btnQuery" @click="toggleFunnelBox(item,index)">{{ activeFunnelBox == index ? '取消创建':'创建漏斗' }}</button>
          </div>
          <div class="bottomBox">
            <div :class="['funnelBox',{'active': activeFunnelBox == index }]">
              <div class="funnelWrapper">
                <ul class="leftBox">
                  <li class="funnelLi" v-for="item in funnelList" v-if="item.uv">
                    <div class="leftTxt">
                      <span :title="item.urlName">{{ item.urlName }}</span>
                    </div>
                  </li>
                </ul>
                <ul class="rightBox">
                  <li class="funnelLi" v-for="(item,index) in funnelList" v-if="item.uv">
                    <div :class="['funnelItem','funnelItem' + index]">
                      <span class="funnelItemTxt">{{ item.uv ? 'UV :' + item.uv : ''}}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <button type="button" class="btnQuery" @click="doReportToFunnel">保存漏斗</button>
            </div>
          </div>
        </li>
      </ul>

    </div>
    <el-pagination class="pager" v-show="stepList.length" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
    </el-pagination>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  configQuery,
  configAll,
  configAdd,
  configUpdate,
  configDelete,
  reportQuery,
  reportToFunnel
} from "../../../../service/getData";
import { Download, formatDate } from "../../../../config/mUtils";
import download from "../../svg/download";

export default {
  name: "smartPathWeb",
  data() {
    return {
      loading: false,
      timeRangs: [{ text: "昨日", value: 1 }, { text: "近7日", value: 7 }],
      timeRang: 1,
      options: [],
      selectedNodeId: "",
      dateTime: new Date(new Date() * 1 - 24 * 3600 * 1000),
      currentPage: 1,
      pageSizes: [3, 5, 10],
      pageSize: 3,
      total: 0,
      stepList: [],
      stepTxtList: ["第一步", "第二步", "第三步", "第四步", "第五步"],
      activeFunnelBox: -1,
      creatFunnelTxt: "创建漏斗",
      funnelList: [],
      recordId: ""
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]), //获取全局appSource os
    dateTimeF() {
      return formatDate(this.dateTime);
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
      this.getConfigAll();
    },

    async getConfigAll() {
      try {
        let data = await configAll({
          appSource: this.appSource,
          os: this.headerTapOs
        });
        if (data.success) {
          this.options = data.model && data.model.rows;
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

    async doReportQuery() {
      try {
        if (!this.selectedNodeId) {
          this.$refs.Alert.resetTxts({
            warnTit: "提示",
            warnTxt: "请选择目标节点！"
          });
          this.$refs.Alert.showWarn();
          return;
        }
        this.loading = true;
        this.resetFunnel();

        let data = await reportQuery({
          id: this.selectedNodeId, //智能路径配置编号
          appSource: this.appSource,
          bizdate: this.dateTimeF,
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          freq: this.timeRang
        });
        this.loading = false;
        if (data.success) {
          if (data.model) {
            this.stepList = data.model.rows || [];
            this.total = data.model.total || 0;
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
        this.loading = false;
        this.$refs.Alert.showError();
      }
    },

    async doReportToFunnel() {
      try {
        let data = await reportToFunnel({
          id: this.selectedNodeId, //智能路径配置编号
          recordId: this.recordId
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: data.model || "漏斗提交成功!"
          });
          this.$refs.Alert.showSuccess(() => {
            this.toggleFunnelBox();
          });
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

    resetFunnel() {
      this.stepList = [];
      this.funnelList = [];
    },

    toggleFunnelBox(item, index) {
      if (this.activeFunnelBox == index) {
        this.activeFunnelBox = -1;
        return;
      }
      this.activeFunnelBox = index;
      this.funnelList = JSON.parse(JSON.stringify(this.stepList[index].steps));
      this.recordId = this.stepList[index].id;
      let blankLength = 5 - this.funnelList.length;
      if (blankLength > 0) {
        let temp = {
          urlName: "",
          uv: ""
        };
        for (let i = 0; i < blankLength; i++) {
          this.funnelList.push(temp);
        }
      }
    },

    chooseTimeRang(value) {
      this.timeRang = value;
    },

    handleSizeChange(val) {
      console.log(val);
      this.activeFunnelBox = -1;
      this.pageSize = val;
      this.currentPage = 1;
      this.doReportQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.activeFunnelBox = -1;
      this.currentPage = val;
      this.doReportQuery();
    },

    goDownload() {
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
.blueTxt {
  margin-left: 20px;
  color: #5693fb;
}
.box {
  padding: 70px;
  background: #fff;
  > p {
    text-align: center;
  }
  > ul > li > div {
    float: left;
    font-size: 16px;
    text-align: center;
  }
  > ul > li {
    margin-bottom: 30px;
  }

  .left {
    margin-top: 10px;
    width: 100px;
    h4 {
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #4a4a4a;
      letter-spacing: 0.24px;
    }
    .radio {
      font-family: PingFangHK-Semibold;
      font-size: 20px;
      color: #5693fb;
      letter-spacing: 0.32px;
    }
  }

  .center {
    .itemBox {
      position: relative;
      float: left;
      width: 120px;
      height: 70px;
      margin: 0 20px;
      padding: 10px;
      background: #acc6f4;
      border-radius: 4px;
      .tit {
        position: absolute;
        top: - 30px;
        left: 50%;
        transform: translateX(-50%);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 0.22px;
      }
      .content {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.24px;
        text-align: center;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .right {
    float: right;
    margin-top: 15px;
    width: 120px;
  }
  .pager {
    float: none;
    padding: 5px 15px;
    margin: 0 auto;
  }
  .bottomBox {
    margin-top: 50px;
    width: 100%;
    .btnQuery{
      margin-bottom: 60px;
    }
  }
}
</style>