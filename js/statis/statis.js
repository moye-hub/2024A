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
		//执行搜索重载（若table未定义，需确保页面有id为userloginlogTable的表格）
		if (window.table) {
			table.reload('userloginlogTable', {
				page: {
					curr: 1
				},
				where: {
					searchParams: result
				}
			}, 'data');
		}
		return false;
	});
	// 监听搜索_2操作
	form.on('submit(data-search-btn2)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		//执行搜索重载
		if (window.table) {
			table.reload('userloginlogTable', {
				page: {
					curr: 1
				},
				where: {
					searchParams: result
				}
			}, 'data');
		}
		return false;
	});
	
	
    /**
	 * 图表统计
	 */
	var echarts_pienum = echarts.init(document.getElementById('pienum'), 'walden');
	var echarts_piewin = echarts.init(document.getElementById('piewin'), 'walden');
	var echarts_histogram = echarts.init(document.getElementById('histogrammajor'), 'walden');
	
	// 成员人数统计饼图（原有配置不变）
	var pienum = {
	    title : {
	        text: '根据各健身项目统计成员人数饼图',
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
	            name: '成员来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
				color: ['#FF6B6B', '#cd85ba', '#45B7D1','#f8ffdb','#aaaaff'],
	            data:[
	                {value:300, name:'力量训练'},
	                {value:560, name:'普拉提'},
	                {value:150, name:'动感单车'},
	                {value:335, name:'瑜伽'},
	                {value:800, name:'拳击'}
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
	// 年龄统计饼图（原有配置不变）
	var piewin = {
	    title : {
	        text: '根据年龄统计成员饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['18-25','25-30','30-35','40-45','45岁以上']
	    },
	    series : [
	        {
	            name: '成员来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
				color: ['#FF6B6B', '#4ECDC4', '#cbb6d1','#55aaff','#aaaaff'],
	            data:[
	                {value:1500, name:'18-25'},
	                {value:556, name:'25-30'},
	                {value:410, name:'30-35'},
	                {value:335, name:'40-45'},
	                {value:148, name:'45岁以上'}
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

	// 柱状图配置
	var histogram = {
	    title: { 
	        text: '各健身项目近年成员人数统计',
	        left: 'center'
	    },
	    legend: {
	        data: ['2024年', '2025年'], 
	        bottom: 10 
	    },
	    tooltip: {
	        trigger: 'axis', 
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
		toolbox : {
			show : true,
			feature : {
				mark : {show : true},
				dataView : {show : true, readOnly : false},
				magicType : {show : true, type : [ 'line', 'bar' ]},
				restore : {show : true},
				saveAsImage : {show : true}
			}
		},
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '15%',
	        containLabel: true
	    },
	    dataset: {
	        source: [
	            ['product', '2024', '2025'],
	            ['普拉提', 260, 300],
	            ['力量训练', 100, 200],
	            ['动感单车', 80, 70],
	            ['拳击', 350, 450],
	            ['瑜伽', 135, 200]
	        ]
	    },
	    xAxis: {
	        type: 'category',
	        axisLabel: {
	            rotate: 30
	        }
	    },
	    yAxis: {
	        type: 'value',
	        name: '成员人数'
	    },
	    // 柱状图系列
	    series: [
	        {
	            name: '2024年',
	            type: 'bar',
	            itemStyle: {
	                color: '#45B7D1'
	            },
	            emphasis: { // 鼠标悬浮时加深颜色，增强交互
	                itemStyle: {
                    color: '#2E86AB'
                }
            }
        },
        {
            name: '2025年',
            type: 'bar',
            itemStyle: {
                color: '#FFA07A'
            },
            emphasis: {
                itemStyle: {
                    color: '#FF6347'
                }
            }
        }
    ]
	};

	echarts_pienum.setOption(pienum);
	echarts_piewin.setOption(piewin);
	echarts_histogram.setOption(histogram);
	// echarts 窗口缩放自适应
	window.onresize = function() {
		echarts_pienum.resize();
		echarts_piewin.resize();
		echarts_histogram.resize();
	}

});