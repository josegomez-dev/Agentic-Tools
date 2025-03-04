import axios from 'axios';
import { useEffect, useState } from 'react';
import logo from "./../assets/logo.webp";
import { ToastContainer, toast } from 'react-toastify';
import './../globals.css';
import './../index.css';

const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');

  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");

  const [response, setResponse] = useState<any>(null);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [showChatApp, setShowChatApp] = useState(false);
  
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
        toast.success(response.data.message);
        setResponse(response.data);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error connecting wallet:', error);
        toast.error('Failed to connect wallet. Please try again.');
        setResponse({
          error: 'Failed to connect wallet. Please try again.',
        });
      });
  };

  // Function to call the swap-coins endpoint
  const swapCoinsTestEndpoint = () => {
    const swapData = {
      fromCoin: 'ETH',
      toCoin: 'BTC',
      amount: 1.5,
    };

    axios.post('/api/swap-coins', swapData)
      .then(response => {
        console.log('Coins swapped:', response.data);
        toast.success(response.data.message);
        setResponse(response.data);
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error swapping coins:', error);
        toast.error('Failed to swap coins. Please try again.');
        setResponse({
          error: 'Failed to swap coins. Please try again.',
        });
      });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev: any) => [...prev, userMessage]); // Add user message to chat

    try {
      const response = await axios.post("/api/social-agent", { message: input });
      const botMessage = { role: "assistant", content: response.data.response };

      setMessages((prev: any) => [...prev, botMessage]); // Add bot response to chat
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev: any) => [...prev, { role: "assistant", content: "Failed to get response." }]);
    }

    setInput(""); // Clear input field
  };

  const menuOptions = (
    <div className="container">
        <div className="box" onClick={() => setShowChatApp(true)}>
            <img src="https://cdn.prod.website-files.com/65202616cfa1bf1882f3db51/671de8d84dbc4219e64ab6e4_671de8d6af4b119b6a41ada0_lastImage.png" alt="Option 1 Background"/>
            <div className="overlay">Social Agent</div>
        </div>
        <div className="box" onClick={() => setShowChatApp(true)}>
            <img src="https://img.freepik.com/premium-photo/robot-with-blue-white-head-that-says-robot_137441-20624.jpg" alt="Option 2 Background"/>
            <div className="overlay">Transactions Agent</div>
        </div>
    </div>
  )

  const chatApp = (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg: string | any, index: number) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );

  if (showChatApp) {
    return chatApp;
  }

  if (showMenuOptions) {
    return menuOptions;
  }

  return (
    <main className={'main'}>
      <ToastContainer />
      <div className="background"></div>
      <div className={'description'}>
        <p>
          API Server Connection: <b>{message}</b>
        </p>
        <div>
          {/* <a
            href="https://app.daily.dev/josegomezdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agentics Micro Services
          </a> */}
          <br />
          <a href="/project-form" className="custom-nav-link">
            <b>Create New LG Project <span>-&gt;</span></b>
          </a> 
          <br />
          <a href="/perc-form" className="custom-nav-link">
            <b>Create New Perc Item <span>-&gt;</span></b>
          </a> 
        </div>
      </div>

      <img
        src={logo}
        className="App-logo"
        width={300}
        alt="logo"
        style={{
          filter:
            "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
        }}
      />
      

      <div className={'grid'}>

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
          className={'card'}
          rel="noopener noreferrer"
          onClick={() => {
            connectWalletTestEndpoint();
            setTimeout(() => {
              swapCoinsTestEndpoint();
            }, 1000);
          }}
        >
          <h2>
            Test API Server Connection <span>-&gt;</span>
          </h2>
          <p>Inspect Code and check console logs</p>
        </a>

        <a
          onClick={() => setShowMenuOptions(!showMenuOptions)}
          className={'card'}
          rel="noopener noreferrer"
        >
          <h2>
            Connect your own Agent <span>-&gt;</span>
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

export default HomePage

