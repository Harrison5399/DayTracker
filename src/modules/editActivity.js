
// initialize form
let input_title = document.createElement('h2')
input_title.innerText = 'label:'
document.appendChild(input_title)

let input = document.createElement('input')
input.type = 'text'
input.name = 'label'
input.id = 'label'
document.appendChild(input)

let  btn = document.createElement('input')
btn.type = 'button'
btn.value = 'submit'
btn.onclick = function(){postEdit()};
document.appendChild(btn)

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