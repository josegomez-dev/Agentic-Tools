import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import logo from "./../assets/logo.webp";
import lgLogo from "./../assets/lgLogo.webp";
import goatLogo from "./../assets/favicon.jpg";
import './../globals.css';
import './../index.css';

const ProjectForm: React.FC = () => {
  const [dealName, setDealName] = useState('');
  const [privateRound, setPrivateRound] = useState('');
  const [fullyDilutedValuation, setFullyDilutedValuation] = useState('');
  const [round, setRound] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [initialMarketcap, setInitialMarketcap] = useState('');
  const [fdv, setFdv] = useState('');
  const [minimunBuy, setMinimunBuy] = useState('');
  const [vestingSummary, setVestingSummary] = useState('');
  const [fundRaisingTarget, setFundRaisingTarget] = useState('');

  const sigCanvas = useRef<any>(null);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Project Information', 10, 20);
    doc.setFontSize(12);
    doc.text(`Deal Name: ${dealName}`, 10, 40);
    doc.text(`Private Round: ${privateRound}`, 10, 50);
    doc.text(`Fully Diluted Valuation: ${fullyDilutedValuation}`, 10, 60);
    doc.text(`Round: ${round}`, 10, 70);
    doc.text(`Token Price: ${tokenPrice}`, 10, 80);
    doc.text(`Initial Marketcap: ${initialMarketcap}`, 10, 90);
    doc.text(`FDW: ${fdv}`, 10, 100);
    doc.text(`MinimunBuy: ${minimunBuy}`, 10, 110);
    doc.text(`Vesting Summary: ${vestingSummary}`, 10, 120);
    doc.text(`Fund Raising Target: ${fundRaisingTarget}`, 10, 130);

    let signatureImage;
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      // Check if getTrimmedCanvas is defined; if not, use the raw canvas element.
      if (typeof sigCanvas.current.getTrimmedCanvas === 'function') {
        // trimmer canvas is not a working function please check this
        // signatureImage = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      } else if (sigCanvas.current.canvas) {
        signatureImage = sigCanvas.current.canvas.toDataURL('image/png');
      }
      if (signatureImage) {
        doc.addImage(signatureImage, 'PNG', 10, 80, 100, 40);
      }
    } else {
      console.log('No signature provided');
    }

    doc.save('project-info.pdf');
  };

  return (
    <div className="form-container">
      <div className="form-header">
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
        {/* <br />
        <div style={{ textAlign: 'center' }}>
          <img
            src={lgLogo}
            className="LG-logo"
            width={120}
            alt="logo"
            style={{
              filter:
                "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div> */}
        <h2>Create New <img
          src={goatLogo}
          className="LG-logo"
          width={40}
          alt="logo"
          style={{
            position: 'relative',
            top: '10px',
            filter:
              "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        /> Project</h2>
        <br />
      </div>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Deal Name</label>
          <input
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            placeholder="Deal ABC"
            required
          />
        </div>
        <div className="form-group">
          <label>Private Round</label>
          <input
            type="text"
            value={privateRound}
            onChange={(e) => setPrivateRound(e.target.value)}
            placeholder="$500k"
            required
          />
        </div>
        <div className="form-group">
          <label>Fully Diluted Valuation</label>
          <input
            type="text"
            value={fullyDilutedValuation}
            onChange={(e) => setFullyDilutedValuation(e.target.value)}
            placeholder="$10M"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Round</label>
          <input
            type="text"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            placeholder="Seed"
            required
          />
        </div>
        <div className="form-group">
          <label>Token Price</label>
          <input
            type="number"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(e.target.value)}
            placeholder="$0.05"
          />
        </div>
        <div className="form-group">
          <label>Initial Marketcap</label>
          <input
            type="number"
            value={initialMarketcap}
            onChange={(e) => setInitialMarketcap(e.target.value)}
            placeholder="$1M"
          />
        </div>
        <div className="form-group">
          <label>FDV</label>
          <input
            type="number"
            value={fdv}
            onChange={(e) => setFdv(e.target.value)}
            placeholder="$5,000,000"
          />
        </div>
        <div className="form-group">
          <label>Minimun Buy</label>
          <input
            type="number"
            value={minimunBuy}
            onChange={(e) => setMinimunBuy(e.target.value)}
            placeholder="$100"
          />
        </div>
        <div className="form-group">
          <label>Vesting Summary</label>
          <textarea
            value={vestingSummary}
            onChange={(e) => setVestingSummary(e.target.value)}
            placeholder="Enter project description"
            required
          />
        </div>
        <div className="form-group">
          <label>Fund Raising Target</label>
          <textarea
            value={fundRaisingTarget}
            onChange={(e) => setFundRaisingTarget(e.target.value)}
            placeholder="Enter project description"
            required
          />
        </div>

        <div className="form-group signature-group">
          <label>Digital Signature</label>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
          />
          <button type="button" onClick={clearSignature} className="clear-button">
            Clear Signature
          </button>
        </div>
        <button type="submit" className="submit-button">
          Generate PDF &amp; Submit
        </button>
        <br />
      </form>
    </div>
  );
};

export default ProjectForm;
