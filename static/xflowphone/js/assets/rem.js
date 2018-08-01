(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      var fontSize = 50 * (clientWidth / 375);

      //如果是pc访问
      if (!/windows phone|iphone|android/ig.test(window.navigator.userAgent)) {
        fontSize = 20;
      }
      docEl.style.fontSize = fontSize + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
