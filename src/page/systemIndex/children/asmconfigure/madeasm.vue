<template>
<div>
  <div class="topbar">
    <input id="url" value="">
    <button type="button" class="btnQuery" @click="renderAdPage">GO</button>
    <i id="_has_sdk">等待加载</i>
    <span v-bind:class="['stayBtn',{'active':stayBtnActive == index}]" v-for="(item,index) in stayBtnList" @click="stayBtnClick(index)">{{item}}</span>
    <span class="stayBtn active" onclick="MA.reload(2)">重绘圈选</span>
  </div>
  <iframe v-bind:class="['iframe',{'pad':stayBtnActive == 1},{'mobile':stayBtnActive == 2}]" id="iframe"></iframe>
</div>
</template>

<script>
import { mapState } from "vuex";
import alertBox from "../../../../components/common/alertBox/alertBox";
import {
  circlePageConfigAdd,
  circlePageConfigUpdate,
  circlePageConfigDelete,
  circlePageConfigReport
} from "../../../..//service/getData";
export default {
  name: "madeasm",
  MA: {},
  data() {
    return {
      url: "http://www.ckaaaa.com/madeasm/prism/index.html",
      stayBtnActive: 0,
      stayBtnList: ["web", "pad", "mobile"],
      sdkStatus: "等待加载"
    };
  },
  computed: {
    ...mapState(["appSource", "headerTapOs"])
  },
  mounted() {
    this.$nextTick(function() {
      this.initPage();
    });
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route() {
      Object.assign(this.$data, this.$options.data()); //初始化data
      this.initPage();
    }
  },

  methods: {
    initPage() {},
    stayBtnClick(idx) {
      this.stayBtnActive = idx;
      MA.setPage(idx);
    },
    renderAdPage() {
      let that = this;
      console.log({
        appSource: that.appSource,
        web: "web"
      });
      console.log(MA);
      MA.initMadeAsmPage(
        MA.$("iframe"),
        MA.$("url").value,
        function(has) {
          if (has) {
            MA.$("_has_sdk").innerHTML = "SDK加载成功";
          } else {
            MA.$("_has_sdk").innerHTML = "未检测到SDK";
          }
        },
        {
          appSource: that.appSource,
          os: "web"
        },
        that.saveElement,
        that.updateElement,
        that.deleteElement,
        that.fetchGrahp
      );
    },
    fetchGrahp(fn,params){
    //ajax
      var that = this,
        now = new Date(),
        past30d = new Date(now - 1000 * 60 * 60 * 24 * 7);
      let reqParams = {
        appSource: that.appSource,
        os: 'web',
        url: params.url,
        circleType: params.type,
        circleXpath: params.xpath,
        asmId: params.datailog,
        startDate: past30d.getFullYear() + ((past30d.getMonth() + 1) < 10 ? '0' + (past30d.getMonth() + 1) : ('' + past30d.getMonth() + 1)) +''+ ((past30d.getDate()) < 10 ? '0' + (past30d.getDate()) : ('' + past30d.getDate())),
        endDate: now.getFullYear() + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : ('' + now.getMonth() + 1)) +''+ ((now.getDate()) < 10 ? '0' + (now.getDate()) : ('' + now.getDate())),
        pageNumber: 1,
        pageSize: 7
      };
      circlePageConfigReport(reqParams).then((data) => {
          fn(data);
      })
    },
    saveElement(data) {
      let that = this;
      let params = {
        appSource: that.appSource,
        os: "web",
        url: data.url,
        circleName: data.name,
        circleType: data.circleType,
        CircleXpath: data.xpath,
        circleText: data.name
      };
      circlePageConfigAdd(params).then(function(datat) {
        console.log(datat);
        if (datat.success) {
           MA.reload();
        }
      });
    },
    updateElement(data) {
      let params = {
        id: data.id,
        appSource: this.appSource,
        os: "web",
        url: data.url,
        circleName: data.name,
        circleType: data.circleType,
        CircleXpath: data.xpath,
        circleText: data.name
      };
      circlePageConfigUpdate(params).then(function(datat) {
        console.log(datat);
        if (datat.success) {
        }
      });
    },
    deleteElement(data) {
      /*"2002"
url
:
"http://www.ckaaaa.com/madeasm/prism/index.html"
xpath
:
"/html/body/div[1]/div[1]/div[2]/dl[4]/dt[1]/a[1]"*/
      let params = {
        id: data.id,
        appSource: this.appSource,
        os: "web"
      };
      circlePageConfigDelete(params).then(function(datat) {});
    }
  },
  components: {
    alertBox
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.topbar {
  height: 100px;
  border: 1px solid #f00;
}
.iframe {
  width: 100%;
  height: 900px;
  border: 1px solid #f00;
  &.pad {
    width: 768px;
    height: 1026px;
  }
  &.mobile {
    width: 375px;
    height: 627px;
  }
}
span.stayBtn {
  display: inline-block;
  color: #aaa;
  height: 30px;
  padding: 5px 30px;
  margin-left: 10px;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  letter-spacing: 0;
  border: 1px solid #aaa;
  border-radius: 4px;
  cursor: pointer;
  &.active {
    color: #5693fb;
    border: 1px solid #5693fb;
  }
}
</style>
