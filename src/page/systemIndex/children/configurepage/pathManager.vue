<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle">
        <span class="f-text">业务自定义：</span>
        <button type="button" class="btnQuery" @click="openDialog('add')">新增</button>
      </div>
      <div class="tableWrapper">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="item in titles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" :formatter="formatter" show-overflow-tooltip>
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
          <el-form :model="form">

            <el-form-item label="路径名称" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写路径名称" v-model="form.urlName">
            </el-form-item>
            <el-form-item label="路径URL" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写路径URL" v-model="form.url">
            </el-form-item>
            <el-form-item label="正则类型" :label-width="formLabelWidth">
              <el-select class="urlSelect" v-model="form.selectReg" filterable placeholder="请选择">
                <el-option v-for="item in form.regList" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="路径来源" :label-width="formLabelWidth">
              <el-select class="urlSelect" v-model="form.selectUrl" filterable placeholder="请选择">
                <el-option v-for="item in form.urlList" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点类型" :label-width="formLabelWidth">
              <el-select class="urlSelect" v-model="form.selectType" filterable placeholder="请选择">
                <el-option v-for="item in form.typeList" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
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
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  queryUrls,
  addRootUrl,
  updateRootUrl,
  deleteRootUrls
} from "../../../../service/getData";
import { formatDate } from "../../../../config/mUtils";
export default {
  name: "pathManager",
  data() {
    return {
      loading: false,
      titles: [
        {
          name: "路径名称",
          tdKey: "rootUrlName"
        },
        {
          name: "路径URL",
          tdKey: "rootUrl"
        },
        {
          name: "正则类型",
          tdKey: "isRegex"
        },
        {
          name: "路径来源",
          tdKey: "sourceName"
        },
        {
          name: "节点类型",
          tdKey: "urlType"
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

      //弹出框
      isShowDialog: false,
      checkList: [],
      isAdd: true,
      form: {
        urlName: "",
        url: "",
        regList: [{ name: "是", value: 1 }, { name: "否", value: 0 }],
        urlList: [],
        typeList: [
          { name: "PC", value: 0 },
          { name: "APP", value: 1 },
          { name: "IOS", value: 11 },
          { name: "Android", value: 12 }
        ],
        selectReg: "",
        selectUrl: "",
        selectType: ""
      },
      formLabelWidth: "120px",
      id: ""
    };
  },
  computed: {
    ...mapState(["appSourceList"]) //获取全局缓存的appSourceList
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
      this.doQueryUrls();
    },

    async doQueryUrls() {
      try {
        this.loading = true;
        let data = await queryUrls({
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

    async doAddUrl() {
      try {
        let data = await addRootUrl({
          rootUrlName: this.form.urlName,
          rootUrl: this.form.url,
          isRegex: this.form.selectReg,
          source: this.form.selectUrl,
          urlType: this.form.selectType
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
        console.log(error);
        this.$refs.Alert.showError();
      }
    },

    async doUpdateUrl() {
      try {
        let data = await updateRootUrl({
          rootUrlName: this.form.urlName,
          rootUrl: this.form.url,
          isRegex: this.form.selectReg,
          source: this.form.selectUrl,
          urlType: this.form.selectType,
          id: this.id
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "页面编辑成功!"
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

    async doDeleteUrl(id) {
      try {
        let data = await deleteRootUrls({
          idArray: id
        });
        if (data.success) {
          this.doQueryUrls();
          this.$refs.Alert.resetTxts({
            successTit: "成功",
            successTxt: "删除数据成功！"
          });
          this.$refs.Alert.showSuccess();
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

    formatter(row, column, cellValue) {
      if (column.property == "gmtModified") {
        return formatDate(new Date(cellValue), 2);
      }
      if (column.property == "isRegex") {
        return cellValue == 1 ? "是" : "否";
      }
      return cellValue;
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
      if (!this.form.urlName) {
        this.setWarnTxt("请填写路径名称！");
        return false;
      }

      if (!this.form.url) {
        this.setWarnTxt("请填写路径URL！");
        return false;
      }

      if (!this.form.selectReg) {
        this.setWarnTxt("请选择正则类型！");
        return false;
      }

      if (!this.form.selectUrl) {
        this.setWarnTxt("请选择路径来源！");
        return false;
      }

      if (!this.form.selectType) {
        this.setWarnTxt("请选择节点类型！");
        return false;
      }

      return true;
    },

    resetFormData() {
      this.form = {
        urlName: "",
        url: "",
        regList: [{ name: "是", value: 1 }, { name: "否", value: 0 }],
        urlList: [],
        typeList: [
          { name: "PC", value: 0 },
          { name: "APP", value: 1 },
          { name: "IOS", value: 11 },
          { name: "Android", value: 12 }
        ],
        selectReg: "",
        selectUrl: "",
        selectType: ""
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
          urlName: row.rootUrlName,
          url: row.rootUrl,
          regList: [{ name: "是", value: 1 }, { name: "否", value: 0 }],
          urlList: [],
          typeList: [
            { name: "PC", value: 0 },
            { name: "APP", value: 1 },
            { name: "IOS", value: 11 },
            { name: "Android", value: 12 }
          ],
          selectReg: row.isRegex,
          selectUrl: row.source,
          selectType: row.urlType
        };
        row && (this.id = row.id);
        this.isAdd = false;
        this.isShowDialog = true;
      }

      this.form.urlList = this.appSourceList;
      
    },

    handleAdd() {
      if (!this.checkForm()) {
        return;
      }
      this.doAddUrl();
    },

    handleEdit() {
      this.doUpdateUrl();
    },

    handleDelete(row) {
      console.log(row.id);
      this.$refs.Alert.resetTxts({
        warnTit: "删除操作",
        warnTxt: "您确定删除这条数据吗！"
      });
      this.$refs.Alert.showWarn(
        () => {
          this.doDeleteUrl(row.id);
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
      this.doQueryUrls();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.doQueryUrls();
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.urlSelect {
  width: 360px;
}

.dialogWrapper /deep/ .el-scrollbar__wrap {
  max-height: 250px;
}
</style>
