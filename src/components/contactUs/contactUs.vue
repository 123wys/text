<template>
  <div>
    <indexHeader>
      <h1 class="fadeIn" slot="sol-centerTxt">联系我们</h1>
      <div class="fadeIn contactForm" slot="contactForm">
        <ul class="clearfix">
          <li>
            <label for="name">
              <span class="required">姓名</span><input type="text" id=name placeholder="请输入姓名" v-model="name"></label>
          </li>
          <li>
            <label for="name">
              <span class="required">电话号码</span><input type="text" id=phoneNum placeholder="请输入手机号" v-model="phoneNum"></label>
          </li>
          <li>
            <label for="name">
              <span class="required">邮箱</span><input type="text" id=mail placeholder="请输入联系邮箱" v-model="mail"></label>
          </li>
          <li>
            <label for="name">
              <span>公司/组织</span><input type="text" id=company placeholder="请输入公司/组织" v-model="company"></label>
          </li>
          <li>
            <label for="name">
              <span>备注信息</span>
              <textarea name="remark" id="remark" cols="30" rows="10" placeholder="请简单描述一下您的更多需求" v-model="remark"></textarea>
            </label>
          </li>
        </ul>
        <span class="contactBtn" v-on:click="submitInfo"></span>
      </div>
      <div class="fadeIn contactUsBg" slot="bg2"></div>
    </indexHeader>
    <alertBox ref="Alert"></alertBox>
  </div>
</template>
<script type="text/ecmascript-6">
import indexHeader from "../../components/header/indexHeader.vue";
import indexFooter from "../../components/footer/indexFooter.vue";
import { ShakeWithMouse } from "../../config/mUtils";
import { buildContact } from "../../service/getData";
import alertBox from "../../components/common/alertBox/alertBox";

export default {
  name: "contactUs",
  data() {
    return {
      name: "",
      phoneNum: "",
      mail: "",
      company: "",
      remark: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
    });
  },
  methods: {
    setWarnTxt: function(str) {
      let myAlertTexts = {
        warnTit: "提示",
        warnTxt: "必填信息不能为空！"
      };
      myAlertTexts.warnTxt = str;
      this.$refs.Alert.resetTxts(myAlertTexts);
      this.$refs.Alert.showWarn();
    },
    checkInfo: function() {
      if (!this.name) {
        this.setWarnTxt("姓名不能为空！");
        return false;
      }
      if (!this.phoneNum) {
        this.setWarnTxt("电话号码不能为空！");
        return false;
      }
      if (!this.checkPhone()) {
        this.setWarnTxt("请填写正确的手机号！");
        return false;
      }
      if (!this.mail) {
        this.setWarnTxt("邮箱不能为空！");
        return false;
      }
      if (!this.checkEmail()) {
        this.setWarnTxt("请填写正确的邮箱地址！");
        return false;
      }

      return true;
    },
    checkPhone: function() {
      return /^1[34578]\d{9}$/.test(this.phoneNum);
    },
    checkEmail: function() {
      return /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(
        this.mail
      );
    },
    submitInfo: function() {
      let urlData = this.$route.query;
      if (this.checkInfo()) {
        buildContact({
          name: this.name,
          phone: this.phoneNum,
          email: this.mail,
          company: this.company,
          remark: this.remark,
          channelId: urlData.channelId || '',
          channelCode: urlData.channelCode || ''
        })
          .then(data => {
            console.log(data);
            if (data.success) {
              this.name = "";
              this.phoneNum = "";
              this.mail = "";
              this.company = "";
              this.remark = "";

              this.$refs.Alert.showSuccess();
            } else {
              this.$refs.Alert.showError(data.message);
            }
          })
          .catch(err => {
            console.log(err);
            this.$refs.Alert.showError();
          });
      }
    }
  },
  components: {
    indexHeader,
    indexFooter,
    alertBox
  }
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 1920px;
  height: 833px !important;
}

.header .headBox h1 {
  margin-top: 208px;
  margin-bottom: 50px;
  font: normal 24px/36px "Tensentype-JiaLiCuHeiJ";
  color: #fff;
  text-align: center;
}

.header .contactUsBg {
  position: absolute;
  width: 100%;
  height: 833px;
  margin: 0 auto;
  background: url("./img/headBG@2x.png") center center no-repeat;
  background-size: 100% 100%;
  z-index: 1;
}
.header .headBox .contactForm {
  width: 900px;
  margin: 0 auto;
  font: normal 14px/20px "microsoft yahei";
  color: #fff;
  text-align: left;
}

.header .headBox .contactForm label span {
  color: #fff;
}

.header .headBox .contactForm input {
  padding: 10px;
  width: 368px;
  height: 46px;
  border: 1px solid #d2d2d2;
  opacity: 0.9;
  background: #ffffff;
  color: #8a8c98;
  border-radius: 2px;
}

.header .headBox .contactForm ul {
  padding-left: 27px;
  width: 817px;
  margin: 0 auto;
}

.header .headBox .contactForm li {
  position: relative;
  float: left;
  margin-right: 27px;
  width: 368px;
}

.header .headBox .contactForm label {
  position: relative;
}

.header .headBox .contactForm label span {
  position: relative;
  display: inline-block;
  padding: 10px;
}

.header .headBox .contactForm label span.required:after {
  position: absolute;
  right: 0;
  top: 10px;
  display: inline-block;
  content: "*";
  color: red;
}

.header .headBox .contactForm label #remark {
  width: 764px;
  height: 84px;
  resize: none;
  border: 1px solid #d2d2d2;
  opacity: 0.9;
  background: #ffffff;
  color: #8a8c98;
}

.header .headBox .contactBtn {
  display: block;
  width: 206px;
  height: 44px;
  margin: 43px auto 0 auto;
  background: url("./img/contactBtn@2x.png") no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
}

.header .headBox .contactBtn:hover {
  color: #fff;
  opacity: 0.8;
  filter: alpha(opacity=80);
}

.map {
  position: relative;
  width: 1148px;
  height: 354px;
  margin: 0 auto;
}

.map .mapBG {
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -960px;
  width: 1920px;
  height: 354px;
  background: url(./img/positionBG@2x.png) left top no-repeat;
  background-size: 100% 100%;
  z-index: 1;
}

.map .content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 215px;
  top: 69px;
  width: 420px;
  height: 250px;
  padding: 30px 0 0 70px;
  background: url(./img/positionTxt@2x.png) left top no-repeat;
  background-size: 100% 100%;
  z-index: 2;
}

.map .content ul {
  position: relative;
  color: #000;
  font: 14px/22px "PingFangSC-Semibold";
  margin-bottom: 10px;
}

.map .content .mailIcon {
  position: absolute;
  top: 4px;
  left: -35px;
  width: 18px;
  height: 14px;
  background: url(./img/mail@2x.png) left top no-repeat;
  background-size: 100% 100%;
}

.map .content .positionIcon {
  position: absolute;
  top: 1px;
  left: -35px;
  width: 19px;
  height: 17px;
  background: url(./img/positionIcon@2x.png) left top no-repeat;
  background-size: 100% 100%;
}
</style>
