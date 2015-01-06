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
        var val = $eSelect.val();
        //debugger;
        var index = this.index = $("option[selected]", $eSelect).index() || 0;
        var name = $eSelect.prop("name");
        var id = $eSelect.prop("id");
        this.input = $("<input>", {name : name, id : id, value : val}).hide();
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
        var span = this.selectDropdown.find("span").eq( this.index || 0);
        //input的初始值为select的或者是默认select中的第一个span的value值;
        this.selectName.html( span.text() );
        this.input.val( span.attr("value") );
    };
    EmulateSelect.prototype.renderOptions = function() {
        this.selectDropdown.html( this.$eSelect.html().replace(/option/g, "span") );
    };
    EmulateSelect.prototype.events = function() {
        var _this = this;

        //三角型的图片;
        //this.triangle.attr({"src" : data.triangle, "width" : "10px", "vertical-align" : "middle"});
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
                '<span class="select-name">11</span><div class="triangle" >',
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
        triangle : "data:image/jpg;base64"
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