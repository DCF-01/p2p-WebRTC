let input_field = document.getElementById('input');
let btn = document.getElementById('submit');
let btn_call = document.getElementById('btn-call');
let status_text = document.getElementById('status-text');
let peer_id = document.getElementById('peer-id');
let video = document.getElementById('video');
let title = document.querySelector('title');


let peer = new Peer();
let conn;


peer.on('open', (id) => {
    if (peer.id === null) {
        console.log('Received null id from peer open');
        peer.id = lastPeerId;
    }
    peer_id.innerHTML = 'Peer ID: ' + peer.id;
    title.text = peer.id;
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

const options = {
    video: {
      cursor: "always"
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100
    }
  }

function call(){
    navigator.mediaDevices.getDisplayMedia(options)
        .then(stream => {
            peer.call(input_field.value, stream);
        });
}

peer.on('call', function(call) {
    // navigator.mediaDevices.getDisplayMedia(options)
    //     .then(() => {
            // call.answer();
        // })
    call.answer();
    call.on('stream', function(stream) {
        video.srcObject = stream;
    })

    // call.on('stream', function(stream) {
    //     video.srcObject = stream;
    // });
})


btn.addEventListener('click', () => {
    console.log('clicked');
    join();
})

btn_call.addEventListener('click', () => {
    console.log('call clicked');
    call();
})