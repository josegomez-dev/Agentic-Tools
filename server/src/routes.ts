import { Router } from 'express';
import OpenAI from "openai";

const router = Router();
const openai = new OpenAI({
  apiKey: ''
});

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

// Social Agent Endpoint
router.post("/social-agent", async (req, res) => {
  console.log('req.body', req.body);
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing required parameter: message" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
});

// Financial Transactions Clarification Endpoint
router.post("/financial-transactions", async (req, res) => {
  const { transactionDetails } = req.body;

  if (!transactionDetails) {
    return res.status(400).json({ error: "Missing required parameter: transactionDetails" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a financial assistant. Clarify and summarize transaction details." },
        { role: "user", content: transactionDetails },
      ],
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
});


export default router;
