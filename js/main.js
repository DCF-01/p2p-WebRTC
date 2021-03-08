let input_field = document.getElementById('input');
let btn = document.getElementById('submit');
let status_text = document.getElementById('status-text');
let peer_id = document.getElementById('peer-id');



let peer = new Peer();
let conn;


peer.on('open', (id) => {
    if (peer.id === null) {
        console.log('Received null id from peer open');
        peer.id = lastPeerId;
    }
    peer_id.innerHTML = 'Peer ID: ' + peer.id;
    console.log('ID: ' + peer.id);

});

peer.on('connection', (c) => {
    conn = c;

    console.log('Connected to: ' + conn.peer);
    status_text.innerHTML='Connected to:' + conn.peer;
})

function join(){
    conn = peer.connect(input_field.value, {
        reliable: true
    });

    conn.on('open', () => {
        status_text.innerHTML = 'Connected to:' + conn.peer;
        console.log('Connected to:' + conn.peer)
    })

}


btn.addEventListener('click', () => {
    console.log('clicked');
    join();
})