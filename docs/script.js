const apiEndpoint = 'https://api.subspace.network/api/v1/blocks/latest';

async function getLatestBlock() {
  try {
    const response = await fetch(apiEndpoint);
    const latestBlock = await response.json();

    // Extract the fields you want to display
    const blockNumber = latestBlock.number;
    const timestamp = latestBlock.timestamp;
    const transactions = latestBlock.transactions;

    // Create the HTML content
    const html = `
      <h2>Latest Block</h2>
      <p>Block Number: ${blockNumber}</p>
      <p>Timestamp: ${timestamp}</p>
      <p>Transactions: ${transactions.length}</p>
    `;

    // Update the container with the latest block information
    latestBlockContainer.innerHTML = html;
  } catch (error) {
    console.error('Error fetching latest block:', error);
  }
}

