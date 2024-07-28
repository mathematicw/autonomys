const rpcEndpoint = 'wss://rpc-0.gemini-3h.subspace.network/ws';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const socket = new WebSocket(rpcEndpoint);

    socket.onopen = () => {
      console.log('WebSocket connection established!');
      socket.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "chain_getBlockHash",
        "params": ["0x0"],
        "id": 1
      }));
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);

      if (event.data.startsWith('#img-representation-')) {
        console.log('Received block data:', event.data);
        const html = `
          <h2>Latest Block</h2>
          <p>${event.data}</p>
        `;
        latestBlockContainer.innerHTML = html;
      } else {
        const response = JSON.parse(event.data);

        if (response.error) {
          console.error('Error:', response.error);
          latestBlockContainer.innerHTML = `Error: ${response.error.message}`;
        } else if (response.id === 1) {
          const blockHash = response.result;
          socket.send(JSON.stringify({
            "jsonrpc": "2.0",
            "method": "chain_getBlock",
            "params": [blockHash],
            "id": 2
          }));
        }
      }
    };


    socket.onerror = (error) => {
      console.error('Error occurred:', error);
      latestBlockContainer.innerHTML = `Error: ${error.message}`;
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed!');
      latestBlockContainer.innerHTML = 'WebSocket connection closed!';
    };
  } catch (error) {
    console.error('Error fetching latest block:', error);
    latestBlockContainer.innerHTML = `Error: ${error.message}`;
  }
}

getLatestBlock();
