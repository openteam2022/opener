# opener

一个轻量级js弹出框插件

[opener在线使用文档](https://opener.openteam.site)

## 安装

```html
<script src="opener.js"></script>
```

## 使用

message消息

```js
opener.message({
    type: 'success|warn|danger', // 默认default，不用写
    message: '这是一条错误消息，注意哈错误的新消息', // 消息内容
    duration: 3000 // 持续时间
});
```

modal需要反馈的模态框

```js
opener.modal({
    title: '标题',
    message: '这是一个模态框消息',
    cover: true,// 显示遮罩，默认显示true
    // 配置按钮文本
    lang: {
        ok: 'ok',
        cancel: 'cancel'
    },
    // 控制按钮显示
    show: {
        ok: false,
        cancel: false
    }, 
    // 点击回调函数
    click: (res)=>{
        console.log(res); // close|ok|cancel
    }
})
```

dialog自定义内容的对话框

```js
// 定义内容
<div class="open-dialog" id="dialog">
    <p>dialog内容</p>
</div>

// 通过id进行初始化
let dialog = opener.dialog({
    id: '#dialog',
    title: '标题',
    width: '800px',
    height: '800px',
    cover: true,// 显示遮罩，默认显示true
    // 配置按钮文本
    lang: {
        ok: 'ok',
        cancel: 'cancel'
    },
    // 控制按钮和标题显示
    show: {
        ok: true,
        cancel: true,
        title: true
    }, 
    click: (res)=>{
        console.log(res); // close|ok|cancel
    }
})

// 显示
dialog.show();

// 隐藏
dialog.hide()
```

drawer抽屉滑动组件

```js
// 定义dom内容
<div class="open-drawer" id="drawer">
    <h1>左侧抽屉</h1>
</div>

// 通过id进行初始化
let drawer = opener.drawer({
    id: '#drawer',
    title: '标题',
    size: '500px', // 宽度或高度，
    type: 'left|top|right|bottom', // 方向
    // 配置按钮文本
    lang: {
        ok: 'ok',
        cancel: 'cancel'
    },
    // 控制按钮和标题显示
    show: {
        ok: true,
        cancel: true,
        title: true
    }, 
    click: (res)=>{
        console.log(res); // close|ok|cancel
    }
})

// 显示
drawer.show();

// 隐藏
drawer.hide()
```

tip文字提示气泡

```js
// 需要显示文字气泡的元素添加插件属性 
// open-tip-text:需要显示的内容 
// open-tip-type:显示的位置top|bottom|left|right 
<button open-tip-text="上面tip" open-tip-type="top">tip文字气泡</button>

// 使用 

opener.tip();

// 或者

opener.tip({
    type: 'top' // 统一设置所有气泡都在顶部显示，但是如果元素设置了open-tip-type属性，统一设置则失效，属性设置具有一级优先
})
```

loading加载状态（暂时没有添加自动隐藏，需要手动隐藏）

```js
// 直接调用
let one = opener.loading(); // 默认挂载到body，全局使用

// 局部使用
let two = opener.loading({
    id: '#容器id',
    text: '添加文字'
})

// 关闭
one.hide();
two.hide();


```
