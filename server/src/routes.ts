import { Router } from 'express';

const router = Router();

// GET route for testing
router.get('/', (req, res) => {
  res.send('Hello World!');
});

/* 
  This service allows users to connect their cryptocurrency wallet to the Agentic Tools platform.
  The wallet must be connected before any currency swaps can be performed.
*/
router.post('/connect-wallet', (req, res) => {
  const { walletAddress, walletType } = req.body;

  // Validate the required parameters
  if (!walletAddress || !walletType) {
    return res.status(400).json({
      error: 'Missing required parameters: walletAddress and walletType are required.',
    });
  }

  // Perform additional logic if needed (e.g., save the wallet info to a database)
  res.status(200).json({
    message: 'Wallet connected successfully!',
    walletAddress,
    walletType,
  });
});

/*
  This service allows users to swap one cryptocurrency for another. 
  The user must have a wallet connected via the ConnectWallet service before using this endpoint.
*/
router.post('/swap-coins', (req, res) => {
  const { fromCoin, toCoin, amount } = req.body;

  // Validate the required parameters
  if (!fromCoin || !toCoin || !amount) {
    return res.status(400).json({
      error: 'Missing required parameters: fromCoin, toCoin, and amount are required.',
    });
  }

  // Perform additional logic if needed (e.g., call a third-party API to perform the swap)
  res.status(200).json({
    message: `Swapped ${amount} ${fromCoin} for ${toCoin} successfully!`,
    fromCoin,
    toCoin,
    amount,
  });
});

export default router;
