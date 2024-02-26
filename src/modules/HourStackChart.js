

// get day range
let range = JSON.parse(document.currentScript.getAttribute('range'))

fetch('/DayActivity/getRange/' + JSON.stringify(range))
    .then((response) => {return response.json()})
    .then((day_data) => {
        // get label set
        let date_range = []
        let labels = new Set()
        day_data.forEach((date_json, i) => {
            for (let k in date_json) {
                date_range.push(k)
                for (let e in date_json[k]) {
                    labels.add(date_json[k][e].event)
                }
            }
        })
        labels = Array.from(labels)

        // make dataset
        let data_set = []
        // loop by labels
        for (let label of labels) {
            let data = []
            // loop through each day and add data if label matches
            for (let day of day_data) {
                for (let k in day) {
                    for (const event of day[k]) {
                        if (event.event === label) {
                            data.push({
                                'x': [new Date('2024-02-20T' + event.start), new Date('2024-02-20T' + event.end)],
                                'y': k
                            })
                        }
                    }
                }
            }
            let properties = {}
            console.log()

            // push data and chart properties into data_set
            data_set.push({
                'label': label,
                'data': data,

                // other properties for each chart label category
                'backgroundColor': 'rgba(255, 26, 104, 0.2)',
                'borderColor': 'rgba(255, 26, 104, 1)',
                'borderWidth': 1
            })
        }

        let chart = document.createElement('canvas')
        chart.id = 'chart'
        document.body.appendChild(chart)

        const myChart = new Chart(document.getElementById('chart'),
            {
                type: 'bar',
                data: {
                    labels: date_range,
                    datasets: data_set
                },
                options: {
                    indexAxis: 'y',
                    barPercentage: 1,
                    categoryPercentage: 1,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour'
                            },
                            min: new Date('2024-02-20T00:00'),
                            max: new Date('2024-02-20T24:00'),
                            position: 'top'
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true,
                        }
                    },
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }
            }
        )

    })
.catch((error) => {
    console.log(error)
})