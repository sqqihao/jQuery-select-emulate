// JavaScript Document
(function($){
	/*
	*
	*模拟select插件;
	*$("select").EmulateSelect({
	*	//当selected的index发生改变的时候的回调;
	*	emitChange : function() {
	*		
	*	}
	*});
	*
	*/
	$(document).on("click",function() {			
		$(".select-dropdown").hide();
	});
	
	function EmulateSelect( setting ) {
		$.extend(true, this, setting);
		this.initEmulate();
		this.initialValue();
		this.events();
	};
	EmulateSelect.jQInterface = function( setting ) {
		$(this).each(function(i, e) {
			new EmulateSelect($.extend( {}, setting,{sel : $(this)}));
		});
	};
	EmulateSelect.prototype.data = function() {
		return {
			
		};
	};
	EmulateSelect.prototype.initEmulate = function() {
		//这个是模拟的select;
		this.obj = $( data.template() );
		//三角型的图片;
		this.triangle = this.obj.find(".triangle");
		//模拟的select按钮;
		this.selectButton = $(".select-button", this.obj);
		//模拟的下拉框;
		this.selectDropdown = $(".select-dropdown",this.obj);
		//this.input = $("select",this.obj)[0].name;
		this.selectName = $(".select-name",this.obj);
		
		//新建一个input
		//替换原来的select为隐藏的input;
		var $eSelect = this.$eSelect = this.sel;
		var name = $eSelect.prop("name");
		var id = $eSelect.prop("id");
		this.input = $("<input>", {name : name, id : id , hide : function() { $(this).hide() }});
		$eSelect.after( this.input );
		//把原来的数据重新灌进来哒;
		this.renderOptions();
		//把原来的select删除;
		$eSelect.remove();
		
		this.input.after( this.obj );
		
		//把这个类挂到对象上
		this.obj.data( "EmulateSelect" ,this );
		
	};
	EmulateSelect.prototype.initialValue = function() {
		var span = this.selectDropdown.find("span").eq(0);
		//input的初始值为select的第一个span的value值;
		this.selectName.html( span.text() );
		this.input.val( span.attr("value") );
	};
	EmulateSelect.prototype.renderOptions = function() {
		this.selectDropdown.html( this.$eSelect.html().replace(/option/gi, "span") );
	};
	EmulateSelect.prototype.events = function() {
		var _this = this;
		
		//三角型的图片;
		this.triangle.attr({"src" : data.triangle, "width" : "10px", "vertical-align" : "middle"});
		//模拟的select按钮;
		this.selectButton.click(function(ev) {
			$(this).closest(".select").find(".select-dropdown").toggle();
			ev.stopPropagation();
		});
		//模拟的下拉框;
		this.selectDropdown.click(function(ev) {
			var val = $(ev.target).attr("value"),
				$el = $(ev.target).closest(".select");
				
			//可能没有点击下拉框,导致了一个全部的text显示到selectName;
			if( ev.target.tagName.toLowerCase() !== "span" )return ;
			
			_this.selectName.text( $(ev.target).text() );
			$(this).toggle();
			//外部的回调
			_this.emitChange();
			//设置隐藏的input的值
			_this.input.val( val );
		});
	};
	
	$.fn.EmulateSelect = EmulateSelect.jQInterface;
	
	var data = {
		template : function() {
			return [
					'<div class="select select1">',
						'<dl>',
							'<dt class="select-button">',
								'<span class="select-name">11</span><img class="triangle" src=""/>',
								'<div class="clear"></div>',
							'</dt>',
							'<dd class="select-dropdown">',
								'<span value="0">0</span>',
								'<span value="1">1</span>',
								'<span value="2">2</span>',
								'<span value="3">3</span>',
								'<span value="4">4</span>',
								'<span value="0">0</span>',
								'<span value="1">1</span>',
								'<span value="5">5</span>',
							'</dd>',
						'</dl>',
					'</div>',
				].join("");
		},
		triangle : "data:image/jpg;base64,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"
	};
})(jQuery);

(function($) {
	var day;
	var MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	function IsPinYear(year) //判断是否闰平年
	{
		return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0))
	};
	
	function writeDay(n) //据条件写日期的下拉框
	{	
		var str = "";
		for (var i = 1; i < (n + 1); i++) str+= "<span value='" + i + "'> " + i + " 日" + "</span>\r\n";
		day.el.data("EmulateSelect").selectDropdown.html( str );
	};
	
	function YYYYMM(yy, mm) //年发生变化时日期发生变化(主要是判断闰平年)
	{
		var n = MonHead[mm - 1];
		if (mm == 2 && IsPinYear(yy)) n++;
		writeDay(n);
	};
	
	function MMDD(yy, mm) //月发生变化时日期联动
	{
		var n = MonHead[mm - 1];
		if (mm == 2 && IsPinYear(yy)) n++;
		writeDay(n);
	};


	function events(yy, mm, dd) {
		yy.el.data("EmulateSelect").selectDropdown.click(function() {
			YYYYMM( Number( yy.el.data("EmulateSelect").input.val() ), Number( mm.el.data("EmulateSelect").input.val() ) );
		});
		mm.el.data("EmulateSelect").selectDropdown.click(function() {
			MMDD( Number( yy.el.data("EmulateSelect").input.val() ), Number( mm.el.data("EmulateSelect").input.val() ) );
		});
	};

	window.setDatePlugin = function (yy, mm ,dd) {
		day = dd;
		var y = new Date().getFullYear();
		
		//初始化设置年
		var str = "";
		for (var i = (y - 50); i < (y + 1); i++) //以今年为准，前50年
		{
			str += "<span value='" + i + "'> " + i + " 年" + "</span>\r\n";
		};
		yy.el.data("EmulateSelect").selectDropdown.html( str );
	   
	   	//初始化设置月
		str = ""
		for (var i = 1; i < 13; i++) {
			str += "<span value='" + i + "'> " + i + " 月" + "</span>\r\n";
		};
		mm.el.data("EmulateSelect").selectDropdown.html( str );
		
		
		var n = MonHead[new Date().getMonth()];
		if (new Date().getMonth() == 1 && IsPinYear(YYYYvalue)) n++;
	   
		//初始化日期下拉框
		str = ""
		for (var i = 1; i < (n + 1); i++) str += "<span value='" + i + "'> " + i + " 日" + "</span>\r\n";
		dd.el.data("EmulateSelect").selectDropdown.html( str );
	   
	    //事件初始化;
	    events(yy, mm ,dd);
	};
})($)
