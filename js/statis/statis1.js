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
	var echarts_barmember = echarts.init(document.getElementById('pienum'), 'walden');
	var echarts_agebar = echarts.init(document.getElementById('piewin'), 'walden');
	var echarts_stackbar = echarts.init(document.getElementById('histogrammajor'), 'walden'); // 改为堆叠柱状图实例
	
	// 成员人数统计直方图
	var barmember = {
	    title : {
	        text: '根据各擅长领域统计教练人数',
	        x: 'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        data: ['力量训练', '普拉提', '动感单车', '瑜伽', '拳击']
	    },
	    yAxis: {
	        type: 'value',
	        name: '人数'
	    },
	    series : [
	        {
	            name: '教练数量',
	            type: 'bar',
	            data: [50, 60, 40, 40, 70],
	            itemStyle: {
	                color: function(params) {
	                    // 不同类别使用不同颜色
	                    var colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
	                    return colorList[params.dataIndex];
	                }
	            },
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	
	// 各年龄段成员统计直方图
	var agebar = {
	    title : {
	        text: '根据年龄统计教练人数',
	        x: 'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        data: ['18-25', '25-30', '30-35', '40-45', '45岁以上']
	    },
	    yAxis: {
	        type: 'value',
	        name: '人数'
	    },
	    series : [
	        {
	            name: '成员数量',
	            type: 'bar',
	            data: [40, 100, 60, 50, 10],
	            itemStyle: {
	                color: function(params) {
	                    // 不同年龄段使用不同颜色
	                    var colorList = ['#3ba272', '#fc8452', '#ef4444', '#9400d3', '#0000cd'];
	                    return colorList[params.dataIndex];
	                }
	            },
	            emphasis: {
	                itemStyle: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	// 堆叠柱状图 - 展示2024年和2025年各运动项目参与人数对比
	var stackBarOption = {
	    title: {
	        text: '各运动项目两年教练人数对比',
	        left: 'center'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data: ['2024年', '2025年'],
	        top: 30
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        data: ['普拉提', '力量训练', '动感单车', '拳击', '瑜伽']
	    },
	    yAxis: {
	        type: 'value',
	        name: '参与人数'
	    },
	    series: [
	        {
	            name: '2024年',
	            type: 'bar',
	            stack: 'total',
	            emphasis: {
	                focus: 'series'
	            },
	            data: [20, 20, 15, 30, 10],
	            itemStyle: {
	                color: '#5470c6'
	            }
	        },
	        {
	            name: '2025年',
	            type: 'bar',
	            stack: 'total',
	            emphasis: {
	                focus: 'series'
	            },
	            data: [40, 30, 25, 40, 30],
	            itemStyle: {
	                color: '#ee6666'
	            }
	        }
	    ]
	};

	echarts_barmember.setOption(barmember);
	echarts_agebar.setOption(agebar);
	echarts_stackbar.setOption(stackBarOption); // 设置堆叠柱状图配置
	// echarts 窗口缩放自适应
	window.onresize = function() {
		echarts_barmember.resize();
		echarts_agebar.resize();
		echarts_stackbar.resize(); // 堆叠柱状图响应窗口大小变化
	}

});
