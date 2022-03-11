// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn/'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com/'
}];
var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};
var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $('\n          <li>\n            <div class="site">\n              <div class="logo">' + node.logo + '</div>\n              <div class="link">' + simplifyUrl(node.url) + '</div>\n              <div class="close">\n                <svg class="icon">\n                  <use xlink:href="#icon-close"></use>\n                </svg>\n              </div>\n            </div>\n        </li>\n  ').insertBefore($lastLi);
    $li.on('click', function () {
      return open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$('.addButton').on('click', function () {
  var url = window.prompt('请输入你想添加网站的网址');
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: 'text',
    url: url
  });
  render();
});
window.onbeforeunload = function () {
  console.log('页面关闭');
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

var timeOutEvent = 0; //定时器
//开始按
function gTouchStart() {
  timeOutEvent = setTimeout('longPress()', 500); //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
  return false;
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
function gTouchEnd() {
  clearTimeout(timeOutEvent); //清除定时器
  if (timeOutEvent != 0) {
    //这里写要执行的内容（尤如onclick事件）
    alert('你这是点击，不是长按');
  }
  return false;
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
function gTouchMove() {
  clearTimeout(timeOutEvent); //清除定时器
  timeOutEvent = 0;
}

//真正长按后应该执行的内容
function longPress() {
  timeOutEvent = 0;
  //执行长按要执行的内容，如弹出菜单
  alert('长按事件触发发');
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e5844f41.map