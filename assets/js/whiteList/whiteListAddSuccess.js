$(function(){

	//表格button事件
    var buttonHandles={
        'click .edit':function(e,value,row,index){
            console.log(row)
            //渲染修改表单
        // var html = template('mbody', row);
        // $('#modal-body-update').html(html);
        // $("#myModal2").modal();
        // //调用下拉插件
        // $(".manufactureBox").focus(function(){
        //     $.dropList({
                
        //     })
        // });
        },
        'click .del':function(e,value,row,index){
            //console.log(e);
            //console.log(value);
            //console.log(row);
            //console.log(index+1);     
        }
    };
    
	//button 按钮
    var addButton=function(value,row,index){
        return ['<button class="btn btn-primary edit" >修改</button>',
        '<button class="btn btn-danger del" >删除</button>'].join("");
    };

    //调接口
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
		            field: 'companyname',
		            title: '廠商',
		            align: 'center'
		        },{
		            field: 'depname',
		            title: '性质',
		            align: 'center'
		        },{
		            field: 'createdate',
		            title: '结束日期',
		            align: 'center',
		            formatter:function(value,row,index){
		            	if(value!=null ||value!='undefined'){
		            		var newDate=new Date(value);
		            		return newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();
		            	}
		            }
		        },{
		            field: 'billNoLike',
		            title: '分类',
		            align: 'center'
		        },{
		            field: 'note',
		            title: '备注',
		            align: 'center'
		        },{
		            field: 'button',
		            title: '操作',
		            align: 'center',
		            events: buttonHandles,//按钮事件
		            formatter:addButton,//添加按钮
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