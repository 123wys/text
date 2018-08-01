<template>
  <div>
    <div class="topBar">
      <div class="layout">
        <div class="ssdp_wrap">
          <a target="_blank" class="ssdp" href="/prompt/monitoring">
            <img src="../sysHeader/img/ssdp.jpg" />
          </a>
        </div>
        <div class="headerTop clearfix">
          <div class="logo">
            <logo></logo>
          </div>
          <div class="right">
            <router-link to="/index">
              <i class="icon">
                <home></home>
              </i>
              回到首页
            </router-link>

            <a href="/assist/help" target="blank">
              <i class="icon">
                <help></help>
              </i>
              帮助文档
            </a>

            <dl class="link" v-on:mouseenter="isShowUserInfo = true" v-on:mouseleave="isShowUserInfo = false">
              <dt>
                <i class="icon">
                  <userInfo></userInfo>
                </i>
                {{ userName }}
                <i class="downTriangle" v-bind:class="{'active': isShowUserInfo}"></i>
              </dt>
              <transition name="fade">
                <dd class="userInfo" v-show="isShowUserInfo">
                  <div class="topHead">
                    <i class="via">
                      <userIcon></userIcon>
                    </i>
                  </div>
                  <div class="topHead" style="text-align:center">
                    <p style="width:100%;">{{ userName }}</p>
                  </div>
                  <div class="bot">
                    <ul>
                      <li v-on:click="editInfo">修改密码</li>
                      <li v-on:click="quitLogin">退出</li>
                    </ul>
                  </div>
                </dd>
              </transition>
            </dl>
          </div>

        </div>

        <!-- headerTop -->

        <div class="headerTap clearfix">
          <div class="left fl">
            <dl class="appSource" v-on:mouseenter="showSourceList(true);" v-on:mouseleave="showSourceList(false)">
              <dt v-bind:class="{'active':isShowSourceList}">{{ appSource.name.length > 7 ? appSource.name.slice(0,7) + '...' : appSource.name }} </dt>
              <transition name="fade">
                <dd v-show="isShowSourceList">
                  <ul>
                    <li v-for="item in sourceList" v-on:click="chooseSource(item)"> {{ item.name }} </li>
                  </ul>
                </dd>
              </transition>
            </dl>
          </div>
          <div class="center fl" v-on:mouseleave="backBorder()">
            <ul>
              <li v-for="item in tapList" v-bind:class="{'activeTap':item.os == activeTap, 'gray':!item.isActive}" v-on:click=" chooseTap(item.os)" v-on:mouseenter="comeBorder($event)"> {{ item.name }} </li>
              <b class="bottomBorder"></b>
            </ul>
          </div>
        </div>
        <!-- headerTap -->
      </div>
      <!-- layout -->
    </div>
    <!-- topBar -->
    <div class="main">
      <div class="layout clearfix flex">
        <div class="leftBar">
          <ul>
            <li class="first" v-for="item in currentMenuList.leaves">
              <dl>
                <dt v-on:click="toggleMenu($event)">
                  <i class="menuIcon">
                    <datatotal v-if="item.iconCls == 'icon-shujugailan'"></datatotal>
                    <analysis-tool v-if="item.iconCls == 'icon-fenxigongju'"></analysis-tool>
                    <app-analysis v-if="item.iconCls == 'icon-xingnengfenxi'"></app-analysis>
                    <assessment v-if="item.iconCls == 'icon-peizhipinggu'"></assessment>
                    <asm-configure v-if="item.iconCls == 'icon-asmpeizhi'"></asm-configure>
                    <config-page v-if="item.iconCls == 'icon-peizhiyemian'"></config-page>
                    <data-configure v-if="item.iconCls == 'icon-shujupeizhi'"></data-configure>
                    <lasso-configure v-if="item.iconCls == 'icon-quanxuanpeizhi'"></lasso-configure>
                  </i>
                  {{ item.name }}
                  <i class="spread">
                    <spread class="spreadSvg"></spread>
                    <pack-up class="packUpSvg"></pack-up>
                  </i>
                </dt>
                <dd>
                  <ul>
                    <li class="second __second" v-for="ele in item.leaves" v-on:click="choosePage(ele.name,ele.permissonStr)" v-bind:id="'dd_'+ele.permissonStr.split('\.')[0].split('/').join('')" v-bind:class="{'active' : activePage == ele.name }">{{ ele.name }}</li>
                  </ul>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
        <!-- leftBar -->
        <div class="pageWrapper">
          <router-view v-if="hasAppSource"></router-view>
        </div>
        <!-- pageWrapper -->
      </div>
    </div>
    <!-- main -->

    <div class="dialogWrapper" v-show="dialogFormVisible">
      <div class="dialogMask"></div>
      <div class="updatePassWord">
        <h1 class="tit">修改密码</h1>
        <el-form :model="form">

          <el-form-item label="旧密码" :label-width="formLabelWidth">
            <span class="icon">
              <passWord></passWord>
            </span>
            <input class="s-input" type="password" placeholder="旧密码" v-model="form.oldPw">
          </el-form-item>

          <el-form-item label="新密码" :label-width="formLabelWidth">
            <span class="icon">
              <passWord></passWord>
            </span>
            <input class="s-input" type="password" placeholder="新密码" v-model="form.newPw">
          </el-form-item>

          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <span class="icon">
              <passWord></passWord>
            </span>
            <input class="s-input" type="password" placeholder="确认密码" v-model="form.againPw">
          </el-form-item>

        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleUpdatePw" v-bind:class="{'disabled el-button-gray':!updatePwDone}">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </div>
    </div>

    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import alertBox from "../../components/common/alertBox/alertBox";
import { localStore, sessionStore, Cookie, each } from "../../config/mUtils";
import {
  getMenuList,
  getAppSource,
  logout,
  updatePassword
} from "../../service/getData";
import analysisTool from "./svg/analysisTool";
import appAnalysis from "./svg/appAnalysis";
import asmConfigure from "./svg/asmConfigure";
import assessment from "./svg/assessment";
import configPage from "./svg/configPage";
import dataConfigure from "./svg/dataConfigure";
import datatotal from "./svg/datatotal";
import downLoad from "./svg/downLoad";
import passWord from "./svg/passWord";
import help from "./svg/help";
import home from "./svg/home";
import lassoConfigure from "./svg/lassoConfigure";
import packUp from "./svg/packUp";
import pullUpDown from "./svg/pullUpDown";
import spread from "./svg/spread";
import userInfo from "./svg/userInfo";
import logo from "./svg/logo";
import userIcon from "./svg/userIcon";

export default {
  name: "sysHeader",
  data() {
    return {
      userName: "",
      appSource: {
        os: [],
        name: "",
        code: ""
      },
      sourceList: [],
      tapList: [
        { name: "移动端", os: "ios+android", isActive: false },
        { name: "IOS", os: "ios", isActive: false },
        { name: "Android", os: "android", isActive: false },
        { name: "网页", os: "web", isActive: false },
        { name: "小程序", os: "micro", isActive: false }
      ],
      isShowUserInfo: false,
      activeTap: "",
      hasPermission: true,
      isShowSourceList: false,
      activePage: "blank",
      isShowSpread: true,
      topBarHeight: 114,
      activePageUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      updatePwDone: true,
      form: {
        oldPw: "",
        newPw: "",
        againPw: ""
      },

      mobileMenuList: [],
      webMenuList: [],
      microMenuList: [],
      currentMenuList: [],

      activeLeft: 0,
      activeWidth: 0,
      marginLeft: 0
    };
  },
  computed: {
    ...mapState(["sourceAndOs"]),
    hasAppSource() {
      return this.$store.state.appSource && this.$store.state.headerTapOs;
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.checkIsLogin(); //检查是否已登录
      this.initHeaderMenu(); //初始化头部
      window.addEventListener("scroll", this.sysScroll); //添加滚动事件
    });
  },

  methods: {
    ...mapMutations(["CHANGE_APPSOURCE", "CHANGE_HEADERTAPOS"]),

    checkIsLogin() {
      const isAutoLogin = Cookie.getCookie(this.$store.state.userSid);
      if (!isAutoLogin) {
        //是否已登录
        localStore.removeStore(this.$store.state.userName);
        sessionStore.clearStore();
        this.$router.push({ path: "/login" });
        return false;
      } else {
        this.userName = localStore.getStore(this.$store.state.userName);
        return true;
      }
    },

    sysScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > this.topBarHeight) {
        $(".topBar").addClass("scrollDown");
      } else {
        $(".topBar").removeClass("scrollDown");
      }
    },

    async initHeaderMenu() {
      let isLogin = this.checkIsLogin();
      await this.doGetAppSource(); //获取appSource 下拉列表
      await this.doGetMenuList(); //获取左侧菜单栏
      if (!this.hasPermission) return; //账号无权限

      if (isLogin) {
        let store = sessionStore.getStore(this.sourceAndOs);
        if (store) {
          this.getLastState(store); //获取上次浏览状态
        } else {
          this.setVuexSourceOs(this.appSource.code, this.activeTap);
          this.initInnerPage(this.activePage, this.activePageUrl);
        }
      }
    },

    async doGetAppSource() {
      //获取appSource 下拉列表
      try {
        let data = await getAppSource({}); //获取appSource 下拉列表
        console.log(data);
        if (data.success) {
          if (data.model.length) {
            this.appSource = data.model[0];
            this.$store.commit("CHANGE_APPSOURCELIST", data.model); //全局缓存appSourceList
            this.$store.commit("CHANGE_APPSOURCE", data.model[0].code); //同步appSource
            this.sourceList = data.model;
            this.checkCenterTap();
          } else {
            this.hasPermission = false;
            this.$refs.Alert.resetTxts({
              warnTit: "提示",
              warnTxt: "您的账号暂无权限，请联系管理员！"
            });
            this.$refs.Alert.showWarn(data.message);
          }
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试!"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (err) {
        console.log(err);
        this.$refs.Alert.showError();
      }
    },

    async doGetMenuList() {
      //获取左侧菜单栏
      try {
        let data = await getMenuList({}); //获取左侧菜单栏
        console.log(data);
        if (data.success) {
          if (data.model.length) {
            this.mobileMenuList = data.model[0];
            this.webMenuList = data.model[1];
            this.microMenuList = data.model[2];
            this.initMenuList(); //初始化侧边栏
          } else {
            this.hasPermission = false;
            this.$refs.Alert.resetTxts({
              warnTit: "提示",
              warnTxt: "您的账号暂无权限，请联系管理员！"
            });
            this.$refs.Alert.showWarn(data.message);
          }
        } else {
          this.$refs.Alert.resetTxts({
            errorTit: "错误",
            errorTxt: "获取数据失败，请稍后再试!"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (err) {
        console.log(err);
        this.$refs.Alert.showError();
      }
    },

    initMenuList() {
      //初始化侧边栏
      switch (this.activeTap) {
        case "micro": //小程序
          this.currentMenuList = this.microMenuList;
          break;

        case "web": //网页
          this.currentMenuList = this.webMenuList;
          break;

        case "android": //Android
          this.currentMenuList = this.mobileMenuList;
          break;

        case "ios": //IOS
          this.currentMenuList = this.mobileMenuList;
          break;

        case "ios+android": //移动端
          this.currentMenuList = this.mobileMenuList;
          break;
      }
    },

    initInnerPage(name, url) {
      console.log("initInnerPage-----");
      if (name && url) {
        this.activePage = name;
        this.activePageUrl = url;
      } else {
        this.activePage = this.currentMenuList.leaves[0].leaves[0].name;
        this.activePageUrl = this.currentMenuList.leaves[0].leaves[0].permissonStr;
      }
      let myUrl = this.activePageUrl;
      try {
        myUrl =
          "/systemIndex" + myUrl.replace("/webflow", "").replace(".html", "");
        console.log(
          myUrl,
          this.$store.state.appSource,
          this.$store.state.headerTapOs
        );
        this.$router.push({
          path: myUrl,
          query: {
            t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    showSourceList(flag) {
      this.isShowSourceList = flag;
    },

    getLastState(store) {
      this.appSource = store.source;
      this.checkCenterTap();
      this.activeTap = store.os;
      this.initMenuList();
      this.setVuexSourceOs(store.source.code, store.os);
      store.page && this.choosePage(store.page.name, store.page.url);
    },

    setSourceOsStore(source = "", os = "", page = { name: "", url: "" }) {
      console.log("setSourceOsStore");
      const old = sessionStore.getStore(this.sourceAndOs);
      if (old) {
        !source && (source = old.source || null);
        !os && (os = old.os || null);
        !page && (page = old.page || null);
      }

      sessionStore.setStore(this.sourceAndOs, {
        source: source,
        os: os,
        page: page
      });
    },

    setVuexSourceOs(source = "", os = "") {
      source && this.$store.commit("CHANGE_APPSOURCE", source); //同步vuex  appSource
      os && this.$store.commit("CHANGE_HEADERTAPOS", os); //同步vuex  headerTapOs
      console.log(this.$store.state.appSource, this.$store.state.headerTapOs);
    },

    chooseSource(item) {
      if (this.appSource == item) return;
      this.appSource = item;
      this.isShowSourceList = false;
      this.checkCenterTap();
      this.initMenuList();
      this.initInnerPage();
      this.setVuexSourceOs(item.code, this.activeTap);
      this.setSourceOsStore(item, this.activeTap, {
        name: this.activePage,
        url: this.activePageUrl
      });
    },

    checkCenterTap() {
      //初始化状态
      this.tapList = [
        { name: "移动端", os: "ios+android", isActive: false },
        { name: "IOS", os: "ios", isActive: false },
        { name: "Android", os: "android", isActive: false },
        { name: "网页", os: "web", isActive: false },
        { name: "小程序", os: "micro", isActive: false }
      ];
      this.activeTap = "";
      // 根据appSource判断 移动端 IOS Android 网页 小程序 是否可用,并初始化.activeTap类名所在位置
      this.appSource.os &&
        each(
          this.appSource.os,
          function(ele, idx) {
            switch (ele) {
              case "micro": //小程序
                this.tapList[4].isActive = true;
                break;

              case "web": //网页
                this.tapList[3].isActive = true;
                break;

              case "android": //Android
                this.tapList[2].isActive = true;
                break;

              case "ios": //IOS
                this.tapList[1].isActive = true;
                break;

              case "ios+android": //移动端
                this.tapList[0].isActive = true;
                break;
            }
          },
          this
        );
      this.appSource.os && (this.activeTap = this.appSource.os[0] || "");

      this.initBorderPosition(); //初始化下划线位置
    },

    chooseTap(item) {
      //选择headerTap  移动端 IOS Android 网页 小程序
      if (this.activeTap == item) return;
      let temp = this.activeTap;
      this.activeTap = item;

      if (
        (temp == "ios+android" || temp == "ios" || temp == "android") &&
        (this.activeTap == "ios+android" ||
          this.activeTap == "ios" ||
          this.activeTap == "android")
      ) {
        this.initMenuList();
        this.initInnerPage(this.activePage, this.activePageUrl);
        this.setVuexSourceOs(null, item);
        this.setSourceOsStore(this.appSource, this.activeTap, {
          name: this.activePage,
          url: this.activePageUrl
        });
      } else {
        this.initMenuList();
        this.initInnerPage();
        this.setVuexSourceOs(null, item);
        this.setSourceOsStore(this.appSource, this.activeTap, {
          name: this.activePage,
          url: this.activePageUrl
        });
      }
    },

    choosePage(name, url) {
      //选择左侧菜单栏
      if (this.activePage == name) return;
      this.setSourceOsStore(this.appSource, this.activeTap, {
        name: name,
        url: url
      });
      this.initInnerPage(name, url);
    },

    toggleMenu(e) {
      let thisdt = $(e.target);
      let thisdd = thisdt.siblings("dd");
      thisdd.slideToggle(500);
      thisdt.find(".spreadSvg").toggle();
      thisdt.find(".packUpSvg").toggle();
    },

    initBorderPosition() {
      this.$nextTick(function() {
        //初始化下划线位置
        if (!$(".activeTap")[0]) {
          $(".bottomBorder").animate({ height: 0 }, 100);
          return;
        }
        $(".bottomBorder").css({
          left:
            $(".activeTap").position().left +
            parseInt($(".activeTap").css("marginLeft")),
          width: $(".activeTap").outerWidth(),
          height: 4
        });
      });
    },

    comeBorder(e) {
      this.activeLeft = $(e.target).position().left;
      this.activeWidth = $(e.target).outerWidth();
      this.marginLeft = parseInt($(e.target).css("marginLeft"));

      $(".bottomBorder")
        .stop()
        .animate({
          left: this.activeLeft + this.marginLeft,
          width: this.activeWidth
        });
    },

    backBorder() {
      if (!$(".activeTap")[0]) return;
      this.activeLeft = $(".activeTap").position().left;
      this.activeWidth = $(".activeTap").outerWidth();
      this.marginLeft = parseInt($(".activeTap").css("marginLeft"));

      $(".bottomBorder")
        .stop()
        .animate({
          left: this.activeLeft + this.marginLeft,
          width: this.activeWidth
        });
    },

    async doUpdatePassWord() {
      //获取appSource 下拉列表
      try {
        this.updatePwDone = false;
        let data = await updatePassword({
          loginName: this.userName,
          password: this.form.oldPw,
          newPwd: this.form.newPw,
          confirmPwd: this.form.againPw,
          mid: "zatech"
        }); //获取appSource 下拉列表

        if (data.success) {
          this.updatePwDone = true;
          this.$refs.Alert.resetTxts({
            errorTit: "成功",
            errorTxt: "修改密码成功,请重新登录！"
          });
          this.$refs.Alert.showSuccess(() => {
            localStore.removeStore(this.$store.state.userName);
            sessionStore.clearStore();
            this.$router.push({ path: "/login" });
          });
        } else {
          this.updatePwDone = true;
          this.$refs.Alert.resetTxts({
            errorTit: "修改密码失败",
            errorTxt: "修改密码失败，请稍后再试！"
          });
          this.$refs.Alert.showError(data.message);
        }
      } catch (err) {
        console.log(err);
        this.updatePwDone = true;
        this.$refs.Alert.showError();
      }
    },

    handleUpdatePw() {
      if (!this.updatePwDone) return;
      if (this.checkRequired()) {
        this.doUpdatePassWord();
      }
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

    checkRequired() {
      if (!this.form.oldPw) {
        this.setWarnTxt("请输入旧密码！");
        return false;
      }

      if (!this.form.newPw) {
        this.setWarnTxt("请输入新密码！");
        return false;
      }

      if (!this.form.againPw) {
        this.setWarnTxt("请输入确认密码！");
        return false;
      }

      if (this.form.againPw != this.form.newPw) {
        this.setWarnTxt("两次输入密码不一致！");
        this.form.newPw = "";
        this.form.againPw = "";
        return false;
      }

      return true;
    },

    editInfo() {
      //修改密码
      this.dialogFormVisible = true;
    },

    resetFormData() {
      this.form = {
        oldPw: "",
        newPw: "",
        againPw: ""
      };
    },

    closeDialog() {
      this.dialogFormVisible = false;
      this.resetFormData();
    },

    quitLogin() {
      //退出登录
      logout({})
        .then(data => {
          console.log(data);
          if (data.success) {
            localStore.removeStore(this.$store.state.userName);
            sessionStore.clearStore();
            this.$router.push({ path: "/login" });
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "退出登录失败！"
            });
            this.$refs.Alert.showError(data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$refs.Alert.showError();
        });
    }
  },
  components: {
    alertBox,
    analysisTool,
    appAnalysis,
    asmConfigure,
    assessment,
    configPage,
    dataConfigure,
    datatotal,
    downLoad,
    passWord,
    help,
    home,
    lassoConfigure,
    packUp,
    pullUpDown,
    spread,
    userInfo,
    logo,
    userIcon
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
svg {
  vertical-align: middle;
}

.topBar {
  @include cl;
  position: fixed;
  width: 1920px;
  height: 114px;
  background: #25304f;
  z-index: 999;
  transition: all 0.3s ease;
}

.topBar.scrollDown {
  height: 64px;
}

.layout {
  position: relative;
  margin: 0 auto;
  height: 100%;
  width: 1340px;
}

// @media screen and (max-width: 1480px) {
//   .layout {
//     width: 1210px;
//   }
// }

// @media screen and (min-width: 1480px) and (max-width: 1600px) {
//   .layout {
//     width: 1366px;
//   }
// }

// @media screen and (min-width: 1600px) {
//   .layout {
//     width: 1440px;
//   }
// }

.headerTop {
  height: 64px;
  line-height: 64px;
}

.headerTop .logo {
  float: left;
  width: 270px;
  height: 64px;
  margin-left: 36px;
}

.headerTop .right {
  position: relative;
  float: right;
  margin-right: 48px;
  transition: all 0.3s ease;
}

.topBar.scrollDown .right {
  opacity: 0;
}

.headerTop .right a,
.headerTop .right .link {
  position: relative;
  display: block;
  float: left;
  height: 64px;
  margin-right: 42px;
  padding-left: 25px;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #dce2ea;
  cursor: pointer;
}

.headerTop .right a:hover,
.headerTop .right .link dt:hover {
  color: #5693fb;
}

.headerTop .right a:hover .headerSvg,
.headerTop .right .link dt:hover .headerSvg {
  fill: #5693fb;
}

.headerTop .right .icon {
  position: absolute;
  left: 0;
  top: 0;
}

.downTriangle {
  position: relative;
  top: -1px;
  margin-left: 5px;
  display: inline-block;
  height: 5px;
  width: 6px;
  background: url("./img/pulldown@2x.png") no-repeat top center;
  background-size: 100% 100%;
}

.downTriangle.active {
  background-image: url("./img/packup@2x.png");
}

.headerTap {
  position: relative;
  height: 50px;
  transition: all 0.3s ease;
}

.topBar.scrollDown .headerTap {
  position: absolute;
  bottom: 0;
  left: 288px;
}

.appSource {
  position: relative;
  display: inline-block;
  margin-left: 58px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  z-index: 99;
}

.appSource dt {
  padding: 0 13px;
  height: 24px;
  line-height: 24px;
  background-image: linear-gradient(
    230deg,
    #7285f9 0%,
    #5c92ff 49%,
    #21a9f6 100%
  );
  border-radius: 100px;
  font-family: PingFangHK-Semibold;
}

.appSource dt:after {
  position: relative;
  top: -2px;
  margin-left: 5px;
  display: inline-block;
  height: 5px;
  width: 6px;
  content: "";
  background: url("./img/pulldown@2x.png") no-repeat top center;
  background-size: 100% 100%;
}

.appSource dt.active:after {
  background-image: url("./img/packup@2x.png");
}

.appSource dd {
  @include cl;
  top: 0;
  padding-top: 30px;
  font-family: PingFangSC-Regular;
  line-height: 32px;
  white-space: nowrap;
  z-index: 9;
}

// .appSource dd ul::-webkit-scrollbar {
//   display: none;
// }

.appSource dd ul {
  max-height: 500px;
  overflow-y: auto;
  background: #25304f;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb:vertical {
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(129, 129, 129, 0.5);
  }
}

.appSource dd li {
  padding: 0 12px;
  cursor: pointer;
}

.appSource dd li:hover {
  background: #202944;
}

.userInfo {
  position: absolute;
  left: -34px;
  top: 48px;
  width: 150px;
  height: 173px;
  background: #ffffff;
  border: 1px solid #c5cfde;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  overflow: hidden;
  z-index: 9;
}

.userInfo .topHead {
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
}

.userInfo .via {
  display: block;
  margin: 18px auto 0;
  width: 35px;
  height: 35px;
}

.userInfo .bot {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 15px 20px 20px;
  border-top: 1px rgba(197, 207, 222, 0.4) solid;
}

.userInfo .bot li {
  position: relative;
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #687993;
  line-height: 26px;
}

.userInfo .bot li:after {
  position: absolute;
  top: 50%;
  margin-top: -2px;
  right: 0;
  display: block;
  height: 5px;
  width: 5px;
  content: "";
  border: 1px #687993 solid;
  border-top: none;
  border-left: none;
  transform: rotateZ(-45deg);
}

.userInfo .bot li:hover {
  color: #5693fb;
}

.userInfo .bot li:hover::after {
  border-color: #5693fb;
}

.headerTap .left {
  margin-top: 12px;
}

.headerTap .center {
  position: relative;
  height: 50px;
  margin-left: 100px;
  font-family: PingFangHK-Regular;
  font-size: 16px;
  color: #ffffff;
  line-height: 50px;
}

.headerTap .center li {
  position: relative;
  float: left;
  padding: 0 10px;
  margin-left: 70px;
  cursor: pointer;
}

.headerTap .center li:first-child {
  margin-left: 0;
}

.headerTap .center li.activeTap::after {
  position: absolute;
  left: 0;
  bottom: 0;
  content: "";
  height: 4px;
  width: 100%;
  background-color: #5693fb;
  z-index: 9;
}

.headerTap .center li.gray {
  pointer-events: none;
  color: #999;
}

.headerTap .center .bottomBorder {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 4px;
  background-color: #5693fb;
  z-index: 1;
}

.main {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: auto;
  padding-top: 114px;
  background-color: #f5f6fb;
  padding-bottom: 25px;
  z-index: 1;
}

.leftBar {
  flex-shrink: 0;
  position: relative;
  margin: 14px 10px 0 0;
  width: 166px; /*170*/
  min-height: 1060px;
  background: #ffffff;
  border: 1px solid #e6e8ef;
  overflow: hidden;
}

.pageWrapper {
  flex-grow: 1;
  margin: 13px 0px 0 0;
  overflow: hidden;
}

.menuIcon {
  margin-right: 10px;
}

.spread {
  float: right;
  position: relative;
  top: -2px;
  pointer-events: none;
}

.spread .spreadSvg {
  display: none;
}

.spread .packUpSvg {
  display: inline;
}

.main .leftBar dt {
  padding: 0 14px 0 14px;
  font-family: PingFangHK-Regular;
  font-size: 14px;
  line-height: 46px;
  color: #696c73;
}

.main .leftBar .first dt {
  margin-bottom: 6px;
}

.main .leftBar .first dt:after {
  margin-bottom: 6px;
}

.main .leftBar .second {
  position: relative;
  left: 0;
  width: 170px;
  padding: 0 5px 0 50px;
  margin-bottom: 4px;
  font-family: PingFangHK-Regular;
  font-size: 14px;
  line-height: 33px;
  color: #000000;
  cursor: pointer;
}

.main .leftBar li.second:last-child {
  margin-bottom: 0;
}

.main .leftBar .second::before {
  position: absolute;
  left: 40px;
  top: 13px;
  vertical-align: middle;
  line-height: 0;
  content: ".";
}

.main .leftBar .second:hover {
  background: #f5f8ff;
  color: #5693fb;
}

.main .leftBar .second:hover::before {
  color: #5693fb;
}

.main .leftBar .second:hover::after {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  content: "";
  background-color: #5693fb;
  z-index: 9;
}

.main .leftBar .second.active {
  background: #f5f8ff;
  color: #5693fb;
}

.main .leftBar .second.active::before {
  color: #5693fb;
}

.main .leftBar .second.active::after {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  content: "";
  background-color: #5693fb;
  z-index: 9;
}
.ssdp_wrap {
  .ssdp {
    position: absolute;
    top: 120px;
    right: -40px;
    height: 64px;
    width: 36px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (max-width: 1480px) {
  .ssdp_wrap {
    .ssdp {
      position: absolute;
      top: 120px;
      right: 4px;
      height: 64px;
      width: 36px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.updatePassWord {
  @include center;
  position: fixed;
  min-width: 700px;
  padding: 50px 50px;
  background: #fff;
  box-shadow: 0 0 20px 4px #7e93d8;
  border-radius: 2px;
  z-index: 9;
  .icon {
    position: absolute;
    left: 15px;
  }

  .tit {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .el-button-gray {
    border: 1px solid #dcdfe6;
  }
}
</style>
