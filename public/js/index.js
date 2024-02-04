const socket = io()
let userName

Swal.fire({
    title: 'ingrese su nombre',
    input: 'text',
    inputValidator: (value) => {
        if(!value){
            return 'tienes que ingresar tu nombre'
        }
    }
  }).then (data=>{
    userName = data.value
    socket.emit('newUser', userName)
  })

  const inputData = document.getElementById('inputData')
  const outputData = document.getElementById('outputData')


  inputData.addEventListener('keyup' , (event) => {
    if(event.key === 'Enter'){
        if (inputData.value.trim()) {
        socket.emit('message', { user: userName, data: inputData.value  })
        inputData.value=''
    }
    
  }})

  socket.on('messageLogs', data => {
    let messages = ''
    data.forEach(message => {
        messages += `${message.user} dice ${message.data} <br /> `;
    });
    
    outputData.innerHTML = messages

  })
  socket.on('newConnection', data =>{
    console.log ('un nuevo usuario se conecto')
  })

  socket.on('notification', data =>{
    swal.fire({
        text: `${data} se conecto`,
        toast: true,
        position: 'top-right'
    })
  })