function initializePeer() {
    const username = document.getElementById('myUsername').value.trim();
    if (!username) return alert("Please enter a username");

    // Adding STUN servers to bypass Firewalls/NAT
    peer = new Peer(username, {
        config: {
            'iceServers': [
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'stun:stun1.l.google.com:19302' }
            ]
        }
    });

    peer.on('open', (id) => {
        document.getElementById('myIdDisplay').innerText = `Your ID is active: ${id}`;
        document.getElementById('setIDBtn').disabled = true;
        document.getElementById('myUsername').disabled = true;
        document.getElementById('connectBox').style.display = 'block';
    });

    peer.on('connection', (connection) => {
        conn = connection;
        setupConnection();
        startGame('looker');
    });

    peer.on('error', (err) => {
        console.error(err);
        alert("Connection Error: " + err.type);
    });
}
