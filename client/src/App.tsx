import axios from 'axios';
import { useEffect, useState } from 'react';
import logo from "./assets/logo.webp";
import './globals.css';
import './index.css';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    axios.get('/api')
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  // Function to call the connect-wallet endpoint
  const connectWalletTestEndpoint = () => {
    const walletData = {
      walletAddress: '0xABC123456789DEF', // Example wallet address
      walletType: 'MetaMask',           // Example wallet type
    };

    axios.post('/api/connect-wallet', walletData)
      .then(response => {
        console.log('Wallet connected:', response.data);
        setResponse(response.data);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error connecting wallet:', error);
        setResponse({
          error: 'Failed to connect wallet. Please try again.',
        });
      });
  };

  return (
    <main className={'main'}>
      <div className={'description'}>
        <p>
          Database Conection: <b>{message}</b>
        </p>
        <div>
          <a
            href="https://app.daily.dev/josegomezdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <b>@josegomez.dev
            </b> 
          </a>
        </div>
      </div>

      <img
        src={logo}
        className="App-logo"
        width={200}
        alt="logo"
        style={{
          filter:
            "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
        }}
      />

      <div className={'grid'}>
        <a
          href="https://t.me/LaunchGoatBetaBot/LaunchGoat"
          className={'card'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            LaunchGoat <span>-&gt;</span>
          </h2>
          <p>Open LaunchGoat Telegram App</p>
        </a>

        <a
          className={'card'}
          rel="noopener noreferrer"
          onClick={connectWalletTestEndpoint}
        >
          <h2>
            Test Connect Wallet Endpoint <span>-&gt;</span>
          </h2>
          <p>Inspect Code and check console logs</p>
        </a>

        <a
          href="https://beta.launchgo.at/tgWebApp/documentation/indexCoin.html"
          className={'card'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Agentic Tools <span>-&gt;</span>
          </h2>
          <p>API Documentation for Agentic Tools</p>
        </a>

        <a
          className={'card disabled-card'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Start your own Project <span>-&gt;</span>
          </h2>
          <p>
            Follow <b> <u>README</u> </b> steps to getting your project up.
          </p>
        </a>
      </div>
      <div className="custom-nav-spacer" />
    </main>
  );
};

export default App

