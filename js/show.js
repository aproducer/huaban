let colnum = 0;
let heightarr = [];
let data;
$(document).ready(function() {
	$("#btnTop").click(function() { //返回顶部
		$("html").animate({
			scrollTop: 0
		}, 150);
	});
	$(document).scroll(function() { //导航栏变换效果
		if($(document).scrollTop() > 211) {
			$("#btnTop").css("visibility", "visible");
		} else {
			$("#btnTop").css("visibility", "hidden");
		}
		//console.log($(document).scrollTop(),$(document).height(),$(window).height());
		if($(document).height()-$(document).scrollTop()-$(window).height()<400&&$(document).height()<10000){
			for(let i = 0; i < 30; i++) {//创建的数目,起始索引
				dataCreate(i);
			}
		}else if($(document).height()>=10000){
			$(".loading").css("display","block");
		}
		
	});
	changeCol();
	$(window).resize(changeCol);
	add();
})

function changeCol() { //列数改变时
	let oldColNum = colnum;
	switch($(".explore").width()) {
		case 992:
			colnum = 4;
			break;
		case 1244:
			colnum = 5;
			break;
		case 1496:
			colnum = 6;
			break;
		default:
			break;
	}
	if(colnum != oldColNum) {
		$(".water-fall").height(0);
		heightarr.splice(colnum);
		for(let i = 0; i < colnum; i++) {
			heightarr[i] = 0;
		}
		let itemarr = $(".data-item");
		for(let j = 0; j < itemarr.length; j++) {
			sort($(itemarr[j]), $(itemarr[j]).find("img:eq(0)").height());
		}
		//console.log("changed");
		
	}
}

function add() {
	$.ajax({
		type: "get",
		url: "js/showItem.json",
		async: true,
		success: function(msg) { //处理数据
			data = msg;
			//console.log(data);
			for(let i = 0; i < 30; i++) {//创建的数目,起始索引
				dataCreate(i);
			}
		}
	});
}

function dataCreate(index) { //单个数据的处理
	let img = new Image();
	img.onload = function() {
		let height = parseInt(img.height * 236 / img.width);
		let item = $("<div class=\"data-item\" data-height=\"\"></div>");
		item.append(img);
		item.append($(`<p>
			<span><i class="rt"></i>${data[index].rt}</span>
			<span><i class="lk"></i>${data[index].lk}</span>
		</p>
		<div class="user-info">
			<img src="${data[index].user.src}" />
			<div class="user-info-body">
				<div class="username">
					<a href="">${data[index].user.name}</a>&nbsp;采集到
				</div>
				<div class="albumname">
					<a href="">${data[index].albumname}</a>
				</div>
			</div>
		</div>`));
		$(".water-fall").append(item);
		sort(item, height);//排序
	}
	img.src = data[index].src;

}

function sort(item, height) { //进行布局,接受参数为img的高
	let index = 0;
	let min = heightarr[0];
	for(let i = 0; i < heightarr.length; i++) {
		if(min > heightarr[i]) {
			index = i;
			min = heightarr[i];
		}
	}
	//console.log(index, heightarr[index]);
	item.css({
		"top": `${heightarr[index]}px`,
		"left": `${252*index}px`
	});
	heightarr[index] += (height + 122);
	if($(".water-fall").height()<heightarr[index]){
		$(".water-fall").height(heightarr[index]);
	}
	//console.log(index, min, heightarr);
}