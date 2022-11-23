// Login

// Chat websocket
const socket = io.connect()

socket.on('messages', (data) => {
  renderChat(data)
})

function renderChat(data) {
  const html = data
    .map((elemento) => {
      return `<div> <strong style='color:blue'>${elemento.author.id}</strong>
      <em style='color:brown'>${elemento.date}</em>: 
              <em style='color:green; font-family: Italic'>${elemento.text}</em></div> `
    })
    .join(' ')
  document.getElementById('mensajes').innerHTML = html
}

function addMessage(e) {
  const mensaje = {
    author: {
      id: document.getElementById('id').value,
      nombre: document.getElementById('primernombre').value,
      apellido: document.getElementById('apellido').value,
      edad: document.getElementById('edad').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value,
    },
    text: document.getElementById('text').value,
  }
  socket.emit('new-message', mensaje)
  return false
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Productos websocket
socket.on('lista-productos', (prods) => {
  renderProds(prods)
})

function renderProds(data) {
  const html = data
    .map((prod) => {
      return `<tr>
                     <td>${prod.title}</td>
                     <td>${prod.price}</td>
                     <td><img
                         width="50"
                         src=${prod.thumbnail}
                         alt="not found"
                       /></td>
                   </tr>`
    })
    .join(' ')

  document.getElementById('vista_productos').innerHTML = html
}

//
(function getSessionUserEmail() {
  console.log("front cookie index", document.cookie)
  let obj = document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=')
    prev[name] = value.join('=')
    return prev
  }, {})
  console.log('front obj spliteado', obj)
  let html = decodeURIComponent(obj?.userEmail)
  document.getElementById('getUserEmail').innerHTML = html
})()
