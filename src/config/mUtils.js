/**
 * 存储时间格式化
 */
export const formatExpired = function (time) {
  const now = new Date().getTime();
  let date = new Date(now);
  let endTime = null;
  if (+time) {
    return endTime = now + time;
  } else {
    let duration = 0;
    duration = +time.slice(0, -1);
    switch (time.slice(-1)) {
      case 's':
        endTime = now + duration * 1000
        break;
      case 'm':
        endTime = now + duration * 1000 * 60
        break;
      case 'h':
        endTime = now + duration * 1000 * 60 * 60
        break;
      case 'd': //天
        endTime = now + duration * 1000 * 60 * 60 * 24
        break;
      case 'w': //周
        endTime = now + duration * 1000 * 60 * 60 * 24 * 7
        break;
      case 'o': //月
        endTime = date.setMonth(date.getMonth() + duration)
        break;
      case 'y': //年
        endTime = date.setFullYear(date.getFullYear() + duration)
    }
  }

  return endTime
}

/**
 * 本地存储
 */
export const localStore = {
  setStore(name, content) { //存储localStorage
    if (!name) return;
    if (typeof content == 'object' && content.expired) {
      content.expired = formatExpired(content.expired);
    }

    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  getStore(name) { //获取localStorage
    if (!name) return;
    let content = window.localStorage.getItem(name);

    try {
      content = JSON.parse(content);
      if (content.expired && new Date() > new Date(content.expired)) {
        this.removeStore(name);
        content = null;
      }
    } catch (error) {

    }
    return content;
  },

  removeStore(name) { //删除localStorage
    if (!name) return;
    window.localStorage.removeItem(name);
  },
}

/**
 * sessionStorage
 */

export const sessionStore = {
  setStore(name, content) { //存储sessionStorage
    if (!name) return;
    if (typeof content == 'object' && content.expired) {
      content.expired = formatExpired(content.expired);
    }

    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },

  getStore(name) { //获取sessionStorage
    if (!name) return;
    let content = window.sessionStorage.getItem(name);

    try {
      content = JSON.parse(content);
      if (content.expired && new Date() > new Date(content.expired)) {
        this.removeStore(name);
        content = null;
      }
    } catch (error) {

    }
    return content;
  },

  removeStore(name) { //删除sessionStorage
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },

  clearStore() { //清空sessionStorage
    window.sessionStorage.clear();;
  },
}


/**
 * cookie读取写入
 */
export const Cookie = {
  setCookie(name, value, time = '30d') {
    let exp = new Date(formatExpired(time));
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  delCookie(name, path) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null && path) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ';path=' + path;
    } else {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
}


/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}


/**
 * 图片随鼠标晃动动画效果
 */
export const ShakeWithMouse = function () {
  this.initial.apply(this, arguments);
}

ShakeWithMouse.prototype = {
  initial: function (wrapper, shakeArr) {
    let _this = this;
    this.wrapper = {}; //鼠标移动生效的范围容器
    this.shakeArr = []; //随鼠标晃动的子元素及晃动参数

    if (!wrapper || !shakeArr) {
      console.log('option is needed!');
      return
    }
    if (Object.prototype.toString.call(shakeArr) != "[object Array]") {
      console.log('the second option must be array!');
      return
    }
    this.wrapper = typeof wrapper === 'string' ? $(wrapper) : wrapper;
    shakeArr.forEach(function (ele, idx) {
      if (!ele.name) {
        console.log('name is needed!');
        return
      }

      _this.shakeArr[idx] = {
        shaker: _this.wrapper.find(ele.name) || '',
        rangeX: ele.rangeX || 0,
        rangeY: ele.rangeY || 0,
        originX: typeof ele.originX === 'undefined' ? null : ele.originX,
        originY: typeof ele.originY === 'undefined' ? null : ele.originY,
        percentX: 0,
        percentY: 0
      };

      if (_this.shakeArr[idx].originX == null) {
        _this.shakeArr[idx].originX = parseInt(_this.shakeArr[idx].shaker.css('left'));
      }
      if (_this.shakeArr[idx].originY == null) {
        _this.shakeArr[idx].originY = parseInt(_this.shakeArr[idx].shaker.css('top'));
      }
      _this.shakeArr[idx].percentX = parseInt(_this.shakeArr[idx].shaker.css('left')) / _this.wrapper.width() * 100;
      _this.shakeArr[idx].percentY = parseInt(_this.shakeArr[idx].shaker.css('top')) / _this.wrapper.height() * 100;
    });

    this.addmousemove();
    this.addmouseleave();
  },

  addmousemove: function () {
    let _this = this;
    this.wrapper.mousemove(function (e) {
      _this.shakeArr.forEach(function (ele) {
        if (ele.rangeX) {
          let moveX = (e.pageX - _this.wrapper.offset().left - _this.wrapper.width() / 2) / (_this.wrapper.width() / 2);
          moveX = ele.percentX + ele.rangeX * moveX;
          ele.shaker.css({
            left: moveX + '%'
          })
        }

        if (ele.rangeY) {
          let moveY = (e.pageY - _this.wrapper.offset().top - _this.wrapper.height() / 2) / (_this.wrapper.height() / 2);
          moveY = ele.percentY + ele.rangeY * moveY;
          ele.shaker.css({
            top: moveY + '%'
          })
        }
      });
    });
  },

  addmouseleave: function () {
    let _this = this;
    this.wrapper.mouseleave(function (e) {
      _this.shakeArr.forEach(function (ele) {
        if (ele.rangeX) {
          ele.shaker.animate({
            left: ele.originX
          }, 'slow', 'swing');
        }
        if (ele.rangeY) {
          ele.shaker.animate({
            top: ele.originY
          }, 'slow', 'swing');
        }
      });
    })

  }
};


/**
 * 图片左右滑动动画效果
 */
export const SlideBox = function () {
  this.initial.apply(this, arguments)
}

SlideBox.prototype = {
  initial: function (wrapper, imgWidth) {
    if (!wrapper) {
      console.log('option is needed!');
      return
    }

    this.wrapper = typeof wrapper === 'string' ? $(wrapper) : wrapper;
    this.imgBox = this.wrapper.find('.imgBox');
    this.screenWidth = '';
    this.imgs = this.imgBox.find('img');

    this.imgWidth = this.imgs.eq(0).width();

    this.imgAllWidth = this.imgWidth * this.imgs.length;
    this.leftBtn = this.wrapper.find('.leftBtn');
    this.rightBtn = this.wrapper.find('.rightBtn');

    this.screenWidth = this.wrapper.find('.screen').width();


    this.imgBox.css('transition', 'all 0.5s ease');

    this.buttonClick();
    // this.mouseDrag();
  },

  buttonClick: function () {
    let _this = this;
    this.leftBtn.click(function () {
      let nowLeft = parseInt(_this.imgBox.css('left'));
      if (nowLeft < 0) {
        if (nowLeft + _this.imgWidth > 0) {
          _this.imgBox.css('left', 0)
        } else {
          _this.imgBox.css('left', nowLeft + _this.imgWidth)
        }
      }
    });

    this.rightBtn.click(function () {
      let nowLeft = parseInt(_this.imgBox.css('left'));
      if (_this.imgAllWidth > _this.screenWidth) {
        if (_this.imgAllWidth + nowLeft - _this.imgWidth < _this.screenWidth) {
          _this.imgBox.css('left', _this.screenWidth - _this.imgAllWidth)
        } else {
          _this.imgBox.css('left', nowLeft - _this.imgWidth)
        }
      }
    })
  },

  mouseDrag: function () {

  }
};


/**
 * 遍历函数
 */
export const each = function (arr, callback, thisp = null) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const stop = callback.call(thisp, arr[i], i, arr);
    if (stop == false) break;
  }
  return stop
}


/**
 * 下载表格
 */
export const Download = function (url) {
  let a = $(`<a href='${url}' target='_blank'>download</a>`).get(0);
  let e = document.createEvent('MouseEvents');
  e.initEvent('click', true, true);
  a.dispatchEvent(e);
}


/**
 * 千分位 格式化
 */
export const toThousands = function (num) {
  var num = (num || 0).toString(),
    result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}


/**
 * 格式化时间
 */
export const formatDate = function (date = new Date(), type) {
  if (!(date instanceof Date)) return;
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let i = date.getMinutes();
  let s = date.getSeconds();
  if (m < 10) m = "0" + m;
  if (d < 10) d = "0" + d;
  if (h < 10) h = "0" + h;
  if (i < 10) i = "0" + i;
  if (s < 10) s = "0" + s;

  switch (type) {
    case 1:
      return '' + y + m + d + h + i + s;
      break;

    case 2:
      return `${y}-${m}-${d} ${h}:${i}:${s}`;
      break;

    case 3:
      return `${y}-${m}-${d}`;
      break;

    default:
      return '' + y + m + d;
      break;
  }
}

/**
 * ajax
 */
export const G = {
  ajax: function (ob, cachekey, errorFun, errorSkip) {
    //ob.url =  ob.url;
    ob.url = '' + ob.url;
    if (cachekey && store.get(cachekey)) {
      ob.success(store.get(cachekey));
      return;
    }
    if (typeof ob.error != 'function') {
      ob.error = function () {
        // alert('系统错误');
      };
    }
    var tsuccessFn = ob.success;
    var tfailureFn = ob.failure
    ob.success = function (data) {
      if (typeof data == "string") {
        data = JSON.parse(data);
      }
      if (data.code == -1) {
        window.location.reload();
        return;
      }
      if (errorSkip == true) {
        return;
      }
      if (!data.success) {
        if (tfailureFn != undefined) tfailureFn(data);
        // alert(data.message);
        return;
      }
      tsuccessFn(data, data);
      if (cachekey && typeof cachekey === 'string') {
        store.set(cachekey, data);
      }
    };
    ob.type = 'POST';
    $.ajax(ob);
  },
  parseDate: function (longtime, f) {
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
  },
  dayInWeek: function (ymd) {
    var date = new Date(ymd);
    var s = "日一二三四五六";
    return s.charAt(date.getDay());
  },
  fixSelectDate: function (lll) {
    if (!lll) {
      return
    }
    var start_time = lll.split("/");
    var start_date = start_time[2] + start_time[0] + start_time[1];
    return start_date;
  },
  fixDate: function (str) {
    var arr = str.split(' ');
    var arr1 = arr[0].split('-');
    if (arr.length == 2) {
      var arr2 = arr[1].split(':');
    } else {
      arr2 = [0, 0, 0];
    }
    return new Date(arr1[0] * 1, arr1[1] * 1 - 1, arr1[2] * 1, arr2[0], arr2[1], arr2[2]);
  },
  fixNum: function (long, f) {
    var f_x = parseFloat(long);
    if (isNaN(f_x)) {
      return '0.00';
    }
    var f_x = Math.round(f_x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + f) {
      s_x += '0';
    }
    return s_x;
  },
  showLoadingMask: function (wrapper) {
    if (typeof wrapper === 'string') {
      this.hideLoadingMask(wrapper);
      wrapper = $(wrapper)
    } else {
      console.log('error:参数错误,请传入"#wrapper" 或 ".wrapper"');
      return
    }
    var html = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
    var css = '<style type="text/css">.loadingMask{position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.37);}.spinner{position: absolute; width: 300px;height: 120px;margin: auto;top: 0;left: 0;bottom: 0;right: 0;text-align:center;font-size:10px}.spinner>div{margin-left:5px;background-color:#67CF22;height:100%;width:10px;display:inline-block;-webkit-animation:stretchdelay 1.2s infinite ease-in-out;animation:stretchdelay 1.2s infinite ease-in-out}.spinner .rect2{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner .rect3{-webkit-animation-delay:-1.0s;animation-delay:-1.0s}.spinner .rect4{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.spinner .rect5{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}@-webkit-keyframes stretchdelay{0%,40%,100%{-webkit-transform:scaleY(0.4)}20%{-webkit-transform:scaleY(1.0)}}@keyframes stretchdelay{0%,40%,100%{transform:scaleY(0.4);-webkit-transform:scaleY(0.4)}20%{transform:scaleY(1.0);-webkit-transform:scaleY(1.0)}}</style>';
    wrapper.append($('<div class="loadingMask">' + html + css + '</div>'));
  },
  hideLoadingMask: function (wrapper) {
    if ($(wrapper).find('.loadingMask').length) {
      $(wrapper).find('.loadingMask').remove();
    }
  },
  log: function (s) {
    console.log(s);
  }
};



