fetch('/DayActivity/getChartProperties/')
    .then((res) => {return res.json()})
    .then((chart_properties) => {
        console.log(chart_properties)

        const global_title = document.createElement('h4')
        global_title.innerText = '\tglobal:'
        document.body.appendChild(global_title)

        const global_container = document.createElement('div')
        global_container.id = 'global_container'

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
            value.placeholder = chart_properties.global[global_k]

            container.appendChild(value)
            global_container.appendChild(container)
        }

        document.body.appendChild(global_container)
    })