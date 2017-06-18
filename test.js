//修改transform
function changeTrans(el,key,val){
	if(!el.transform){
		el.transform = {};
	}
	var lineStlye = "";
	if(arguments.length===3){
		el.transform[key] = val;
		for(var attr in el.transform){
			switch(true){
				case /^translate/.test(key):
					lineStlye += attr+'('+el.transform[attr]+'px) ';
				break;	
				case /^rotate/.test(key):
				case /^skew/.test(key):
					lineStlye += attr+'('+el.transform[attr]+'deg) ';
				break;
				case /^scale/.test(key):
					lineStlye += attr+'('+el.transform[attr]+') ';
				break;
			}
		}
		el.style.transform = lineStlye;
	}
	if(arguments.length===2){
		var val  = el.transform[key];
		if(typeof val === undefined){
			if(/^scale/.test(attr)){
				val = 1;
			}else{
				val = 0;
			}
		}
		return val;
	}
}

//将轮播图封装成一个函数
function setBanner(el){
	this.el = document.getElementById(el);
};

setBanner.prototype.init = function(length,url,imgs,width,height,loop,auto){

	this.length = length || 5;//需要几个
	this.url = url||['','','','',''];//相应的链接
	this.imgs = imgs||['','','','',''];//对应的图片地址
	this.loop = loop||true;//是否循环
	this.auto = auto;||5//是否自动播放，设置时间即可，或者false
	this.config();
}

}
setBanner.prototype.config = function(){

	//banner图滚动前期处理
	var stlyeTag = document.createElement('style');
	var style = "";
	style += '#banner ul{width:'+this * 200+
	'%} #banner li{width:'+50/length*2+'%} '
	+'#banner .banner-bar{position: absolute;bottom: '
	+'12px;right: 32px;} .banner-bar a{display: inline-block;'
	+width: 12px;height: toRem(12px);
		border-radius: 50%;
		background: nth($color,1);
		margin-right: toRem(20px);}
	a{
		
	}
	.active{
		background: nth($color,2);
	}
}
	stlyeTag.innerHTML = style;
	document.getElementsByTagName('head')[0].appendChild(stlyeTag);
	var bannerUl = document.createElement('ul');
	var nav = document.createElement('nav');
	nav.className = 'banner-bar';
	var ulHtml='';
	for(var i=0;i<length*2;i++){
		var bannerLi = '<li><a href="'+this.url[i]+'"><img src="'+this.imgs[i]+'"></a></li>';
		ulHtml += bannerLi
	}
	bannerUl.innerHTML += bannerUl.innerHTML;

	var startX,startY,originLeft,now,bannerWidth,direct = true,firstDir = true;
	fn(el,'translateX',0);
	el.addEventListener('touchstart',function(ev){
		//bannerWidth = bannerLi[0].offsetWidth;
		//读取宽度放在内部,可以防止横竖屏时尺寸出错
		//elWidth = bannerLi[0].offsetWidth
		//length = bannerLi.length
		this.style.transition = 'none';
		startX = ev.changedTouches[0].clientX;
		startY = ev.changedTouches[0].clientY;
		originLeft = fn(this,'translateX');
		now = -Math.floor(originLeft/elWidth)
		console.log(originLeft,bannerLi[0].offsetWidth,now)
		if(now===0){
			fn(this,'translateX',-length*elWidth/2);
			now = bannerLi.length/2;
		}else if(now===length-1){
			fn(this,'translateX',-(bannerLi.length/2-1)*bannerWidth);
			now = bannerLi.length/2-1;
		}
		originLeft = changeTrans(bannerUl,'translateX');
	},false);

	bannerUl.addEventListener('touchmove',function(ev){
		var moveX = ev.changedTouches[0].clientX;
		var moveY = ev.changedTouches[0].clientY;
		
		if(firstDir){
			firstDir = false;
			if(Math.abs(moveY-startY)>Math.abs(moveX-startX)){
				direct = false;
			}else{
				direct = true;
			}
		}
		if(direct){
			var disX = moveX-startX;
			changeTrans(bannerUl,'translateX',originLeft+disX);
		}
		
		
	},false)

	bannerUl.addEventListener('touchend',function(ev){
		var endLeft = changeTrans(this,'translateX');
		firstDir = true;
		this.style.transition = '0.5s'
		for(var i=0;i<bannerBar.length;i++){
			bannerBar[i].className="";
		}
		now = -Math.round(endLeft/bannerWidth)
		changeTrans(this,'translateX',-now*bannerWidth);
		bannerBar[now%bannerBar.length].className = 'active';
	},false)
}