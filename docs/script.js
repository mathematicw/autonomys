const apiEndpoint = 'https://nova.gemini-3h.subspace.network/api';
const latestBlockContainer = document.getElementById('latest-block');

async function getLatestBlock() {
  try {
    const response = await fetch(`${apiEndpoint}?module=blocks&action=getblockbynumber&blocknumber=latest`);
    const latestBlock = await response.json();

    // Extract the fields you want to display
    const blockNumber = latestBlock.block_number;
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
    latestBlockContainer.innerHTML = `Error: ${error.message}`;
  }
}

// Call the function to fetch and display the latest block
getLatestBlock();

