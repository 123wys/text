<template>
  <transition name='fade'>
    <div class="alertMask" v-show="isShowAlertMask">
      <transition name="fadeInDown">
        <div class="alertBox alertSuccess" v-show="isShowSuccess">
          <h1>{{ alertTexts.successTit}}</h1>
          <span class="close" v-on:click="hideSuccess">
            <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
              <title>close icon</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="1-视觉规范" transform="translate(-408.000000, -5305.000000)" fill="#C0CCDA">
                  <g id="弹窗" transform="translate(50.000000, 5288.000000)">
                    <path d="M365.366684,22.95247 L359.704033,17.2898196 C359.324672,16.9104586 358.68614,16.9050914 358.295616,17.2956157 C357.902369,17.6888627 357.902496,18.31671 358.28982,18.7040332 L363.95247,24.3666835 L358.28982,30.0293338 C357.910459,30.4086949 357.905091,31.047227 358.295616,31.4377513 C358.688863,31.8309983 359.31671,31.8308706 359.704033,31.4435474 L365.366684,25.7808971 L371.029334,31.4435474 C371.408695,31.8229085 372.047227,31.8282756 372.437751,31.4377513 C372.830998,31.0445044 372.830871,30.4166571 372.443547,30.0293338 L366.780897,24.3666835 L372.443547,18.7040332 C372.822908,18.3246722 372.828276,17.68614 372.437751,17.2956157 C372.044504,16.9023688 371.416657,16.9024964 371.029334,17.2898196 L365.366684,22.95247 Z" id="close-icon"></path>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <div class="alertTxt">
            <i class="icon">
              <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
                <title>成功 icon</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="1-视觉规范" transform="translate(-70.000000, -5354.000000)" fill="#13CE66">
                    <g id="弹窗" transform="translate(50.000000, 5288.000000)">
                      <path d="M40,66 C37.2435754,66 34.6474462,66.5208308 32.2115385,67.5624985 C29.7756308,68.6041723 27.6522523,70.0304369 25.8413465,71.8413477 C24.0304394,73.6522523 22.6041717,75.7756308 21.5624997,78.2115385 C20.5208281,80.6474462 20,83.2435754 20,86 C20,88.7564246 20.5208281,91.3525538 21.5624997,93.7884615 C22.6041717,96.2243692 24.0304394,98.3477477 25.8413465,100.158654 C27.6522523,101.969561 29.7756308,103.395828 32.2115385,104.4375 C34.6474462,105.479172 37.2435754,106 40,106 C42.7564246,106 45.3525538,105.479172 47.7884615,104.4375 C50.2243692,103.395828 52.3477477,101.969561 54.1586523,100.158654 C55.9695631,98.3477477 57.3958277,96.2243692 58.4375015,93.7884615 C59.4791692,91.3525538 60,88.7564246 60,86 C60,83.2435754 59.4791692,80.6474462 58.4375015,78.2115385 C57.3958277,75.7756308 55.9695631,73.6522523 54.1586523,71.8413477 C52.3477477,70.0304369 50.2243692,68.6041723 47.7884615,67.5624985 C45.3525538,66.5208308 42.7564246,66 40,66 L40,66 Z M51.1538462,81.5769231 L36.5865354,96.1442277 C36.3942277,96.3365415 36.1698708,96.4326954 35.9134646,96.4326954 C35.6570523,96.4326954 35.4326954,96.3365415 35.2403815,96.1442277 L34.9519262,95.8557723 L26.9230769,87.7788492 C26.7307692,87.5865354 26.6346154,87.3621785 26.6346154,87.1057662 C26.6346154,86.84936 26.7307692,86.6250031 26.9230769,86.4326954 L28.8942277,84.4615385 C29.0865415,84.2692308 29.3108985,84.1730769 29.5673108,84.1730769 C29.8237169,84.1730769 30.0480738,84.2692308 30.2403815,84.4615385 L35.9134646,90.1826892 L47.8365415,78.2596123 C48.0288492,78.0673046 48.2532062,77.9711569 48.5096123,77.9711569 C48.7660246,77.9711569 48.9903815,78.0673046 49.1826954,78.2596123 L51.1538462,80.2307692 C51.3461538,80.4230769 51.4423077,80.6474338 51.4423077,80.9038462 C51.4423077,81.1602585 51.3461538,81.3846154 51.1538462,81.5769231 L51.1538462,81.5769231 Z" id="成功-icon"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <h2>{{ alertTexts.successTxt}} </h2>
            <p>{{ alertTexts.successDetail}}</p>
          </div>

          <div class="btnBox">
            <span class="btn btnOK" v-on:click="hideSuccess">{{ alertTexts.successOK }}</span>
          </div>
        </div>
      </transition>

      <transition name="fadeInDown">
        <div class="alertBox alertError" v-show="isShowError">
          <h1>{{ alertTexts.errorTit}}</h1>
          <span class="close" v-on:click="hideError">
            <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
              <title>close icon</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="1-视觉规范" transform="translate(-408.000000, -5305.000000)" fill="#C0CCDA">
                  <g id="弹窗" transform="translate(50.000000, 5288.000000)">
                    <path d="M365.366684,22.95247 L359.704033,17.2898196 C359.324672,16.9104586 358.68614,16.9050914 358.295616,17.2956157 C357.902369,17.6888627 357.902496,18.31671 358.28982,18.7040332 L363.95247,24.3666835 L358.28982,30.0293338 C357.910459,30.4086949 357.905091,31.047227 358.295616,31.4377513 C358.688863,31.8309983 359.31671,31.8308706 359.704033,31.4435474 L365.366684,25.7808971 L371.029334,31.4435474 C371.408695,31.8229085 372.047227,31.8282756 372.437751,31.4377513 C372.830998,31.0445044 372.830871,30.4166571 372.443547,30.0293338 L366.780897,24.3666835 L372.443547,18.7040332 C372.822908,18.3246722 372.828276,17.68614 372.437751,17.2956157 C372.044504,16.9023688 371.416657,16.9024964 371.029334,17.2898196 L365.366684,22.95247 Z" id="close-icon"></path>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <div class="alertTxt">
            <i class="icon">
              <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
                <title>失败</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="1-视觉规范" transform="translate(-522.000000, -5354.000000)" fill-rule="nonzero" fill="#E22A41">
                    <g id="Group-18" transform="translate(502.000000, 5288.000000)">
                      <g id="弹窗-copy">
                        <g id="失败" transform="translate(20.000000, 66.000000)">
                          <path d="M20,0 C9,0 0,9 0,20 C0,31 9,40 20,40 C31,40 40,31 40,20 C40,9 31,0 20,0 Z M29,26.5 C29.75,27.25 29.75,28.25 29,29 C28.25,29.75 27.25,29.75 26.5,29 L20,22.5 L13.5,29 C12.75,29.75 11.75,29.75 11,29 C10.25,28.25 10.25,27.25 11,26.5 L17.5,20 L11,13.5 C10.25,12.75 10.25,11.75 11,11 C11.75,10.25 12.75,10.25 13.5,11 L20,17.5 L26.5,11 C27.25,10.25 28.25,10.25 29,11 C29.75,11.75 29.75,12.75 29,13.5 L22.5,20 L29,26.5 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <h2>{{ alertTexts.errorTxt}} </h2>
            <p>{{ alertTexts.errorDetail}}</p>
          </div>
          <div class="btnBox">
            <span class="btn btnOK" v-on:click="hideError">{{ alertTexts.errorOK }}</span>
          </div>
        </div>
      </transition>

      <transition name="fadeInDown">
        <div class="alertBox alertWarning" v-show="isShowWarn">
          <h1>{{ alertTexts.warnTit}}</h1>
          <div class="alertTxt">
            <i class="icon">
              <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch -->
                <title>警告 icon</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="1-视觉规范" transform="translate(-74.000000, -5620.000000)" fill="#F7BA2A">
                    <path d="M94,5620 C91.2435754,5620 88.6474462,5620.52083 86.2115385,5621.5625 C83.7756308,5622.60417 81.6522523,5624.03044 79.8413465,5625.84135 C78.0304394,5627.65225 76.6041717,5629.77563 75.5624997,5632.21154 C74.5208281,5634.64745 74,5637.24358 74,5640 C74,5642.75642 74.5208281,5645.35255 75.5624997,5647.78846 C76.6041717,5650.22437 78.0304394,5652.34775 79.8413465,5654.15865 C81.6522523,5655.96956 83.7756308,5657.39583 86.2115385,5658.4375 C88.6474462,5659.47917 91.2435754,5660 94,5660 C96.7564246,5660 99.3525538,5659.47917 101.788462,5658.4375 C104.224369,5657.39583 106.347748,5655.96956 108.158652,5654.15865 C109.969563,5652.34775 111.395828,5650.22437 112.437502,5647.78846 C113.479169,5645.35255 114,5642.75642 114,5640 C114,5637.24358 113.479169,5634.64745 112.437502,5632.21154 C111.395828,5629.77563 109.969563,5627.65225 108.158652,5625.84135 C106.347748,5624.03044 104.224369,5622.60417 101.788462,5621.5625 C99.3525538,5620.52083 96.7564246,5620 94,5620 L94,5620 Z M94,5651.34615 C93.3589723,5651.34615 92.8141046,5651.1218 92.3653846,5650.67308 C91.9166646,5650.22436 91.6923077,5649.67949 91.6923077,5649.03846 C91.6923077,5648.39743 91.9166646,5647.85257 92.3653846,5647.40385 C92.8141046,5646.95513 93.3589723,5646.73077 94,5646.73077 C94.6410277,5646.73077 95.1858954,5646.95513 95.6346154,5647.40385 C96.0833354,5647.85257 96.3076923,5648.39743 96.3076923,5649.03846 C96.3076923,5649.67949 96.0833354,5650.22436 95.6346154,5650.67308 C95.1858954,5651.1218 94.6410277,5651.34615 94,5651.34615 L94,5651.34615 Z M96.3076923,5641.34615 C96.3076923,5641.98718 96.0833354,5642.53205 95.6346154,5642.98077 C95.1858954,5643.42949 94.6410277,5643.65385 94,5643.65385 C93.3589723,5643.65385 92.8141046,5643.42949 92.3653846,5642.98077 C91.9166646,5642.53205 91.6923077,5641.98718 91.6923077,5641.34615 L91.6923077,5630.57692 C91.6923077,5629.9359 91.9166646,5629.39103 92.3653846,5628.94231 C92.8141046,5628.49359 93.3589723,5628.26923 94,5628.26923 C94.6410277,5628.26923 95.1858954,5628.49359 95.6346154,5628.94231 C96.0833354,5629.39103 96.3076923,5629.9359 96.3076923,5630.57692 L96.3076923,5641.34615 Z" id="警告-icon"></path>
                  </g>
                </g>
              </svg>
            </i>
            <h2>{{ alertTexts.warnTxt}} </h2>
            <p>{{ alertTexts.warnDetail}}</p>
          </div>
          <div class="btnBox">
            <span class="btn btnOK" v-on:click="hideWarn(true)">{{ alertTexts.warnOK }}</span>
            <span class="btn btnCancel" v-on:click="hideWarn(false)">{{ alertTexts.warnCancel }}</span>
          </div>
        </div>
      </transition>

    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "alertBox",
  data() {
    return {
      isShowAlertMask: false,
      isShowSuccess: false,
      isShowError: false,
      isShowWarn: false,

      alertTexts: {
        successTit: "申请成功",
        successTxt: "您的申请已提交成功！",
        successDetail: "",
        successOK: "知道了",

        errorTit: "申请失败",
        errorTxt: "提交失败！",
        errorDetail: "",
        errorOK: "知道了",

        warnTit: "删除",
        warnTxt: "此操作将删除该文件，是否继续？",
        warnDetail: "",
        warnOK: "确 定",
        warnCancel: "取 消"
      },

      successCallback: "",
      errorCallback: "",
      warnOkCallback: "",
      warnCancelCallback: ""
    };
  },

  computed: {},
  methods: {
    resetTxts(obj) {
      this.alertTexts = {
        successTit: obj.successTit || "申请成功",
        successTxt: obj.successTxt || "您的申请已提交成功！",
        successDetail: obj.successDetail || "",
        successOK: obj.successOK || "知道了",

        errorTit: obj.errorTit || "申请失败",
        errorTxt: obj.errorTxt || "提交失败！",
        errorDetail: obj.errorDetail || "",
        errorOK: obj.errorOK || "知道了",

        warnTit: obj.warnTit || "删除",
        warnTxt: obj.warnTxt || "此操作将删除该文件，是否继续？",
        warnDetail: obj.successTit || "",
        warnOK: obj.warnOK || "确 定",
        warnCancel: obj.warnCancel || "取 消"
      };
    },
    showSuccess(callback) {
      this.isShowAlertMask = true;
      this.isShowSuccess = true;
      typeof callback === "function" && (this.successCallback = callback);
    },
    showError(str, callback) {
      try {
        this.isShowAlertMask = true;
        this.isShowError = true;
        str && (this.alertTexts.errorDetail = str);
        typeof callback === "function" && (this.errorCallback = callback);
      } catch (error) {
        console.log(error);
      }
    },
    showWarn(okCallback, cancelCallback) {
      this.isShowAlertMask = true;
      this.isShowWarn = true;
      typeof okCallback === "function" && (this.warnOkCallback = okCallback);
      typeof cancelCallback === "function" &&
        (this.warnCancelCallback = cancelCallback);
    },

    hideSuccess() {
      this.isShowAlertMask = false;
      this.isShowSuccess = false;
      typeof this.successCallback === "function" && this.successCallback();
    },

    hideError() {
      this.isShowAlertMask = false;
      this.isShowError = false;
      typeof this.errorCallback === "function" && this.errorCallback();
    },

    hideWarn(flag) {
      this.isShowAlertMask = false;
      this.isShowWarn = false;
      if (flag) {
        typeof this.warnOkCallback === "function" && this.warnOkCallback();
      } else {
        typeof this.warnCancelCallback === "function" &&
          this.warnCancelCallback();
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.alertMask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999;
}

.alertBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  height: 200px;
  background: #ffffff;
  border: 1px solid #d3dce6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  overflow: hidden;
}

.alertBox h1 {
  font-family: "PingFangSC-Regular";
  font-size: 16px;
  color: #1f2d3d;
  letter-spacing: 0;
  line-height: 16px;
  margin: 20px 20px 30px;
}

.close {
  position: absolute;
  right: 17px;
  top: 17px;
  cursor: pointer;
}

.alertTxt {
  position: relative;
  padding: 0 50px 0 74px;
}

.alertTxt h2 {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #475669;
  letter-spacing: 0;
  line-height: 21px;
}

.alertTxt p {
  margin-top: 10px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: #8b9aad;
  letter-spacing: 0;
  line-height: 21px;
}

.icon {
  position: absolute;
  left: 20px;
  top: -10px;
}

.btnBox {
  position: absolute;
  right: 18px;
  bottom: 18px;
}

.btn {
  display: block;
  float: right;
  width: 74px;
  height: 30px;
  margin-left: 10px;
  border-radius: 4px;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 30px;
  cursor: pointer;
}

.btnOK {
  background: #57a9fd;
  color: #ffffff;
}

.btnCancel {
  border: 1px solid #c0ccda;
  background: #ffffff;
  color: #475669;
}
</style>
