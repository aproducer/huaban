$(document).ready(function() {
	$("#btnTop").click(function() { //返回顶部
		$("html").animate({
			scrollTop: 0
		}, 150);
	});
	$(document).scroll(function() { //导航栏变换效果+返回顶部消失+视差效果
		if($(document).scrollTop() < $(".banner-background:eq(0)").height()) {
			$(".banner-background:eq(0)").css("background-position", "center " + $(document).scrollTop() / 2 + "px")
		}
		if($(document).scrollTop() > 211) {
			$("#header").addClass("changed-header");
			$("#btnTop").css("visibility", "visible");
		} else {
			$("#header").removeClass("changed-header");
			$("#btnTop").css("visibility", "hidden");
		}
	});

	add();

})

function add() {
	$.ajax({
		type: "get",
		url: "js/indexItem.json",
		async: true,
		success: function(data) {
			let index = 0; //控制样式
			for(let rowdata of data) { //处理每一行
				dataNameHandle(rowdata); //处理名字格式
				//console.log(i, index);
				let newRow = $("<div clas=\"display-row\"></div>");
				$(".display:eq(0)").append(newRow);
				newRow.load(`commonHTML/indexItem.html .display-row:eq(${index%2})`, function() {
					//console.log("success");
					let imgarr = $(this).find("img");
					let infoarr = $(this).find(".info");
					let changeBox = $(this).find(".change-box");
					let attachInfo = $(this).find(".attach-info");
					//console.log(rowdata,infoarr,imgarr);
					for(let i = 0; i < 3; i++) { //处理行中每一项
						$(imgarr[i]).attr("src", rowdata[i].src);
						$(infoarr[i]).find("h2").html(rowdata[i].name);
						$(infoarr[i]).find("p").html(rowdata[i].info);
						$(infoarr[i]).find("span").html(rowdata[i].author);
						switch(rowdata[i].type) {
							case "画板":
								$(infoarr[i]).find(".title-info").css("background-position", "0px 0px");
								break;
							case "兴趣":
								$(infoarr[i]).find(".title-info").css("background-position", "0px -80px");
								break;
							case "人物":
								$(infoarr[i]).find(".title-info").css("background-position", "0px -160px");
								break;
							default:
								break;
						}
					}
					attachInfo.find("h2").html(changeBox.find("h2").html());
					attachInfo.find("span").html(changeBox.find("p").html());
					let str=changeBox.find(".title-info").css("background-position-y");
					console.log(str);
					switch(str) {
							case "0px":
								attachInfo.find(".title-info").css("background-position","-236px 7px");
								break;
							case "-80px":
								attachInfo.find(".title-info").css("background-position","-231px -68px");
								break;
							case "-160px":
								attachInfo.find(".title-info").css("background-position","-236px -155px");
								break;
							default:
								break;
					}
					
				});
				index++; //切换样式
			}

		}
	});
}

function dataNameHandle(data) {
	for(let i of data) {
		if(i.author) {
			i.author = "来自<a>" + i.author + "<a/>";
		}
	}
}