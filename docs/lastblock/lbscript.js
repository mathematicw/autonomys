axios.get('https://nova.gemini-3h.subspace.network/api')
  .then(response => {
    if (response.status === 200) {
      const blocks = response.data.blocks;
      const lastBlock = blocks[blocks.length - 1];
      displayLastBlock(lastBlock);
    } else {
      console.error('Failed to retrieve blockchain data');
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

function displayLastBlock(lastBlock) {
  const lastBlockElement = document.getElementById('lastBlock');
  const formattedLastBlock = JSON.stringify(lastBlock, null, 2);
  lastBlockElement.textContent = formattedLastBlock;
}
