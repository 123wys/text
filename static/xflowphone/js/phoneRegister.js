$(function () {
  FastClick.attach(document.body);

  $('.toForm').click(function(){
    window.location.href = "#contactUsForm"
  })
  new SwitchBox('#switchBox'); //switch 切换动画效果
  new SlideBox('#slideBox'); //slide 切换动画效果
});
console.log(window.location.href);

var submit = function () { //提交按钮点击
  console.log(window.location.href);
  var query = GetRequest(window.location.href)
  var options = {};
  options['name'] = $.trim($('#name').val());
  options['phone'] = $.trim($('#phone').val());
  options['email'] = $.trim($('#email').val());
  options['company'] = $.trim($('#company').val());
  options['remark'] = $.trim($('#remark').val());
  options['channelId'] = query.channelId || '';
  options['channelCode'] = query.channelCode || '';

  console.log(options, query);
  if (!options.name) {
    alert('请填写姓名！')
    return
  }
  if (!checkPhone(options.phone)) {
    alert('请填写正确的手机号！')
    return
  }
  if (!checkEmail(options.email)) {
    alert('请填写正确的邮箱名！')
    return
  }

  var formData = [];
  for (var p in options) { //序列化
    formData.push(encodeURIComponent(p) + "=" + encodeURIComponent(options[p]));
  }
  formData = formData.join("&");

  $.ajax({
    type: 'POST',
    url: '/open/contact_us/Add.json',
    // post payload:
    data: formData,
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    success: function (data) {
      if (data.success) {
        alert('提交成功！')
      } else {
        alert(data.message || '提交失败')
      }
    },
    error: function (xhr, type) {
      alert('Ajax error!')
    }
  })
}

function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串   
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

var checkPhone = function (phoneNum) {
  return /^1[34578]\d{9}$/.test(phoneNum);
};
var checkEmail = function (email) {
  return /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email);
}



/**
 * switch切换动画
 */
var SwitchBox = function () {
  this.initial.apply(this, arguments)
}

SwitchBox.prototype = {
  initial: function (wrapper) {
    if (!wrapper) {
      console.log('wrapper id is needed!');
      return
    }
    this.wrapper = typeof wrapper === 'string' ? $(wrapper) : wrapper;
    this.switchTit = this.wrapper.find('.switchTit');
    this.switchScreen = this.wrapper.find('.screen');
    this.screenWidth = this.switchScreen.width();
    this.switchScreen.css('transition', 'all 0.5s ease');
    this.switchClick();
    this.switchSwipe();
  },
  switchClick: function () {
    var _this = this;
    this.switchTit.find('li').on('click', function () {
      _this.switchTit.find('.active').removeClass('active');
      $(this).addClass('active')
      var leftTo = -1 * $(this).index() * _this.screenWidth;
      _this.switchScreen.css('left', leftTo)
    })
  },
  switchSwipe: function () {
    this.wrapper.swipe = function () {
      alert(11)
    }
  },

}

/**
 * 图片左右滑动动画效果
 */
var SlideBox = function () {
  this.initial.apply(this, arguments)
}

SlideBox.prototype = {
  initial: function (wrapper) {
    if (!wrapper) {
      console.log('wrapper id is needed!');
      return
    }

    this.wrapper = typeof wrapper === 'string' ? $(wrapper) : wrapper;
    this.imgBox = this.wrapper.find('.imgBox');
    this.screenWidth = this.wrapper.find('.screen').width();
    this.items = this.imgBox.find('li');
    this.itemWidth = this.items.eq(0).width();
    this.itemAllWidth = this.itemWidth * this.items.length;
    this.leftBtn = this.wrapper.find('.leftBtn');
    this.rightBtn = this.wrapper.find('.rightBtn');
    this.imgBox.css('transition', 'all 0.5s ease');

    this.buttonClick();
    // this.mouseDrag();
  },

  buttonClick: function () {
    var _this = this;
    this.leftBtn.click(function () {
      var nowLeft = parseInt(_this.imgBox.css('left'));
      if (nowLeft < 0) {
        if (nowLeft + _this.itemWidth > 0) {
          _this.imgBox.css('left', 0)
        } else {
          _this.imgBox.css('left', nowLeft + _this.itemWidth)
        }
      }
    });

    this.rightBtn.click(function () {
      var nowLeft = parseInt(_this.imgBox.css('left'));
      if (_this.itemAllWidth > _this.screenWidth) {
        if (_this.itemAllWidth + nowLeft - _this.itemWidth < _this.screenWidth) {
          _this.imgBox.css('left', _this.screenWidth - _this.itemAllWidth)
        } else {
          _this.imgBox.css('left', nowLeft - _this.itemWidth)
        }
      }
    })
  },

  mouseDrag: function () {

  }
};
