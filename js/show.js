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
	});

})