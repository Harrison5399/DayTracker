fetch('/DayActivity/getChartProperties/')
    .then((res) => {return res.json()})
    .then((chart_properties) => {
        console.log(chart_properties)

        const global_title = document.createElement('h3')
        global_title.innerText = '&nbsp; global:'
        document.body.appendChild(global_title)

        const global_container = document.createElement('div')
        global_container.id = 'global_container'

        for (let global_k in chart_properties.global) {
            const container = document.createElement('div')
            container.className = 'key_value'

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

        const local_title = document.createElement('h3')
        local_title.innerText = '&nbsp; local:'
        document.body.appendChild(local_title)

        const local_container = document.createElement('div')
        local_container.id = 'local_container'

        for (let local_k in chart_properties.local) {

            const label_properties = document.createElement('div')

            const label = document.createElement('h5')
            label.innerText = local_k
            label_properties.appendChild(label)

            for (let property in chart_properties.local[local_k]) {
                const container = document.createElement('div')
                container.className = 'key_value'

                const key = document.createElement('p')
                key.innerText = property + ' : '
                container.appendChild(key)

                const value = document.createElement('input')
                value.type = 'text'
                value.className = 'local'
                value.name = property
                value.innerText = chart_properties.local[local_k][property]
                container.appendChild(value)

                label_properties.appendChild(container)
            }
            document.body.appendChild(label_properties)
        }
    })