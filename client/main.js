const form = document.querySelector('form')
const messageBoard = document.getElementById('messageBoard')
const serverURL = 'http://localhost:9090'

function handleMessage(e) {
  // e.preventDefault()
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
  console.log('display')
  let messages = await fetchMessages()

  messageBoard.innerHTML = '';
  messages.forEach(message => {
    let h3Txt = document.createElement('h3')
    let pTxt = document.createElement('p')
    let likes = document.createElement('p')
    let guestDiv = document.createElement('div')
    let delBtn = document.createElement('button')
    let likeBtn = document.createElement('button')
    
    guestDiv.setAttribute('class', 'guestDiv')
    h3Txt.textContent = message.name
    h3Txt.setAttribute('class', 'name')
    pTxt.textContent = message.message
    pTxt.setAttribute('class', 'message')
    delBtn.textContent = '❌'
    delBtn.setAttribute('class', 'delBtn')
    likes.innerHTML = message.likes
    likes.setAttribute('class', 'likesTxt')
    likeBtn.textContent = '👍'
    likeBtn.setAttribute('class', 'likeBtn')

    likeBtn.addEventListener('click', (e) => {
      e.preventDefault()
      handleLike(message.id, message.likes)
    })

    delBtn.addEventListener('click', (e) => {
      e.preventDefault()
      handleDel(message.id)
    })

    guestDiv.appendChild(h3Txt)
    guestDiv.appendChild(pTxt)
    guestDiv.appendChild(likes)
    guestDiv.appendChild(likeBtn)
    guestDiv.appendChild(delBtn)
    messageBoard.appendChild(guestDiv)
  })
}

async function handleDel(id) {
  const result = await fetch(`${serverURL}/guest/${id}`, {
    method: 'DELETE'
  })
  console.log(result)
  if (result.ok) {
    displayMessages()
  }
}

async function handleLike(id, likes) {
  const result = await fetch(`${serverURL}/guest/likes/${id}&${likes}`, {
    method: 'PUT'
  })
  console.log(result)
  if (result.ok) {
    displayMessages()
  }
}

displayMessages()

form.addEventListener('submit', handleMessage)