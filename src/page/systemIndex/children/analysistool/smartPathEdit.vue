<template>
  <div>
    <div class="backTit">
      <router-link to="smartPathWeb">&lt;&lt; 返回智能路径</router-link>
    </div>
    <div class="searchTitle clearfix">
      <span class="f-text">目标节点列表</span>
      <button type="button" class="btnQuery fr" @click="openDialog('add')">新增</button>
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
        <h1 class="tit">{{isAdd ? '新增路径配置' : '编辑路径配置'}}</h1>
        <el-form :model="form" class="myForm">

          <el-form-item label="路径名称：" :label-width="formLabelWidth">
            <i class='redStar'>*</i>
            <input class="s-input" type="text" placeholder="请填写路径名称" v-model="form.pathName">
          </el-form-item>

          <el-form-item label="路径URL：" :label-width="formLabelWidth">
            <i class="redStar">*</i>
            <input class="s-input" type="text" placeholder="请填写路径URL" v-model="form.pathUrl">
            <span class="formTip">用[.*]代替这组url的变量</span>
          </el-form-item>

          <el-form-item label="必经路径名称：" :label-width="formLabelWidth">
            <input class="s-input" type="text" placeholder="请填写必经路径名称" v-model="form.necessaryPathName">
            <span class="formTip">必经路径可以不填</span>
          </el-form-item>

          <el-form-item label="必经路径url：" :label-width="formLabelWidth">
            <input class="s-input" type="text" placeholder="请填写必经路径url" v-model="form.necessaryPathUrl">
          </el-form-item>

          <el-form-item label="节点类型 ：" :label-width="formLabelWidth">
            <el-select class="s-select" v-model="form.pathType" filterable placeholder="请选择">
              <el-option v-for="item in form.typeOptions" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
            <span class="formTip">如果是新增指标，需要t+1天来回溯路径数据</span>
          </el-form-item>

        </el-form>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="isAdd ? handleAdd() : handleEdit()">确 定</el-button>
        </div>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  configQuery,
  configAdd,
  configUpdate,
  configDelete
} from "../../../../service/getData";
import { formatDate } from "../../../../config/mUtils";

export default {
  name: "smartPathEdit",
  data() {
    return {
      loading: false,
      titles: [
        {
          name: "路径名称",
          tdKey: "pathName"
        },
        {
          name: "路径URL",
          tdKey: "pathUrl"
        },
        {
          name: "必经路径名称",
          tdKey: "necessaryPathName"
        },
        {
          name: "必经路径url",
          tdKey: "necessaryPathUrl"
        },
        {
          name: "路径来源",
          tdKey: "sourceName"
        },
        {
          name: "节点类型",
          tdKey: "pathType"
        },
        {
          name: "修改日期",
          tdKey: "modified"
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
      typeOptions: [],
      id: "",
      //弹出框
      isShowDialog: false,
      isAdd: true,
      form: {
        pathName: "",
        pathUrl: "",
        necessaryPathName: "",
        necessaryPathUrl: "",
        sourceName: "",
        pathType: "",
        typeOptions: [
          { name: "PC", value: "web" },
          { name: "APP", value: "ios+android" },
          { name: "IOS", value: "ios" },
          { name: "Android", value: "android" }
        ]
      },
      formLabelWidth: "135px"
    };
  },
  computed: {
    ...mapState(["appSource"]), //获取全局appSource
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
      this.doConfigQuery();
    },

    async doConfigQuery() {
      try {
        this.loading = true;
        let data = await configQuery({
          appSource: this.appSource,
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
        console.log(error);
        this.loading = false;
        this.$refs.Alert.showError();
      }
    },

    async doConfigAdd() {
      try {
        let data = await configAdd({
          pathName: this.form.pathName,
          pathUrl: this.form.pathUrl,
          necessaryPathName: this.form.necessaryPathName,
          necessaryPathUrl: this.form.necessaryPathUrl,
          source: this.appSource,
          pathType: this.form.pathType
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "路径新增成功!"
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

    async doConfigUpdate() {
      try {
        let data = await configUpdate({
          pathName: this.form.pathName,
          pathUrl: this.form.pathUrl,
          necessaryPathName: this.form.necessaryPathName,
          necessaryPathUrl: this.form.necessaryPathUrl,
          source: this.appSource,
          pathType: this.form.pathType,
          id: this.id
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "路径编辑成功!"
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

    async doConfigDelete(id) {
      try {
        let data = await configDelete({
          id: id
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "路径删除成功!"
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
      if (!this.form.pathName) {
        this.setWarnTxt("路径名称不能为空！");
        return false;
      }

      if (!this.form.pathUrl) {
        this.setWarnTxt("路径URL不能为空！");
        return false;
      }

      if (!this.form.pathType) {
        this.setWarnTxt("节点类型不能为空！");
        return false;
      }

      return true;
    },

    resetFormData() {
      this.form = {
        pathName: "",
        pathUrl: "",
        necessaryPathName: "",
        necessaryPathUrl: "",
        sourceName: "",
        pathType: "",
        typeOptions: [
          { name: "PC", value: "web" },
          { name: "APP", value: "ios+android" },
          { name: "IOS", value: "ios" },
          { name: "Android", value: "android" }
        ]
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
        this.form = {
          pathName: row.pathName || "",
          pathUrl: row.pathUrl || "",
          necessaryPathName: row.necessaryPathName || "",
          necessaryPathUrl: row.necessaryPathUrl || "",
          sourceName: row.source || "",
          pathType: row.pathType || "",
          typeOptions: [
            { name: "PC", value: "web" },
            { name: "APP", value: "ios+android" },
            { name: "IOS", value: "ios" },
            { name: "Android", value: "android" }
          ]
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
      this.doConfigAdd();
    },

    handleEdit() {
      this.doConfigUpdate();
    },

    handleDelete(row) {
      this.$refs.Alert.resetTxts({
        warnTit: "删除操作",
        warnTxt: "您确定删除这条数据吗！"
      });
      this.$refs.Alert.showWarn(
        () => {
          this.doConfigDelete(row.id);
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
      this.doConfigQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.doConfigQuery();
    }
  },

  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.blueTxt {
  color: #5693fb;
}

.dialogWrapper /deep/ .el-form-item .s-input[type="text"] {
  width: 300px;
}

.backTit {
  height: 50px;
  border: 1px solid #e6e8ef;
  background: #ffffff;
  a {
    margin-left: 18px;
    font-family: ArialMT;
    font-size: 16px;
    color: #5693fb;
    line-height: 50px;
  }
}

.dialog {
  padding: 13px 20px 20px;
  .tit {
    position: relative;
    top: 0;
    left: 0;
    line-height: 25px;
    height: 35px;
    border-bottom: 1px solid #e6e8ef;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #000000;
    letter-spacing: 0;
  }
  .myForm {
    padding: 50px 30px;
    /deep/ .el-form-item__label {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #000000;
    }
    .redStar {
      position: absolute;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #d0021b;
    }
  }
  .dialog-footer {
    margin-bottom: 20px;
    text-align: center;
  }

  .dialog-footer button {
    float: none;
    margin-right: 20px;
  }
}
</style>