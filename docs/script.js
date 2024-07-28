const apiEndpoint = 'https://nova.gemini-3h.subspace.network/api/rpc';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const response = await fetch(`${apiEndpoint}/chain/getBlock`);
    console.log('API response:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const latestBlock = await response.json();
    console.log('Latest block data:', latestBlock);

    const blockNumber = latestBlock.block.header.number;
    const timestamp = latestBlock.block.extrinsics[0].method.args[0];

    const html = `
      <h2>Latest Block</h2>
      <p>Block Number: ${blockNumber}</p>
      <p>Timestamp: ${timestamp}</p>
    `;

    latestBlockContainer.innerHTML = html;
  } catch (error) {
    console.error('Error fetching latest block:', error);
    latestBlockContainer.innerHTML = `Error: ${error.message}`;
  }
}

getLatestBlock();
