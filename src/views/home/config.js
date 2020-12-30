export function generateConfig(res) {
    const {article,user} = res.growth;
    const xAxisData=[],seriesData1=[],seriesData2=[]
    for(let v of user) {
        xAxisData.push(v.time)
        seriesData1.push(v.count)
    }
    for(let v of article) {
        seriesData2.push(v.count)
    }
    return {
        lineConfig: {
            title: {
                text: '近七天数据',
                left: 'left'
            },
            legend: {
                textStyle: {
                    fontSize: "16px"
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            animationDuration: 1200,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '用户新增数',
                    type: 'line',
                    smooth: 0.6,
                    lineStyle: {
                        width: 3
                    },
                    areaStyle:{},
                    data: seriesData1,
                    symbolSize:10
                },
                {
                    name: '文章发布量',
                    type: 'line',
                    smooth: 0.6,
                    lineStyle: {
                        width: 3
                    },
                    areaStyle:{},
                    data: seriesData2,
                    symbolSize:10
                }
            ]
        },
        sexConfig: {
            title: {
                text: '用户性别比例',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['男', '女', '未知'],
            },
            series: [
                {
                    animationDuration: 1200,
                    name: '占比',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: res.gender_info.man_count, name: '男'},
                        {value: res.gender_info.woman_count, name: '女'},
                        {value: res.gender_info.un, name: '未知'},
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        totalArticle: {
            title: {
                text: '总文章数',
                left: 'center'
            },
            series: [
                {
                    animationDuration: 1200,
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        fontSize: '26px',
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '26px',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        {value: res.article_total, name: res.article_total, itemStyle: {color: "#28a6c6"}, label: {color: "#2c4b2f"}},
                    ],
                }
            ]
        },
        totalUser: {
            title: {
                text: '总用户数',
                left: 'center'
            },
            series: [
                {
                    animationDuration: 1200,
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        fontSize: '26px',
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '26px',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        {value: res.user_total, name: res.user_total, itemStyle: {color: "#b086d2"}, label: {color: "#2c4b2f"}},
                    ],
                }
            ]
        },
    }
}