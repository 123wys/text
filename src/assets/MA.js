var ma = function() {
  window.MA = {};
  MA._iframe = null;
  MA._url = null;
  MA._token = "__madeasmpage__";
  MA._hadSdkCallback = null;
  MA._saveCallback = function() {};
  MA._updateCallback = function() {};
  MA._deleteCallback = function() {};
  MA._isHadSdk = false;
  MA._waitSdk = null;
  MA.$ = function(id) {
    if (id && id[0] == "#") {
      id = id.substr(1, id.length - 1);
    }
    return document.getElementById(id);
  };
  MA.setPage = function(type) {
    if (type == 2) {
      MA.$("#iframe").setAttribute("class", "iframe mobile");
    }
    if (type == 1) {
      MA.$("#iframe").setAttribute("class", "iframe pad");
    }
    if (type == 0) {
      MA.$("#iframe").setAttribute("class", "iframe");
    }
  };
  MA.log = function() {
    console.log(arguments);
  };
  MA.postMessage = function(actionType, data) {
    MA.log("主页面发送 ", actionType, data);
    var postData = {
      token: "__madeasmpage__",
      action_type: actionType,
      data: data
    };
    var url = MA._url;
    window.frames[0].postMessage(postData, url);
  };
  MA.messageListener = function(e) {
    MA.log("主页面接收到 =>: ", e);
    var data = e.data || {};
    if (data.token != MA._token) {
      return;
    }
    if (data.action_type == "had_load_sdk") {
      MA._isHadSdk = true;
      MA._hadSdkCallback(MA._isHadSdk);
      clearTimeout(MA._waitSdk);
    }
    if (data.action_type == "delete_circle") {
      MA.log("主页面接收,删除信息:", data.data);
      MA._deleteCallback(data.data);
    }
    if (data.action_type == "save_circle") {
      MA.log("主页面接收,保存信息:", data.data);
      ///circle/page_config/add.json
      if (data.data.id) {
        MA._updateCallback(data.data);
      } else {
        MA._saveCallback(data.data);
      }
    }
    if (data.action_type == "fetch_graph_data") {
      MA.log("主页面接收,获取发送数据信息:", data.data);
      //调接口获取图表数据去显示.
      MA._fetchGraphCallback(function(tdata) {
        MA.postMessage("show_graph_data", tdata);
      }, data.data);
    }
  };
  MA.initMadeAsmPage = function(
    iframe,
    url,
    hadSdkCallback,
    params,
    saveCallback,
    updateCallback,
    deleteCallback,
    fetchGraphCallback
  ) {
    MA.log(iframe, url, params);
    MA._iframe = iframe;
    MA._url = url;
    MA._saveCallback = saveCallback;
    MA._updateCallback = updateCallback;
    MA._deleteCallback = deleteCallback;
    MA._hadSdkCallback = hadSdkCallback;
    MA._fetchGraphCallback = fetchGraphCallback;
    MA._isHadSdk = false;
    MA._waitSdk = null;
    iframe.onload = iframe.onreadystatechange = function() {
      var baseurl = "";
      baseurl = window.location.href.split("//")[1].split("/")[0];
      if (baseurl == "localhost:70000") {
        baseurl = "10.139.54.105:34360";
      }
      MA.postMessage("check_load_sdk", {
        _circle_template_url:
          "//" + baseurl + "/open/circle/page_config/query_template.json", //配置界面 模板页面. TEST OK!
        //_circle_template_url: 'http://127.0.0.1/madeasm/xflow/api/temp_html.php',//配置界面 模板页面.
        _remote_circle_data_url:
          "//" + baseurl + "/open/circle/page_config/query_elements.json", //已配置内容
        _params: params
      });
      //5s后若无接受到信息.则显示为无sdk.
      MA._waitSdk = setTimeout(function() {
        hadSdkCallback(MA._isHadSdk);
      }, 5000);
    };
    MA.$("#iframe").setAttribute("src", url);
    //接收消息初始化
    window.removeEventListener("message", MA.messageListener);
    window.addEventListener("message", MA.messageListener, false);
  };
  MA.reload = function() {
    MA.postMessage("reload_existed_circle", {});
  };
};

export default ma;
