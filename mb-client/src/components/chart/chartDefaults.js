
const chartDefaults = {} ;
chartDefaults.bars = {
    chart: {
        type: 'column',
        backgroundColor: 'transparent',
        margin: [0,0,30,30],
        height: 250,
    },
    title: {enabled: false},
    credits: false,
    xAxis: {
        type: 'category',
        labels:{
            useHTML: true,
            step: 1,
        },
    },
    yAxis: {
        min: 0,
        title: {enabled: false},
        gridLineColor: 'transparent',
        labels: {enabled: false},
        stackLabels: {
            enabled: true,
            style: {
                fontSize: 14,
                fontWeight: 'bold',
                color: '#999',
                textOutline: null,
            }
        }
    },
    legend:{enabled: false},
    tooltip: {
        pointFormat: '{point.y}/{point.stackTotal}'
    },
    plotOptions: {
        series: {
            borderColor: '#EEE'
        },
        column: {
            stacking: 'normal',
            // dataLabels: {
            //     enabled: true
            // }
        }
    },
}

export default chartDefaults;