// initialize form
let container = document.createElement('div')
container.className = 'container'
document.body.appendChild(container)

let input_title = document.createElement('h2')
input_title.innerText = 'label:'
container.appendChild(input_title)

let input = document.createElement('input')
input.type = 'text'
input.name = 'label'
input.id = 'label'
container.appendChild(input)

let  btn = document.createElement('input')
btn.type = 'button'
btn.value = 'submit'
btn.onclick = function(){postEdit()};
container.appendChild(btn)

function postEdit() {
    let event = document.getElementById('label').value

    if (event !== '') {

        let post_data = {
            'activity': event
        }
        fetch('/DayActivity/editActivity/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post_data)
        })
            .then((res) => {
                console.log(JSON.stringify(res))
                console.log('POSTED: ' + event)
            })
    }
}