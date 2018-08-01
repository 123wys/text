<template>
  <div>
    <div class="top">
      <div class="block">
        <span class="dateChoose">域名：</span>
          <el-select @change="renderChartsTotal" class="s-select" v-model="hostVal" filterable placeholder="请选择" style="width: 220px;">
            <el-option v-for="item in options" :label="item" :value="item" :key="item">
            </el-option>
          </el-select>
      </div>
    </div>
    <div class="top">
      <div class="block">
      <div class="g-title" style="float: left">时段概览</div>
        <el-switch
          style="display: block; float: left;margin: 10px 0 0 100px;"
          v-model="value1"
          active-color="#00aaff"
          inactive-color="#5693fb"
          active-text="总UV"
          inactive-text="总PV"
          @change="renderCntData">
        </el-switch>
      </div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker
          v-model="dateCnt"
          type="date"
          size="small"
          placeholder="选择日期"
          @change="getDateCnt">
        </el-date-picker>
        <span class="download" @click="goDownload">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:360px;width:575px;">
        <p class="g-block-title">来源域名</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="sourceUrl"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:360px;width:575px;">
        <p class="g-block-title">来源URL</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="sourceUrlText"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="top">
      <div class="block">
      <div class="g-title" style="float: left">趋势概览</div>
        <el-switch
          style="display: block; float: left;margin: 10px 0 0 100px;"
          v-model="value2"
          active-color="#00aaff"
          inactive-color="#5693fb"
          active-text="总UV"
          inactive-text="总PV"
          @change="renderTrendData">
        </el-switch>
      </div>
      <div class="block">
        <span class="dateChoose">日期选择：</span>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          size="small"
          placeholder="选择日期"
          @change="getDateRange">
        </el-date-picker>
        <span class="download" @click="goDownload1">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div>
      <div class="g-block" style="height:360px;width:575px;">
        <p class="g-block-title">来源域名</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="sourceUrlTrend"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:360px;width:575px;">
        <p class="g-block-title">来源URL</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="sourceUrlTextTrend"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div>
      <div class="g-block" style="height:360px;width:575px;margin-top: 10px;">
        <p class="g-block-title">域名来源占比</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="sourceUrlTrendPie"></div>
        </div>
      </div>
      <div class="g-block ml10" style="height:360px;width:575px;margin-top: 10px;">
        <p class="g-block-title">URL来源占比</p>
        <div class="g-block-graph" style="height:300px;">
          <div class="graph" id="sourceUrlTextTrendPie"></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="top">
      <div class="g-title">来源数据概览</div>
      <div class="block">
        <input v-model="searchTxt" class="s-input" type="text" placeholder="页面URL" style="width: 170px;">
        <button type="button" class="btnQuery" @click="renderSourceTable">查询</button>

        <span class="dateChoose">日期选择：</span>
        <el-date-picker
          v-model="dateRange2"
          type="daterange"
          size="small"
          placeholder="选择日期"
          @change="getDateRange2">
        </el-date-picker>
        <span class="download" @click="goDownload2">
          <download style="margin-right:5px"></download>下载表格</span>
      </div>
    </div>
    <div class="g-block" style="width:100%;">
      <div class="tableWrapper">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border cell-class-name="myTableCell">
          <el-table-column  align="center" :show-overflow-tooltip="true" v-for="item in titles" :key="item.key" :prop="item.key" :label="item.name" height="440" min-width="50">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes,total,jumper, next, pager, prev" :total="total">
        </el-pagination>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import { querySourceHost, querySourceOverview, querySourceAnalysis, querySourceOverviewHour } from "../../../../service/getData";
  import download from "../../svg/download";
  import dateFormat from "dateFormat";
  import { Download } from "../../../../config/mUtils";
  import alertBox from "../../../../components/common/alertBox/alertBox";
  export default {
    data() {
      let startDate = new Date();
      startDate.setMonth(new Date().getMonth() - 1, new Date().getDate() - 1);
      return {
        loading: false,
        toolTip: true,
        dateRange: [startDate, new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)],
        dateRange2: [startDate, new Date(new Date() * 1 - 1 * 24 * 3600 * 1000)],
        dateCnt: new Date(new Date() * 1 - 1 * 24 * 3600 * 1000),
        currentPage: 1,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        total: 0,
        referUrl:'',
        options: [],
        hostVal: '',
        hostData: [],
        hostTrend: [],
        urlData: [],
        urlTrend: [],
        value1: false,
        value2: false,
        trendDateRangePv:[],
        trendDateRangeUv:[],
        trendDateRangeTrendPv:[],
        trendDateRangeTrendUv:[],
        trendHostPie:[],
        trendUrlPie:[],
        searchTxt: '',
        tableData: [],
        DateLine: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        titles: [
          {name:"日期",key:"bizdate"},
          {name:"落地页域名",key:"host"},
          {name:"来源类型",key:"refertype"},
          {name:"来源域名",key:"referHost"},
          {name:"来源URL",key:"referUrl"},
          {name:"页面浏览量",key:"pv"},
          {name:"用户访问量",key:"uv"},
          {name:"平均停留时长",key:"loadtime"},
          {name:"退出率",key:"exitRate"}
          ]
      };
    },
    computed: {
      ...mapState(["appSource", "headerTapOs"])
    },
    mounted() {
      this.$nextTick(function() {
        this.renderAll();
      });
    },

    watch: {
      // 如果路由有变化，会再次执行该方法
      $route() {
        Object.assign(this.$data, this.$options.data()); //初始化data
        this.renderAll();
      }
    },
    methods: {
      getDateCnt() {
        this.renderSourceOverviewHour();
      },
      getDateRange() {
        if (this.dateRange[0] && this.dateRange[1]) {
          this.renderSourceOverview();
        }
      },
      getDateRange2(){
        this.renderSourceTable();
      },
      handleSizeChange(v) {
        this.pageSize = v;
        var page = this.currentPage;
        var size = this.pageSize;
        var s = (page - 1) * size;
        var e = page * size - 1;
        $("#user_stay tr").hide();
        for (var i = s; i <= e; i++) {
          $("#user_stay")
            .find("tr")
            .eq(i)
            .show();
        }
        this.renderSourceTable();
      },
      handleCurrentChange(v) {
        this.currentPage = v;
        var page = this.currentPage;
        var size = this.pageSize;
        var s = (page - 1) * size;
        var e = page * size - 1;
        $("#user_stay tr").hide();
        for (var i = s; i <= e; i++) {
          $("#user_stay")
            .find("tr")
            .eq(i)
            .show();
        }
        this.renderSourceTable();
      },
      goDownload() {
        let bizdate = dateFormat(this.dateCnt, "yyyymmdd");
        let host = this.hostVal;
        let url = `/analysis/web_refer/hour_trend_export.json?bizdate=${bizdate}&host=${host}&appSource=${this
          .appSource}`;
        Download(url);
      },
      goDownload1() {
        var startDate = dateFormat(this.dateRange[0], "yyyymmdd");
        var endDate = dateFormat(this.dateRange[1], "yyyymmdd");
        let host = this.hostVal;
        let url = `/analysis/web_refer/day_trend_export.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
          .appSource}&host=${host}`;
        Download(url);
      },
      goDownload2() {
        var startDate = dateFormat(this.dateRange2[0], "yyyymmdd");
        var endDate = dateFormat(this.dateRange2[1], "yyyymmdd");
        let url = `/analysis/web_refer/url_export.json?startDate=${startDate}&endDate=${endDate}&appSource=${this
          .appSource}&referUrl=${this.referUrl}`;
        Download(url);
      },
      renderAll() {
       this.renderSourceHost();
      },
      renderSourceHost() {
        querySourceHost({
          appSource: this.appSource,
        })
          .then(data => {
            if (data.success) {
              let that = this;
              $.each(data.model,function(idx, one){
                that.options.push(one);
              })
              let host = data.model;
              that.hostVal = host[0];
              that.renderSourceOverviewHour();
              that.renderSourceOverview();    //加载时段概览所有图的数据/时间点，不包括表格
              that.renderSourceTable();     //加载时段概览表格
            } else {
              that.$refs.Alert.resetTxts({
                errorTit: "错误",
                errorTxt: "接口请求失败！"
              });
              that.$refs.Alert.showError(data.message);
            }
          })
          .catch(err => {
            this.$refs.Alert.showError();
          });
      },
      renderSourceOverviewHour()  {
        let that = this;
        let bizdate = this.dateCnt;
        querySourceOverviewHour({
          appSource: this.appSource,
          host: this.hostVal,
          bizdate: dateFormat(bizdate, "yyyymmdd")
        }) .then(data => {
          if (data.success) {
            let that = this;
            var hostData = {};
            var urlData = {};
            /*
               data model
               data = [{name:'www.zhonganonline.com',value:[1,2,3,4]}]
             */
            var referHost ;
            var dataVal = [];
            var dataObj = {};
            var hostDataPv = [];
            var i = 0;
            data.model.hostPvTrend.forEach(ele => {
              if(referHost != undefined){
                if(i == data.model.hostPvTrend.length-1){
                  dataObj.data = dataVal;
                  dataObj.type = 'line';
                  dataObj.smooth = true;
                  dataObj.showSymbol = false;
                  hostDataPv.push(dataObj);
                }
                if(referHost != ele.referHost){
                  dataObj.data = dataVal;
                  dataObj.type = 'line';
                  dataObj.smooth = true;
                  dataObj.showSymbol = false;
                  hostDataPv.push(dataObj);
                  dataVal = [];
                  dataObj = {};
                  referHost = ele.referHost;
                  dataVal.push(ele.pv);
//                  if(referHost.indexOf("?") == -1){
//                    dataObj.name = referHost;
//                  }else{
//                    dataObj.name = referHost.substring(0,referHost.indexOf("?"));
//                  }
                  dataObj.name = referHost;
                }else{
                  dataVal.push(ele.pv);
                }
              }else{
                referHost = ele.referHost;
                dataVal.push(ele.pv);
//                if(referHost.indexOf("?") == -1){
//                  dataObj.name = referHost;
//                }else{
//                  dataObj.name = referHost.substring(0,referHost.indexOf("?"));
//                }
                dataObj.name = referHost;
              }
              i++;
            })



            var referHostUV ;
            var dataValUV = [];
            var dataObjUV = {};
            var hostDataUV = [];
            var i = 0;
            data.model.hostUvTrend.forEach(ele => {
              if(referHostUV != undefined){
                if(i == data.model.hostUvTrend.length-1){
                  dataObjUV.data = dataValUV;
                  dataObjUV.type = 'line';
                  dataObjUV.smooth = true;
                  dataObjUV.showSymbol = false;
                  hostDataUV.push(dataObjUV);
                }
                if(referHostUV != ele.referHost){
                  dataObjUV.data = dataValUV;
                  dataObjUV.type = 'line';
                  dataObjUV.smooth = true;
                  dataObjUV.showSymbol = false;
                  hostDataUV.push(dataObjUV);
                  dataValUV = [];
                  dataObjUV = {};
                  referHostUV = ele.referHost;
                  dataValUV.push(ele.uv);
//                  if(referHostUV.indexOf("?") == -1){
//                    dataObjUV.name = referHostUV;
//                  }else{
//                    dataObjUV.name = referHostUV.substring(0,referHostUV.indexOf("?"));
//                  }
                  dataObjUV.name = referHostUV;
                }else{
                  dataValUV.push(ele.uv);
                }
              }else{
                referHostUV = ele.referHost;
                dataValUV.push(ele.uv);
//                if(referHostUV.indexOf("?") == -1){
//                  dataObjUV.name = referHostUV;
//                }else{
//                  dataObjUV.name = referHostUV.substring(0,referHostUV.indexOf("?"));
//                }
                dataObjUV.name = referHostUV;
              }
              i++;
            })


            var URLreferHost ;
            var URLdataVal = [];
            var URLdataObj = {};
            var URLhostDataPv = [];
            var i = 0;
            data.model.urlPvTrend.forEach(ele => {
              if(URLreferHost != undefined){
                if(i == data.model.urlPvTrend.length-1){
                  URLdataObj.data = URLdataVal;
                  URLdataObj.type = 'line';
                  URLdataObj.smooth = true;
                  URLdataObj.showSymbol = false;
                  URLhostDataPv.push(URLdataObj);
                }
                if(URLreferHost != ele.referUrl){
                  URLdataObj.data = URLdataVal;
                  URLdataObj.type = 'line';
                  URLdataObj.smooth = true;
                  URLdataObj.showSymbol = false;
                  URLhostDataPv.push(URLdataObj);
                  URLdataVal = [];
                  URLdataObj = {};
                  URLreferHost = ele.referUrl;
                  URLdataVal.push(ele.pv);
//                  if(URLreferHost.indexOf("?") == -1){
//                    URLdataObj.name = URLreferHost;
//                  }else{
//                    URLdataObj.name = URLreferHost.substring(0,URLreferHost.indexOf("?"));
//                  }
                  URLdataObj.name = URLreferHost;
                }else{
                  URLdataVal.push(ele.pv);
                }
              }else{
                URLreferHost = ele.referUrl;
                URLdataVal.push(ele.pv);
//                if(URLreferHost.indexOf("?") == -1){
//                  URLdataObj.name = URLreferHost;
//                }else{
//                  URLdataObj.name = URLreferHost.substring(0,URLreferHost.indexOf("?"));
//                }
                URLdataObj.name = URLreferHost;
              }
              i++;
            })



            var URLreferHostUV ;
            var URLdataValUV = [];
            var URLdataObjUV = {};
            var URLhostDataUV = [];
            var i = 0;
            data.model.urlUvTrend.forEach(ele => {
              if(URLreferHostUV != undefined){
                if(i == data.model.urlUvTrend.length-1){
                  URLdataObjUV.data = URLdataValUV;
                  URLdataObjUV.type = 'line';
                  URLdataObjUV.smooth = true;
                  URLdataObjUV.showSymbol = false;
                  URLhostDataUV.push(URLdataObjUV);
                }
                if(URLreferHostUV != ele.referUrl){
                  URLdataObjUV.data = URLdataValUV;
                  URLdataObjUV.type = 'line';
                  URLdataObjUV.smooth = true;
                  URLdataObjUV.showSymbol = false;
                  URLhostDataUV.push(URLdataObjUV);
                  URLdataValUV = [];
                  URLdataObjUV = {};
                  URLreferHostUV = ele.referUrl;
                  URLdataValUV.push(ele.uv);
//                  if(URLreferHostUV.indexOf("?") == -1){
//                    URLdataObjUV.name = URLreferHostUV;
//                  }else{
//                    URLdataObjUV.name = URLreferHostUV.substring(0,URLreferHostUV.indexOf("?"));
//                  }
                  URLdataObjUV.name = URLreferHostUV;
                }else{
                  URLdataValUV.push(ele.uv);
                }
              }else{
                URLreferHostUV = ele.referUrl;
                URLdataValUV.push(ele.uv);
//                if(URLreferHostUV.indexOf("?") == -1){
//                  URLdataObjUV.name = URLreferHostUV;
//                }else{
//                  URLdataObjUV.name = URLreferHostUV.substring(0,URLreferHostUV.indexOf("?"));
//                }
                URLdataObjUV.name = URLreferHostUV;
              }
              i++;
            })


//
//            console.log(hostDataPv);
            hostData.PV = hostDataPv;
            hostData.UV = hostDataUV;
            urlData.PV = URLhostDataPv;
            urlData.UV = URLhostDataUV;
            that.hostData = hostData;
            that.urlData = urlData;
//            console.log(JSON.stringify(hostData));
            that.getTotalPvHost();
            that.getTotalPvUrl();
            that.getTotalUvHost();
            that.getTotalUvUrl();
            that.sourceCntCharts();
            that.sourceCntUrlCharts();
          } else {
            that.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            that.$refs.Alert.showError(data.message);
          }
        })
          .catch(err => {
            this.$refs.Alert.showError();
          });
      },
      getTotalPvHost(){
        //得到总的数据
        let dataTotal = {};
        let hostDataPv = this.hostData.PV
        var arr = [];
        hostDataPv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总PV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        hostDataPv.unshift(dataTotal);
      },
      getTotalUvHost(){
        //得到总的数据
        let dataTotal = {};
        let hostDataUv = this.hostData.UV;
        var arr = [];
        hostDataUv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总UV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        hostDataUv.unshift(dataTotal);
      },
      getTotalPvUrl(){
        //得到总的数据
        let dataTotal = {};
        let urlDataPv = this.urlData.PV
        var arr = [];
        urlDataPv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总PV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        urlDataPv.unshift(dataTotal);
      },
      getTotalUvUrl(){
        //得到总的数据
        let dataTotal = {};
        let urlDataUv = this.urlData.UV;
        var arr = [];
        urlDataUv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总UV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        urlDataUv.unshift(dataTotal);
      },
      getTrendPvHost(){
        //得到总的数据
        let dataTotal = {};
        let hostDataPv = this.hostTrend.PV
        var arr = [];
        hostDataPv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总PV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        hostDataPv.unshift(dataTotal);
      },
      getTrendUvHost(){
        //得到总的数据
        let dataTotal = {};
        let hostDataUv = this.hostTrend.UV;
        var arr = [];
        hostDataUv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总UV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        hostDataUv.unshift(dataTotal);
      },
      getTrendPvUrl(){
        //得到总的数据
        let dataTotal = {};
        let urlDataPv = this.urlTrend.PV
        var arr = [];
        urlDataPv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总PV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        urlDataPv.unshift(dataTotal);
      },
      getTrendUvUrl(){
        //得到总的数据
        let dataTotal = {};
        let urlDataUv = this.urlTrend.UV;
        var arr = [];
        urlDataUv.forEach(function(one,idx){
          var b = [];
          if(idx == 0){
            one.data.forEach(function(one,idx){
              arr.push(one);
            })
          }else{
            b = one.data;
            arr.forEach(function(v, i) {
              arr[i] = v + b[i];
            })
          }
        })
        dataTotal.data = arr;
        dataTotal.name = '总UV';
        dataTotal.type = 'bar';
        dataTotal.smooth = true;
        dataTotal.color = ['#5693fb'];
        dataTotal.showSymbol = false;
        urlDataUv.unshift(dataTotal);
      },
      renderSourceOverview() {
        let that = this;
        let startDate=dateFormat(that.dateRange[0], "yyyymmdd");
        let endDate=dateFormat(that.dateRange[1], "yyyymmdd");
        querySourceOverview({
          appSource: that.appSource,
          host: that.hostVal,
          startDate: startDate,
          endDate: endDate
        }) .then(data => {
          if (data.success) {
            let that = this;
            var hostTrend = {};
            var urlTrend = {};

            that.trendDateRangePv = [];
            that.trendDateRangeUv = [];
            that.trendDateRangeTrendUv = [];
            that.trendDateRangeTrendPv = [];
            /*
               data model
               data = [{name:'www.zhonganonline.com',value:[1,2,3,4]}]
             */
            var referHost ;
            var dataVal = [];
            var dataObj = {};
            var hostDataPv = [];
            var i = 0;
            data.model.hostPvTrend.forEach(ele => {
              if(referHost != undefined){
                if(i == data.model.hostPvTrend.length-1){
                  dataObj.data = dataVal;
                  dataObj.type = 'line';
                  dataObj.smooth = true;
                  dataObj.showSymbol = false;
                  hostDataPv.push(dataObj);
                }
                if(referHost != ele.referHost){
                  dataObj.data = dataVal;
                  dataObj.type = 'line';
                  dataObj.smooth = true;
                  dataObj.showSymbol = false;
                  hostDataPv.push(dataObj);
                  dataVal = [];
                  dataObj = {};
                  referHost = ele.referHost;
//                  if(referHost.indexOf("?") == -1){
//                    dataObj.name = referHost;
//                  }else{
//                    dataObj.name = referHost.substring(0,referHost.indexOf("?"));
//                  }
                  dataObj.name = referHost;
                }else{
                  dataVal.push(ele.pv);
                }
              }else{
                referHost = ele.referHost;
                dataVal.push(ele.pv);
//                if(referHost.indexOf("?") == -1){
//                  dataObj.name = referHost;
//                }else{
//                  dataObj.name = referHost.substring(0,referHost.indexOf("?"));
//                }
                dataObj.name = referHost;
              }
              i++;
              that.trendDateRangePv.push(ele.bizdate);
          })


            var referHostUV ;
            var dataValUV = [];
            var dataObjUV = {};
            var hostDataUV = [];
            var i = 0;
            data.model.hostUvTrend.forEach(ele => {
              if(referHostUV != undefined){
                if(i == data.model.hostUvTrend.length-1){
                  dataObjUV.data = dataValUV;
                  dataObjUV.type = 'line';
                  dataObjUV.smooth = true;
                  dataObjUV.showSymbol = false;
                  hostDataUV.push(dataObjUV);
                }
                if(referHostUV != ele.referHost){
                  dataObjUV.data = dataValUV;
                  dataObjUV.type = 'line';
                  dataObjUV.smooth = true;
                  dataObjUV.showSymbol = false;
                  hostDataUV.push(dataObjUV);
                  dataValUV = [];
                  dataObjUV = {};
                  referHostUV = ele.referHost;
                  dataValUV.push(ele.uv);
//                  if(referHostUV.indexOf("?") == -1){
//                    dataObjUV.name = referHostUV;
//                  }else{
//                    dataObjUV.name = referHostUV.substring(0,referHostUV.indexOf("?"));
//                  }
                  dataObjUV.name = referHostUV;
                }else{
                  dataValUV.push(ele.uv);
                }
              }else{
                referHostUV = ele.referHost;
                dataValUV.push(ele.uv);
//                if(referHostUV.indexOf("?") == -1){
//                  dataObjUV.name = referHostUV;
//                }else{
//                  dataObjUV.name = referHostUV.substring(0,referHostUV.indexOf("?"));
//                }
                dataObjUV.name = referHostUV;
              }
              that.trendDateRangeUv.push(ele.bizdate);
              i++;
            })


            var URLreferHost ;
            var URLdataVal = [];
            var URLdataObj = {};
            var URLhostDataPv = [];
            var i = 0;
            data.model.urlPvTrend.forEach(ele => {
              if(URLreferHost != undefined){
                if(i == data.model.urlPvTrend.length-1){
                  URLdataObj.data = URLdataVal;
                  URLdataObj.type = 'line';
                  URLdataObj.smooth = true;
                  URLdataObj.showSymbol = false;
                  URLhostDataPv.push(URLdataObj);
                }
                if(URLreferHost != ele.referUrl){
                  URLdataObj.data = URLdataVal;
                  URLdataObj.type = 'line';
                  URLdataObj.smooth = true;
                  URLdataObj.showSymbol = false;
                  URLhostDataPv.push(URLdataObj);
                  URLdataVal = [];
                  URLdataObj = {};
                  URLreferHost = ele.referUrl;
                  URLdataVal.push(ele.pv);
//                  if(URLreferHost.indexOf("?") == -1){
//                    URLdataObj.name = URLreferHost;
//                  }else{
//                    URLdataObj.name = URLreferHost.substring(0,URLreferHost.indexOf("?"));
//                  }
                  URLdataObj.name = URLreferHost;
                }else{
                  URLdataVal.push(ele.pv);
                }
              }else{
                URLreferHost = ele.referUrl;
                URLdataVal.push(ele.pv);
//                if(URLreferHost.indexOf("?") == -1){
//                  URLdataObj.name = URLreferHost;
//                }else{
//                  URLdataObj.name = URLreferHost.substring(0,URLreferHost.indexOf("?"));
//                }
                URLdataObj.name = URLreferHost;
              }
              that.trendDateRangeTrendPv.push(ele.bizdate);
              i++;
            })



            var URLreferHostUV ;
            var URLdataValUV = [];
            var URLdataObjUV = {};
            var URLhostDataUV = [];
            var i = 0;
            data.model.urlUvTrend.forEach(ele => {
              if(URLreferHostUV != undefined){
                if(i == data.model.urlUvTrend.length-1){
                  URLdataObjUV.data = URLdataValUV;
                  URLdataObjUV.type = 'line';
                  URLdataObjUV.smooth = true;
                  URLdataObjUV.showSymbol = false;
                  URLhostDataUV.push(URLdataObjUV);
                }
                if(URLreferHostUV != ele.referUrl){
                  URLdataObjUV.data = URLdataValUV;
                  URLdataObjUV.type = 'line';
                  URLdataObjUV.smooth = true;
                  URLdataObjUV.showSymbol = false;
                  URLhostDataUV.push(URLdataObjUV);
                  URLdataValUV = [];
                  URLdataObjUV = {};
                  URLreferHostUV = ele.referUrl;
                  URLdataValUV.push(ele.uv);
//                  if(URLreferHostUV.indexOf("?") == -1){
//                    URLdataObjUV.name = URLreferHostUV;
//                  }else{
//                    URLdataObjUV.name = URLreferHostUV.substring(0,URLreferHostUV.indexOf("?"));
//                  }
                  URLdataObjUV.name = URLreferHostUV;
                }else{
                  URLdataValUV.push(ele.uv);
                }
              }else{
                URLreferHostUV = ele.referUrl;
                URLdataValUV.push(ele.uv);
//                if(URLreferHostUV.indexOf("?") == -1){
//                  URLdataObjUV.name = URLreferHostUV;
//                }else{
//                  URLdataObjUV.name = URLreferHostUV.substring(0,URLreferHostUV.indexOf("?"));
//                }
                URLdataObjUV.name = URLreferHostUV;
              }
              that.trendDateRangeTrendUv.push(ele.bizdate);
              i++;
            })


            hostTrend.PV = hostDataPv;
            hostTrend.UV = hostDataUV;
            urlTrend.PV = URLhostDataPv;
            urlTrend.UV = URLhostDataUV;
            that.hostTrend = hostTrend;
            that.urlTrend = urlTrend;


           that.rangePvDate();
           that.rangeUvDate();
           that.rangeUrlPvDate();
           that.rangeUrlUvDate();



            that.getTrendPvHost();
            that.getTrendPvUrl();
            that.getTrendUvHost();
            that.getTrendUvUrl();
            that.sourceDayCharts();
            that.sourceDayUrlCharts();

            let trendHostPie = {};
            let trendUrlPie = {};
            trendHostPie.PV = data.model.hostPvSummary;
            trendUrlPie.PV = data.model.urlPvSummary;
            trendHostPie.UV = data.model.hostUvSummary;
            trendUrlPie.UV = data.model.urlUvSummary;
            that.trendHostPie = trendHostPie;
            that.trendUrlPie = trendUrlPie;
            that.sourceUrlTrendPie();
            that.sourceUrlTrendTextPie();
          } else {
            that.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            that.$refs.Alert.showError(data.message);
          }
        })
          .catch(err => {
            this.$refs.Alert.showError();
          });
      },  //初始化域名概览/时段概览
      rangePvDate(){
        var that = this;
        var trendDateRangePv = that.trendDateRangePv;
        var a = new Array();
        var len = trendDateRangePv.length;
        for ( var i = 0; i < len; i++) {
          var v = trendDateRangePv[i];
          if (typeof a[v] == 'undefined') {
            a[v] = 1;
          }
        }
        trendDateRangePv.length = 0;
        var lengt = 0;
        for ( var i in a) {
          trendDateRangePv[lengt++] = i;
        }
        that.trendDateRangePv = trendDateRangePv;
      },
      rangeUvDate(){
        var that = this;
        var trendDateRangeUv = that.trendDateRangeUv;
        var a = new Array();
        var len = trendDateRangeUv.length;
        for ( var i = 0; i < len; i++) {
          var v = trendDateRangeUv[i];
          if (typeof a[v] == 'undefined') {
            a[v] = 1;
          }
        }
        trendDateRangeUv.length = 0;
        var lengt = 0;
        for ( var i in a) {
          trendDateRangeUv[lengt++] = i;
        }
        that.trendDateRangeUv = trendDateRangeUv;
      },
      rangeUrlPvDate(){
        var that = this;
        var trendDateRangeTrendPv = that.trendDateRangeTrendPv;
        var a = new Array();
        var len = trendDateRangeTrendPv.length;
        for ( var i = 0; i < len; i++) {
          var v = trendDateRangeTrendPv[i];
          if (typeof a[v] == 'undefined') {
            a[v] = 1;
          }
        }
        trendDateRangeTrendPv.length = 0;
        var lengt = 0;
        for ( var i in a) {
          trendDateRangeTrendPv[lengt++] = i;
        }
        that.trendDateRangeTrendPv = trendDateRangeTrendPv;
//        console.log(that.trendDateRangeTrendPv);
      },
      rangeUrlUvDate(){
        var that = this;
        var trendDateRangeTrendUv = that.trendDateRangeTrendUv;
        var a = new Array();
        var len = trendDateRangeTrendUv.length;
        for ( var i = 0; i < len; i++) {
          var v = trendDateRangeTrendUv[i];
          if (typeof a[v] == 'undefined') {
            a[v] = 1;
          }
        }
        trendDateRangeTrendUv.length = 0;
        var lengt = 0;
        for ( var i in a) {
          trendDateRangeTrendUv[lengt++] = i;
        }
        that.trendDateRangeTrendUv = trendDateRangeTrendUv;
//        console.log(that.trendDateRangeTrendUv);
      },
      renderSourceTable() {
        let that = this;
        let startDate=dateFormat(that.dateRange2[0], "yyyymmdd");
        let endDate=dateFormat(that.dateRange2[1], "yyyymmdd");
        let appSource=that.appSource;
        let referUrl=that.searchTxt;
        let pageNumber=that.currentPage;
        let pageSize=that.pageSize;
        this.loading = true;
        querySourceAnalysis({
          startDate: startDate,
          endDate: endDate,
          appSource: appSource,
          referUrl: referUrl,
          pageNumber: pageNumber,
          pageSize: pageSize
        })
          .then(data => {
            this.loading = false;
          if (data.success) {
            that.tableData = data.model.rows;
            that.total = data.model.total;

          } else {
            that.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "接口请求失败！"
            });
            that.$refs.Alert.showError(data.message);
          }
        })
          .catch(err => {
            this.loading = false;
            this.$refs.Alert.showError();
          });
      },
      renderChartsTotal() {
        this.renderSourceOverviewHour();
        this.renderSourceOverview();
      },
      sourceCntCharts() {
        let that = this;
        let data = that.hostData;
        let dataObj = [];
        if(that.value1){
          dataObj = data.UV;
        }else{
          dataObj = data.PV;
        }

        var dataRange = [];
        var i = 0;
        var selected = {};
        dataObj.forEach(ele => {
          dataRange.push(ele.name);
          let nameNum = ele.name;
          if(i>5){
            selected[nameNum]= false;
          }
          i++;
        })
        var dataLen = dataObj[0].data;
        if ( dataLen.length <= 0) {
          $('#sourceUrl').removeAttr('_echarts_instance_');
          $('#sourceUrl').html('<div class="g-nodata">暂无数据...</div>');
          return;
        }
        var myChart = echarts.init(document.getElementById("sourceUrl"));
        var option = {
          title: {
            left: "0%"
          },
          tooltip: {
            trigger: "axis",
            showContent: true,
            formatter:function (params){
              var shtml ='<span style="color: #00aaff;font-size: 16px">'+ '来源域名'+ '</span>' + '<br/>';
              params.forEach(ele=>{
                let text = ele.seriesName;
                let data = ele.value;
                text = text.length < 80
                  ? text
                  : text.slice(0,80)
                shtml += text + '：' + '<span style="color: #F47958">' + data +'</span><br/>';
              })
              return shtml;
            }
          },
          legend: {
            //icon:'image://url'
            //icon:'path://xxxxx'
//            data: ["总PV",'111'],
            data:dataRange,
            left:'30',
            top: "0",
            orient: 'horizontal',
            formatter: function (name) {
              return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
            },
            selected: selected
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: that.DateLine,
            axisLine: {
              lineStyle: {
                color: "#D8E1EB"
              }
            },
            axisLabel: {
              color: "#B2BBC5",
              align: "right"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5"
              }
            }
          },
          grid: {
            left: "30",
            right: "30",
            bottom: "0",
            top: "100",
            containLabel: true
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              color: "#B2BBC5"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5",
                type: 'dashed'
              }
            }
          },
          series: dataObj
        };
        myChart.setOption(option);
      },
      sourceCntUrlCharts()  {
        let that = this;
        let data = that.urlData;
        let dataObj = [];
        if(that.value1){
          dataObj = data.UV;
        }else{
          dataObj = data.PV;
        }
        var dataRange = [];
        dataObj.forEach(ele => {
          dataRange.push(ele.name)
        })
        var i = 0;
        var selected = {};
        dataObj.forEach(ele => {
          dataRange.push(ele.name);
          let nameNum = ele.name;
          if(i>5){
            selected[nameNum]= false;
          }
          i++;
        })
        var dataLen = dataObj[0].data;
        if ( dataLen.length <= 0) {
          $('#sourceUrlText').removeAttr('_echarts_instance_');
          $('#sourceUrlText').html('<div class="g-nodata">暂无数据...</div>');
          return;
        }
//        console.log(JSON.stringify(dataObj));
        var myChart = echarts.init(document.getElementById("sourceUrlText"));
        var option = {
          title: {
            left: "0%"
          },
          tooltip: {
            trigger: "axis",
            showContent: true,
            formatter:function (params){
              var shtml ='<span style="color: #00aaff;font-size: 16px">'+ '来源URL'+ '</span>' + '<br/>';
              params.forEach(ele=>{
                let text = ele.seriesName;
                let data = ele.value;
                text = text.length < 80
                  ? text
                  : text.slice(0,80)
                shtml += text + '：' + '<span style="color: #F47958">' + data +'</span><br/>';
              })
              return shtml;
            }
          },
          legend: {
            //icon:'image://url'
            //icon:'path://xxxxx'
            data:dataRange,
            left:'30',
            top: "0",
            orient: 'horizontal',
            formatter: function (name) {
              return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
            },
            selected:selected
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: that.DateLine,
            axisLine: {
              lineStyle: {
                color: "#D8E1EB"
              }
            },
            axisLabel: {
              color: "#B2BBC5",
              align: "right"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5"
              }
            }
          },
          grid: {
            left: "30",
            right: "30",
            bottom: "0",
            top: "100",
            containLabel: true
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              color: "#B2BBC5"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5",
                type: 'dashed'
              }
            }
          },
          series:dataObj
        };
        myChart.setOption(option);
      },
      sourceDayCharts() {
        let that = this;
        let data = that.hostTrend;
        let dataObj = [];
        if(that.value2){
          dataObj = data.UV;
          var dataRangeTime = that.trendDateRangeUv;
        }else{
          dataObj = data.PV;
          var dataRangeTime = that.trendDateRangePv;
        }
        console.log(dataObj);
        var dataRange = [];
        dataObj.forEach(ele => {
          dataRange.push(ele.name)
        })
        var i = 0;
        var selected = {};
        dataObj.forEach(ele => {
          dataRange.push(ele.name);
          let nameNum = ele.name;
          if(i>5){
            selected[nameNum]= false;
          }
          i++;
        })
        var dataLen = dataObj[0].data;
        if ( dataLen.length <= 0) {
          $('#sourceUrlTrend').removeAttr('_echarts_instance_');
          $('#sourceUrlTrend').html('<div class="g-nodata">暂无数据...</div>');
          return;
        }
        var myChart = echarts.init(document.getElementById("sourceUrlTrend"));
        var option = {
          title: {
            left: "0%"
          },
          tooltip : {
            trigger: 'axis',
            showContent: true,
            formatter:function (params){
              var shtml ='<span style="color: #00aaff;font-size: 16px">'+ '来源域名'+ '</span>' + '<br/>';
              params.forEach(ele=>{
                let text = ele.seriesName;
                let data = ele.value;
                text = text.length < 80
                  ? text
                  : text.slice(0,80)
                shtml += text + '：' + '<span style="color: #F47958">' + data +'</span><br/>';
              })
              return shtml;
            }
          },
          legend: {
            data:dataRange,
            left:'30',
            top: "0",
            orient: 'horizontal',
            formatter: function (name) {
              return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
            },
            selected:selected
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: dataRangeTime,
            axisLine: {
              lineStyle: {
                color: "#D8E1EB"
              }
            },
            axisLabel: {
              color: "#B2BBC5",
              align: "center"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5"
              }
            }
          },
          grid: {
            left: "30",
            right: "30",
            bottom: "0",
            top: "100",
            containLabel: true
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              color: "#B2BBC5"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5",
                type: 'dashed'
              }
            }
          },
          series: dataObj
        };
        myChart.setOption(option);
      },
      sourceDayUrlCharts() {
        let that = this;
        let data = that.urlTrend;
        let dataObj = [];
        if(that.value2){
          dataObj = data.UV;
          var dataRangeTime = that.trendDateRangeTrendUv;
        }else{
          dataObj = data.PV;
          var dataRangeTime = that.trendDateRangeTrendPv;
        }
        var dataRange = [];
        dataObj.forEach(ele => {
          dataRange.push(ele.name)
        })
        var i = 0;
        var selected = {};
        dataObj.forEach(ele => {
          dataRange.push(ele.name);
          let nameNum = ele.name;
          if(i>5){
            selected[nameNum]= false;
          }
          i++;
        })
        var dataLen = dataObj[0].data;
        if ( dataLen.length <= 0) {
          $('#sourceUrlTextTrend').removeAttr('_echarts_instance_');
          $('#sourceUrlTextTrend').html('<div class="g-nodata">暂无数据...</div>');
          return;
        }
        var myChart = echarts.init(document.getElementById("sourceUrlTextTrend"));
        var option = {
          title: {
            left: "0%"
          },
          tooltip : {
            trigger: 'axis',
            showContent: true,
            formatter:function (params){
              var shtml ='<span style="color: #00aaff;font-size: 16px">'+ '来源URL'+ '</span>' + '<br/>';
              params.forEach(ele=>{
                let text = ele.seriesName;
                let data = ele.value;
                text = text.length < 80
                  ? text
                  : text.slice(0,80)
                shtml += text + '：' + '<span style="color: #F47958">' + data +'</span><br/>';
              })
              return shtml;
            }
          },
          legend: {
            data:dataRange,
            left:'30',
            top: "0",
            orient: 'horizontal',
            formatter: function (name) {
              return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
            },
            selected:selected
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: dataRangeTime,
            axisLine: {
              lineStyle: {
                color: "#D8E1EB"
              }
            },
            axisLabel: {
              color: "#B2BBC5",
              align: "center"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5"
              }
            }
          },
          grid: {
            left: "30",
            right: "30",
            bottom: "0",
            top: "100",
            containLabel: true
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#FFF"
              }
            },
            axisLabel: {
              color: "#B2BBC5"
            },
            splitLine: {
              lineStyle: {
                color: "#B2BBC5",
                type: 'dashed'
              }
            }
          },
          series: dataObj
        };
        myChart.setOption(option);
      },
      sourceUrlTrendPie() {
        let that = this;
        var myChart = echarts.init(document.getElementById("sourceUrlTrendPie"));
        let arr = [];
        let arrName = [];
        let data = that.trendHostPie;
        let dataObj = [];
        if(that.value2){
          dataObj = data.UV;
          dataObj.forEach(value => {
            var data = {};
            data.value = value.uv;
//            if(value.referHost.indexOf("?") == -1){
//              data.name = value.referHost;
//              arrName.push(value.referHost);
//            }else{
//              data.name = value.referHost.substring(0,value.referHost.indexOf("?"));
//              arrName.push(value.referHost.substring(0,value.referHost.indexOf("?")));
//            }
            data.name = value.referHost;
            arrName.push(value.referHost);
            arr.push(data);
          });
        }else{
          dataObj = data.PV;
          dataObj.forEach(value => {
            var data = {};
            data.value = value.pv;
//            if(value.referHost.indexOf("?") == -1){
//              data.name = value.referHost;
//              arrName.push(value.referHost);
//            }else{
//              data.name = value.referHost.substring(0,value.referHost.indexOf("?"));
//              arrName.push(value.referHost.substring(0,value.referHost.indexOf("?")));
//            }
            data.name = value.referHost;
            arrName.push(value.referHost);
            arr.push(data);
          });
        }
        let option = {
          title: {
            text: null,
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter(params ) {
              let title = params.seriesName;
              let text = params.name;
              let data = params.value;
              let percent = params.percent;
              text = text.length < 40
                ? text
                : text.slice(0,40) + '<br/>' + text.slice(40,80) + '<br/>' + text.slice(80,120) + '<br/>' + text.slice(120,160) + '<br/>' + text.slice(160,180)
              var dataDom = '<span style="color: #00aaff;font-size: 16px">'+ title + '</span>' + '<br/>' + text + '：' + '<span style="color: #F47958">' + data + '<span style="color: #57A9FD;">'+ '(' + percent + '%)' + '</span>' +'</span>';
              return dataDom;
            }
          },
          legend: {
            data: arrName,
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 10,
            formatter: function (name) {
              return echarts.format.truncateText(name, 160, '14px Microsoft Yahei', '…');
            },
          },
          color: [
            "#748CB2",
            "#9CC677",
            "#EACF5E",
            "#F9AD79",
            "#D16A7C",
            "#8873A2",
            "#3A95B3",
            "#B6D949",
            "#FDD36C",
            "#F47958",
            '#5693FB'
          ],
          series: [
            {
              name: "域名来源占比",
              type: "pie",
              radius: "55%",
              center: ["30%", "55%"],
              data: arr,
              label: {
                normal: {
                  show: false,
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      sourceUrlTrendTextPie() {
        let that = this;
        let arr = [];
        let arrName = [];
        let data = that.trendUrlPie;
        let dataObj = [];
        if(that.value2){
          dataObj = data.UV;
          dataObj.forEach(value => {
              var data = {};
              data.value = value.uv;
//              if(value.referUrl.indexOf("?") == -1){
//                data.name = value.referUrl;
//                arrName.push(value.referUrl);
//              }else{
//                data.name = value.referUrl.substring(0,value.referUrl.indexOf("?"));
//                arrName.push(value.referUrl.substring(0,value.referUrl.indexOf("?")));
//              }
              data.name = value.referUrl;
              arrName.push(value.referUrl);
              arr.push(data);
          });
        }else{
          dataObj = data.PV;
          dataObj.forEach(value => {

              var data = {};
              data.value = value.pv;
//              if(value.referUrl.indexOf("?") == -1){
//                data.name = value.referUrl;
//                arrName.push(value.referUrl);
//              }else{
//                data.name = value.referUrl.substring(0,value.referUrl.indexOf("?"));
//                arrName.push(value.referUrl.substring(0,value.referUrl.indexOf("?")));
//              }
              data.name = value.referUrl;
              arrName.push(value.referUrl);
              arr.push(data);
          });
        }
//        console.log(arrName);
        var myChart = echarts.init(document.getElementById("sourceUrlTextTrendPie"));
        let option = {
          title: {
            text: null,
            x: "center"
          },
          tooltip: {
            trigger: "item",
//            formatter: "{a} <br/>{b} : {c} ({d}%)",
            formatter(params ) {
              let title = params.seriesName;
              let text = params.name;
              let data = params.value;
              let percent = params.percent;
              text = text.length < 40
                ? text
                : text.slice(0,40) + '<br/>' + text.slice(40,80) + '<br/>' + text.slice(80,120) + '<br/>' + text.slice(120,160) + '<br/>' + text.slice(160,180)
              var dataDom = '<span style="color: #00aaff;font-size: 16px">'+ title + '</span>' + '<br/>' + text + '：' + '<span style="color: #F47958">' + data + '<span style="color: #57A9FD;">'+ '(' + percent + '%)' + '</span>' +'</span>';
              return dataDom;
            }
          },
          legend: {
            data: arrName,
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 10,
            formatter: function (name) {
              return echarts.format.truncateText(name, 160, '14px Microsoft Yahei', '…');
            },
          },
          color: [
            "#748CB2",
            "#9CC677",
            "#EACF5E",
            "#F9AD79",
            "#D16A7C",
            "#8873A2",
            "#3A95B3",
            "#B6D949",
            "#FDD36C",
            "#F47958",
            '#5693FB'
          ],
          series: [
            {
              name: "URL来源占比",
              type: "pie",
              radius: "55%",
              center: ["30%", "55%"],
              data: arr,
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      renderCntData() {
//        console.log(this.value1);
        var that = this;
        that.sourceCntCharts();
        that.sourceCntUrlCharts();

      },
      renderTrendData() {
        var that = this;
        that.sourceDayCharts();
        that.sourceDayUrlCharts();
        that.sourceUrlTrendPie();
        that.sourceUrlTrendTextPie();
      }
    },
    components: {
      alertBox,
      download
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  /deep/.is-active span {
    color: #57A9FD;
  }
.s-select /deep/ .el-input__inner{
  width: 220px;
}
</style>

