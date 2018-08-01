<template>
  <div>
    <div class="g-title">
      <span>漏斗展示</span>
      <button class="btn-a" @click="showThisDlg(1)">
        <span>新建漏斗</span>
      </button>
    </div>
    <div>
      <div class="g-block" style="min-height:229px;width:100%;">
        <div class="date_select">
          <select v-model="select" @change="renderFunul">
            <option v-for="one in selectList" v-bind:value="one.id">{{one.name}}</option>
          </select>
          <div class="block">
            <span class="dateChoose">日期选择:</span>
            <el-date-picker v-model="value" @change="getDate" size="small" type="date">
            </el-date-picker>
            <span :class="frep == 1? 'dateChoose active' : 'dateChoose'" @click="changeTable1Frep(1)" style="cursor:pointer">昨日</span>
            <span :class="frep == 7? 'dateChoose active' : 'dateChoose'" @click="changeTable1Frep(7)" style="cursor:pointer">近7日</span>
            <span :class="frep == 30? 'dateChoose active' : 'dateChoose'" @click="changeTable1Frep(30)" style="cursor:pointer">近30日</span>
          </div>
          <div class="label-precent-text">整体转化率:
            <span id="total_num">0.00%</span>
          </div>
          <div class="g-block-graph" style="width:80%;margin:0 auto;">
            <div class="graph" id="graph-a-main"></div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="g-dlg" style="display:none" v-show="isEdit">
      <div class="d-bg"></div>
      <div class="d-main">
        <div class="d-title">
          <span>{{isEdit?'新增漏斗':'编辑漏斗'}}</span>
          <i @click="closeThisDlg"></i>
        </div>
        <div class="d-content">
          <div class="g-title">
            <span>新增漏斗名称：</span>
            <input id="editwarning_name" />
          </div>
          <div class="block-shadow">
            <p>添加自定义URL：</p>
            <p class="p2">
              <span class="tab_title">URL描述：</span><input type="text" id="writeUrl_name" placeholder="">
              <span>URL：</span>
              <input id="url_code" />
              <button class="btn" @click="addSeturl">确认添加</button>
            </p>
            <p class="tip">注：若目标步骤是一组相似的url，请将目标url的变量部分用 ' .* ' 通配</p>
          </div>
          <div style="margin-top:20px;">
            <div class="g-block" style="width:35%;border:none;position:relative;">
              <div class="g-title">
                <span>URL选择</span>
              </div>
              <div class="g-block-graph g-block-graph-top" style="height:500px;width:100%;">
                <div class="line_left">
                  <div class="line_addbtn" style="display: none;"></div>
                </div>
                <div class="ll" />
                <div class="rr" />
              </div>
              <div class="g-block-graph g-block-graph-bg" style="height: 500px; width: 100%;">
                <div class="line_left_bottom"></div>
                <div class="line_left_bottom"></div>
                <div class="line_left_bottom"></div>
                <div class="line_left_bottom"></div>
                <div class="line_left_bottom"></div>
                <div class="line_left_bottom"></div>
              </div>
            </div>
            <div class="g-block" style="width:65%;border:none">
              <div class="g-title">
                <span>URL列表</span>
                <span class="search">
                  <input placeholder="请输入描述/名称" id="searchDlgTableText" />
                  <button @click="searchDlgTable">筛选</button>
                </span>
              </div>
              <form id="formEdit" action="javascript:void(0)" style="position:relative;z-index:4">
                <table class="g-xflow-table">
                  <thead>
                    <tr>
                      <th width="87">选择</th>
                      <th width="176">描述</th>
                      <th width="322">名称</th>
                      <th width="147">操作</th>
                    </tr>
                  </thead>
                  <tbody id="url_table" class="thisbody"></tbody>
                </table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
                </el-pagination>
              </form>
            </div>
          </div>
        </div>
        <div class="d-btns">
          <button class="reset">重置</button>
          <button class="save" @click="add_funnel" id="editwarning_save">保存</button>
        </div>
      </div>
    </div>
    <div class="g-title">漏斗管理</div>
    <div class="g-block" style="width:100%;">
      <table class="g-xflow-table">
        <thead>
          <tr>
            <th>漏斗名称</th>
            <th>修改时间</th>
            <th>修改人</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="funnel_table" class="thisbody"></tbody>
      </table>
      <el-pagination @size-change="handleSizeChange0" @current-change="handleCurrentChange0" :current-page="currentPage0" :page-sizes="pageSizes0" :page-size="pageSize0" layout="sizes,total,jumper, next, pager, prev" :total="total0">
      </el-pagination>
      <div class="clear"></div>
    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  queryFunnels,
  funnelShow,
  sdkClassDescQueryPages,
  sdkClassDescUpdateById,
  sdkClassDescDeleteClassDesc,
  insertClassDesc,
  insertFunnel,
  updateFunnel,
  deleteFunnel,
  pageFunnels,
  funnelModel
} from "../../../../service/getData";

window.delete_div = function(_that) {
  $(_that)
    .parent()
    .remove();
};

let parseDate = function(longtime, f) {
  if (!longtime) {
    return "";
  }
  var dd = new Date(longtime);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;
  var d = dd.getDate();
  var h = dd.getHours();
  var i = dd.getMinutes();
  var s = dd.getSeconds();
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  if (h < 10) h = "0" + h;
  if (i < 10) i = "0" + i;
  if (s < 10) s = "0" + s;
  if (f == 1) {
    return y + "-" + m + "-" + d;
  }
  return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
};

export default {
  name: "ontime",
  data() {
    return {
      value: parseDate(new Date() * 1 - 1 * 24 * 3600 * 1000, 1),
      frep: 1,
      select: "",
      selectList: [
        {
          id: -1,
          name: "暂无数据"
        }
      ],
      isEdit: 0,
      editId: 0,
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      currentPage0: 1,
      pageSizes0: [10, 20, 50],
      pageSize0: 10,
      total0: 0,
      nameDesc: "" //for search
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"])
  },
  mounted() {
    this.$nextTick(function() {
      this.renderAll(true);
    });
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      Object.assign(this.$data, this.$options.data()); //初始化data
      this.renderAll(true);
    }
  },
  methods: {
    reLoadPage() {
      this.$router.push({
        path: this.$route.path,
        query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    },
    add_funnel() {
      let that = this;
      var arr = $(".line_step");
      if (arr.length < 2) {
        that.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "至少添加两个步骤！"
        });
        that.$refs.Alert.showError(" ");
        return;
      }
      var appSource = this.appSource;
      var os = this.headerTapOs;
      var name = $("#editwarning_name").val();
      // var timeLimit=$("#editwarning_desc").val();
      var configList = [];
      var dom = $(".line_step");
      $.each(dom, function(idx, one) {
        var step = 1 + parseInt(idx);
        // var domn=$(dom).eq(idx).attr("data-name");
        var domn = $(one).attr("data-name");
        var configobj = { className: domn, step: step };
        configList.push(configobj);
      });
      configList = JSON.stringify(configList);
      if (name == "") {
        that.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "请填写完整！"
        });
        that.$refs.Alert.showError(" ");
        return;
      }
      if (this.isEdit == 1) {
        insertFunnel({
          appSource: appSource,
          os: os,
          name: name,
          configList: configList
        })
          .then(data => {
            if (data.success) {
              that.$refs.Alert.resetTxts({
                errorTit: "提示",
                errorTxt: "新建成功！"
              });
              that.$refs.Alert.showSuccess();
              that.reLoadPage();

              //----------------------
            } else {
              this.$refs.Alert.resetTxts({
                errorTit: "错误",
                errorTxt: "接口请求失败！"
              });
              this.$refs.Alert.showError(data.message);
            }
            this.isOK = true;
          })
          .catch(err => {
            this.$refs.Alert.showError();
            this.isOK = true;
          });
      } else {
        var id = this.editId;
        updateFunnel({
          id: id,
          appSource: appSource,
          os: os,
          name: name,
          configList: configList
        })
          .then(data => {
            if (data.success) {
              that.$refs.Alert.resetTxts({
                errorTit: "提示",
                errorTxt: "编辑成功！"
              });
              that.$refs.Alert.showSuccess(" ");
              that.reLoadPage();

              //----------------------
            } else {
              this.$refs.Alert.resetTxts({
                errorTit: "错误",
                errorTxt: "接口请求失败！"
              });
              this.$refs.Alert.showError(data.message);
            }
            this.isOK = true;
          })
          .catch(err => {
            this.$refs.Alert.showError();
            this.isOK = true;
          });
      }
    },
    addSeturl() {
      let that = this;
      var arr = $(".line_step");
      if (arr.length > 5) {
        this.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "最多添加六个步骤！"
        });
        this.$refs.Alert.showError(" ");
        return;
      }
      var urlCode = $("#url_code")
        .val()
        .trim();
      var urlDesc = $("#writeUrl_name")
        .val()
        .trim();
      var appSource = this.appSource;
      var os = this.headerTapOs;
      if (urlDesc == "") {
        this.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "请填写URL描述！"
        });
        this.$refs.Alert.showError(" ");
        return;
      }
      if (urlCode == "") {
        this.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "请填写URL！"
        });
        this.$refs.Alert.showError(" ");
        return;
      }
      insertClassDesc({
        appSource: appSource,
        os: os,
        className: urlCode,
        classDesc: urlDesc
      })
        .then(data => {
          if (data.success) {
            var shtml =
              '<div class="step_box"><input type="text" data-name="' +
              urlCode +
              '" name="1" class="line_step" value="' +
              urlDesc +
              '" title="' +
              urlDesc +
              '" readOnly="readOnly"/><div class="email_delete" onclick="delete_div(this)"></div></div>';
            $(".line_addbtn").before(shtml);
            that.renderDlgTable();
            //----------------------
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "提示",
              errorTxt: data.message
            });
            this.$refs.Alert.showError(data.message);
          }
          that.renderDlgTable();
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    searchDlgTable() {
      this.nameDesc = $("#searchDlgTableText").val();
      this.renderDlgTable();
    },
    radio_click(_that) {
      _that = $(_that).parent();
      $(_that)
        .find("._add_dash_btn")
        .addClass("select");
      var name = $(_that).attr("data-name");
      $("input:radio:checked").prop("checked", false);
      $("#" + name).prop("checked", true);
      this.add_funnrlStep();
    },
    add_funnrlStep() {
      let that = this;
      var arr = $(".line_step");
      if (arr.length > 5) {
        this.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "最多添加六个步骤！"
        });
        this.$refs.Alert.showError(" ");
        return;
      }
      var check_num = $("input:radio:checked").val();
      var check_name = $("input:radio:checked").attr("data-name");
      if (check_num == undefined) {
        this.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "请选择漏斗步骤"
        });
        this.$refs.Alert.showError(" ");
        return;
      }
      var arrtrue = true;
      $.each(arr, function(idx, one) {
        var arrobj = $(one).attr("data-name");
        if (arrobj == check_name) {
          that.$refs.Alert.resetTxts({
            errorTit: "提示",
            errorTxt: "请不要添加相同的步骤"
          });
          that.$refs.Alert.showError(" ");
          arrtrue = false;
          return arrtrue;
        }
      });
      if (arrtrue == false) {
        return;
      }
      var shtml =
        '<div class="step_box"><input type="text" data-name="' +
        check_name +
        '" name="1" class="line_step" value="' +
        check_num +
        '" title="' +
        check_name +
        '" /><div class="email_delete _email_delete"></div></div>';
      $(".line_addbtn").before(shtml);
      $(".line_step").attr("readonly", "readonly");
      $(".email_delete")
        .unbind("click")
        .click(function() {
          var name = $(this)
            .prev()
            .data("name");
          console.log(name);
          var fs = $("._first_radio_flag");
          $.each(fs, function(idx, one) {
            if (
              $(one)
                .find("input")
                .data("name") == name
            ) {
              $(one)
                .find("._add_dash_btn")
                .removeClass("select");
            }
          });
          $(this)
            .parent()
            .remove();
        });
    },
    editWarning(thisp, event) {
      let that = this;
      event.stopPropagation();
      var _that = thisp;
      var step = $(_that).attr("data-step");
      if (step == "1") {
        $(".editButton").text("编辑");
        $(".editButton").attr("data-step", "1");
        $(_that).text("提交");
        $("#formEdit")[0].reset();
        $(".editButton")
          .parents()
          .parents()
          .children()
          .children(".className")
          .attr("readonly", true);
        $(".editButton")
          .parents()
          .parents()
          .children()
          .children(".classDesc")
          .attr("readonly", true);
        $(_that)
          .parents()
          .parents()
          .children()
          .children(".classDesc")
          .attr("readonly", false);
        $(_that)
          .parents()
          .parents()
          .children()
          .children(".className")
          .attr("readonly", false);
        $(_that)
          .parents()
          .parents()
          .children()
          .children(".classDesc")
          .css("color", "#6fb3e0");
        $(_that)
          .parents()
          .parents()
          .children()
          .children(".className")
          .css("color", "#6fb3e0");
        $(_that).attr("data-step", "2");
      } else {
        var appSource = this.appSource;
        var os = this.headerTapOs;
        var id = $(_that).attr("data-id");
        var classDesc = $(_that)
          .parents()
          .parents()
          .children()
          .children(".classDesc")
          .val();
        var className = $(_that)
          .parents()
          .parents()
          .children()
          .children(".className")
          .val();
        sdkClassDescUpdateById({
          appSource: appSource,
          os: os,
          classDesc: classDesc,
          className: className,
          id: id
        })
          .then(data => {
            if (data.success) {
              //----------------------
            } else {
              this.$refs.Alert.resetTxts({
                errorTit: "提示",
                errorTxt: data.message
              });
              this.$refs.Alert.showError(data.message);
            }
            that.renderDlgTable();
            this.isOK = true;
          })
          .catch(err => {
            this.$refs.Alert.showError();
            this.isOK = true;
          });
      }
    },

    deleteWarning(thisp, event) {
      event.stopPropagation();
      var _that = thisp;
      var id = $(_that).attr("data-id");
      var appSource = this.appSource;
      if (!confirm("是否确认删除？")) {
        return;
      }
      var type = this.isEdit;
      if ($("input[data-name=" + $(_that).attr("data-name") + "]").length > 0) {
        this.$refs.Alert.resetTxts({
          errorTit: "提示",
          errorTxt: "当前漏斗步骤列表中已存在该步骤"
        });
        this.$refs.Alert.showError();
        return;
      }
      if (type == 2) {
        var funnelId = this.editId;
        var data = { id: id, funnelId: funnelId, appSource: appSource };
      } else {
        var data = { id: id, appSource: appSource };
      }
      sdkClassDescDeleteClassDesc(data)
        .then(data => {
          if (data.success) {
            //----------------------
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "提示",
              errorTxt: data.message
            });
            this.$refs.Alert.showError(data.message);
          }
          that.renderDlgTable();
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    handleSizeChange0(val) {
      this.pageSize0 = val;
      this.currentPage0 = 1;
      this.renderBigTable();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.renderDlgTable();
    },
    handleCurrentChange0(val) {
      this.currentPage0 = val;
      this.renderBigTable();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.renderDlgTable();
    },
    showThisDlg(value) {
      this.isEdit = value;
      $(".line_addbtn")
        .prevAll()
        .remove();
      $("#editwarning_name").val("");
      $("#writeUrl_name").val("");
      $("#url_code").val("");
      this.renderDlgTable();
    },
    closeThisDlg() {
      let that = this;
      this.isEdit = 0;
      $(".line_addbtn")
        .prevAll()
        .remove();
      $("#editwarning_name").val("");
      $("#writeUrl_name").val("");
      $("#url_code").val("");
    },
    renderAll(flag) {
      let that = this;
      //initData
      queryFunnels({
        appSource: this.appSource,
        os: this.headerTapOs
      })
        .then(data => {
          if (data.success) {
            if (data.model && data.model.length > 0) {
              that.selectList = data.model;
              flag && (that.select = data.model[0].id);
              that.renderFunul();
              that.renderDlgTable();
              that.renderBigTable();
            } else {
              that.selectList = [
                {
                  id: -1,
                  name: "暂无数据"
                }
              ];
              that.select = -1;
              that.renderFunul();
              that.renderDlgTable();
              that.renderBigTable();
            }
            //----------------------
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    changeTable1Frep(v, e) {
      this.frep = v;
      this.renderFunul();
    },
    getDate() {
      this.value = parseDate(this.value * 1, 1);
      this.renderAll();
    },
    editFunnel(thisp) {
      let that = this;
      var _that = thisp;
      var id = $(_that).attr("data-id");
      funnelModel({ id: id })
        .then(data => {
          if (data.success) {
            that.isEdit = 2;
            that.editId = id;
            //
            var dataObj = data.model;
            $(".line_addbtn")
              .prevAll()
              .remove();
            $.each(dataObj.configList, function(idx, one) {
              var shtml =
                '<div class="step_box"><input type="text" data-name="' +
                one.className +
                '" name="1" class="line_step" value="' +
                one.classDesc +
                '" title="' +
                one.className +
                '" /><div class="email_delete" onclick="delete_div(this)"></div></div>';
              $(".line_addbtn").before(shtml);
              $(".line_step").attr("readonly", "readonly");
            });
            $("#editwarning_name").val(dataObj.name);
            //----------------------
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    deleteFunnel(e) {
      let that = this;
      if (!confirm("是否确认删除？")) {
        return;
      }
      var _that = e;
      var id = $(_that).attr("data-id");
      deleteFunnel({
        id: id
      })
        .then(data => {
          if (data.success) {
            that.renderBigTable();
            //----------------------
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    renderBigTable() {
      let that = this;
      var appSource = this.appSource;
      var os = this.headerTapOs;
      var page = this.currentPage0;
      var rows = this.pageSize0;
      pageFunnels({
        appSource: appSource,
        os: os,
        pageNumber: page,
        pageSize: rows
      })
        .then(data => {
          var shtml = "";
          if (data.success) {
            if (data.model.total == 0) {
              $("#url_table").html("");
            } else {
              that.total0 = data.model.total;
              $.each(data.model.rows, function(idx, one) {
                shtml +=
                  "<tr><td>" +
                  one.name +
                  "</td><td>" +
                  one.gmtModified +
                  "</td><td>" +
                  one.modifier +
                  '</td><td><button data-id="' +
                  one.id +
                  '" class="edit_btn bigtable_del_flag">删除</button><button data-id="' +
                  one.id +
                  '" class="edit_btn bigtable_edit_flag" style="margin-left: 10px">编辑</button></td></tr>';
              });
              $("#funnel_table").html(shtml);
              $(".bigtable_edit_flag").click(function() {
                that.editFunnel(this);
              });
              $(".bigtable_del_flag").click(function() {
                that.deleteFunnel(this);
              });
            }
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    renderFunul() {
      let that = this;
      funnelShow({
        id: that.select,
        datecnt: that.frep,
        bizdate: that.value.split("-").join("")
      })
        .then(data => {
          if (data.success) {
            if (data.model.funnelShowsDOs == undefined) {
              // alert("漏斗数据尚未准备好");
              //   $("#step_content").html('');
              var myChart = echarts.init(
                document.getElementById("graph-a-main")
              );
              myChart.clear();
              $("#total_num").text("0.00%"); //待定
            } else {
              $("#total_num").text(data.model.generalDeviceRatio + "%");
              var data1 = [];
              var data2 = [];
              var rgb_0 = [86, 147, 230];
              var rgb_1 = [199, 220, 255];
              var len = data.model.funnelShowsDOs.length;
              $("#graph-a-main").html("");
              $("#graph-a-main").removeAttr("_echarts_instance_");
              $("#graph-a-main")
                .parent()
                .height(200 + 50 * len + 20);
              var myChart = echarts.init(
                document.getElementById("graph-a-main")
              );
              myChart.clear();
              var tdata = data.model.funnelShowsDOs;
              $.each(tdata || [], function(idx, one) {
                data1.push({
                  value: one.uv,
                  name: one.classDesc,
                  itemStyle: {
                    normal: {
                      color:
                        "rgba(" +
                        (rgb_0[0] +
                          parseInt((rgb_1[0] - rgb_0[0]) / len * idx)) +
                        "," +
                        (rgb_0[1] +
                          parseInt((rgb_1[1] - rgb_0[1]) / len * idx)) +
                        "," +
                        (rgb_0[2] +
                          parseInt((rgb_1[2] - rgb_0[2]) / len * idx)) +
                        "," +
                        "1)",
                      shadowBlur: 0,
                      borderWidth: 0
                    },
                    emphasis: {
                      color:
                        "rgba(" +
                        (rgb_0[0] +
                          parseInt((rgb_1[0] - rgb_0[0]) / len * idx)) +
                        "," +
                        (rgb_0[1] +
                          parseInt((rgb_1[1] - rgb_0[1]) / len * idx)) +
                        "," +
                        (rgb_0[2] +
                          parseInt((rgb_1[2] - rgb_0[2]) / len * idx)) +
                        "," +
                        "1)",
                      shadowBlur: 0,
                      borderWidth: 0
                    }
                  }
                });
                var data2_name = "";
                if (idx > 0) {
                  data2_name = tdata[idx - 1].deviceRatio;
                } else {
                  data2_name = "--";
                }
                data2.push({
                  value: one.uv,
                  name: data2_name,
                  itemStyle: {
                    normal: {
                      color:
                        "rgba(" +
                        (rgb_0[0] +
                          parseInt((rgb_1[0] - rgb_0[0]) / len * idx)) +
                        "," +
                        (rgb_0[1] +
                          parseInt((rgb_1[1] - rgb_0[1]) / len * idx)) +
                        "," +
                        (rgb_0[2] +
                          parseInt((rgb_1[2] - rgb_0[2]) / len * idx)) +
                        "," +
                        "1)",
                      shadowBlur: 0,
                      borderWidth: 0
                    },
                    emphasis: {
                      color:
                        "rgba(" +
                        (rgb_0[0] +
                          parseInt((rgb_1[0] - rgb_0[0]) / len * idx)) +
                        "," +
                        (rgb_0[1] +
                          parseInt((rgb_1[1] - rgb_0[1]) / len * idx)) +
                        "," +
                        (rgb_0[2] +
                          parseInt((rgb_1[2] - rgb_0[2]) / len * idx)) +
                        "," +
                        "1)",
                      shadowBlur: 0,
                      borderWidth: 0
                    }
                  }
                });
              });
              var option = {
                series: [
                  {
                    name: "",
                    type: "funnel",
                    left: "10%",
                    top: 0,
                    width: "80%",
                    label: {
                      normal: {
                        position: "inside",
                        formatter: "UV: {c}"
                      },
                      emphasis: {
                        position: "inside",
                        formatter: "UV: {c}"
                      }
                    },
                    data: data1
                  },
                  {
                    name: "",
                    type: "funnel",
                    left: "10%",
                    top: 0,
                    width: "80%",
                    label: {
                      normal: {
                        position: "left",
                        formatter: "{b}",
                        color: "#333"
                      },
                      emphasis: {
                        position: "left",
                        formatter: "{b}",
                        color: "#333"
                      }
                    },
                    data: data1
                  },
                  {
                    name: "",
                    type: "funnel",
                    left: "10%",
                    top: 0,
                    width: "80%",
                    label: {
                      normal: {
                        formatter: function(d) {
                          if (d.name == "--") {
                            return "";
                          }
                          return "转化率: " + d.name + "%";
                        },
                        color: "#333"
                      },
                      emphasis: {
                        formatter: function(d) {
                          if (d.name == "--") {
                            return "";
                          }
                          return "转化率: " + d.name + "%";
                        },
                        color: "#333"
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: data2
                  }
                ]
              };
              myChart.setOption(option);
            }
          } else {
            // this.$refs.Alert.resetTxts({
            //   errorTit: "错误",
            //   errorTxt: "接口请求失败！"
            // });
            // this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    },
    renderDlgTable() {
      let that = this;
      var appSource = this.appSource;
      var os = this.headerTapOs;
      var page = this.currentPage;
      var rows = this.pageSize;
      var nameDesc = this.nameDesc;
      sdkClassDescQueryPages({
        appSource: appSource,
        os: os,
        pageNumber: page,
        pageSize: rows,
        nameDesc: nameDesc
      })
        .then(data => {
          if (data.success) {
            if (data.model.total == 0) {
              $("#url_table").html("");
            } else {
              var shtml;
              that.total = data.model.total;
              var names = {};
              var ipts = $(".line_left input");
              $.each(ipts, function(idx, one) {
                names[$(one).data("name")] = true;
              });
              $.each(data.model.rows, function(idx, one) {
                shtml =
                  shtml +
                  '<tr data-name="radio' +
                  idx +
                  '"><td class="first_radio _first_radio_flag"><span class="add_dash_btn _add_dash_btn ' +
                  (names[one.className] ? "select" : "") +
                  '">+</span>' +
                  '<input type="radio" style="display:none" name="check" id="radio' +
                  idx +
                  '" data-name="' +
                  one.className +
                  '" value="' +
                  one.classDesc +
                  '" /></td><td title="' +
                  one.classDesc +
                  '" style="padding: 0"><input class="classDesc inputEdit" style="text-align:center;border: none;height: 100%;width: 100%;background: transparent" value="' +
                  one.classDesc.substr(0, 30) +
                  '" readonly  /></td><td title="' +
                  one.className +
                  '" style="padding: 0;"><input class="className inputEdit"  style="border: none;height: 100%;width: 100%;background: transparent;text-align: center" value="' +
                  one.className +
                  '" readonly/></td><td style="padding-top: 0;padding-bottom: 0;"><button type="button" style="margin-top: 5px;cursor: pointer;" data-step="1" data-id="' +
                  one.id +
                  '" class="edit_btn _flag_edit_btn" >编辑</button><button type="button" style="margin-top: 5px;cursor: pointer;margin-left: 5px" data-step="1" data-id="' +
                  one.id +
                  '"  data-name="' +
                  one.className +
                  '"  class="edit_btn _flag_del_btn">删除</button></td></tr>';
              });
              $("#url_table").html(shtml);
              $("._flag_edit_btn").click(function(e) {
                that.editWarning(this, e);
              });
              $("._flag_del_btn").click(function(e) {
                that.deleteWarning(this, e);
              });
              $("._first_radio_flag").click(function(e) {
                that.radio_click(this);
              });
            }
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
          this.isOK = true;
        })
        .catch(err => {
          this.$refs.Alert.showError();
          this.isOK = true;
        });
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.date_select {
  padding: 20px;
  .block {
    float: right;
  }
  > select {
    background: #ffffff;
    border: 1px solid #e6e8ef;
    border-radius: 2px;
    font-size: 14px;
    color: #1f3d23;
    letter-spacing: 0;
    width: 218px;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
  }
  .block {
    width: 460px;
    .dateChoose {
      font-size: 14px;
      color: #99a9bf;
      letter-spacing: 0;
      line-height: 14px;
      display: inline-block;
      margin: 0 6px;
      &.active {
        font-size: 13px;
        color: #5693fb;
        letter-spacing: 0;
        line-height: 14px;
      }
    }
  }
  .label-precent-text {
    text-align: center;
    font-size: 16px;
    color: #333;
    padding-bottom: 20px;
    padding-top: 60px;
  }
}
.block-shadow {
  background: #f6f7f9;
  padding: 12px;
  > p {
    font-size: 14px;
    color: #4a4a4a;
    letter-spacing: 0;
    &.tip {
      font-size: 14px;
      color: #c1c4cd;
      letter-spacing: 0;
      padding-left: 22px;
      margin-top: 8px;
    }
    &.p2 {
      padding-left: 22px;
      margin-top: 25px;
      line-height: 32px;
      > .btn {
        border: 1px solid #5693fb;
        border-radius: 4px;
        height: 32px;
        width: 88px;
        text-align: center;
        font-size: 14px;
        color: #5693fb;
        letter-spacing: 0;
        line-height: 32px;
        background: #f6f7f9;
        cursor: pointer;
      }
      > span {
        line-height: 32px;
        font-size: 14px;
        color: #4a4a4a;
        letter-spacing: 0;
      }
      > input {
        background: #ffffff;
        border: 1px solid #e6e8ef;
        border-radius: 2px;
        height: 32px;
        margin-right: 20px;
        width: 218px;
        padding: 0 8px;
      }
    }
  }
}
.g-block-graph-top {
  position: relative;
  z-index: 2;
  .ll {
    position: absolute;
    left: -15%;
    z-index: 3;
    top: 0;
    height: 536px;
    width: 175px;
    background: url(img/ll.png) no-repeat;
    background-size: 100% 100%;
    background-position: left top;
    transform: rotate(-20deg);
  }
  .rr {
    position: absolute;
    right: -15%;
    z-index: 3;
    top: 0;
    height: 536px;
    width: 175px;
    background: url(img/rr.png) no-repeat;
    background-size: 100% 100%;
    background-position: left top;
    transform: rotate(20deg);
  }
}
.g-block-graph-bg {
  position: absolute;
  z-index: 1;
  top: 42px;
  left: 0;
  .line_left_bottom {
    background: #f6f7f9;
    height: 64px;
    width: 90%;
    display: block;
    margin: 0 auto;
    margin-bottom: 4px;
  }
}
</style>
