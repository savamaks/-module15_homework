const url = "wss://echo-ws-service.herokuapp.com";

const button = document.querySelector('.chat__send-button')
const chatTextField = document.querySelector('.chat__text-field')
const chatInput = document.querySelector('.chat__input')
const buttonGeolocation = document.querySelector('.geo')



function writeMessage(text, answer, geo ) {

    chatTextField.innerHTML += `<p class="chat__message ${answer}">${text}</p>`
}

let websocket = new WebSocket(url);

websocket.onopen = (evt) => {
    console.log('соединение открыто')
};
websocket.onclose = (evt) => {
    console.log('соединение закрыто')
};
websocket.onerror = (evt) => {
    writeMessage('ошибка соединения');
}



button.addEventListener('click', () => {

    if (chatInput.value.length > 0) {
        websocket.send(chatInput.value)
        writeMessage(chatInput.value)
        chatInput.value = null
        websocket.onmessage = (evt) => {
            writeMessage(evt.data, 'answer')
        };
    }
})

buttonGeolocation.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let geo = `<a target="_blank" class = "link" href="https://www.openstreetmap.org/#map=13/${coords.latitude}/${coords.longitude}">Геолокация</a>`
            writeMessage(geo);
            websocket.send(geo)
            websocket.onmessage = null;

        });
    }
})