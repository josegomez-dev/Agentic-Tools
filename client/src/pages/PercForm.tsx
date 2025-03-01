import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import logo from "./../assets/logo.webp";
import lgLogo from "./../assets/lgLogo.webp";
import goatLogo from "./../assets/favicon.jpg";
import percLogo1 from "./../assets/t1_1024px.webp";
import percLogo2 from "./../assets/t4_1024px.webp";
import percLogo3 from "./../assets/t6_1024px.webp";
import './../globals.css';
import './../index.css';

const PercForm: React.FC = () => {
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
        <br />
        <br />
        <h2>Create New Perc</h2>
        <br />
      </div>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            placeholder="Perc Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Logo</label>
          <div style={{ textAlign: 'center' }}>
            <img
              src={percLogo1}
              className="LG-logo"
              width={80}
              alt="logo"
              style={{
                filter:
                  "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
              }}
            /> &nbsp;
            <img
              src={percLogo2}
              className="LG-logo"
              width={80}
              alt="logo"
              style={{
                filter:
                  "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
              }}
            /> &nbsp;
            <img
              src={percLogo3}
              className="LG-logo"
              width={80}
              alt="logo"
              style={{
                filter:
                  "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Collection #</label>
          <input
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            placeholder="Perc Collection #1"
            required
          />
        </div>
        <div className="form-group">
          <label>Available Tiers</label>
          <input
            type="numbers"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            placeholder="8"
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

export default PercForm;
