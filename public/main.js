const socket = io.connect()

socket.on('messages', data => {
    console.log(data)
})

const render = (data) => {
    const html = data.map((elem) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    document.getElementById("messages").innerHTML = html
}

socket.on("messages", data => {render(data)})

const addMessage = () => {
    const mensaje = {
        author: document.getElementById("username").value,
        text: document.getElementById("texto").value
    }
    socket.emit('new-message', mensaje);
    return false
}