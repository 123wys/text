<template>
  <div>
    <div class="addEarlyWarning" v-show="!isShowAddWarning" @click="isShowAddWarning = true">
      <div class="addWarningBtn">
        <earlyWarningAdd class="addWarningIcon"></earlyWarningAdd>
        <span>创建新预警</span>
      </div>
    </div>
    <div class=" fullTable" v-show="isShowAddWarning">
      <div class="searchTitle">
        <span class="f-text">创建新预警</span>
      </div>
      <div class="tableWrapper clearfix">
        <div class="ontimeChartContent" style="height: auto;margin-top: 10px;float: left;margin-bottom: 10px;padding: 20px;">
          <div class="col-xs-12 col-sm-12 widget-container-col ui-sortable create_warning" style="width: 90%;margin: 0 auto;float: initial">
            <form style="text-align:left">
              <div class="warning_content">
                <div class="warning_name">
                  <span class="tab_title">预警名称：</span><input type="text" id="warning_name" class="warning_select" style="padding: 0;"></div>
                <div class="warning_desc">
                  <span class="tab_title">描述：</span><input type="text" id="warning_desc" class="warning_select" style="padding: 0;"></div>
              </div>
              <div class="warning_step">IF:</div>
              <div class="warning_if">
                <div class="warning_name">
                  <select name="" id="warning_time" class="warning_select">

                  </select>
                </div>
                <div class="warning_desc">
                  <select name="" id="warning_temp" class="warning_select">

                  </select>
                </div>
                <div class="warning_desc">
                  <select name="" id="warning_duibi" class="warning_select">

                  </select>
                </div>
                <div class="warning_desc">
                  <select name="" id="warning_than" class="warning_select">

                  </select>
                </div>
                <div class="warning_desc">
                  <input name="" id="warning_per" type="number" class="warning_select" placeholder="数值" />
                </div>
                <span class="warning_per">%</span>
              </div>
              <div class="warning_step">AND</div>
              <div class="warning_and">
                <div class="warning_name">
                  <span class="tab_title">预警时间段：</span><input type="number" class="warning_select" id="warning_start"></div>
                <div class="warning_name">
                  <span class="warning_padding">至</span><input type="number" class="warning_select" id="warning_end"></div>
              </div>
              <div class="warning_step">THEN</div>
              <div class="clearfix">
                <div class="warning_line">
                  <span class="tab_title title_email">发邮件：</span>
                  <!-- <div class="input_content" contenteditable="true"></div> -->
                  <input class="input_content" type="text">
                  <span class="email_hint">请输入邮箱号，按回车键结束</span>
                </div>
                <div class="line_content" id="email_box"></div>
                <div class="warning_line">
                  <span class="tab_title">发送频率：</span>
                  <select name="" id="send_frequency">
                  </select>
                </div>
                <div class="warning_line">
                  <span class="tab_title">发送次数：</span>
                  <input id="send_time" type="number" value="1" />
                  <span>次</span>
                </div>
              </div>
              <div class="btn_content">
                <span class="btn_cancel" @click="isShowAddWarning = false">取消</span>
                <span class="btn_save" @click="handleAdd">保存</span>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

    <div class="fullTable">
      <div class="searchTitle">
        <span class="f-text">整体趋势明细 </span>
      </div>
      <p class="s-Tit">实时概况</p>
      <div class="tableWrapper">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column v-for="(item,index) in titles" :key="item.tdKey" :prop="item.tdKey" :label="item.name" height="440" min-width="50" :formatter="formatter" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="usingStatus" label="状态" width="100" :filters="[{ text: '停用', value: '停用',style: 'color:#f00' }, { text: '启用', value: '启用' }]" :filter-method="filterTag" filter-placement="bottom-end">
            <template slot-scope="scope">
              <span :class="scope.row.usingStatus===1 ? 'primary' : 'success'">{{scope.row.usingStatus == 0 ? '停用': '启用'}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleStop(scope.row)" type="text" size="small">{{scope.row.usingStatus == 1 ? '停用': '启用'}}</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>

    </div>

    <div class="dialogWrapper" v-show="dialogFormVisible">
      <div class="dialogMask"></div>
      <div class="dialog">
        <div class="edit_content">
          <div class="title_content">
            <span>编辑预警</span>
            <div class="close_img" onclick="edit_hide();"></div>
          </div>
          <div class="col-xs-12 col-sm-12 widget-container-col ui-sortable create_warning">
            <form>
              <div class="warning_content">
                <div class="warning_name">
                  <span class="tab_title">预警名称：</span><input type="text" id="editwarning_name" class="warning_select"></div>
                <div class="warning_desc">
                  <span class="tab_title">描述：</span><input type="text" id="editwarning_desc" class="warning_select"></div>
              </div>
              <div class="warning_step">IF:</div>
              <div class="warning_if">
                <div class="warning_name">
                  <select name="" id="editwarning_time" class="warning_select">
                  </select>
                </div>
                <div class="warning_desc">
                  <select name="" id="editwarning_temp" class="warning_select">
                  </select>
                </div>
                <div class="warning_desc">
                  <select name="" id="editwarning_duibi" class="warning_select">
                  </select>
                </div>
                <div class="warning_desc">
                  <select name="" id="editwarning_than" class="warning_select">
                  </select>
                </div>
                <div class="warning_desc">
                  <input name="" id="editwarning_per" type="number" class="warning_select" placeholder="数值" />
                </div>
                <span class="warning_per">%</span>
              </div>
              <div class="warning_step">AND</div>
              <div class="warning_and">
                <div class="warning_name">
                  <span class="tab_title">预警时间段：</span><input type="number" id="editwarning_start" class="warning_select"></div>
                <div class="warning_name">
                  <span class="warning_padding">至</span><input type="number" id="editwarning_end" class="warning_select"></div>
                <span class="glyphicon glyphicon-question-sign" style="top: 2px;margin-left: 8px;" data-rel="popover" data-trigger="hover" data-placement="right" data-content="收到预警的时间段" data-original-title="" title=""></span>
              </div>
              <div class="warning_step">THEN</div>
              <div class="clearfix">
                <div class="warning_line" id="send_email">
                  <span class="tab_title title_email">发邮件：</span>
                  <div class="editinput_content" contenteditable="true"></div>
                  <span class="email_hint">请输入邮箱号，按回车键结束</span>
                </div>
                <div class="line_content" id="editemail_box"></div>
                <div class="warning_line">
                  <span class="tab_title">发送频率：</span>
                  <select name="" id="editsend_frequency">
                  </select>
                </div>
                <div class="warning_line">
                  <span class="tab_title">发送次数：</span>
                  <input id="editsend_time" type="number" value="1" />
                  <span>次</span>
                </div>
              </div>
              <div class="warning_content btn_content">
                <span class="btn_cancel" @click="dialogFormVisible = false">取消</span>
                <span class="btn_save" @click="handleSaveEdit">保存</span>
              </div>
            </form>
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
  pageQuery,
  dropDownSet,
  monitorAdd,
  monitorDetail,
  monitorUpdate,
  usingStatusUpdate,
  monitorDelete
} from "../../../../service/getData";
import earlyWarningAdd from "./svg/earlyWarningAdd";
import download from "../../svg/download";
import { Download, formatDate } from "../../../../config/mUtils";

window.delete_div = function(_that) {
  $(_that)
    .parent()
    .remove();
};
export default {
  name: "pageConfig",
  data() {
    return {
      loading: false,
      options: [],
      titles: [
        {
          name: "预警名称",
          tdKey: "warningName"
        },
        {
          name: "修改者",
          tdKey: "modifier"
        },
        {
          name: "创建时间",
          tdKey: "gmtCreated"
        },
        {
          name: "修改时间",
          tdKey: "gmtModified"
        },
        {
          name: "描述",
          tdKey: "warningDesc"
        }
      ],
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,

      isShowAddWarning: false,

      //弹出框
      dialogFormVisible: false,
      editId: ""
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
      var clear = function() {
        $(".input_content").val("");
        $(".editinput_content").val("");
      };

      $(".input_content").bind("keydown", function(e) {
        // 兼容FF和IE和Opera
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        var innerHtml = $(".input_content").val();

        if (code == 13) {
          //回车执行查询
          if (innerHtml == "") {
            setTimeout(clear, 1);
            return;
          }
          var email_warningarr = $(".email_warning");
          if (email_warningarr.length > 9) {
            setTimeout(clear, 1);
            alert("最多添加10个邮箱");
            return;
          }
          var shtml =
            '<div class="email warning_email"><span class="email_warning">' +
            innerHtml +
            '</span><div class="email_delete" onclick="delete_div(this)"></div></div>';
          $("#email_box").append(shtml);
          setTimeout(clear, 1);
        }
      });

      this.initPage();
    });
  },
  methods: {
    initPage() {
      this.getPageQuery();
      this.getDropDownSet();
    },

    filterTag(value, row) {
      return row.usingStatus === (value == "停用" ? 1 : 0);
    },

    formatter(row, column, cellValue) {
      if (column.property == 'gmtCreated') {
        return formatDate(new Date(cellValue), 2);
      }
      if (column.property == 'gmtModified') {
        return formatDate(new Date(cellValue), 2);
      }
      return cellValue;
    },

    async getPageQuery() {
      try {
        this.loading = true;
        let data = await pageQuery({
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          appSource: this.appSource,
          os: this.headerTapOs
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

    async doMonitorDelete(id) {
      try {
        let data = await monitorDelete({
          id: id
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "成功",
            successTxt: "删除数据成功！"
          });
          this.$refs.Alert.showSuccess(() => {
            this.getPageQuery();
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

    async doUsingStatusUpdate(id, usingStatus) {
      try {
        let data = await usingStatusUpdate({
          id: id,
          usingStatus: usingStatus
        });
        if (data.success) {
          this.getPageQuery();
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

    async doMonitorAdd(
      warning_name,
      warning_desc,
      warning_time,
      warning_temp,
      warning_duibi,
      warning_than,
      warning_per,
      warning_start,
      warning_end,
      email_address,
      send_frequency,
      send_time
    ) {
      try {
        let data = await monitorAdd({
          appSource: this.appSource,
          os: this.headerTapOs,
          warningName: warning_name,
          warningDesc: warning_desc,
          quotaCycle: warning_time,
          quota: warning_temp,
          ratioType: warning_duibi,
          compare: warning_than,
          ratioValue: warning_per,
          timePeriodBegin: warning_start,
          timePeriodEnd: warning_end,
          addressee: email_address,
          sendRate: send_frequency,
          allowTimes: send_time
        });
        if (data.success) {
          this.$refs.Alert.resetTxts({
            successTit: "成功",
            successTxt: "新增预警成功！"
          });
          this.$refs.Alert.showSuccess(() => {
            this.reLoadPage();
          });
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "新增预警失败！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.$refs.Alert.showError();
      }
    },

    async getMonitorDetail(id) {
      try {
        let data = await monitorDetail({
          id: id
        });
        if (data.success) {
          data = data.model;
          this.dialogFormVisible = true;
          $(".box_shadow").show();
          $(".edit_content").show();
          $(".editbtn_cancel").attr("data-id", data.id);
          $("#editwarning_name").val(data.warningName);
          $("#editwarning_name").attr("data-id", data.id);
          $("#editwarning_desc").val(data.warningDesc);
          $("#editwarning_time").val(data.quotaCycle);
          $("#editwarning_temp").val(data.quota);
          $("#editwarning_duibi").val(data.ratioType);
          $("#editwarning_than").val(data.compare);
          $("#editwarning_per").val(data.ratioValue);
          $("#editwarning_start").val(data.timePeriodBegin);
          $("#editwarning_end").val(data.timePeriodEnd);
          $("#editsend_frequency").val(data.sendRate);
          $("#editsend_time").val(data.allowTimes);

          var emailarr = data.addressee.split(",");
          $("#editemail_box").html("");
          $.each(emailarr, function(idx, one) {
            var innerHtml = emailarr[idx];
            var shtml =
              '<div class="email warning_email"><span class="editemail_warning">' +
              innerHtml +
              '</span><div class="email_delete" onclick="delete_div(this)"></div></div>';
            $("#editemail_box").append(shtml);
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

    async getMonitorUpdate(
      warning_name,
      warning_desc,
      warning_time,
      warning_temp,
      warning_duibi,
      warning_than,
      warning_per,
      warning_start,
      warning_end,
      email_address,
      send_frequency,
      send_time,
      id
    ) {
      try {
        let data = await monitorUpdate({
          appSource: this.appSource,
          os: this.headerTapOs,
          warningName: warning_name,
          warningDesc: warning_desc,
          quotaCycle: warning_time,
          quota: warning_temp,
          ratioType: warning_duibi,
          compare: warning_than,
          ratioValue: warning_per,
          timePeriodBegin: warning_start,
          timePeriodEnd: warning_end,
          addressee: email_address,
          sendRate: send_frequency,
          allowTimes: send_time,
          id: id
        });
        if (data.success) {
          this.dialogFormVisible = false;

          this.$refs.Alert.resetTxts({
            successTit: "成功",
            successTxt: "编辑预警成功！"
          });
          this.$refs.Alert.showSuccess(() => {
            this.reLoadPage();
          });
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "新增预警失败！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (error) {
        this.$refs.Alert.showError();
      }
    },

    async getDropDownSet(id, usingStatus) {
      try {
        let data = await dropDownSet();
        if (data.success) {
          var warning_time = "";
          var warning_duibi = "";
          var warning_than = "";
          var send_frequency = "";
          var warning_temp = "";
          $.each(data.model.compare, function(idx, one) {
            warning_than =
              warning_than +
              " <option value=" +
              one.id +
              ">" +
              one.name +
              "</option>";
          });
          $("#warning_than").html(warning_than);
          $("#editwarning_than").html(warning_than);

          $.each(data.model.quotaCycle, function(idx, one) {
            warning_time =
              warning_time +
              "<option value=" +
              one.id +
              ">" +
              one.name +
              "</option>";
          });
          $("#warning_time").html(warning_time);
          $("#editwarning_time").html(warning_time);

          $.each(data.model.ratioType, function(idx, one) {
            warning_duibi =
              warning_duibi +
              "<option value=" +
              one.id +
              ">" +
              one.name +
              "</option>";
          });
          $("#warning_duibi").html(warning_duibi);
          $("#editwarning_duibi").html(warning_duibi);

          $.each(data.model.sendRate, function(idx, one) {
            send_frequency =
              send_frequency +
              "<option value=" +
              one.id +
              ">" +
              one.name +
              "</option>";
          });
          $("#send_frequency").html(send_frequency);
          $("#editsend_frequency").html(send_frequency);

          $.each(data.model.monitoringIndex, function(idx, one) {
            warning_temp =
              warning_temp +
              "<option value=" +
              one.id +
              ">" +
              one.name +
              "</option>";
          });
          $("#warning_temp").html(warning_temp);
          $("#editwarning_temp").html(warning_temp);
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

    resetFormData() {
      this.form = {
        stateId: "",
        pageId: "",
        pageName: "",
        pageUrl: "",
        pageRemark: ""
      };
    },

    reLoadPage() {
      console.log(11111);
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

      if (!this.form.pageName.trim()) {
        this.setWarnTxt("页面名称不能为空！");
        return false;
      }

      if (!this.form.pageUrl.trim()) {
        this.setWarnTxt("页面Url不能为空！");
        return false;
      }

      return true;
    },

    handleAdd() {
      var warning_name = $("#warning_name").val();
      var warning_desc = $("#warning_desc").val();
      var warning_time = $("#warning_time").val();
      var warning_temp = $("#warning_temp").val();
      var warning_duibi = $("#warning_duibi").val();
      var warning_than = $("#warning_than").val();
      var warning_per = $("#warning_per").val();
      var warning_start = $("#warning_start").val();
      var warning_end = $("#warning_end").val();
      var warning_email = $(".email_warning");
      var email_address = "";
      $.each(warning_email, function(idx, one) {
        if (idx == 0) {
          email_address = $(warning_email[idx]).text();
        } else {
          email_address = email_address + "," + $(warning_email[idx]).text();
        }
      });
      var send_frequency = $("#send_frequency").val();
      var send_time = $("#send_time").val();
      this.doMonitorAdd(
        warning_name,
        warning_desc,
        warning_time,
        warning_temp,
        warning_duibi,
        warning_than,
        warning_per,
        warning_start,
        warning_end,
        email_address,
        send_frequency,
        send_time
      );
    },

    handleStop(row) {
      this.doUsingStatusUpdate(row.id, row.usingStatus == 0 ? 1 : 0);
    },

    handleEdit(row) {
      this.editId = row.id || '';
      this.getMonitorDetail(this.editId);
    },

    handleSaveEdit() {
      var warning_name = $("#editwarning_name").val();
      var warning_desc = $("#editwarning_desc").val();
      var warning_time = $("#editwarning_time").val();
      var warning_temp = $("#editwarning_temp").val();
      var warning_duibi = $("#editwarning_duibi").val();
      var warning_than = $("#editwarning_than").val();
      var warning_per = $("#editwarning_per").val();
      var warning_start = $("#editwarning_start").val();
      var warning_end = $("#editwarning_end").val();
      var warning_email = $(".editemail_warning");
      var email_address = "";
      var id = $("#editwarning_name").attr("data-id");
      $.each(warning_email, function(idx, one) {
        if (idx == 0) {
          email_address = $(warning_email[idx]).text();
        } else {
          email_address = email_address + "," + $(warning_email[idx]).text();
        }
      });
      var send_frequency = $("#editsend_frequency").val();
      var send_time = $("#editsend_time").val();
      this.getMonitorUpdate(
        warning_name,
        warning_desc,
        warning_time,
        warning_temp,
        warning_duibi,
        warning_than,
        warning_per,
        warning_start,
        warning_end,
        email_address,
        send_frequency,
        send_time,
        this.editId
      );
    },

    handleDelete(row) {
      this.$refs.Alert.resetTxts({
        warnTit: "删除操作",
        warnTxt: "您确定删除这条数据吗！"
      });
      this.$refs.Alert.showWarn(
        () => {
          this.doMonitorDelete(row.id);
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
      this.getPageQuery();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPageQuery();
    }
  },
  components: {
    alertBox,
    download,
    earlyWarningAdd
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" >
.addEarlyWarning {
  position: relative;
  background: #acc6f4;
  border-radius: 2px;
  widows: 100%;
  height: 60px;
  .addWarningBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-left: 30px;
    cursor: pointer;
    .addWarningIcon {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    > span {
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 0;
      color: #fff;
      line-height: 60px;
    }
  }
}

.create_warning {
  padding: 20px 0px 50px 0;
}
.box_shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000000;
  z-index: 10000;
  opacity: 0.3;
  display: none;
}
.warning_content {
  margin: 4px 0;
  width: 100%;
  height: 32px;
  line-height: 32px;
}
.warning_name {
  float: left;
}
.warning_desc {
  float: left;
  margin-left: 30px;
}
.warning_step {
  display: inline-block;
  padding: 0 5px;
  margin: 30px 0;
  height: 30px;
  min-width: 60px;
  line-height: 30px;
  font-family: HelveticaNeue-Bold;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
  background: #acc6f4;
  border-radius: 2px;
}
.warning_if {
  width: 100%;
  height: 34px;
  line-height: 32px;
}
.warning_and {
  width: 100%;
  height: 32px;
}
.warning_then {
  width: 100%;
  height: 32px;
  line-height: 32px;
}
.warning_per {
  margin-left: 10px;
}
.warning_padding {
  padding: 0 10px;
}
.warning_line {
  height: 32px;
  width: 100%;
  margin: 10px 0;
  float: left;
}
.tab_title {
  padding: 0 10px 0 0;
  height: 32px;
  line-height: 32px;
  float: left;
}
.btn_save {
  width: 80px;
  height: 32px;
  display: inline-block;
  line-height: 32px;
  background: #6faed9;
  color: #ffffff;
  border: none;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
}
.btn_cancel {
  margin-right: 20px;
  width: 80px;
  height: 32px;
  display: inline-block;
  line-height: 32px;
  text-align: center;
  background: #ffffff;
  color: #6faed9;
  border-radius: 2px;
  border: 1px solid #dedede;
  margin-left: 50px;
  cursor: pointer;
}
.editbtn_cancel {
  width: 80px;
  height: 32px;
  display: block;
  float: left;
  line-height: 32px;
  text-align: center;
  background: #ffffff;
  color: #6faed9;
  border-radius: 2px;
  border: 1px solid #dedede;
  margin-left: 50px;
  cursor: pointer;
}
.btn_content {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.warning_select {
  width: 100px;
  padding: 3px 4px;
  height: 30px;
  border: 1px solid #d5d5d5;
  color: #858585;
}
.btn_right {
  margin-left: 10px;
}
.warning_email {
  margin-left: 5px;
}
.input_content {
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  width: 200px;
  float: left;
  border: 1px solid #dedede;
}
.editinput_content {
  height: 32px;
  line-height: 32px;
  width: 200px;
  float: left;
  border: 1px solid #dedede;
}
.title_email {
  width: 90px;
  display: block;
}
.warning_email {
  float: left;
  line-height: 32px;
  border: 1px solid #dedede;
  border-radius: 2px;
  padding: 0 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #858585;
}
.line_content {
  width: 100%;
  height: auto;
  float: left;
  overflow: visible;
}

.email_delete {
  width: 16px;
  height: 16px;
  float: right;
  margin-top: 8px;
  background: url("./img/delete.png");
  background-size: 100% 100%;
  margin-left: 5px;
  cursor: pointer;
}
.email_hint {
  line-height: 32px;
  height: 32px;
  font-size: 12px;
  color: #858585;
  margin-left: 10px;
}
.edit_content {
  position: relative;
  width: 840px;
  border: 1px solid #dedede;
  background: #ffffff;
  padding: 30px;
  border-radius: 3px;
}
.title_content {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #dedede;
}
.close_img {
  width: 20px;
  height: 20px;
  // background: url("../../images/close.png");
  float: right;
  background-size: 100% 100%;
  cursor: pointer;
}
.popover {
  z-index: 100000000;
}
</style>
