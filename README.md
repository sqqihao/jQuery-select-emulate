//使用方法
/*
*
	选择所有要模拟的select控件，执行EmulateSelect ;
*	@param emitChange :
*		will dispatch at userClick;
*
*	$("select").EmulateSelect({
*		emitChange : function() {
*		}
*	});
*	可选的,主动更改日期的控件，这个是用来选择  ”年月日“  的时候时候会用到的;
*	setDatePlugin(
*		{target : $("#YYYY") , el : $("#YYYY").siblings(".select")},
*		{target : $("#MM") , el : $("#MM").siblings(".select")} ,
*		{target : $("#DD") , el : $("#DD").siblings(".select")}
*	);
*
*/

//by nono ;
//at 2014 : 10 : 11;
//https://github.com/sqqihao/jQuery-select-emulate.git