const apiEndpoint = 'https://nova.gemini-3h.subspace.network/api/v1';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const response = await fetch(`${apiEndpoint}/blocks/latest`);
    console.log('API response:', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const latestBlock = await response.json();
    console.log('Latest block data:', latestBlock);

    const blockNumber = latestBlock.block_number;
    const timestamp = latestBlock.timestamp;

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
