const form = document.querySelector('form')
const messageBoard = document.getElementById('messageBoard')
const serverURL = 'http://localhost:9090'

function handleMessage(e) {
  e.preventDefault()
  console.log('form submitted!')

  const formData = new FormData(form)
  const messages = Object.fromEntries(formData)

  fetch(`${serverURL}/guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({messages})
  })
}

async function fetchMessages() {
  const messages = await fetch(`${serverURL}/guest`)
  let result = await messages.json()
  return result
}

async function displayMessages() {
  let messages = await fetchMessages()

  messageBoard.innerHTML = '';
  messages.forEach(message => {
    let h3Txt = document.createElement('h3')
    let pTxt = document.createElement('p')
    
    h3Txt.textContent = message.name
    h3Txt.setAttribute('class', 'name')
    pTxt.textContent = message.message
    pTxt.setAttribute('class', 'message')

    messageBoard.appendChild(h3Txt)
    messageBoard.appendChild(pTxt)
  })
}

displayMessages()

form.addEventListener('submit', handleMessage)