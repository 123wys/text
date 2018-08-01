<template>
  <div>
    <div class="fullTable">
      <div class="searchTitle">
        <span class="f-text">业务自定义：</span>
        <button type="button" class="btnQuery" @click="doDeleteRedisDataByKey">角色渠道缓存清除</button>
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
          <h1 class="tit">{{isAdd ? '新增页面配置' : '编辑页面配置'}}</h1>
          <el-form :model="form">

            <el-form-item label="新增时间" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="新增时间" v-model="form.addDate" disabled>
              <span class="formTip">*禁止更改</span>
            </el-form-item>
            <el-form-item label="业务明细" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写业务明细" v-model="form.busiDetail">
            </el-form-item>
            <el-form-item label="业务名称" :label-width="formLabelWidth">
              <input class="s-input" type="text" placeholder="请填写业务名称" v-model="form.busiName">
            </el-form-item>
            <el-form-item label="设备类型" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form.checkList">
                <el-checkbox label="ios+android">移动端</el-checkbox>
                <el-checkbox label="ios">IOS</el-checkbox>
                <el-checkbox label="android">Android</el-checkbox>
                <el-checkbox label="web">网页</el-checkbox>
                <el-checkbox label="micro">小程序</el-checkbox>
              </el-checkbox-group>
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
  queryXflowSource,
  DeleteRedisDataByKey,
  insertXflowSource,
  updateXflowSource,
  deleteXflowSource
} from "../../../../service/getData";
import { formatDate } from "../../../../config/mUtils";
export default {
  name: "serviceConfiguration",
  data() {
    return {
      loading: false,
      titles: [
        {
          name: "业务明细",
          tdKey: "source"
        },
        {
          name: "业务名称",
          tdKey: "source_name"
        },
        {
          name: "设备",
          tdKey: "os_name"
        },
        {
          name: "新建日期",
          tdKey: "gmt_created"
        },
        {
          name: "修改日期",
          tdKey: "gmt_modified"
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
        addDate: formatDate(new Date(), 3),
        busiDetail: "",
        busiName: "",
        checkList: []
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
      this.doQueryXflowSource();
    },

    async doQueryXflowSource() {
      try {
        this.loading = true;
        let data = await queryXflowSource({
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

    async doDeleteRedisDataByKey() {
      try {
        let data = await DeleteRedisDataByKey({
          key: "xflow_role_source"
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "提交成功",
            successTxt: "清除缓存成功!"
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

    async doAddSource() {
      try {
        let data = await insertXflowSource({
          bizdate: this.form.addDate,
          source: this.form.busiDetail,
          source_name: this.form.busiName,
          os: JSON.parse(JSON.stringify(this.form.checkList))
        });
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
        this.$refs.Alert.showError();
      }
    },

    async doUpdateSource() {
      try {
        let data = await updateXflowSource({
          bizdate: this.form.addDate,
          source: this.form.busiDetail,
          source_name: this.form.busiName,
          os: this.form.checkList,
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

    async doDeleteSource(id) {
      try {
        let data = await deleteXflowSource({
          idArray: id
        });
        if (data.success) {
          this.doQueryXflowSource();
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

    reLoadPage() {
      this.$router.push({
        path: this.$route.path,
        query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    },

    formatter(row, column, cellValue) {
      if (column.property == "gmt_created") {
        return formatDate(new Date(cellValue), 2);
      }
      if (column.property == "gmt_modified") {
        return formatDate(new Date(cellValue), 2);
      }
      return cellValue;
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
      if (!this.form.busiDetail) {
        this.setWarnTxt("业务明细不能为空！");
        return false;
      }

      if (!this.form.busiName) {
        this.setWarnTxt("业务名称不能为空！");
        return false;
      }

      return true;
    },

    resetFormData() {
      this.form = {
        addDate: formatDate(new Date(), 3),
        busiDetail: "",
        busiName: "",
        checkList: []
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
          addDate: formatDate(row.gmt_created || "", 3),
          busiDetail: row.source || "",
          busiName: row.source_name || "",
          checkList: (row.os && row.os.split(",")) || ""
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
      this.doAddSource();
    },

    handleEdit() {
      this.doUpdateSource();
    },

    handleDelete(row) {
      console.log(row.id);
      this.$refs.Alert.resetTxts({
        warnTit: "删除操作",
        warnTxt: "您确定删除这条数据吗！"
      });
      this.$refs.Alert.showWarn(
        () => {
          this.doDeleteSource(row.id);
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
      this.doQueryXflowSource();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.doQueryXflowSource();
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
