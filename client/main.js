const form = document.querySelector('form')

function handleMessage(e) {
  e.preventDefault()
  console.log('form submitted!')

  const formData = new FormData(form)
  const message = Object.fromEntries(formData)

  console.log(message)
}

form.addEventListener('submit', handleMessage)