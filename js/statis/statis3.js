// 定义全局变量
var $;
layui.use(['form', 'layer', 'laydate'], function() {
	$ = layui.jquery;
	var form = layui.form,
		layer = layui.layer,
		laydate = layui.laydate;
	//日期1
	laydate.render({
		elem: '#grade',
		type: 'year'
	});
	//日期2
	laydate.render({
		elem: '#daterange',
		type: 'month',
		range: '~'
	});
	
	// 监听搜索_1操作
	form.on('submit(data-search-btn1)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		//执行搜索重载
		table.reload('userloginlogTable', {
			page: {
				curr: 1
			},
			where: {
				searchParams: result
			}
		}, 'data');
		return false;
	});
	// 监听搜索_2操作
	form.on('submit(data-search-btn2)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		//执行搜索重载
		table.reload('userloginlogTable', {
			page: {
				curr: 1
			},
			where: {
				searchParams: result
			}
		}, 'data');
		return false;
	});
	
	
	
	
    /**
	 * 图表统计
	 */
	var echarts_pienum = echarts.init(document.getElementById('pienum'), 'walden');
	var echarts_piewin = echarts.init(document.getElementById('piewin'), 'walden');
	var echarts_linechart = echarts.init(document.getElementById('histogrammajor'), 'walden');
	
	// 成员人数统计饼图
	var pienum = {
	    title : {
	        text: '根据各健身项目统计收入饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['力量训练','普拉提','动感单车','瑜伽','拳击']
	    },
	    series : [
	        {
	            name: '收入来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
				color: ['#ffe6d0', '#c1bacd', '#45B7D1','#8fa0ff','#ff9cdd'],
	            data:[
	                {value:15000, name:'力量训练'},
	                {value:14000, name:'普拉提'},
	                {value:10000, name:'动感单车'},
	                {value:16000, name:'瑜伽'},
	                {value:20000, name:'拳击'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	// 各院系成员统计饼图
	var piewin = {
	    title : {
	        text: '根据课程类型统计收入饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['私教课','团课','小班课']
	    },
	    series : [
	        {
	            name: '收入来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
				color: ['#fcd9ff', '#96c9cd', '#d1cdb5'],
	            data:[
	                {value:30000, name:'私教课'},
	                {value:25000, name:'团课'},
	                {value:20000, name:'小班课'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	// 修改为折线图，展示近四年数据
	var lineChart = {
	    title: {
	        text: '各健身项目近年收入趋势',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
	    legend: {
	        data: ['普拉提', '力量训练', '动感单车', '拳击', '瑜伽'],
	        bottom: 10
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '15%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['2022', '2023', '2024', '2025']
	    },
	    yAxis: {
	        type: 'value',
	        name: '收入 (元)'
	    },
	    series: [
	        {
	            name: '普拉提',
	            type: 'line',
	            data: [4000, 6000, 8000, 10000],
	            smooth: true,
				itemStyle: {
				                color: '#f3deff' // 浅橙色
				            },
				            lineStyle: {
				                color: '#dcffc9'
				            }
	        },
	        {
	            name: '力量训练',
	            type: 'line',
	            data: [5000, 7000, 9000, 12000],
	            smooth: true,
				itemStyle: {
				                color: '#dbb2ff' // 浅橙色
				            },
				            lineStyle: {
				                color: '#f3b3ff'
				            }
	        },
	        {
	            name: '动感单车',
	            type: 'line',
	            data: [3000, 5000, 7000, 9000],
	            smooth: true,
				itemStyle: {
				                color: '#ccffc6' // 浅橙色
				            },
				            lineStyle: {
				                color: '#a1feff'
				            }
	        },
	        {
	            name: '拳击',
	            type: 'line',
	            data: [8000, 12000, 16000, 20000],
	            smooth: true,
				itemStyle: {
				                color: '#deffe1' // 浅橙色
				            },
				            lineStyle: {
				                color: '#ffaecd'
				            }
	        },
	        {
	            name: '瑜伽',
	            type: 'line',
	            data: [6000, 9000, 13000, 16000],
	            smooth: true,
				itemStyle: {
				                color: '#b4b9ff' // 浅橙色
				            },
				            lineStyle: {
				                color: '#db6eff'
				            }
	        }
	    ]
	};

	echarts_pienum.setOption(pienum);
	echarts_piewin.setOption(piewin);
	echarts_linechart.setOption(lineChart); // 使用修改后的折线图配置
	
	// echarts 窗口缩放自适应
	window.onresize = function() {
		echarts_pienum.resize();
		echarts_piewin.resize();
		echarts_linechart.resize(); // 更新折线图的resize调用
	}

});
