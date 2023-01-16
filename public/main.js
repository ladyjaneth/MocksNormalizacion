//CHAT
const socket= io();

socket.on('messages', data=>{
    console.log(data);
    if(data.length != 0){
        const html = data.map(msj=>{
            return `<div>
            <strong style='color: blue'>${msj.author.id}</strong>
            <strong style='color: Brown'<em>[${msj?.date}]</em></strong>
            <strong><em>${msj.text}</em></strong>

            </div>`
        })
        .join(' ')
        document.getElementById('chat').innerHTML = html;
    }
});

//FUNCIÓN DEL FORMULARIO USUARIO
function addMessage(event){ //eventos que ocurren sobre el formulario
    event.preventDefault();//no recargar la página 
    const formularioProducto = document.getElementById('form-product');//html traer el form capturo la información del formulario
    const mensaje = {
        author:{
            id: formularioProducto.email.value,
            nombre: formularioProducto.nombre.value,
            apellido: formularioProducto.apellido.value,
            edad: formularioProducto.edad.value,
            alias: formularioProducto.alias.value,
            avatar: formularioProducto.avatar.value
        },
        text: formularioProducto.text.value
    };
    
    socket.emit('new-message', mensaje)//envio al servirod
    formularioProducto.reset();
    return
}
    
