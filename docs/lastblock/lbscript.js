const rpcEndpoint = 'https://nova.gemini-3h.subspace.network/ws';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const socket = new WebSocket(rpcEndpoint);

    socket.onopen = () => {
      console.log('WebSocket connection established!');
      socket.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "subspace_getBlockByNumber",
        "params": ["latest"],
        "id": 1
      }));
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      const response = JSON.parse(event.data);
      const latestBlock = response.result;

      const blockNumber = latestBlock.block_number;
      const timestamp = latestBlock.timestamp;

      const html = `
        <h2>Latest Block</h2>
        <p>Block Number: ${blockNumber}</p>
        <p>Timestamp: ${timestamp}</p>
      `;

      latestBlockContainer.innerHTML = html;
    };

    socket.onerror = (error) => {
      console.error('Error occurred:', error);
      latestBlockContainer.innerHTML = `Error: ${error.message}`;
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed!');
    };
  } catch (error) {
    console.error('Error fetching latest block:', error);
    latestBlockContainer.innerHTML = `Error: ${error.message}`;
  }
}

getLatestBlock();
