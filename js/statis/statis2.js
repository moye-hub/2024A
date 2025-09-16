// 定义全局变量
var $;
layui.use(['form', 'layer', 'laydate'], function() {
	$ = layui.jquery;
	var form = layui.form,
		layer = layui.layer,
		laydate = layui.laydate;
	//日期1（若页面无#grade元素，可注释避免报错）
	laydate.render({
		elem: '#grade',
		type: 'year'
	});
	//日期2（若页面无#daterange元素，可注释避免报错）
	laydate.render({
		elem: '#daterange',
		type: 'month',
		range: '~'
	});
	
	// 监听搜索_1操作（添加try-catch避免table未定义报错）
	form.on('submit(data-search-btn1)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		try {
			table.reload('userloginlogTable', {
				page: {
					curr: 1
				},
				where: {
					searchParams: result
				}
			}, 'data');
		} catch (e) {
			console.log("表格不存在，跳过重载：", e);
		}
		return false;
	});
	// 监听搜索_2操作（同上）
	form.on('submit(data-search-btn2)', function(data) {
		var result = JSON.stringify(data.field);
		layer.alert(result, {
			title: '最终的搜索信息'
		});
		try {
			table.reload('userloginlogTable', {
				page: {
					curr: 1
				},
				where: {
					searchParams: result
				}
			}, 'data');
		} catch (e) {
			console.log("表格不存在，跳过重载：", e);
		}
		return false;
	});
	
	
    /**
	 * 图表统计
	 */
	var echarts_pienum = echarts.init(document.getElementById('pienum'), 'walden');
	var echarts_piewin = echarts.init(document.getElementById('piewin'), 'walden');
	// 保留原ID和变量名，仅修改图表类型为折线图
	var echarts_histogram = echarts.init(document.getElementById('histogrammajor'), 'walden');
	
	// 1. 课程类型统计饼图
	var pienum = {
	    title : {
	        text: '根据各课程类型统计成员人数饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['团课','小班课','私教课']
	    },
	    series : [
	        {
	            name: '预约人数', // 修正名称，与数据含义匹配
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
				color: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
	            data:[
	                {value:500, name:'小班课'},
	                {value:890, name:'团课'},
	                {value:350, name:'私教课'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(255, 170, 255, 0.5)'
	                }
	            }
	        }
	    ]
	};
	// 2. 课程名预约统计饼图
	var piewin = {
	    title : {
	        text: '根据课程名统计预约人数饼图', // 原“年龄统计”错误，修正为课程名
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['进阶瑜伽课','基础瑜伽课','高强度间歇训练课','拳击','动感单车']
	    },
	    series : [
	        {
	            name: '预约人数',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
				color: ['#FF6B6B', '#4ECDC4', '#45B7D1','#55aaff','#aaaaff'],
	            data:[
	                {value:500, name:'进阶瑜伽课'},
	                {value:556, name:'基础瑜伽课'},
	                {value:410, name:'高强度间歇训练课'},
	                {value:335, name:'拳击'},
	                {value:148, name:'动感单车'}
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

	var lineOption = {
	    title: {
	        text: '各课程不同时段预约人数折线图', // 标题匹配折线图含义
	        left: 'center',
	        textStyle: {
	            fontSize: 16,
	            fontWeight: 'bold'
	        }
	    },
	    tooltip: {
	        trigger: 'axis', // 触发方式：按坐标轴（显示同一条线上的所有数据）
	        axisPointer: {
	            type: 'shadow' // 鼠标悬浮时显示阴影指示器，增强交互感
	        },
	        // 自定义提示内容：时段 + 课程 + 预约人数
	        formatter: function(params) {
	            var html = `<div>时段：${params[0].name}</div>`;
	            params.forEach(item => {
	                html += `<div>${item.seriesName}：${item.value}人</div>`;
	            });
	            return html;
	        }
	    },
	    legend: {
	        top: 30, // 图例位置（避免与标题重叠）
	        left: 'center',
	        data: ['进阶瑜伽课', '拳击', '动感单车', '高强度间歇训练课', '基础瑜伽课'], // 图例与课程名一致
	        textStyle: {
	            fontSize: 12
	        }
	    },
	    // X轴：时段（0:00-12:00、12:00-24:00）
	    xAxis: {
	        type: 'category',
	        data: ['0:00-12:00', '12:00-24:00'],
	        axisLabel: {
	            fontSize: 12,
	            color: '#333'
	        },
	        axisLine: {
	            color: '#eee' // X轴线颜色，提升视觉轻量感
	        }
	    },
	    // Y轴：预约人数（设置合理范围，避免数据溢出或过于紧凑）
	    yAxis: {
	        type: 'value',
	        min: 0,
	        max: 500, // 覆盖数据中最大预约人数450
	        axisLabel: {
	            formatter: '{value}人', // 显示“人数”单位
	            fontSize: 12,
	            color: '#333'
	        },
	        axisLine: {
	            color: '#eee'
	        },
	        splitLine: {
	            color: '#f5f5f5' // 网格线颜色，增强可读性
	        }
	    },
	    // 折线图系列（每个课程对应一条折线，数据与时段匹配）
	    series: [
	        {
	            name: '进阶瑜伽课',
	            type: 'line', // 图表类型：折线图
	            data: [256, 300], // 0:00-12:00人数、12:00-24:00人数
	            lineStyle: {
	                width: 3, // 线条粗细
	                color: '#FF6B6B' // 线条颜色（与前序饼图颜色风格统一）
	            },
	            symbol: 'circle', // 数据点样式：圆形
	            symbolSize: 8, // 数据点大小
	            itemStyle: {
	                color: '#FF6B6B', // 数据点颜色
	                borderWidth: 2,
	                borderColor: '#fff' // 数据点白色边框，避免与线条混淆
	            }
	        },
	        {
	            name: '拳击',
	            type: 'line',
	            data: [135, 200],
	            lineStyle: { width: 3, color: '#4ECDC4' },
	            symbol: 'circle',
	            symbolSize: 8,
	            itemStyle: { color: '#4ECDC4', borderWidth: 2, borderColor: '#fff' }
	        },
	        {
	            name: '动感单车',
	            type: 'line',
	            data: [58, 90],
	            lineStyle: { width: 3, color: '#45B7D1' },
	            symbol: 'circle',
	            symbolSize: 8,
	            itemStyle: { color: '#45B7D1', borderWidth: 2, borderColor: '#fff' }
	        },
	        {
	            name: '高强度间歇训练课',
	            type: 'line',
	            data: [180, 230],
	            lineStyle: { width: 3, color: '#55aaff' },
	            symbol: 'circle',
	            symbolSize: 8,
	            itemStyle: { color: '#55aaff', borderWidth: 2, borderColor: '#fff' }
	        },
	        {
	            name: '基础瑜伽课',
	            type: 'line',
	            data: [150, 350],
	            lineStyle: { width: 3, color: '#aaaaff' },
	            symbol: 'circle',
	            symbolSize: 8,
	            itemStyle: { color: '#aaaaff', borderWidth: 2, borderColor: '#fff' }
	        }
	    ],

	    toolbox: {
	        show: true,
	        feature: {
	            mark: { show: true },
	            dataView: { show: true, readOnly: false },
	            magicType: { show: true, type: ['line', 'bar', 'pie'] }, // 支持切换为折线图/柱状图
	            restore: { show: true },
	            saveAsImage: { show: true }
	        }
	    },
	    // 网格配置：调整图表与容器边距，避免内容溢出
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '15%',
	        top: '20%',
	        containLabel: true // 确保轴标签不被截断
	    }
	};

	// 渲染图表
	echarts_pienum.setOption(pienum);
	echarts_piewin.setOption(piewin);
	echarts_histogram.setOption(lineOption); // 折线图配置赋值给原柱状图变量
	
	// 窗口缩放自适应
	window.onresize = function() {
		echarts_pienum.resize();
		echarts_piewin.resize();
		echarts_histogram.resize(); // 折线图同步自适应
	}

});