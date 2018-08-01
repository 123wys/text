<template>
  <div>
    <div class="loginBG">
      <div class="loginBox">
        <div class="leftBG" v-on:click="goIndex" title="去首页"></div>
        <div class="content">
          <div class="txt">
            <h1>Hi~</h1>
            <h1>欢迎回来，请登录</h1>
            <label>
              <span class="icon">
                <userName></userName>
              </span>
              <input type="text" placeholder="请输入用户名" id="userName" v-model="userName">
            </label>
            <label>
              <span class="icon">
                <passWord></passWord>
              </span>
              <input type="password" placeholder="请输入密码" id="passWord" v-model="passWord">
            </label>

            <input type="checkbox" id="loginAuto" v-bind:checked="isAutoLogin" v-on:click="isAutoLogin = !isAutoLogin">
            <label class="checkBox loginAuto" for="loginAuto"></label>
            <span class="btnLogin" v-on:click="doLogin" v-bind:class="{'disabled':!isOK}">登录</span>
            <p class="botBtn clearfix">
              <span class="reset" v-on:click="reset">重置</span>
              <span class="forget fr">忘记密码？</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import alertBox from "../../components/common/alertBox/alertBox";
import { login } from "../../service/getData";
import { localStore } from "../../config/mUtils";
import { Cookie } from "../../config/mUtils";
import userName from "./svg/userName";
import passWord from "./svg/passWord";

export default {
  name: "login",
  data() {
    return {
      userName: "",
      passWord: "",
      isAutoLogin: true,
      isOK: true
    };
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

    });
  },
  methods: {
    goIndex() {
      this.$router.push({ path: "/index" });
    },

    doLogin() {
      if (!this.isOK) return;
      this.isOK = false;
      login({
        loginName: this.userName,
        password: this.passWord,
        isAutoLogin: this.isAutoLogin,
        mid: "zatech"
      })
        .then(data => {
          console.log(data);
          if (data.success) {
            if (this.isAutoLogin) {
              localStore.setStore(this.$store.state.userName, this.userName);
            }

            this.$router.push({ path: "systemIndex" });
          } else {
            this.$refs.Alert.resetTxts({
              errorTit: "错误",
              errorTxt: "登录失败！"
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
    reset() {
      this.userName = "";
      this.passWord = "";
    }
  },
  components: {
    alertBox,
    userName,
    passWord
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../style/mixin";
.loginBG {
  @include cl;
  /*width: 1920px;*/
  height: 1080px;
  background: url("./img/loginBG.png") no-repeat top center;
  background-size: 100% 100%;
}

.loginBox {
  @include center;
  margin: auto;
  width: 887px;
  height: 543px;
  background-color: #fff;
  box-shadow: -10px -10px 22px 0 rgba(14, 45, 123, 0.05),
    10px 10px 22px 0 rgba(14, 45, 123, 0.05);
}

.leftBG {
  position: absolute;
  left: 0;
  top: 0;
  width: 325px;
  height: 543px;
  background: url("./img/leftBG.png") no-repeat top center;
  background-size: 100% 100%;
  cursor: pointer;
}

.content {
  position: absolute;
  right: 0;
  top: 0;
  width: 562px;
  height: 543px;
}

.txt {
  @include center;
  margin: auto;
  width: 360px;
  height: auto;
}

.txt h1 {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #4a4a4a;
  line-height: 20px;
}

.txt label {
  position: relative;
  display: block;
  margin-top: 20px;
}

.icon {
  @include ct;
  position: absolute;
  left: 17px;
}

.loginAuto {
  margin-top: 8px;
}

.loginAuto::before {
  position: absolute;
  top: -2px;
  left: 22px;
  display: block;
  width: 100px;
  content: "五天内自动登录";
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #c0ccda;
  letter-spacing: 0;
  line-height: 14px;
}

.btnLogin {
  @include us;
  display: block;
  margin-top: 20px;
  height: 40px;
  background-image: linear-gradient(
    152deg,
    #7285f9 0%,
    #5c92ff 49%,
    #21a9f6 100%
  );
  text-align: center;
  line-height: 40px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
}

.btnLogin:hover {
  background-image: linear-gradient(
    152deg,
    #7b72f9 0%,
    #5f5cff 49%,
    #217df6 100%
  );
}

.btnLogin:active {
  background-image: linear-gradient(
    152deg,
    rgba(120, 113, 249, 0.781) 0%,
    rgba(95, 92, 255, 0.699) 49%,
    rgba(33, 125, 246, 0.753) 100%
  );
}

.botBtn {
  margin-top: 10px;
}

.botBtn span {
  cursor: pointer;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #bac4d0;
}
</style>
