<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle">
        <span class="s-text">页面ID:</span><input v-model="pageId" class="s-input" type="text" placeholder="页面ID" style="width: 80px;">
        <span class="s-text">区块ID:</span><input v-model="areaId" class="s-input" type="text" placeholder="区块ID" style="width: 80px;">
        <span class="s-text">修改人:</span><input v-model="modifier" class="s-input" type="text" placeholder="修改人" style="width: 120px;">
        <span class="s-text">关键词:</span><input v-model="searchTxt" class="s-input" type="text" placeholder="区块名称/站点名称" style="width: 170px;">

        <button type="button" class="btnQuery" @click="getQueryPages">查询</button>
        <button type="button" class="btnQuery" @click="openDialog('add')">新增</button>

        <span class="download" style="margin-top:5px" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
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
        <div class="dialog" v-loading="!isFinished">
          <h1 class="tit">{{isAdd ? '新增区块配置' : '编辑区块配置'}}</h1>
          <el-form :model="form">

            <el-form-item label="区块ID" :label-width="formLabelWidth" v-show="!isAdd">
              <input class="s-input" type="text" placeholder="区块ID" v-model="form.areaId" disabled>
            </el-form-item>

            <el-form-item label="页面ID" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="页面ID" v-model="form.pageId" @blur="doQueryPageId">
              <span class="formTip" v-show="pageIdTip">{{pageIdTip}}</span>
            </el-form-item>

            <el-form-item label="站点" :label-width="formLabelWidth">
              <el-select class="s-select" v-model="form.stateId" filterable placeholder="请选择">
                <el-option v-for="item in form.options" :key="item.site_code" :label="item.site_name" :value="item.site_code">
                </el-option>
              </el-select>
              <span class="formTip" v-show="stateIdTip">{{stateIdTip}}</span>
            </el-form-item>

            <el-form-item label="区块名称" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写区块名称" v-model="form.areaName">
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
  queryAreas,
  queryPageId,
  blockAdd,
  blockEdit,
  blockUpdate,
  blockDelete
} from "../../../../service/getData";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";
export default {
  name: "block",
  data() {
    return {
      loading: false,
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
          name: "区块ID",
          tdKey: "areaId"
        },
        {
          name: "区块名称",
          tdKey: "areaName"
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
      total: 0,
      pageIdTip: "",
      stateIdTip: "站点ID会根据页面ID自动填写！",
      id: "",

      //查询条件
      searchTxt: "",
      areaId: "",
      pageId: "",
      modifier: "",
      //弹出框
      isShowDialog: false,
      isAdd: true,
      form: {
        stateId: "",
        pageId: "",
        areaId: "",
        areaName: "",
        options: []
      },
      formLabelWidth: "120px",
      isFinished: true
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"]) //获取全局appSource os
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
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
      this.getQueryPages();
    },

    async doQueryPageId() {
      try {
        let data = await queryPageId({
          pageId: this.form.pageId
        });
        if (data.success) {
          if (data.model) {
            this.pageIdTip = "";
            this.form.stateId = data.model.site_code;
            this.form.options = [data.model];
          } else {
            this.pageIdTip = "页面ID不存在！";
          }
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
        let data = await queryAreas({
          appSource: this.appSource,
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          modifier: this.modifier,
          areaId: this.areaId,
          pageId: this.pageId,
          areaName: this.searchTxt
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

    async doAddPage() {
      try {
        this.isFinished = false;
        let data = await blockAdd({
          stateId: this.form.stateId,
          pageId: this.form.pageId,
          areaName: this.form.areaName
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
        console.log(error);
        this.isFinished = true;
        this.$refs.Alert.showError();
      }
    },

    async doUpdatePage() {
      try {
        this.isFinished = false;
        let data = await blockUpdate({
          stateId: this.form.stateId,
          pageId: this.form.pageId,
          areaName: this.form.areaName,
          areaId: this.form.areaId,
          id: this.id
        });
        this.isFinished = true;
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "页面编辑成功!"
          });
          this.$refs.Alert.showSuccess(() => {
            _this.closeDialog();
            _this.reLoadPage();
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
        let data = await blockDelete({
          id: id
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

    formatter(row, column, cellValue) {
      if (column.property == "gmtCreated") {
        return formatDate(new Date(cellValue), 2);
      }
      if (column.property == "gmtModified") {
        return formatDate(new Date(cellValue), 2);
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
      if (!this.form.pageId) {
        this.setWarnTxt("页面ID不能为空！");
        return false;
      }

      if (!this.form.stateId) {
        this.setWarnTxt("站点不能为空！");
        return false;
      }

      if (!this.form.areaName) {
        this.setWarnTxt("区块名称不能为空！");
        return false;
      }

      return true;
    },

    resetFormData() {
      this.form = {
        stateId: "",
        pageId: "",
        areaId: "",
        areaName: "",
        options: []
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
          stateId: row.siteName || "",
          pageId: row.pageId || "",
          areaName: row.areaName || "",
          areaId: row.areaId || ""
        };
        row && (this.id = row.id);
        console.log(row);
        this.form.options = [JSON.parse(JSON.stringify(row))];
        this.form.stateId = row.stateId;
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

    goDownload() {
      let url = `/asm/pageview_asm_area/query_areas_export.json?areaId=${
        this.areaId
      }&areaName=${this.searchTxt}&modifier=${this.modifier}&pageId=${
        this.pageId
      }`;
      Download(url);
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
