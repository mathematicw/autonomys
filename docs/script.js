const rpcEndpoint = 'wss://rpc-0.gemini-3h.subspace.network/ws';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const socket = new WebSocket(rpcEndpoint);

    socket.onopen = () => {
      console.log('WebSocket connection established!');
      // Request the latest block hash
      socket.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "chain_getBlockHash",
        "params": [],
        "id": 1
      }));
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      const response = JSON.parse(event.data);

      if (response.error) {
        console.error('Error:', response.error);
        latestBlockContainer.innerHTML = `Error: ${response.error.message}`;
        return;
      }

      // Handle the response based on the request id
      if (response.id === 1) {
        const latestBlockHash = response.result;
        // Request the latest block using the latest block hash
        socket.send(JSON.stringify({
          "jsonrpc": "2.0",
          "method": "chain_getBlock",
          "params": [latestBlockHash],
          "id": 2
        }));
      } else if (response.id === 2) {
        const block = response.result;
        displayLatestBlock(block);
      }
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

function displayLatestBlock(block) {
  const blockNumber = parseInt(block.block.header.number, 16); // Parse hex to integer
  const blockHash = block.block.header.hash;
  const parentHash = block.block.header.parentHash;
  const stateRoot = block.block.header.stateRoot;
  const extrinsicsRoot = block.block.header.extrinsicsRoot;

  const html = `
    <h2>Latest Block</h2>
    <p><strong>Block Number:</strong> ${blockNumber}</p>
    <p><strong>Block Hash:</strong> ${blockHash}</p>
    <p><strong>Parent Hash:</strong> ${parentHash}</p>
    <p><strong>State Root:</strong> ${stateRoot}</p>
    <p><strong>Extrinsics Root:</strong> ${extrinsicsRoot}</p>
  `;
  latestBlockContainer.innerHTML = html;
}

getLatestBlock();
