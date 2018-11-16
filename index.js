let barData, chart;

// set data and labels for bar chart
function setChart() {
    // get the normalized totals object from api
    $.get('https://btb-api.herokuapp.com/totals', function (res) {
        // set response to global variable for access elsewhere
        barData = res

        // chartJS setup
        let ctx = document.getElementById("barChart").getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: barData.success.labels,
                datasets: [{
                    label: 'Successful Logins',
                    data: barData.success.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(200, 7, 223, 0.2)',
                        'rgba(20, 227, 123, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(200, 7, 223, 1)',
                        'rgba(20, 227, 123, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 30
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    })
}
// switch chart data to success or fail data
function switchChart(currentChart) {
    // change the selected button styling and change labels of chart 
    currentChart === 'success' ? [$(`#successBtn`).addClass('selected'),
        $(`#failsBtn`).removeClass('selected'),
        chart.config.data.datasets[0].label = `Successful Logins`
    ] : [$(`#successBtn`).removeClass('selected'),
        $(`#failsBtn`).addClass('selected'),
        chart.config.data.datasets[0].label = `Failed Logins`
    ]
    // set data
    chart.config.data.datasets[0].data = barData[currentChart].data
    // set labels
    chart.config.data.labels = barData[currentChart].labels

    // update chart
    chart.update();
}

$(function () {
    setChart()
    // chart switching btns
    $('#successBtn, #failsBtn').on('click', function (e) {
        e.currentTarget.id === 'successBtn' ? switchChart('success') : switchChart('fail')
    })
});