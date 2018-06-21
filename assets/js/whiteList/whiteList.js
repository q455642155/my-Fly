$(function(){

    //格式化日期
    $('#datetime').calendar({
        readonly:false
    });
    //日期弹出框的定位问题
    var oWidth=$("#datetime").width();
    var oHeight=$("#datetime").height();
    var dateLeft=$("#datetime").offset().left;
    var dateTop=$("#datetime").offset().top;
    $(".calendar").css({"left":dateLeft,"top":dateTop+oHeight+14,"width":oWidth,"height":200+'px'});
    //窗口随着变化的时候日期弹出框也随着变化
    $(window).resize(function(){
        oWidth=$("#datetime").width();
        oHeight=$("#datetime").height();
        dateLeft=$("#datetime").offset().left;
        dateTop=$("#datetime").offset().top;
        $(".calendar").css({"left":dateLeft,"top":dateTop+oHeight+14,"width":oWidth,"height":200+'px'});
    })
	//点击新增按钮跳转
	$("#addBtn").click(function(){
		window.location.href="./whiteListAdd.html"
	});


	//接口调用渲染表格列表数据
	$.ajax({
        url:'http://10.134.158.84:8081/Ecs2018/sysmanager/syssecurity/paywhite/selectMasterPager.action',
        dataType:'json',
        beforeSend:function(){
            $('.loading').show();
        },
        success:function(data){
            console.log(data);        
            $('#tbody').bootstrapTable({
                pagination: true,
                pageSize:data.pageSize,
                //showColumns: true, // 开启自定义列显示功能
                showRefresh: false, // 开启刷新功能
                minimumCountColumns: 2,// 设置最少显示列个数
                striped:false,
                sortName: data.billno, // 要排序的字段
                sortOrder: 'desc', // 排序规则
                columns: [{
                    field: 'index',
                    title: '序号',
                    align: 'center',
                    clickToSelect:true,
                    formatter: function (value, row, index) { // 单元格格式化函数
                        return index+1;
                    }
                }, {
                    checkbox: true, // 显示一个勾选框
                    align: 'center' // 居中显示
                }, {
                    field: 'billno',
                    title: '單號',
                    align: 'center'
                }, {
                    field: 'companyname',
                    title: '法人',
                    align: 'center',
                    clickToSelect:true
                }, {
                    field: 'depname',
                    title: '申請部門',
                    align: 'center',
                    clickToSelect:true
                }, {
                    field: 'billNoLike',
                    title: '單據狀態',
                    align: 'center'
                },{
                    field: 'createuser',
                    title: '申請人',
                    align: 'center',
                    clickToSelect:true
                }, {
                    field: 'createdate',
                    title: '申請日期',
                    align: 'center',
                    formatter: function(value,row,index){
                        if(value!=null || value!='undefined'){
                            var newDate=new Date(value);
                            return newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();
                        }
                    }
                }],
                data: data.list,
                formatLoadingMessage:function(){
                	return ''
                },
                paginationPreText:'上一页',
                paginationNextText:'下一页'
                }).on("click-row.bs.table",function(row, $element, field){
                    console.log(row)
                    console.log( $element)
                    console.log(field)
            });
        },
        complete:function(){
            $('.loading').hide();
        },
        error:function(err){
            console.log(err)
        }
    });
})