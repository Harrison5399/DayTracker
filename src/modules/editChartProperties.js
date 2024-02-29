fetch('/DayActivity/getChartProperties/')
    .then((res) => {return res.json()})
    .then((chart_properties) => {
        console.log(chart_properties)

        const global_title = document.createElement('h4')
        global_title.innerText = '\tglobal:'
        document.body.appendChild(global_title)

        for (let global_k in chart_properties.global) {
            const container = document.createElement('div')
            container.className = 'keyvalue'

            const key = document.createElement('p')
            key.innerText = global_k + ' : '
            container.appendChild(key)

            const value = document.createElement('input')
            value.type = 'text'
            value.className = 'global'
            value.name = global_k
            value.innerText = chart_properties.global[global_k]

            container.appendChild(value)

        }
    })