var channel = document.querySelector('.channel');
var lists = document.querySelector('.lists');
var searchBox = document.querySelector('.search-box');
var banner = document.querySelector('#banner ul')

channel.addEventListener('touchstart',function(ev){
	lists.style.display = 'block';
	searchBox.style.display = 'none';
	this.style.backgroundPosition = '0 100%';
},false);


//修改transform
function changeTrans(el,key,val){
	if(!el.transform){
		el.transform = {};
	}
	var stlye = "";
	if(arguments.length===3){
		el.transform[key] = val;
		for(var attr in el.transform){
			switch(true){
				case /^translate/.test(key):
					style += attr+'('+el.transform[attr]+'px) ';
				break;	
				case /^rotate/.test(key):
				case /^skew/.test(key):
					style += attr+'('+el.transform[attr]+'deg) ';
				break;
				case /^scale/.test(key):
					style += attr+'('+el.transform[attr]+') ';
				break;
			}
		}
		el.style.transform = style;
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
