const apiEndpoint = 'wss://rpc-1.gemini-3h.subspace.network/ws';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    console.log('Connecting to WebSocket...');
    const socket = new WebSocket(apiEndpoint);

    socket.onopen = () => {
      console.log('WebSocket connected!');
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

      // Extract the fields you want to display
      const blockNumber = latestBlock.block_number;
      const timestamp = latestBlock.timestamp;

      // Create the HTML content
      const html = `
        <h2>Latest Block</h2>
        <p>Block Number: ${blockNumber}</p>
        <p>Timestamp: ${timestamp}</p>
      `;

      // Update the container with the latest block information
      latestBlockContainer.innerHTML = html;
    };

    socket.onerror = (error) => {
      console.error('Error occurred:', error);
      latestBlockContainer.innerHTML = `Error: ${error.message}`;
    };

    socket.onclose = () => {
      console.log('WebSocket closed!');
    };
  } catch (error) {
    console.error('Error fetching latest block:', error);
    latestBlockContainer.innerHTML = `Error: ${error.message}`;
  }
}

// Call the function to fetch and display the latest block
getLatestBlock();
