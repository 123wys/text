<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle">
        <span class="f-text">站点：</span>
        <el-select class="s-select" v-model="stateId" filterable placeholder="请选择" style="width: 150px;">
          <el-option v-for="item in options" :label="item.siteName" :value="item.siteCode" :key="item.siteCode">
          </el-option>
        </el-select>
        <span class="s-text">页面ID:</span><input v-model="pageId" class="s-input" type="text" placeholder="页面ID" style="width: 80px;">
        <span class="s-text">修改人:</span><input v-model="modifier" class="s-input" type="text" placeholder="修改人" style="width: 120px;">
        <span class="s-text">关键词:</span><input v-model="pageName" class="s-input" type="text" placeholder="站点/页面名称/修改人" style="width: 170px;">

        <button type="button" class="btnQuery" @click="getQueryPages">查询</button>
        <button type="button" class="btnQuery" @click="openDialog('add')">新增</button>
        <span class="download fr" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
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
        <div class="dialog" v-loading="!isFinished">
          <h1 class="tit">{{isAdd ? '新增页面配置' : '编辑页面配置'}}</h1>
          <el-form :model="form">
            <el-form-item label="站点" :label-width="formLabelWidth">
              <el-select class="s-select" v-model="form.stateId" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.siteCode" :label="item.siteName" :value="item.siteCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面ID" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="页面ID" v-model="form.pageId" disabled>
            </el-form-item>
            <el-form-item label="页面名称" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写页面名称" v-model="form.pageName">
            </el-form-item>
            <el-form-item label="页面url" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写页面url" v-model="form.pageUrl">
            </el-form-item>
            <el-form-item label="页面备注" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写页面备注" v-model="form.pageRemark">
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
  queryPages,
  stateList,
  acPageId,
  addPage,
  updatePage,
  deletePages
} from "../../../../service/getData";
import download from "../../svg/download";
import { Download } from "../../../../config/mUtils";
export default {
  name: "pageConfig",
  data() {
    return {
      loading: false,
      options: [],
      titles: [
        {
          name: "站点ID",
          tdKey: "stateId"
        },
        {
          name: "站点",
          tdKey: "stateName"
        },
        {
          name: "页面ID",
          tdKey: "pageId"
        },
        {
          name: "页面名称",
          tdKey: "pageName"
        },
        {
          name: "页面Url",
          tdKey: "pageUrlReg"
        },
        {
          name: "页面描述",
          tdKey: "pageRemark"
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
      //查询条件
      stateId: "",
      pageId: "",
      modifier: "",
      pageName: "",
      //弹出框
      isShowDialog: false,
      isAdd: true,
      form: {
        stateId: "",
        pageId: "",
        pageName: "",
        pageUrl: "",
        pageRemark: ""
      },
      formLabelWidth: "120px",
      id: "",
      isFinished: true
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
      this.getStateList();
      this.getQueryPages();
    },

    async getStateList() {
      try {
        let data = await stateList();
        if (data.success) {
          this.options = data.model;
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

    async getQueryPages() {
      try {
        this.loading = true;
        let data = await queryPages({
          stateId: this.stateId,
          pageId: this.pageId,
          modifier: this.modifier,
          pageName: this.pageName,
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

    async getPageId() {
      try {
        let data = await acPageId();
        if (data.success) {
          this.form.pageId = data.model;
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

    async doAddPage() {
      try {
        this.isFinished = false;
        let data = await addPage({
          stateId: this.form.stateId,
          pageId: this.form.pageId,
          pageName: this.form.pageName,
          pageUrlReg: this.form.pageUrl,
          pageRemark: this.form.pageRemark
        });
        this.isFinished = true;
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "页面新增成功!"
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
        this.isFinished = true;
        this.$refs.Alert.showError();
      }
    },

    async doUpdatePage() {
      try {
        this.isFinished = false;
        let data = await updatePage({
          stateId: this.form.stateId,
          pageId: this.form.pageId,
          pageName: this.form.pageName,
          pageUrlReg: this.form.pageUrl,
          pageRemark: this.form.pageRemark,
          id: this.id
        });
        this.isFinished = true;
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
        this.isFinished = true;
        this.$refs.Alert.showError();
      }
    },

    async doDeletePages(id) {
      try {
        let data = await deletePages({
          idArray: id
        });
        if (data.success) {
          this.getQueryPages();
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

    goDownload() {
      let url = `/asm/pageview_asm_page/query_pages_export.json?stateId=${
        this.stateId
      }&pageId=${this.pageId}&modifier=${this.modifier}&pageName=${
        this.pageName
      }`;
      Download(url);
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
      if (!this.form.stateId) {
        this.setWarnTxt("站点不能为空！");
        return false;
      }

      if (!this.form.pageId) {
        this.setWarnTxt("页面ID不能为空！");
        return false;
      }

      if (!this.form.pageName) {
        this.setWarnTxt("页面名称不能为空！");
        return false;
      }

      // if (!this.form.pageUrl) {
      //   this.setWarnTxt("页面Url不能为空！");
      //   return false;
      // }

      return true;
    },

    resetFormData() {
      this.form = {
        stateId: "",
        pageId: "",
        pageName: "",
        pageUrl: "",
        pageRemark: ""
      };
    },

    closeDialog() {
      this.isShowDialog = false;
      this.resetFormData();
    },

    openDialog(flag, row) {
      if (flag == "add") {
        this.getPageId();
        this.isAdd = true;
        this.isShowDialog = true;
      }
      if (flag == "edit") {
        this.form = {
          stateId: row.stateId || '',
          pageId: row.pageId || '',
          pageName: row.pageName || '',
          pageUrl: row.pageUrlReg || '',
          pageRemark: row.pageRemark || ''
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
      this.doAddPage();
    },

    handleEdit() {
      this.doUpdatePage();
    },

    handleDelete(row) {
      console.log(row.id);
      this.$refs.Alert.resetTxts({
        warnTit: "删除操作",
        warnTxt: "您确定删除这条数据吗！"
      });
      this.$refs.Alert.showWarn(
        () => {
          this.doDeletePages(row.id);
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
      this.getQueryPages();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getQueryPages();
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
