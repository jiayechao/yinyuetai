var channel = document.querySelector('.channel');
var lists = document.querySelector('.lists');
var searchBox = document.querySelector('.search-box');

channel.addEventListener('touchstart',function(ev){
	lists.style.display = 'block';
	searchBox.style.display = 'none';
	this.style.backgroundPosition = '0 100%';
},false)