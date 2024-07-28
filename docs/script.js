const apiEndpoint = 'https://nova.gemini-3h.subspace.network/api/v1';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const response = await fetch(`${apiEndpoint}/blocks/latest`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const latestBlock = await response.json();

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
