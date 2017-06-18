var channel = document.querySelector('#channel');
var lists = document.querySelector('.lists');
var searchBtn = document.querySelector('.search');
var searchBox = document.querySelector('.search-box');
var banner = document.querySelector('#banner');
var bannerUl = banner.querySelector('ul');
var bannerLi = banner.getElementsByTagName('li');
var stlyeTag = document.createElement('style');
var navScroll = document.getElementById('nav-scroll');
var scrollUl = navScroll.querySelector('ul');
var scrollLi = scrollUl.getElementsByTagName('li');

var bannerBar = document.querySelector('.banner-bar').getElementsByTagName('a');

/*
banner图滚动前期处理：图片翻倍。
*/
var style = "";
style += '#banner ul{width:'+bannerLi.length * 200+
'%} #banner li{width:'+50/bannerLi.length+'%}';
stlyeTag.innerHTML = style;
document.getElementsByTagName('head')[0].appendChild(stlyeTag);
bannerUl.innerHTML += bannerUl.innerHTML;


//频道按钮
channel.addEventListener('touchstart',function(ev){
	ev.stopPropagation();
	if(this.className === 'channel-hide'){
		this.className = 'channel-show'
		lists.style.display = 'block';
		searchBox.style.display = 'none';
	}else{
		this.className = 'channel-hide'
		lists.style.display = 'none';
		searchBox.style.display = 'block';
	}
},false);

//频道菜单点击外面消失，取消皮筋效果
document.addEventListener('touchstart',function(ev){
	ev.preventDefault();
	if(channel.className === 'channel-show'){
		channel.className = 'channel-hide'
		lists.style.display = 'none';
		searchBox.style.display = 'block';
	}
},false);

//组织频道菜单上的a标签点击后频道菜单消失
lists.addEventListener('touchstart',function(ev){
	ev.stopPropagation();
},false)

//点击搜索
searchBtn.addEventListener('touchstart',function(){
	searchBox.style.display = 'block';
},false)


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

//自动播放
function auto(){
};

//banner图滚动
/* 这里需要考虑的比较多，参考safi的原生滚动可以发现
1.循环滚动，因为我不知道用户要往哪个方向移动，所以要区别PC端可以预先知道用户的滚动方向
2.当我滚动时，肯定不是很直的方向，所以要判断用户是想上下滚动还是想左右滚动
3.当决定滚动方向时，再进行另一个方向的滚动是不行的，参考原生滚动
*/
(function(){

	var startX,startY,originLeft,now,bannerWidth,direct = true,firstDir = true;
	changeTrans(bannerUl,'translateX',0);
	bannerUl.addEventListener('touchstart',function(ev){
		bannerWidth = bannerLi[0].offsetWidth;
		//读取宽度放在内部,可以防止横竖屏时尺寸出错
		//elWidth = bannerLi[0].offsetWidth
		//length = bannerLi.length
		this.style.transition = 'none';
		startX = ev.changedTouches[0].clientX;
		startY = ev.changedTouches[0].clientY;
		originLeft = changeTrans(this,'translateX');
		now = -Math.floor(originLeft/bannerLi[0].offsetWidth)
		console.log(originLeft,bannerLi[0].offsetWidth,now)
		if(now===0){
			changeTrans(this,'translateX',-bannerLi.length*bannerLi[0].offsetWidth/2);
			now = bannerLi.length/2;
		}else if(now===bannerLi.length-1){
			changeTrans(this,'translateX',-(bannerLi.length/2-1)*bannerWidth);
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
})();

//再来写#nav-scroll的滚动，区别于banner，不用循环，有橡皮筋效果
(function(){

	var startX,startY,originLeft,moveTo;
	var rightTag = navScroll.offsetWidth-scrollUl.offsetWidth;
	changeTrans(scrollUl,'translateX',0);
	//鉴于这里的滑动比较小，我们就不做细节处理了。
	scrollUl.addEventListener('touchstart',function(ev){
		this.style.transition = 'none';
		startX = ev.changedTouches[0].clientX;
		originLeft = changeTrans(this,'translateX');
	},false);

	scrollUl.addEventListener('touchmove',function(ev){
		var moveX = ev.changedTouches[0].clientX;
		var disX = moveX-startX;
		moveTo = originLeft+disX;	
		console.log(moveTo)
		if(moveTo>0){
			moveTo = 0.3*disX
		}else if(moveTo<rightTag){
			moveTo = 0.3*disX+rightTag
		}
		//console.log(disX,originLeft,moveTo)
		changeTrans(scrollUl,'translateX',moveTo);

	},false)

	scrollUl.addEventListener('touchend',function(ev){
		this.style.transition = '0.5s';
		if(moveTo>0){
			changeTrans(scrollUl,'translateX',0);
		}else if(moveTo<rightTag){
			changeTrans(scrollUl,'translateX',rightTag);
		}
	},false)
})();




