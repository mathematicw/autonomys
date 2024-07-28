const rpcEndpoint = 'wss://rpc-0.gemini-3h.subspace.network/ws';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const socket = new WebSocket(rpcEndpoint);

    socket.onopen = () => {
      console.log('WebSocket connection established!');
      // Request the header of the latest block
      socket.send(JSON.stringify({
        "jsonrpc": "2.0",
        "method": "chain_getHeader",
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
        const latestBlockHash = response.result.hash;
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
  const parentHash = block.block.header.parentHash || 'N/A';
  const stateRoot = block.block.header.stateRoot || 'N/A';
  const extrinsicsRoot = block.block.header.extrinsicsRoot || 'N/A';
  const digestLogs = block.block.header.digest.logs || [];
  const extrinsics = block.block.extrinsics || [];

  // Format digest logs and extrinsics
  const digestLogsHTML = digestLogs.length > 0
    ? `<ul>${digestLogs.map(log => `<li>${log}</li>`).join('')}</ul>`
    : '<p>No digest logs found in this block.</p>';
  const extrinsicsHTML = extrinsics.length > 0
    ? `<ul>${extrinsics.map((ext, index) => `<li>Extrinsic ${index + 1}: ${ext}</li>`).join('')}</ul>`
    : '<p>No extrinsics found in this block.</p>';

  const html = `
    <div class="block-info">
      <div>
        <p><strong>Block Number:</strong> ${blockNumber}</p>
      </div>
      <div>
        <p><strong>Parent Hash:</strong> ${parentHash}</p>
      </div>
      <div>
        <p><strong>State Root:</strong> ${stateRoot}</p>
      </div>
      <div>
        <p><strong>Extrinsics Root:</strong> ${extrinsicsRoot}</p>
      </div>
    </div>
    <h3>Digest Logs:</h3>
    ${digestLogsHTML}
    <h3>Extrinsics:</h3>
    ${extrinsicsHTML}
  `;
  latestBlockContainer.innerHTML = html;
}

getLatestBlock();
