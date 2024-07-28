async function getLatestBlock() {
  try {
    console.log('Making API request...');
    const response = await fetch(`${apiEndpoint}/blocks/latest?module=block&action=getblockcount`);
    console.log('API response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const latestBlock = await response.json();
    console.log('Latest block data:', latestBlock);

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
  } catch (error) {
    console.error('Error fetching latest block:', error);
    latestBlockContainer.innerHTML = `Error: ${error.message}`;
  }
}
