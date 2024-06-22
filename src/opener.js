/**
 * opener
 * 一个js轻量级弹出框插件
*/

// dom快捷操作 
const dom = {
	// 获取dom对象
	get: selector=>{
		return document.querySelector(selector);
	},
	// 获取dom对象
	getAll: selector=>{
		return document.querySelectorAll(selector);
	},
	// 获取dom对象
	child: (elem,selector)=>{
		return elem.querySelector(selector);
	},
	// 获取dom对象
	childs: (elem,selector)=>{
		return elem.querySelectorAll(selector);
	},
	addChild: (elem,child)=>{
		elem.insertAdjacentHTML('beforeend',child);
	},
	/**
	 * 删除子元素
	 * @param elem: HTMLElemnt 当前dom对象
	 * @param child: HTMLElemnt 删除的子元素dom
	*/
	removeChild: (elem,child)=>{
		elem.removeChild(child);
	},
	/**
	 * 设置或获取元素属性值
	 * @param elem: HTMLElement 元素对象
	 * @param attr: String 属性名
	 * @param val: String 属性值
	 * @return String 返回获取的属性值
	*/
	attr: function(elem,attr,val){

		// 如果值存在，则设置值
		if(val && typeof val === 'string'){

			// 设置元素属性值
			elem.setAttribute(attr, val);

			return false;
		}

		// 返回获取的属性值
		return elem.getAttribute(attr);
	},
	/**
	 * 添加class名
	 * @param elem: HTMLElement 元素对象
	*/
	addClass: (elem,className)=>{
		elem.classList.add(className);
	},
	/**
	 * 移除class名
	 * @param elem: HTMLElement 元素对象
	*/
	removeClass: (elem,className)=>{
		elem.classList.remove(className);
	},
	/**
	 * 查找元素是否包含指定类名
	 * @param elem: HTMLElement 当前元素
	 * @param className: String 查找的class名
	 * @return boolean 返回查找结果
	*/
	existClass: function(elem,className){
	    return elem.classList.contains(className);
	},
};

// utils快捷工具方法
const utils = {
	/**
	 * 合并2个对象，返回新的对象值
	 * @param obj:object 对象
	 * @param newObj:object 对象
	 * @return obj:object 返回合并后的新对象
	*/
	merge: (obj={},newObj={})=>{

		// 如果参数类型不对,返回对象
		if(!utils.isObj(obj) || !utils.isObj(newObj))return {};

		// 如果obj存在，newObj不存在，返回obj
		if(utils.isObj(obj) && !utils.isObj(newObj))return obj;

		// 合并数组
		function mergeArray(arr,newArr){

			let arrData = [];

			arr.forEach((item,index)=>{
				if(newArr[i]){
					arrData.push(newArr[i])
				}else{
					arrData.push(item);
				}
			})
			return arrData;
		}

		// 合并对象
		function mergeObject(obj,newObj){

			// 遍历源对象
			for(let key in obj){

				// 判断目标对象是否有当前key值
				if(newObj.hasOwnProperty(key)){

					// 合并对象值
					if(utils.isObj(obj[key])){

						obj[key] = mergeObject(obj[key],newObj[key]);

					// 合并数组值
					}else if(utils.isArr(obj[key])){

						obj[key] = mergeArray(obj[key],newObj[key]);

					// 合并文本值
					}else{
						obj[key] = newObj[key];
					}
				}
			}
			// 返回值
			return obj;
		}
			  
		return mergeObject(obj,newObj);
	},
	/**
	 * 根据时间生成随机id
	 * @return string 返回生成的随机id
	*/
	randomId: ()=>{
	  	const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
	  	return id;
	},
	/**
	 * 验证类型是否是对象类型object
	*/
	isObj: val=>{
		return Object.prototype.toString.call(val) === '[object Object]';
	},
	// 验证是否是array类型
	isArr: val=>{
		return Array.isArray(val);
	}
};

// 消息组件
class message{

	// 创建实例
	static create(options={}){

		// 生成组件id
	    const templateId = utils.randomId();

	    /**
		 * 合并参数
		 * @attr data.custom: object 自定义数据
		 * @attr data.system: object 系统数据
		*/
	    const data = {
	    	custom: options,
	    	system: {moduleId:templateId}
	    };

	    // 创建实例
		new message(data);
	}

	// 构造方法
	constructor(options){

		// 配置参数
		this.config = {
			elem: '', // 组件元素
			moduleId:'', // 组件id
			moduleElem: '', // 组件dom对象
			types: ['default','success','warn','danger'], // 类型
			type: 'default', // 默认类型
			message: '这是一条消息', // 默认消息内容
			duration: 1500 // 默认持续显示1.5秒
		}

		// 初始化数据
		this.#init(options);

		// 渲染组件模版到页面
		this.#render();

		// 隐藏元素
		this.#hide();
	}

	// 初始化数据
	#init(options){

		const that = this;

		// 用户可自定义的参数
		let defaults = {
			type: 'default',
			message: '',
			duration: 1500
		}

		/** 
		 * 解构参数
		 * custom:object 自定义参数
		 * system:object 系统参数
		*/
		let {custom,system} = options;

		// 合并参数
		defaults = utils.merge(defaults,custom);

		// 合并参数到实例配置参数
		that.config = utils.merge(that.config,{...defaults,...system});

		// 组件添加到body，获取body对象
		that.config.elem = dom.get('body');

		// 检测type类型是否正确，否则显示默认类型
		if(custom.type && !that.config.types.includes(custom.type)){

			that.config.type = "default";
		}
	}

	// 渲染组件到页面
	#render(){

		const that = this;

		// 添加dom元素到页面 
		dom.addChild(that.config.elem,that.#createElem(that.config));

		// 获取组件dom对象
		that.config.moduleElem = dom.get(`[openui-id=${that.config.moduleId}]`)

	}

	// 创建dom元素
	#createElem(options){

		const elem = `<div class="open-message" openui-id="${options.moduleId}">
			<div class="open-message-wrapper open-message-${options.type}">
				<p class="open-message-title">${options.message}</p>
			</div>
		</div>`;

		// const elem = `<div class="open-message" openui-id="${options.moduleId}">
		// 	<div class="open-message-wrapper open-message-${options.type}">
		// 		<p class="open-message-icon"></p>
		// 		<p class="open-message-title">${options.message}</p>
		// 	</div>
		// </div>`;
		return elem;
	}

	// 清除元素
	#hide(){

		const that = this;

		let templateDom = dom.get(`[openui-id=${that.config.moduleId}]`)

		if(templateDom){

			setTimeout(function(){

				const templateWrapper = dom.child(templateDom,'.open-message-wrapper');

				dom.addClass(templateWrapper,'open-message-hide');

				setTimeout(function(){

					that.config.moduleElem.remove();

				},300 )

			},that.config.duration )
		}
	}
}


// 模态框组件
class modal{

	// 创建实例
	static create(options={}){

		// 生成组件id
	    const templateId = utils.randomId();

	    /**
		 * 合并参数
		 * @attr data.custom: object 自定义数据
		 * @attr data.system: object 系统数据
		*/
	    const data = {
	    	custom: options,
	    	system: {moduleId:templateId}
	    };

	    // 创建实例
		new modal(data);
	}

	// 构造方法
	constructor(options){

		// 配置参数
		this.config = {
			elem: '', // 组件元素
			moduleId:'', // 组件id
			moduleElem: '', // 组件dom对象
			title: '标题',
			message: '内容', // 默认消息内容
			cover: true,
			lang: {
				cancel: '取消',
				ok: '确定'
			},
			show: {
				ok: true,
				cancel: true,
			},
			click: '' // 回调
		}

		// 初始化数据
		this.#init(options);

		// 渲染组件模版到页面
		this.#render();

		// 添加事件监听
		this.#onClick();

	}

	// 初始化数据
	#init(options){

		const that = this;

		// 用户可自定义的参数
		let defaults = {
			title: '',
			message: '',
	        cover: true,
			lang: {
	        	cancel: '取消',//返回按钮文本
	        	ok: '确定', // 确认按钮文本
	        },
	        show: {
	        	ok: true, // 确认按钮
	        	cancel: true, // 确认按钮文本
	        },
	        click: '',
		}

		/** 
		 * 解构参数
		 * custom:object 自定义参数
		 * system:object 系统参数
		*/
		let {custom,system} = options;

		// 合并参数
		defaults = utils.merge(defaults,custom);

		// 合并参数到实例配置参数
		that.config = utils.merge(that.config,{...defaults,...system});

		// 组件添加到body，获取body对象
		that.config.elem = dom.get('body');

	}

	// 渲染组件到页面
	#render(){
		const that = this;

		// 添加dom元素到页面 
		dom.addChild(that.config.elem,that.#createElem());

		// 获取组件dom对象
		that.config.moduleElem = dom.get(`[openui-id=${that.config.moduleId}]`)

		setTimeout(function(){

			let modalMain = dom.child(that.config.moduleElem,'.open-modal-main');

			dom.addClass(modalMain,'open-modal-main-show');
		}, 100)
	}

	// 监听点击事件
	#onClick(){

		const that = this;

		// 关闭事件
		that.#createEvent('.open-modal .open-modal-close','close');

		// 返回事件
		that.#createEvent('.open-modal .open-modal-cancel','cancel');
		
		// 确认事件
		that.#createEvent('.open-modal .open-modal-ok','ok');
	
	}

	// 创建事件
	#createEvent(selector,type){

		const that = this;

		// 获取点击事件元素
		let button = dom.child(that.config.moduleElem,selector);

		if(button){

			button.onclick = ()=>{

				let res = true;

				if(that.config.click){

					res = that.config.click(type);
				}

				if(res !== false) that.#hide();
			}
		}
	}

	// 关闭元素
	#hide = function(){

		const that = this;

		let modalMain = dom.child(that.config.moduleElem,'.open-modal-main');

		dom.removeClass(modalMain,'open-modal-main-show');

		let templateDom = that.config.moduleElem;

		setTimeout(function(){

			dom.addClass(templateDom,'open-modal-hide');

			setTimeout(function(){

				that.config.moduleElem.remove();

			},300 )
		}, 100)
	}

	// 创建dom元素
	#createElem(){

		const that = this;

		const config = that.config;

		// 创建返回按钮
		let cancel = config.show.cancel ? that.#createCancelButton(config) : '';
		
		// 创建确定按钮
		let ok = config.show.ok ? that.#createOkButton(config) : '';

		// 创建遮罩
		let cover = config.cover ? 'open-modal-cover' : '';

		const elem = `<div class="open-modal ${cover}" openui-id="${config.moduleId}">
			<div class="open-modal-wrapper">
				<div class="open-modal-main">
					<div class="open-modal-header">
						<p>${config.title}</p><span class="open-modal-close"></span>
					</div>
					<p class="open-modal-content">${config.message}</p>
					<div class="open-modal-footer">
						${cancel + ok}
					</div>
				</div>
			</div>
		</div>`;
		return elem;
	}

	// 创建确认按钮
	#createOkButton(options){
		return this.#createButton("open-btn-primary open-modal-ok",options.lang.ok,'bg'); 
	}

	// 创建取消按钮
	#createCancelButton(options){
		return this.#createButton("open-modal-cancel",options.lang.cancel); 
	}

	// 创建按钮
	#createButton(className,text,bg=''){
		return `<button class="open-btn ${className}" ${bg}>${text}</button>`;
	}
}

// 自定义内容组件
class dialog{

	// 创建实例
	static create(options={}){

		// 如果id不存在，则停止运行
		if(!options.id || !dom.get(options.id))return false;

		// 生成组件id
	    const templateId = utils.randomId();

	    /**
		 * 合并参数
		 * @attr data.custom: object 自定义数据
		 * @attr data.system: object 系统数据
		*/
	    const data = {
	    	custom: options,
	    	system: {moduleId:templateId}
	    };

	    // 创建实例
		return new dialog(data);
	}

	// 构造方法
	constructor(options){

		// 配置参数
		this.config = {
			id: '',
			elem: '', // 组件元素
			moduleId:'', // 组件id
			moduleElem: '', // 组件dom对象
			title: '标题',
			content: '内容', // 默认消息内容
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
		}

		// 初始化数据
		this.#init(options);

		// 渲染组件模版到页面
		this.#render();

		// 添加事件监听
		this.#onClick();

	}

	// 初始化数据
	#init(options){

		const that = this;

		// 用户可自定义的参数
		let defaults = {
			id: '',
			title: '',
			content: '',
	        cover: true,
	        width: '800px',
        	height: '500px',
			lang: {
	        	cancel: '取消',//返回按钮文本
	        	ok: '确定', // 确认按钮文本
	        },
	        show: {
	        	ok: true, // 确认按钮
	        	cancel: true, // 确认按钮文本
	        	title: true
	        },
	        click: '',
		}

		/** 
		 * 解构参数
		 * custom:object 自定义参数
		 * system:object 系统参数
		*/
		let {custom,system} = options;

		// 合并参数
		defaults = utils.merge(defaults,custom);

		// 合并参数到实例配置参数
		that.config = utils.merge(that.config,{...defaults,...system});

		// 获取容器对象
		that.config.elem = dom.get(that.config.id);

		// 添加组件id
		dom.attr(that.config.elem,'openui-id',that.config.moduleId);

		// 获取自定义内容
		that.config.content = that.config.elem.innerHTML;

		// 清空容器内容
		that.config.elem.innerHTML = '';

	}

	// 渲染组件到页面
	#render(){

		// 添加dom元素到页面 
		dom.addChild(this.config.elem,this.#createElem());

		// 获取组件显示元素dom
		this.config.moduleElem = dom.child(this.config.elem,'.open-dialog-main');

	}

	// 监听点击事件
	#onClick(){

		const that = this;

		// 关闭事件
		that.#createEvent('.open-dialog .open-dialog-close','close');

		// 返回事件
		that.#createEvent('.open-dialog .open-dialog-cancel','cancel');
		
		// 确认事件
		that.#createEvent('.open-dialog .open-dialog-ok','ok');

		// 全屏事件
		that.#createFull();
	
	}

	// 创建dialog全屏
	#createFull(){

		const that = this;

		// 获取点击事件元素
		let button = dom.child(that.config.moduleElem,'.open-dialog-full');

		if(button){
			button.onclick = function(){

				let mainElem = dom.child(that.config.elem,'.open-dialog-main');

				if(dom.existClass(mainElem,'open-dialog-main-full')){
					dom.removeClass(mainElem,'open-dialog-main-full')
				}else{
					dom.addClass(mainElem,'open-dialog-main-full')
				}
			}
		}
	}

	// 创建事件
	#createEvent(selector,type){

		const that = this;

		// 获取点击事件元素
		let button = dom.child(that.config.moduleElem,selector);

		if(button){

			button.onclick = ()=>{

				let res = true;

				if(that.config.click){

					res = that.config.click(type);
				}

				if(res !== false) that.hide();
			}
		}
	}

	// 显示
	show(){

		const that = this;

		// 延迟显示
		setTimeout(function(){

			dom.addClass(that.config.elem,'open-dialog-show');

			dom.removeClass(that.config.elem,'open-dialog-hide');

			// dialog主题动画过渡效果
			dom.addClass(that.config.moduleElem,'open-dialog-main-show');
		}, 100)
	}

	// 关闭元素
	hide(){

		const that = this;

		dom.addClass(that.config.elem,'open-dialog-hide');

		dom.removeClass(that.config.elem,'open-dialog-show');

		// dialog主题动画过渡效果
		dom.removeClass(that.config.moduleElem,'open-dialog-main-show');

		// 如果内容区域全屏设置，则恢复小窗口
		let mainElem = dom.child(that.config.elem,'.open-dialog-main');

		if(dom.existClass(mainElem,'open-dialog-main-full')){
			dom.removeClass(mainElem,'open-dialog-main-full')
		}
	}

	// 创建dom元素
	#createElem(){

		const that = this;

		let config = that.config;

    	// 创建header
		let header = config.show.title ? that.#createTitle(config) : '';
		
    	// 创建返回按钮
		let cancel = config.show.ok ? that.#createCancelButton(config) : '';

		// 创建确定按钮
		let confirm = config.show.ok ? that.#createOkButton(config) : '';

    	return  `<div class="open-dialog-wrapper">
					<div class="open-dialog-main"  style="width:${config.width};height:${config.height}">
						${header}
						<div id="dialog-main" class="open-dialog-content">
							${config.content}
						</div>
						<div class="open-dialog-footer">${cancel + confirm}</div>
					</div>
				</div>`;
    }

    // 常见title
    #createTitle(options){
    	return `<div class="open-dialog-header">
					<h3>${options.title}</h3>
					<p><span class="open-dialog-full"></span><span class="open-dialog-close"></span></p>
				</div>`
    }

	// 创建确认按钮
	#createOkButton(options){
		return this.#createButton("open-btn-primary open-dialog-ok",options.lang.ok,'bg'); 
	}

	// 创建取消按钮
	#createCancelButton(options){
		return this.#createButton("open-dialog-cancel",options.lang.cancel); 
	}

	// 创建按钮
	#createButton(className,text,bg=''){
		return `<button class="open-btn ${className}" ${bg}>${text}</button>`;
	}
}


// 自定义抽屉组件
class drawer{

	// 创建实例
	static create(options={}){

		// 如果id不存在，则停止运行
		if(!options.id || !dom.get(options.id))return false;

		// 生成组件id
	    const templateId = utils.randomId();

	    /**
		 * 合并参数
		 * @attr data.custom: object 自定义数据
		 * @attr data.system: object 系统数据
		*/
	    const data = {
	    	custom: options,
	    	system: {moduleId:templateId}
	    };

	    // 创建实例
		return new drawer(data);
	}

	// 构造方法
	constructor(options){

		// 配置参数
		this.config = {
			id: '',
			elem: '', // 组件元素
			moduleId:'', // 组件id
			moduleElem: '', // 组件dom对象
			title: '标题',
			content: '内容', // 默认消息内容
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
		}

		// 初始化数据
		this.#init(options);

		// 渲染组件模版到页面
		this.#render();

		// 添加事件监听
		this.#onClick();

	}

	// 初始化数据
	#init(options){

		const that = this;

		// 用户可自定义的参数
		let defaults = {
			id: '',
			title: '',
	        size: '500px',
	        type: 'left',
			lang: {
	        	cancel: '取消',//返回按钮文本
	        	ok: '确定', // 确认按钮文本
	        },
	        show: {
	        	ok: true, // 确认按钮
	        	cancel: true, // 确认按钮文本
	        	title: true
	        },
	        click: '',
		}

		/** 
		 * 解构参数
		 * custom:object 自定义参数
		 * system:object 系统参数
		*/
		let {custom,system} = options;

		// 合并参数
		defaults = utils.merge(defaults,custom);

		// 合并参数到实例配置参数
		that.config = utils.merge(that.config,{...defaults,...system});

		// 获取容器对象
		that.config.elem = dom.get(that.config.id);

		// 添加组件id
		dom.attr(that.config.elem,'openui-id',that.config.moduleId);

		// 获取自定义内容
		that.config.content = that.config.elem.innerHTML;

		// 清空容器内容
		that.config.elem.innerHTML = '';

	}

	// 渲染组件到页面
	#render(){

		// 添加dom元素到页面 
		dom.addChild(this.config.elem,this.#createElem());

		// 获取组件显示元素dom
		this.config.moduleElem = dom.child(this.config.elem,'.open-drawer-wrapper');

	}

	// 监听点击事件
	#onClick(){

		const that = this;

		// 关闭事件
		that.#createEvent('.open-drawer .open-drawer-close','close');

		// 返回事件
		that.#createEvent('.open-drawer .open-drawer-cancel','cancel');
		
		// 确认事件
		that.#createEvent('.open-drawer .open-drawer-ok','ok');
	
	}

	// 创建事件
	#createEvent(selector,type){

		const that = this;

		// 获取点击事件元素
		let button = dom.child(that.config.moduleElem,selector);

		if(button){

			button.onclick = ()=>{

				let res = true;

				if(that.config.click){

					res = that.config.click(type);
				}

				if(res !== false) that.hide();
			}
		}
	}

	// 显示
	show(){

		const that = this;

		// 延迟显示
		setTimeout(function(){
			// 显现
			dom.addClass(that.config.elem,'open-drawer-show');
			dom.removeClass(that.config.elem,'open-drawer-hide');
			dom.addClass(that.config.moduleElem,`open-drawer-${that.config.type}-show`);
		}, 100)
	}

	// 关闭元素
	hide(){
		const that = this;
		// 隐藏
		dom.addClass(that.config.moduleElem,`open-drawer-${that.config.type}-hide`);
		dom.addClass(that.config.elem,'open-drawer-hide');
		setTimeout(function(){
			dom.removeClass(that.config.elem,'open-drawer-show');
			dom.removeClass(that.config.moduleElem,`open-drawer-${that.config.type}-hide`);
			dom.removeClass(that.config.moduleElem,`open-drawer-${that.config.type}-show`);
		},300)

	}

	// 创建dom元素
	#createElem(){

		const that = this;

		let config = that.config;

		let style = `width: ${config.size}`;

    	if(config.type == 'top' || config.type == 'bottom'){
	    	style = `height:${config.size}`
	    }

    	// 创建header
		let header = config.show.title ? that.#createTitle(config) : '';
		
    	// 创建返回按钮
		let cancel = config.show.ok ? that.#createCancelButton(config) : '';

		// 创建确定按钮
		let confirm = config.show.ok ? that.#createOkButton(config) : '';

    	return `<div class="open-drawer-wrapper open-drawer-${config.type}" style="${style}">
					${header}
					<div id="drawer-main" class="open-drawer-content">
						${config.content}
					</div>
					<div class="open-drawer-footer">${cancel + confirm}</div>
				</div>`;
    }

    // 常见title
    #createTitle(options){
    	return `<div class="open-drawer-title">
					<h3>${options.title}</h3>
					<span class="open-drawer-close"></span>
				</div>`
    }

	// 创建确认按钮
	#createOkButton(options){
		return this.#createButton("open-btn-primary open-drawer-ok",options.lang.ok,'bg'); 
	}

	// 创建取消按钮
	#createCancelButton(options){
		return this.#createButton("open-drawer-cancel",options.lang.cancel); 
	}

	// 创建按钮
	#createButton(className,text,bg=''){
		return `<button class="open-btn ${className}" ${bg}>${text}</button>`;
	}
}


// 文字提示气泡组件
class tip{

	// 创建实例
	static create(options={}){
	    
	    // 创建实例
		new tip(options);
	}

	// 构造方法
	constructor(options){

		// 配置参数
		this.config = {
			theme:'light',//主题light|dark默认light
			space: 10,
			type: 'top',
			text:'openTip文字气泡',
		}

		// 初始化数据
		this.#init(options);

		// 渲染组件模版到页面
		this.#render();

	}

	// 初始化数据
	#init(options){

		const that = this;

		// 用户可自定义的参数
		let defaults = {
			theme: 'light',
			space: 10,
			type: 'top',
			text: ''
		}

		// 合并参数
		defaults = utils.merge(defaults,options);

		// 合并参数到实例配置参数
		that.config = utils.merge(that.config,defaults);

	}

	// 渲染组件到页面
	#render(){

		const that = this;

		// 获取所有tip目标元素
		let tipList = document.querySelectorAll('[open-tip-text]');

		if(tipList.length < 1) return false;

		// 循环遍历所有tip元素
		tipList.forEach((item,index)=>{

			// 设置目标元素为行内元素
			item.style.display = 'inline-block';

			// 添加鼠标悬停事件
			item.addEventListener('mouseenter',()=>{

				// 获取目标元素是否已存在tip容器
				let isTip = item.querySelector('.open-tip-wrapper');

				// 不存在则创建
				if(!isTip){

					// 设置目标元素的为相对定位
					item.style.position = 'relative';

					// 获取tip元素属性自定义文本和position
					let data = {
						text: dom.attr(item,'open-tip-text') || that.config.text,
						type: dom.attr(item,'open-tip-type') || that.config.type
					}
					
					// 创建元素
					that.createTip(data,item,that);
				}
			})
			// 添加鼠标离开事件，删除tip容器
			item.addEventListener('mouseleave',(event)=>{
				let tip = item.querySelector('.open-tip-wrapper');
				if(tip){
					tip.classList.add('open-tip-hide');
					setTimeout(function(){
						try {
							// 防止remove删除不是当前元素报错
							item.removeChild(tip);
						}
						catch(e){
							// 不用做处理
						}
					},200)
				}
			})
		})
	}

	/**
	 * 创建tip元素
	 * @param config: object 配置参数
	 * @param dom: HtmlElement 目标dom元素
	*/
	createTip(data,dom,that){

		// 创建tip容器
		let tipWrapper = document.createElement('div');

		// 创建文本元素
		let textBox = document.createElement('p');

		// 添加文本内容
		textBox.innerText = data.text;

		// tip容器添加class
		tipWrapper.classList.add('open-tip-wrapper');

		// 文本元素添加tip容器
		tipWrapper.append(textBox);

		// 添加tip到目标元素里
		dom.append(tipWrapper);

		// 获取tip容器高度和宽度
		let tipHeight = tipWrapper.offsetHeight;
		let tipWidth = tipWrapper.offsetWidth;

		// 根据data-tip-position方向，动态设置tip位置距离
		switch (data.type) {
			case 'top':
				tipWrapper.classList = `open-tip-wrapper open-tip-wrapper-${that.config.theme} open-tip-${that.config.theme}-top open-tip-top-bottom`;
				tipWrapper.style.top = `-${tipHeight + that.config.space}px`;
				break;
			case 'bottom':
				tipWrapper.classList = `open-tip-wrapper open-tip-wrapper-${that.config.theme} open-tip-${that.config.theme}-bottom open-tip-top-bottom`;
				tipWrapper.style.bottom = `-${tipHeight + that.config.space}px`;
				break;
			case 'left':
				tipWrapper.classList = `open-tip-wrapper open-tip-wrapper-${that.config.theme} open-tip-${that.config.theme}-left open-tip-left-right`;
				tipWrapper.style.left = `-${tipWidth + that.config.space}px`;
				break;
			case 'right':
				tipWrapper.classList = `open-tip-wrapper open-tip-wrapper-${that.config.theme} open-tip-${that.config.theme}-right open-tip-left-right`;
				tipWrapper.style.right = `-${tipWidth + that.config.space}px`;
				break;
		}
	}
}



// loading组件
class loading{

	// 创建实例
	static create(options={}){

		// 生成组件id
	    const templateId = utils.randomId();

	    /**
		 * 合并参数
		 * @attr data.custom: object 自定义数据
		 * @attr data.system: object 系统数据
		*/
	    const data = {
	    	custom: options,
	    	system: {moduleId:templateId}
	    };

	    // 创建实例
		return new loading(data);
	}

	// 构造方法
	constructor(options){

		// 配置参数
		this.config = {
			id: '',
			elem: '', // 组件元素
			moduleId:'', // 组件id
			moduleElem: '', // 组件dom对象
			text: 'default', // 默认类型
		}

		// 初始化数据
		this.#init(options);

		// 渲染组件模版到页面
		this.#render();
	}

	// 初始化数据
	#init(options){

		const that = this;

		// 用户可自定义的参数
		let defaults = {
			id: '',
			text: '',
		}

		/** 
		 * 解构参数
		 * custom:object 自定义参数
		 * system:object 系统参数
		*/
		let {custom,system} = options;

		// 合并参数
		defaults = utils.merge(defaults,custom);

		// 合并参数到实例配置参数
		that.config = utils.merge(that.config,{...defaults,...system});

		if(that.config.id){
			that.config.elem = dom.get(that.config.id);
			that.config.elem.style.position = 'relative';
			that.config.elem.style.overflow = 'hidden';
		}else{
			// 组件添加到body，获取body对象
			that.config.elem = dom.get('body');
			that.config.elem.style.position = 'relative';
			that.config.elem.style.overflow = 'hidden';
		}
	}

	// 渲染组件到页面
	#render(){

		const that = this;

		// 添加dom元素到页面 
		dom.addChild(that.config.elem,that.#createElem(that.config));

		// 获取组件dom对象
		that.config.moduleElem = dom.child(that.config.elem,`[openui-id=${that.config.moduleId}]`);

	}

	// 创建dom元素
	#createElem(options){

		const elem = `<div class="open-loading" openui-id="${options.moduleId}">
			<div class="open-loading-wrapper">
				<div class="open-loading-icon"><p></p></div>
				<p class="open-loading-text">${options.text}</p>
			</div>
		</div>`;
		return elem;
	}

	// 清除元素
	hide(){

		const that = this;
		
		that.config.moduleElem.remove();

		that.config.elem.style.position = 'static';
		that.config.elem.style.overflow = 'static';
	}
}



// 模块对象
const opener = {
	// 插件描述
	name: "opener",
	author: "kaijian",
	version: "v1.0.0-beta",
	description: "一个轻量级js弹出框插件",
	date: "2024-06-22",
	// 消息组件
	message: (options={})=>{
		message.create(options);
	},
	// 消息盒子组件
	modal: (options)=>{
		modal.create(options);
	},
	// 弹出窗组件
	dialog: (options)=>{
		return dialog.create(options);
	},
	// 抽屉组件
	drawer: (options)=>{
		return drawer.create(options);
	},
	// 文字提示
	tip: (options)=>{
		tip.create(options);
	},
	// 加载状态
	loading: (options)=>{
		return loading.create(options);
	}
}

export default opener;