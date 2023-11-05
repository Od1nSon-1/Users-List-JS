
// Пример парсинга и работы с JSON файлами

const car = {
	name: 'ford',
	color: 'red'
}

const json = JSON.stringify(car)
console.log(json)
const parsed = JSON.parse(json)
console.log(parsed)

const list = document.querySelector('#list')
const filter = document.querySelector('#filter')
let USERS = []

filter.addEventListener('input', (event) => {
	const value = event.target.value.toLowerCase()
	const filteresUsers = USERS.filter((user) => {
		return user.name.toLowerCase().includes(value)
	})
	render(filteresUsers)
})

async function start() {
	list.innerHTML = "Loading..."
	list.style.color = 'orange'
	try {
		const resp = await fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' })
		const data = await resp.json()
		setTimeout(() => { USERS = data, render(data) }, 2000)
	} catch (error) {
		list.style.color = 'red'
		list.innerHTML = error.message
	}
}

function render(users = []) {
	if (users.length === 0) {
		list.innerHTML = 'No matched users!'
	} else {
		const html = users.map(toHTML).join('')
		list.innerHTML = html
	}
}

function toHTML(user) {
	return `
	<li class ="list-group-item">${user.name}</li>
	`

}

start()