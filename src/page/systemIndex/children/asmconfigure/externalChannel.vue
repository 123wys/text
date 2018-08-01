<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle">
        <span class="f-text">渠道配置：</span>

        <span class="s-text">渠道名称:</span><input v-model="channelName" class="s-input" type="text" placeholder="渠道名称" style="width: 180px;">
        <span class="s-text">公司名称:</span><input v-model="companyName" class="s-input" type="text" placeholder="公司名称" style="width: 180px;">

        <button type="button" class="btnQuery" @click="getChannelConfigPage()">确定</button>
        <button type="button" class="btnQuery" @click="openDialog('add')">新增</button>
      </div>
      <div class="tableWrapper">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in titles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" show-overflow-tooltip>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="openDialog('edit',scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>

      <div class="dialogWrapper" v-show="isShowDialog">
        <div class="dialogMask"></div>
        <div class="dialog">
          <h1 class="tit">{{isAdd ? '新增渠道配置' : '编辑渠道配置'}}</h1>
          <el-form :model="form">

            <el-form-item label="渠道名称" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写渠道名称" v-model="form.channelName">
            </el-form-item>
            <el-form-item label="公司名称" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写公司名称" v-model="form.companyName">
            </el-form-item>

          </el-form>
          <div class="dialog-footer">
            <el-button type="primary" @click="isAdd ? handleAdd() : handleEdit()">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </div>

    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  channelConfigPage,
  insertChannelConfig,
  updateChannelConfig,
  deleteChannelConfig
} from "../../../../service/getData";
import { formatDate } from "../../../../config/mUtils";
export default {
  name: "externalChannel",
  data() {
    return {
      loading: false,
      titles: [
        {
          name: "渠道名称",
          tdKey: "channelName"
        },
        {
          name: "公司名称",
          tdKey: "companyName"
        },
        {
          name: "修改日期",
          tdKey: "gmtModified"
        },
        {
          name: "修改人",
          tdKey: "modifier"
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      //查询条件
      channelName: "",
      companyName: "",
      //弹出框
      isShowDialog: false,
      checkList: [],
      isAdd: true,
      form: {
        channelName: "",
        companyName: ""
      },
      formLabelWidth: "120px",
      id: ""
    };
  },
  computed: {},

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
      this.getChannelConfigPage();
    },

    async getChannelConfigPage() {
      try {
        this.loading = true;
        let data = await channelConfigPage({
          channelName: this.channelName,
          companyName: this.companyName,
          pageNumber: this.currentPage,
          pageSize: this.pageSize
        });
        this.loading = false;
        if (data.success) {
          this.tableData = data.model.rows;
          this.total = data.model.total;
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.loading = false;
        this.$refs.Alert.showError();
      }
    },

    async doAddConfig() {
      try {
        let data = await insertChannelConfig({
          channelName: this.form.channelName,
          companyName: this.form.companyName
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "渠道新增成功!"
          });
          this.$refs.Alert.showSuccess(() => {
            this.closeDialog();
            this.reLoadPage();
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

    async doUpdateConfig() {
      try {
        let data = await updateChannelConfig({
          channelName: this.form.channelName,
          companyName: this.form.companyName,
          id: this.id
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "渠道编辑成功!"
          });
          this.$refs.Alert.showSuccess(() => {
            this.closeDialog();
            this.reLoadPage();
          });
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

    async doDeleteConfig(id) {
      try {
        let data = await deleteChannelConfig({
          idArray: id
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "成功",
            successTxt: "删除渠道成功！"
          });
          this.$refs.Alert.showSuccess(() => {
            this.getChannelConfigPage();
          });
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

    reLoadPage() {
      this.$router.push({
        path: this.$route.path,
        query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    },

    setWarnTxt: function(str) {
      let myAlertTexts = {
        warnTit: "提示",
        warnTxt: "必填信息不能为空！"
      };
      myAlertTexts.warnTxt = str;
      this.$refs.Alert.resetTxts(myAlertTexts);
      this.$refs.Alert.showWarn();
    },

    checkForm() {
      if (!this.form.channelName) {
        this.setWarnTxt("渠道名称不能为空！");
        return false;
      }

      if (!this.form.companyName) {
        this.setWarnTxt("公司名称不能为空！");
        return false;
      }

      return true;
    },

    resetFormData() {
      this.form = {
        channelName: "",
        companyName: ""
      };
    },

    closeDialog() {
      this.isShowDialog = false;
      this.resetFormData();
    },

    openDialog(flag, row) {
      if (flag == "add") {
        this.isAdd = true;
        this.isShowDialog = true;
      }
      if (flag == "edit") {
        console.log(row);
        this.form = {
          channelName: row.channelName || "",
          companyName: row.companyName || ""
        };
        row && (this.id = row.id);
        this.isAdd = false;
        this.isShowDialog = true;
      }
    },

    handleAdd() {
      if (!this.checkForm()) {
        return;
      }
      this.doAddConfig();
    },

    handleEdit() {
      this.doUpdateConfig();
    },

    handleDelete(row) {
      console.log(row.id);
      this.$refs.Alert.resetTxts({
        warnTit: "删除操作",
        warnTxt: "您确定删除这条数据吗！"
      });
      this.$refs.Alert.showWarn(
        () => {
          this.doDeleteConfig(row.id);
        },
        () => {
          console.log("取消删除");
        }
      );
    },

    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getChannelConfigPage();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getChannelConfigPage();
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
