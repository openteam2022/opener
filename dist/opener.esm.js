/* opener v1.0.0 */
function _assertClassBrand(e, t, n) {
  if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function _checkPrivateRedeclaration(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _classPrivateFieldGet2(s, a) {
  return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldInitSpec(e, t, a) {
  _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _classPrivateMethodInitSpec(e, a) {
  _checkPrivateRedeclaration(e, a), a.add(e);
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

/**
 * opener
 * 一个js轻量级弹出框插件
*/

// dom快捷操作 
var dom = {
  // 获取dom对象
  get: function get(selector) {
    return document.querySelector(selector);
  },
  // 获取dom对象
  getAll: function getAll(selector) {
    return document.querySelectorAll(selector);
  },
  // 获取dom对象
  child: function child(elem, selector) {
    return elem.querySelector(selector);
  },
  // 获取dom对象
  childs: function childs(elem, selector) {
    return elem.querySelectorAll(selector);
  },
  addChild: function addChild(elem, child) {
    elem.insertAdjacentHTML('beforeend', child);
  },
  /**
   * 删除子元素
   * @param elem: HTMLElemnt 当前dom对象
   * @param child: HTMLElemnt 删除的子元素dom
  */
  removeChild: function removeChild(elem, child) {
    elem.removeChild(child);
  },
  /**
   * 设置或获取元素属性值
   * @param elem: HTMLElement 元素对象
   * @param attr: String 属性名
   * @param val: String 属性值
   * @return String 返回获取的属性值
  */
  attr: function attr(elem, _attr, val) {
    // 如果值存在，则设置值
    if (val && typeof val === 'string') {
      // 设置元素属性值
      elem.setAttribute(_attr, val);
      return false;
    }

    // 返回获取的属性值
    return elem.getAttribute(_attr);
  },
  /**
   * 添加class名
   * @param elem: HTMLElement 元素对象
  */
  addClass: function addClass(elem, className) {
    elem.classList.add(className);
  },
  /**
   * 移除class名
   * @param elem: HTMLElement 元素对象
  */
  removeClass: function removeClass(elem, className) {
    elem.classList.remove(className);
  },
  /**
   * 查找元素是否包含指定类名
   * @param elem: HTMLElement 当前元素
   * @param className: String 查找的class名
   * @return boolean 返回查找结果
  */
  existClass: function existClass(elem, className) {
    return elem.classList.contains(className);
  }
};

// utils快捷工具方法
var utils = {
  /**
   * 合并2个对象，返回新的对象值
   * @param obj:object 对象
   * @param newObj:object 对象
   * @return obj:object 返回合并后的新对象
  */
  merge: function merge() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var newObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // 如果参数类型不对,返回对象
    if (!utils.isObj(obj) || !utils.isObj(newObj)) return {};

    // 如果obj存在，newObj不存在，返回obj
    if (utils.isObj(obj) && !utils.isObj(newObj)) return obj;

    // 合并数组
    function mergeArray(arr, newArr) {
      var arrData = [];
      arr.forEach(function (item, index) {
        if (newArr[i]) {
          arrData.push(newArr[i]);
        } else {
          arrData.push(item);
        }
      });
      return arrData;
    }

    // 合并对象
    function mergeObject(obj, newObj) {
      // 遍历源对象
      for (var key in obj) {
        // 判断目标对象是否有当前key值
        if (newObj.hasOwnProperty(key)) {
          // 合并对象值
          if (utils.isObj(obj[key])) {
            obj[key] = mergeObject(obj[key], newObj[key]);

            // 合并数组值
          } else if (utils.isArr(obj[key])) {
            obj[key] = mergeArray(obj[key], newObj[key]);

            // 合并文本值
          } else {
            obj[key] = newObj[key];
          }
        }
      }
      // 返回值
      return obj;
    }
    return mergeObject(obj, newObj);
  },
  /**
   * 根据时间生成随机id
   * @return string 返回生成的随机id
  */
  randomId: function randomId() {
    var id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return id;
  },
  /**
   * 验证类型是否是对象类型object
  */
  isObj: function isObj(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  },
  // 验证是否是array类型
  isArr: function isArr(val) {
    return Array.isArray(val);
  }
};

// 消息组件
var _message_brand = /*#__PURE__*/new WeakSet();
var _message2 = /*#__PURE__*/function () {
  // 构造方法
  function message(_options) {
    _classCallCheck(this, message);
    // 初始化数据
    _classPrivateMethodInitSpec(this, _message_brand);
    // 配置参数
    this.config = {
      elem: '',
      // 组件元素
      moduleId: '',
      // 组件id
      moduleElem: '',
      // 组件dom对象
      types: ['default', 'success', 'warn', 'danger'],
      // 类型
      type: 'default',
      // 默认类型
      message: '这是一条消息',
      // 默认消息内容
      duration: 1500 // 默认持续显示1.5秒
    };

    // 初始化数据
    _assertClassBrand(_message_brand, this, _init).call(this, _options);

    // 渲染组件模版到页面
    _assertClassBrand(_message_brand, this, _render).call(this);

    // 隐藏元素
    _assertClassBrand(_message_brand, this, _hide).call(this);
  }
  return _createClass(message, null, [{
    key: "create",
    value:
    // 创建实例
    function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 生成组件id
      var templateId = utils.randomId();

      /**
      * 合并参数
      * @attr data.custom: object 自定义数据
      * @attr data.system: object 系统数据
      */
      var data = {
        custom: options,
        system: {
          moduleId: templateId
        }
      };

      // 创建实例
      new message(data);
    }
  }]);
}(); // 模态框组件
function _init(options) {
  var that = this;

  // 用户可自定义的参数
  var defaults = {
    type: 'default',
    message: '',
    duration: 1500
  };

  /** 
   * 解构参数
   * custom:object 自定义参数
   * system:object 系统参数
  */
  var custom = options.custom,
    system = options.system;

  // 合并参数
  defaults = utils.merge(defaults, custom);

  // 合并参数到实例配置参数
  that.config = utils.merge(that.config, _objectSpread2(_objectSpread2({}, defaults), system));

  // 组件添加到body，获取body对象
  that.config.elem = dom.get('body');

  // 检测type类型是否正确，否则显示默认类型
  if (custom.type && !that.config.types.includes(custom.type)) {
    that.config.type = "default";
  }
}
// 渲染组件到页面
function _render() {
  var that = this;

  // 添加dom元素到页面 
  dom.addChild(that.config.elem, _assertClassBrand(_message_brand, that, _createElem).call(that, that.config));

  // 获取组件dom对象
  that.config.moduleElem = dom.get("[openui-id=".concat(that.config.moduleId, "]"));
}
// 创建dom元素
function _createElem(options) {
  var elem = "<div class=\"open-message\" openui-id=\"".concat(options.moduleId, "\">\n\t\t\t<div class=\"open-message-wrapper open-message-").concat(options.type, "\">\n\t\t\t\t<p class=\"open-message-title\">").concat(options.message, "</p>\n\t\t\t</div>\n\t\t</div>");

  // const elem = `<div class="open-message" openui-id="${options.moduleId}">
  // 	<div class="open-message-wrapper open-message-${options.type}">
  // 		<p class="open-message-icon"></p>
  // 		<p class="open-message-title">${options.message}</p>
  // 	</div>
  // </div>`;
  return elem;
}
// 清除元素
function _hide() {
  var that = this;
  var templateDom = dom.get("[openui-id=".concat(that.config.moduleId, "]"));
  if (templateDom) {
    setTimeout(function () {
      var templateWrapper = dom.child(templateDom, '.open-message-wrapper');
      dom.addClass(templateWrapper, 'open-message-hide');
      setTimeout(function () {
        that.config.moduleElem.remove();
      }, 300);
    }, that.config.duration);
  }
}
var _modal_brand = /*#__PURE__*/new WeakSet();
var _hide2 = /*#__PURE__*/new WeakMap();
var _modal2 = /*#__PURE__*/function () {
  // 构造方法
  function modal(_options2) {
    _classCallCheck(this, modal);
    // 初始化数据
    _classPrivateMethodInitSpec(this, _modal_brand);
    // 关闭元素
    _classPrivateFieldInitSpec(this, _hide2, function () {
      var that = this;
      var modalMain = dom.child(that.config.moduleElem, '.open-modal-main');
      dom.removeClass(modalMain, 'open-modal-main-show');
      var templateDom = that.config.moduleElem;
      setTimeout(function () {
        dom.addClass(templateDom, 'open-modal-hide');
        setTimeout(function () {
          that.config.moduleElem.remove();
        }, 300);
      }, 100);
    });
    // 配置参数
    this.config = {
      elem: '',
      // 组件元素
      moduleId: '',
      // 组件id
      moduleElem: '',
      // 组件dom对象
      title: '标题',
      message: '内容',
      // 默认消息内容
      cover: true,
      lang: {
        cancel: '取消',
        ok: '确定'
      },
      show: {
        ok: true,
        cancel: true
      },
      click: '' // 回调
    };

    // 初始化数据
    _assertClassBrand(_modal_brand, this, _init2).call(this, _options2);

    // 渲染组件模版到页面
    _assertClassBrand(_modal_brand, this, _render2).call(this);

    // 添加事件监听
    _assertClassBrand(_modal_brand, this, _onClick).call(this);
  }
  return _createClass(modal, null, [{
    key: "create",
    value:
    // 创建实例
    function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 生成组件id
      var templateId = utils.randomId();

      /**
      * 合并参数
      * @attr data.custom: object 自定义数据
      * @attr data.system: object 系统数据
      */
      var data = {
        custom: options,
        system: {
          moduleId: templateId
        }
      };

      // 创建实例
      new modal(data);
    }
  }]);
}(); // 自定义内容组件
function _init2(options) {
  var that = this;

  // 用户可自定义的参数
  var defaults = {
    title: '',
    message: '',
    cover: true,
    lang: {
      cancel: '取消',
      //返回按钮文本
      ok: '确定' // 确认按钮文本
    },
    show: {
      ok: true,
      // 确认按钮
      cancel: true // 确认按钮文本
    },
    click: ''
  };

  /** 
   * 解构参数
   * custom:object 自定义参数
   * system:object 系统参数
  */
  var custom = options.custom,
    system = options.system;

  // 合并参数
  defaults = utils.merge(defaults, custom);

  // 合并参数到实例配置参数
  that.config = utils.merge(that.config, _objectSpread2(_objectSpread2({}, defaults), system));

  // 组件添加到body，获取body对象
  that.config.elem = dom.get('body');
}
// 渲染组件到页面
function _render2() {
  var that = this;

  // 添加dom元素到页面 
  dom.addChild(that.config.elem, _assertClassBrand(_modal_brand, that, _createElem2).call(that));

  // 获取组件dom对象
  that.config.moduleElem = dom.get("[openui-id=".concat(that.config.moduleId, "]"));
  setTimeout(function () {
    var modalMain = dom.child(that.config.moduleElem, '.open-modal-main');
    dom.addClass(modalMain, 'open-modal-main-show');
  }, 100);
}
// 监听点击事件
function _onClick() {
  var that = this;

  // 关闭事件
  _assertClassBrand(_modal_brand, that, _createEvent).call(that, '.open-modal .open-modal-close', 'close');

  // 返回事件
  _assertClassBrand(_modal_brand, that, _createEvent).call(that, '.open-modal .open-modal-cancel', 'cancel');

  // 确认事件
  _assertClassBrand(_modal_brand, that, _createEvent).call(that, '.open-modal .open-modal-ok', 'ok');
}
// 创建事件
function _createEvent(selector, type) {
  var that = this;

  // 获取点击事件元素
  var button = dom.child(that.config.moduleElem, selector);
  if (button) {
    button.onclick = function () {
      var res = true;
      if (that.config.click) {
        res = that.config.click(type);
      }
      if (res !== false) _classPrivateFieldGet2(_hide2, that).call(that);
    };
  }
}
// 创建dom元素
function _createElem2() {
  var that = this;
  var config = that.config;

  // 创建返回按钮
  var cancel = config.show.cancel ? _assertClassBrand(_modal_brand, that, _createCancelButton).call(that, config) : '';

  // 创建确定按钮
  var ok = config.show.ok ? _assertClassBrand(_modal_brand, that, _createOkButton).call(that, config) : '';

  // 创建遮罩
  var cover = config.cover ? 'open-modal-cover' : '';
  var elem = "<div class=\"open-modal ".concat(cover, "\" openui-id=\"").concat(config.moduleId, "\">\n\t\t\t<div class=\"open-modal-wrapper\">\n\t\t\t\t<div class=\"open-modal-main\">\n\t\t\t\t\t<div class=\"open-modal-header\">\n\t\t\t\t\t\t<p>").concat(config.title, "</p><span class=\"open-modal-close\"></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class=\"open-modal-content\">").concat(config.message, "</p>\n\t\t\t\t\t<div class=\"open-modal-footer\">\n\t\t\t\t\t\t").concat(cancel + ok, "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>");
  return elem;
}
// 创建确认按钮
function _createOkButton(options) {
  return _assertClassBrand(_modal_brand, this, _createButton).call(this, "open-btn-primary open-modal-ok", options.lang.ok, 'bg');
}
// 创建取消按钮
function _createCancelButton(options) {
  return _assertClassBrand(_modal_brand, this, _createButton).call(this, "open-modal-cancel", options.lang.cancel);
}
// 创建按钮
function _createButton(className, text) {
  var bg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return "<button class=\"open-btn ".concat(className, "\" ").concat(bg, ">").concat(text, "</button>");
}
var _dialog_brand = /*#__PURE__*/new WeakSet();
var _dialog2 = /*#__PURE__*/function () {
  // 构造方法
  function dialog(_options3) {
    _classCallCheck(this, dialog);
    // 初始化数据
    _classPrivateMethodInitSpec(this, _dialog_brand);
    // 配置参数
    this.config = {
      id: '',
      elem: '',
      // 组件元素
      moduleId: '',
      // 组件id
      moduleElem: '',
      // 组件dom对象
      title: '标题',
      content: '内容',
      // 默认消息内容
      cover: true,
      width: '800px',
      height: '500px',
      lang: {
        cancel: '取消',
        ok: '确定'
      },
      show: {
        ok: true,
        cancel: true,
        title: true
      },
      click: '' // 回调
    };

    // 初始化数据
    _assertClassBrand(_dialog_brand, this, _init3).call(this, _options3);

    // 渲染组件模版到页面
    _assertClassBrand(_dialog_brand, this, _render3).call(this);

    // 添加事件监听
    _assertClassBrand(_dialog_brand, this, _onClick2).call(this);
  }
  return _createClass(dialog, [{
    key: "show",
    value:
    // 显示
    function show() {
      var that = this;

      // 延迟显示
      setTimeout(function () {
        dom.addClass(that.config.elem, 'open-dialog-show');
        dom.removeClass(that.config.elem, 'open-dialog-hide');

        // dialog主题动画过渡效果
        dom.addClass(that.config.moduleElem, 'open-dialog-main-show');
      }, 100);
    }

    // 关闭元素
  }, {
    key: "hide",
    value: function hide() {
      var that = this;
      dom.addClass(that.config.elem, 'open-dialog-hide');
      dom.removeClass(that.config.elem, 'open-dialog-show');

      // dialog主题动画过渡效果
      dom.removeClass(that.config.moduleElem, 'open-dialog-main-show');

      // 如果内容区域全屏设置，则恢复小窗口
      var mainElem = dom.child(that.config.elem, '.open-dialog-main');
      if (dom.existClass(mainElem, 'open-dialog-main-full')) {
        dom.removeClass(mainElem, 'open-dialog-main-full');
      }
    }

    // 创建dom元素
  }], [{
    key: "create",
    value:
    // 创建实例
    function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 如果id不存在，则停止运行
      if (!options.id || !dom.get(options.id)) return false;

      // 生成组件id
      var templateId = utils.randomId();

      /**
      * 合并参数
      * @attr data.custom: object 自定义数据
      * @attr data.system: object 系统数据
      */
      var data = {
        custom: options,
        system: {
          moduleId: templateId
        }
      };

      // 创建实例
      return new dialog(data);
    }
  }]);
}(); // 自定义抽屉组件
function _init3(options) {
  var that = this;

  // 用户可自定义的参数
  var defaults = {
    id: '',
    title: '',
    content: '',
    cover: true,
    width: '800px',
    height: '500px',
    lang: {
      cancel: '取消',
      //返回按钮文本
      ok: '确定' // 确认按钮文本
    },
    show: {
      ok: true,
      // 确认按钮
      cancel: true,
      // 确认按钮文本
      title: true
    },
    click: ''
  };

  /** 
   * 解构参数
   * custom:object 自定义参数
   * system:object 系统参数
  */
  var custom = options.custom,
    system = options.system;

  // 合并参数
  defaults = utils.merge(defaults, custom);

  // 合并参数到实例配置参数
  that.config = utils.merge(that.config, _objectSpread2(_objectSpread2({}, defaults), system));

  // 获取容器对象
  that.config.elem = dom.get(that.config.id);

  // 添加组件id
  dom.attr(that.config.elem, 'openui-id', that.config.moduleId);

  // 获取自定义内容
  that.config.content = that.config.elem.innerHTML;

  // 清空容器内容
  that.config.elem.innerHTML = '';
}
// 渲染组件到页面
function _render3() {
  // 添加dom元素到页面 
  dom.addChild(this.config.elem, _assertClassBrand(_dialog_brand, this, _createElem3).call(this));

  // 获取组件显示元素dom
  this.config.moduleElem = dom.child(this.config.elem, '.open-dialog-main');
}
// 监听点击事件
function _onClick2() {
  var that = this;

  // 关闭事件
  _assertClassBrand(_dialog_brand, that, _createEvent2).call(that, '.open-dialog .open-dialog-close', 'close');

  // 返回事件
  _assertClassBrand(_dialog_brand, that, _createEvent2).call(that, '.open-dialog .open-dialog-cancel', 'cancel');

  // 确认事件
  _assertClassBrand(_dialog_brand, that, _createEvent2).call(that, '.open-dialog .open-dialog-ok', 'ok');

  // 全屏事件
  _assertClassBrand(_dialog_brand, that, _createFull).call(that);
}
// 创建dialog全屏
function _createFull() {
  var that = this;

  // 获取点击事件元素
  var button = dom.child(that.config.moduleElem, '.open-dialog-full');
  if (button) {
    button.onclick = function () {
      var mainElem = dom.child(that.config.elem, '.open-dialog-main');
      if (dom.existClass(mainElem, 'open-dialog-main-full')) {
        dom.removeClass(mainElem, 'open-dialog-main-full');
      } else {
        dom.addClass(mainElem, 'open-dialog-main-full');
      }
    };
  }
}
// 创建事件
function _createEvent2(selector, type) {
  var that = this;

  // 获取点击事件元素
  var button = dom.child(that.config.moduleElem, selector);
  if (button) {
    button.onclick = function () {
      var res = true;
      if (that.config.click) {
        res = that.config.click(type);
      }
      if (res !== false) that.hide();
    };
  }
}
function _createElem3() {
  var that = this;
  var config = that.config;

  // 创建header
  var header = config.show.title ? _assertClassBrand(_dialog_brand, that, _createTitle).call(that, config) : '';

  // 创建返回按钮
  var cancel = config.show.ok ? _assertClassBrand(_dialog_brand, that, _createCancelButton2).call(that, config) : '';

  // 创建确定按钮
  var confirm = config.show.ok ? _assertClassBrand(_dialog_brand, that, _createOkButton2).call(that, config) : '';
  return "<div class=\"open-dialog-wrapper\">\n\t\t\t\t\t<div class=\"open-dialog-main\"  style=\"width:".concat(config.width, ";height:").concat(config.height, "\">\n\t\t\t\t\t\t").concat(header, "\n\t\t\t\t\t\t<div id=\"dialog-main\" class=\"open-dialog-content\">\n\t\t\t\t\t\t\t").concat(config.content, "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"open-dialog-footer\">").concat(cancel + confirm, "</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>");
}
// 常见title
function _createTitle(options) {
  return "<div class=\"open-dialog-header\">\n\t\t\t\t\t<h3>".concat(options.title, "</h3>\n\t\t\t\t\t<p><span class=\"open-dialog-full\"></span><span class=\"open-dialog-close\"></span></p>\n\t\t\t\t</div>");
}
// 创建确认按钮
function _createOkButton2(options) {
  return _assertClassBrand(_dialog_brand, this, _createButton2).call(this, "open-btn-primary open-dialog-ok", options.lang.ok, 'bg');
}
// 创建取消按钮
function _createCancelButton2(options) {
  return _assertClassBrand(_dialog_brand, this, _createButton2).call(this, "open-dialog-cancel", options.lang.cancel);
}
// 创建按钮
function _createButton2(className, text) {
  var bg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return "<button class=\"open-btn ".concat(className, "\" ").concat(bg, ">").concat(text, "</button>");
}
var _drawer_brand = /*#__PURE__*/new WeakSet();
var _drawer2 = /*#__PURE__*/function () {
  // 构造方法
  function drawer(_options4) {
    _classCallCheck(this, drawer);
    // 初始化数据
    _classPrivateMethodInitSpec(this, _drawer_brand);
    // 配置参数
    this.config = {
      id: '',
      elem: '',
      // 组件元素
      moduleId: '',
      // 组件id
      moduleElem: '',
      // 组件dom对象
      title: '标题',
      content: '内容',
      // 默认消息内容
      type: 'left',
      size: '500px',
      lang: {
        cancel: '取消',
        ok: '确定'
      },
      show: {
        ok: true,
        cancel: true,
        title: true
      },
      click: '' // 回调
    };

    // 初始化数据
    _assertClassBrand(_drawer_brand, this, _init4).call(this, _options4);

    // 渲染组件模版到页面
    _assertClassBrand(_drawer_brand, this, _render4).call(this);

    // 添加事件监听
    _assertClassBrand(_drawer_brand, this, _onClick3).call(this);
  }
  return _createClass(drawer, [{
    key: "show",
    value:
    // 显示
    function show() {
      var that = this;

      // 延迟显示
      setTimeout(function () {
        // 显现
        dom.addClass(that.config.elem, 'open-drawer-show');
        dom.removeClass(that.config.elem, 'open-drawer-hide');
        dom.addClass(that.config.moduleElem, "open-drawer-".concat(that.config.type, "-show"));
      }, 100);
    }

    // 关闭元素
  }, {
    key: "hide",
    value: function hide() {
      var that = this;
      // 隐藏
      dom.addClass(that.config.moduleElem, "open-drawer-".concat(that.config.type, "-hide"));
      dom.addClass(that.config.elem, 'open-drawer-hide');
      setTimeout(function () {
        dom.removeClass(that.config.elem, 'open-drawer-show');
        dom.removeClass(that.config.moduleElem, "open-drawer-".concat(that.config.type, "-hide"));
        dom.removeClass(that.config.moduleElem, "open-drawer-".concat(that.config.type, "-show"));
      }, 300);
    }

    // 创建dom元素
  }], [{
    key: "create",
    value:
    // 创建实例
    function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 如果id不存在，则停止运行
      if (!options.id || !dom.get(options.id)) return false;

      // 生成组件id
      var templateId = utils.randomId();

      /**
      * 合并参数
      * @attr data.custom: object 自定义数据
      * @attr data.system: object 系统数据
      */
      var data = {
        custom: options,
        system: {
          moduleId: templateId
        }
      };

      // 创建实例
      return new drawer(data);
    }
  }]);
}(); // 文字提示气泡组件
function _init4(options) {
  var that = this;

  // 用户可自定义的参数
  var defaults = {
    id: '',
    title: '',
    size: '500px',
    type: 'left',
    lang: {
      cancel: '取消',
      //返回按钮文本
      ok: '确定' // 确认按钮文本
    },
    show: {
      ok: true,
      // 确认按钮
      cancel: true,
      // 确认按钮文本
      title: true
    },
    click: ''
  };

  /** 
   * 解构参数
   * custom:object 自定义参数
   * system:object 系统参数
  */
  var custom = options.custom,
    system = options.system;

  // 合并参数
  defaults = utils.merge(defaults, custom);

  // 合并参数到实例配置参数
  that.config = utils.merge(that.config, _objectSpread2(_objectSpread2({}, defaults), system));

  // 获取容器对象
  that.config.elem = dom.get(that.config.id);

  // 添加组件id
  dom.attr(that.config.elem, 'openui-id', that.config.moduleId);

  // 获取自定义内容
  that.config.content = that.config.elem.innerHTML;

  // 清空容器内容
  that.config.elem.innerHTML = '';
}
// 渲染组件到页面
function _render4() {
  // 添加dom元素到页面 
  dom.addChild(this.config.elem, _assertClassBrand(_drawer_brand, this, _createElem4).call(this));

  // 获取组件显示元素dom
  this.config.moduleElem = dom.child(this.config.elem, '.open-drawer-wrapper');
}
// 监听点击事件
function _onClick3() {
  var that = this;

  // 关闭事件
  _assertClassBrand(_drawer_brand, that, _createEvent3).call(that, '.open-drawer .open-drawer-close', 'close');

  // 返回事件
  _assertClassBrand(_drawer_brand, that, _createEvent3).call(that, '.open-drawer .open-drawer-cancel', 'cancel');

  // 确认事件
  _assertClassBrand(_drawer_brand, that, _createEvent3).call(that, '.open-drawer .open-drawer-ok', 'ok');
}
// 创建事件
function _createEvent3(selector, type) {
  var that = this;

  // 获取点击事件元素
  var button = dom.child(that.config.moduleElem, selector);
  if (button) {
    button.onclick = function () {
      var res = true;
      if (that.config.click) {
        res = that.config.click(type);
      }
      if (res !== false) that.hide();
    };
  }
}
function _createElem4() {
  var that = this;
  var config = that.config;
  var style = "width: ".concat(config.size);
  if (config.type == 'top' || config.type == 'bottom') {
    style = "height:".concat(config.size);
  }

  // 创建header
  var header = config.show.title ? _assertClassBrand(_drawer_brand, that, _createTitle2).call(that, config) : '';

  // 创建返回按钮
  var cancel = config.show.ok ? _assertClassBrand(_drawer_brand, that, _createCancelButton3).call(that, config) : '';

  // 创建确定按钮
  var confirm = config.show.ok ? _assertClassBrand(_drawer_brand, that, _createOkButton3).call(that, config) : '';
  return "<div class=\"open-drawer-wrapper open-drawer-".concat(config.type, "\" style=\"").concat(style, "\">\n\t\t\t\t\t").concat(header, "\n\t\t\t\t\t<div id=\"drawer-main\" class=\"open-drawer-content\">\n\t\t\t\t\t\t").concat(config.content, "\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"open-drawer-footer\">").concat(cancel + confirm, "</div>\n\t\t\t\t</div>");
}
// 常见title
function _createTitle2(options) {
  return "<div class=\"open-drawer-title\">\n\t\t\t\t\t<h3>".concat(options.title, "</h3>\n\t\t\t\t\t<span class=\"open-drawer-close\"></span>\n\t\t\t\t</div>");
}
// 创建确认按钮
function _createOkButton3(options) {
  return _assertClassBrand(_drawer_brand, this, _createButton3).call(this, "open-btn-primary open-drawer-ok", options.lang.ok, 'bg');
}
// 创建取消按钮
function _createCancelButton3(options) {
  return _assertClassBrand(_drawer_brand, this, _createButton3).call(this, "open-drawer-cancel", options.lang.cancel);
}
// 创建按钮
function _createButton3(className, text) {
  var bg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return "<button class=\"open-btn ".concat(className, "\" ").concat(bg, ">").concat(text, "</button>");
}
var _tip_brand = /*#__PURE__*/new WeakSet();
var _tip3 = /*#__PURE__*/function () {
  // 构造方法
  function tip(_options5) {
    _classCallCheck(this, tip);
    // 初始化数据
    _classPrivateMethodInitSpec(this, _tip_brand);
    // 配置参数
    this.config = {
      theme: 'light',
      //主题light|dark默认light
      space: 10,
      type: 'top',
      text: 'openTip文字气泡'
    };

    // 初始化数据
    _assertClassBrand(_tip_brand, this, _init5).call(this, _options5);

    // 渲染组件模版到页面
    _assertClassBrand(_tip_brand, this, _render5).call(this);
  }
  return _createClass(tip, [{
    key: "createTip",
    value:
    /**
     * 创建tip元素
     * @param config: object 配置参数
     * @param dom: HtmlElement 目标dom元素
    */
    function createTip(data, dom, that) {
      // 创建tip容器
      var tipWrapper = document.createElement('div');

      // 创建文本元素
      var textBox = document.createElement('p');

      // 添加文本内容
      textBox.innerText = data.text;

      // tip容器添加class
      tipWrapper.classList.add('open-tip-wrapper');

      // 文本元素添加tip容器
      tipWrapper.append(textBox);

      // 添加tip到目标元素里
      dom.append(tipWrapper);

      // 获取tip容器高度和宽度
      var tipHeight = tipWrapper.offsetHeight;
      var tipWidth = tipWrapper.offsetWidth;

      // 根据data-tip-position方向，动态设置tip位置距离
      switch (data.type) {
        case 'top':
          tipWrapper.classList = "open-tip-wrapper open-tip-wrapper-".concat(that.config.theme, " open-tip-").concat(that.config.theme, "-top open-tip-top-bottom");
          tipWrapper.style.top = "-".concat(tipHeight + that.config.space, "px");
          break;
        case 'bottom':
          tipWrapper.classList = "open-tip-wrapper open-tip-wrapper-".concat(that.config.theme, " open-tip-").concat(that.config.theme, "-bottom open-tip-top-bottom");
          tipWrapper.style.bottom = "-".concat(tipHeight + that.config.space, "px");
          break;
        case 'left':
          tipWrapper.classList = "open-tip-wrapper open-tip-wrapper-".concat(that.config.theme, " open-tip-").concat(that.config.theme, "-left open-tip-left-right");
          tipWrapper.style.left = "-".concat(tipWidth + that.config.space, "px");
          break;
        case 'right':
          tipWrapper.classList = "open-tip-wrapper open-tip-wrapper-".concat(that.config.theme, " open-tip-").concat(that.config.theme, "-right open-tip-left-right");
          tipWrapper.style.right = "-".concat(tipWidth + that.config.space, "px");
          break;
      }
    }
  }], [{
    key: "create",
    value:
    // 创建实例
    function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 创建实例
      new tip(options);
    }
  }]);
}(); // loading组件
function _init5(options) {
  var that = this;

  // 用户可自定义的参数
  var defaults = {
    theme: 'light',
    space: 10,
    type: 'top',
    text: ''
  };

  // 合并参数
  defaults = utils.merge(defaults, options);

  // 合并参数到实例配置参数
  that.config = utils.merge(that.config, defaults);
}
// 渲染组件到页面
function _render5() {
  var that = this;

  // 获取所有tip目标元素
  var tipList = document.querySelectorAll('[open-tip-text]');
  if (tipList.length < 1) return false;

  // 循环遍历所有tip元素
  tipList.forEach(function (item, index) {
    // 设置目标元素为行内元素
    item.style.display = 'inline-block';

    // 添加鼠标悬停事件
    item.addEventListener('mouseenter', function () {
      // 获取目标元素是否已存在tip容器
      var isTip = item.querySelector('.open-tip-wrapper');

      // 不存在则创建
      if (!isTip) {
        // 设置目标元素的为相对定位
        item.style.position = 'relative';

        // 获取tip元素属性自定义文本和position
        var data = {
          text: dom.attr(item, 'open-tip-text') || that.config.text,
          type: dom.attr(item, 'open-tip-type') || that.config.type
        };

        // 创建元素
        that.createTip(data, item, that);
      }
    });
    // 添加鼠标离开事件，删除tip容器
    item.addEventListener('mouseleave', function (event) {
      var _tip2 = item.querySelector('.open-tip-wrapper');
      if (_tip2) {
        _tip2.classList.add('open-tip-hide');
        setTimeout(function () {
          try {
            // 防止remove删除不是当前元素报错
            item.removeChild(_tip2);
          } catch (e) {
            // 不用做处理
          }
        }, 200);
      }
    });
  });
}
var _loading_brand = /*#__PURE__*/new WeakSet();
var _loading2 = /*#__PURE__*/function () {
  // 构造方法
  function loading(_options6) {
    _classCallCheck(this, loading);
    // 初始化数据
    _classPrivateMethodInitSpec(this, _loading_brand);
    // 配置参数
    this.config = {
      id: '',
      elem: '',
      // 组件元素
      moduleId: '',
      // 组件id
      moduleElem: '',
      // 组件dom对象
      text: 'default' // 默认类型
    };

    // 初始化数据
    _assertClassBrand(_loading_brand, this, _init6).call(this, _options6);

    // 渲染组件模版到页面
    _assertClassBrand(_loading_brand, this, _render6).call(this);
  }
  return _createClass(loading, [{
    key: "hide",
    value:
    // 清除元素
    function hide() {
      var that = this;
      that.config.moduleElem.remove();
      that.config.elem.style.position = 'static';
      that.config.elem.style.overflow = 'static';
    }
  }], [{
    key: "create",
    value:
    // 创建实例
    function create() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 生成组件id
      var templateId = utils.randomId();

      /**
      * 合并参数
      * @attr data.custom: object 自定义数据
      * @attr data.system: object 系统数据
      */
      var data = {
        custom: options,
        system: {
          moduleId: templateId
        }
      };

      // 创建实例
      return new loading(data);
    }
  }]);
}(); // 模块对象
function _init6(options) {
  var that = this;

  // 用户可自定义的参数
  var defaults = {
    id: '',
    text: ''
  };

  /** 
   * 解构参数
   * custom:object 自定义参数
   * system:object 系统参数
  */
  var custom = options.custom,
    system = options.system;

  // 合并参数
  defaults = utils.merge(defaults, custom);

  // 合并参数到实例配置参数
  that.config = utils.merge(that.config, _objectSpread2(_objectSpread2({}, defaults), system));
  if (that.config.id) {
    that.config.elem = dom.get(that.config.id);
    that.config.elem.style.position = 'relative';
    that.config.elem.style.overflow = 'hidden';
  } else {
    // 组件添加到body，获取body对象
    that.config.elem = dom.get('body');
    that.config.elem.style.position = 'relative';
    that.config.elem.style.overflow = 'hidden';
  }
}
// 渲染组件到页面
function _render6() {
  var that = this;

  // 添加dom元素到页面 
  dom.addChild(that.config.elem, _assertClassBrand(_loading_brand, that, _createElem5).call(that, that.config));

  // 获取组件dom对象
  that.config.moduleElem = dom.child(that.config.elem, "[openui-id=".concat(that.config.moduleId, "]"));
}
// 创建dom元素
function _createElem5(options) {
  var elem = "<div class=\"open-loading\" openui-id=\"".concat(options.moduleId, "\">\n\t\t\t<div class=\"open-loading-wrapper\">\n\t\t\t\t<div class=\"open-loading-icon\"><p></p></div>\n\t\t\t\t<p class=\"open-loading-text\">").concat(options.text, "</p>\n\t\t\t</div>\n\t\t</div>");
  return elem;
}
var opener = {
  // 插件描述
  name: "opener",
  author: "kaijian",
  version: "v1.0.0-beta",
  description: "一个轻量级js弹出框插件",
  date: "2024-06-22",
  // 消息组件
  message: function message() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _message2.create(options);
  },
  // 消息盒子组件
  modal: function modal(options) {
    _modal2.create(options);
  },
  // 弹出窗组件
  dialog: function dialog(options) {
    return _dialog2.create(options);
  },
  // 抽屉组件
  drawer: function drawer(options) {
    return _drawer2.create(options);
  },
  // 文字提示
  tip: function tip(options) {
    _tip3.create(options);
  },
  // 加载状态
  loading: function loading(options) {
    return _loading2.create(options);
  }
};

// src/main.js

export { opener as default };
//# sourceMappingURL=opener.esm.js.map
