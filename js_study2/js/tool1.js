//★★★★★★★★★★★★★★★★★★★★★★★★★★


//obj  要执行动画的对象     target执行动画的目标位置    length步长   正数向右移动，负数向左
//attr  要执行动画的样式 比如left，top，width,height。。。
//callback  回调函数，将会在动画执行完毕之后执行
function move(obj, attr, target, length, callback) {
	clearInterval(obj.time);

	//判断步长的正负值
	//获取元素目前的位置  
	//获取box原来的left值   ,parseint取有效数字，这样就去除了px的单位
	var current = parseInt(getStyle(obj, attr));
	if(current > target) {
		//若box原来的left值大于目标值，说明左移，变负
		length = -length;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个time属性,用来保存他自己的定时器的标识
	obj.time = setInterval(function() {

		//获取box原来的attr值   ,parseint取有效数字，这样就去除了px的单位
		var oldValue = parseInt(getStyle(obj, attr));
		//在oldValue的基础上减少
		var newValue = oldValue + length;

		//当向左移动，需要判断newValue是否小于target//当向右移动  需要判断newValue是否大于target
		if((newValue < target && length < 0) || (newValue > target && length > 0)) {
			newValue = target; //保证在终点处停下
		}

		//将新值设置给box   因为attr是变量，不能写为 style.attr  要写为style[attr] 
		obj.style[attr] = newValue + "px";
		if(newValue == target) {
			//到达就把定时器关闭
			clearInterval(obj.time);

			//动画执行完毕，调用回调函数 ，执行一次
			//这种形式保证如果函数传参没有传入回调函数，就不执行，传入就执行
			callback && callback();
		}
	}, 1000);
}

//定义一个函数，用来获取指定元素的当前样式
// 参数  ：obj  要获取的元素      name 要获取的样式名
function getStyle(obj, name) {
	if(window.getComputedStyle) {
		//正常浏览器的方式
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

//定义一个函数，用来向一个元素中添加指定的class属性值
//参数      obj  要添加class属性的元素
// cn   要添加的class值
function addClass(obj, cn) {

	//检查obj是否含有cn
	if(!hasClass(obj, cn)) {
		//如果没有才会添加
		obj.className += " " + cn;
	}
}

//判断一个元素是否含有指定的class属性值  
//参数    obj  要判断class属性的元素
//  cn  是否含有改属性值
function hasClass(obj, cn) {
	//判断obj中是否含有cn class
	//如果有返回true

	//创建一个正则表达式
	//注意不要这样写，这样就写死了，传的cn参数没用处了          var reg=/\bb2\b/;
	//所以采取构造的方式
	var reg = new RegExp("\\b" + cn + "\\b"); //需要\转义字符来转义\b. \b单词边界 保证这一侧单词是独立的
	return reg.test(obj.className)
}

//删除元素中指定的一个class属性
//参数    obj  要进行删除class属性的元素
//  cn  被删除的class属性
function removeClass(obj, cn) {
	//创建正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");
	//删除class
	obj.className = obj.className.replace(reg, ""); //替换，将属性置为空串
}

//可以切换一个类  
//如果元素中存在该类，则删除
//如果没有则添加
//参数    obj  要进行删除class属性的元素
//  cn  被删除的class属性
function toggleClass(obj, cn) {
	//判断obj是否含有cn
	if(hasClass(obj, cn)) {
		//有则删除
		removeClass(obj, cn);
	} else {
		//没有，则进行添加啊
		addClass(obj, cn);
	}
}