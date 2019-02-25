var socket = io.connect('http://192.168.0.164:6677', { 'forceNew': true });

socket.on('messages', function (data) {
    render(data);
});

function render(data) {
    var html = data.map(function (message) {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var div_msg = document.getElementById('messages'); 
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(event) {
var inputNickname = document.getElementById('nickname');

    var message = {
        nickname: inputNickname.value,
        text: document.getElementById('text').value
    };

    inputNickname.style.display = 'none';
    socket.emit('add-message', message);

    return false;
}