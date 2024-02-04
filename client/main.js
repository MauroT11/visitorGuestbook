const form = document.querySelector('form')
const messageBoard = document.getElementById('messageBoard')
const serverURL = 'http://localhost:9090'

function handleMessage(e) {
  e.preventDefault()

  const formData = new FormData(form)
  const messages = Object.fromEntries(formData)
  const submitDate = new Date()

  const date = `${submitDate.getUTCDate()}/${(submitDate.getUTCMonth() + 1)}/${submitDate.getUTCFullYear()} ${submitDate.getUTCHours()}:${submitDate.getMinutes()}`
  console.log(date)

  // CHECKS IF BOTH INPUT AND TEXTAREA HAVE A VALUE BEFORE SUBMITTING TO DB
  if (messages.name == '' || messages.message == '') {
    alert("Name & message must be filled out!")
  } else {
    console.log('form submitted!')
    fetch(`${serverURL}/guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
      body: JSON.stringify({messages, date})
    })

  }

  
}

async function fetchMessages() {
  const messages = await fetch(`${serverURL}/guest`)
  let result = await messages.json()
  return result
}

async function displayMessages() {
  // console.log('display')
  let messages = await fetchMessages()

  messageBoard.innerHTML = '';
  messages.forEach(message => {
    let h3Txt = document.createElement('h3')
    let pTxt = document.createElement('p')
    let likes = document.createElement('p')
    let date = document.createElement('p')
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

    date.textContent = message.date
    date.setAttribute('class', 'date')


    likeBtn.addEventListener('click', (e) => {
      e.preventDefault()
      handleLike(message.id, message.likes)
    })

    delBtn.addEventListener('click', (e) => {
      e.preventDefault()
      handleDel(message.id)
    })

    guestDiv.appendChild(date)
    guestDiv.appendChild(h3Txt)
    guestDiv.appendChild(pTxt)
    guestDiv.appendChild(likes)
    guestDiv.appendChild(likeBtn)
    guestDiv.appendChild(delBtn)
    messageBoard.appendChild(guestDiv)
  })
}

// DELETES MESSAGE WHEN DELETE BUTTON IS PRESSED
async function handleDel(id) {
  const result = await fetch(`${serverURL}/guest/${id}`, {
    method: 'DELETE'
  })
  console.log(result)
  if (result.ok) {
    displayMessages()
  }
}

//LIKES MESSAGE WHEN LIKE BUTTON IS PRESSED
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