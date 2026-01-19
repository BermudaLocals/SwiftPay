import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(250);
  const [step, setStep] = useState('calculate'); // calculate, verify, success
  const [livenessStatus, setLivenessStatus] = useState('Ready');

  const fee = (amount * 0.10).toFixed(2);
  const receiving = ((amount - fee) * 15.15).toLocaleString(undefined, {maximumFractionDigits: 0});

  const startVerification = () => {
    setStep('verify');
    setLivenessStatus('Aligning Face...');
    // Simulated Liveness Check
    setTimeout(() => setLivenessStatus('Turn Head Left...'), 1500);
    setTimeout(() => setLivenessStatus('Turn Head Right...'), 3000);
    setTimeout(() => {
        setStep('success');
    }, 5000);
  };

  return (
    <div className="App">
        <div style={{background: '#FFCC00', color: '#000', padding: '8px', fontSize: '0.7rem', textAlign: 'center', fontWeight: 'bold'}}>
            🔒 ENHANCED BIOMETRIC SECURITY ACTIVE (iBeta Level 2)
        </div>

        <nav className="navbar" style={{padding: '15px'}}><img src={logo} alt="Logo" style={{height: '30px'}}/></nav>

        <header className="hero">
            <div className="container" style={{maxWidth: '450px'}}>
                
                {step === 'calculate' && (
                    <div className="card-ui">
                        <img src={mascot} alt="Mascot" style={{height: '70px'}} />
                        <h2>SwiftPay <span style={{color: '#FFCC00'}}>Solo</span></h2>
                        <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '20px', margin: '20px 0', textAlign: 'left'}}>
                            <p>Send: <strong>${amount} BMD</strong></p>
                            <p style={{color: '#ff4d4d', fontSize: '0.8rem'}}>10% Fee: -${fee}</p>
                            <hr style={{borderColor: '#333'}}/>
                            <p style={{fontSize: '1.2rem'}}>Receives: <span style={{color: '#FFCC00'}}>{receiving} GHS</span></p>
                        </div>
                        <input type="range" min="50" max="1000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', accentColor: '#FFCC00'}} />
                        <button onClick={() => setStep('id-upload')} className="btn-mtn" style={{marginTop: '20px', width: '100%'}}>Start Transfer</button>
                    </div>
                )}

                {step === 'id-upload' && (
                    <div className="card-ui">
                        <h3>Step 1: ID Upload</h3>
                        <p style={{fontSize: '0.9rem', color: '#888'}}>Upload your Bermuda Driver's License or Passport.</p>
                        <div style={{border: '2px dashed #444', padding: '40px', borderRadius: '15px', margin: '20px 0', cursor: 'pointer'}} onClick={() => setStep('verify')}>
                            📸 Click to Photo ID
                        </div>
                        <button onClick={() => setStep('calculate')} style={{background: 'none', color: '#888', border: 'none'}}>Cancel</button>
                    </div>
                )}

                {step === 'verify' && (
                    <div className="card-ui" style={{textAlign: 'center'}}>
                        <h3>Step 2: Liveness Check</h3>
                        <div style={{width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #FFCC00', margin: '20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', position: 'relative', overflow: 'hidden'}}>
                            <div className="scanner-line"></div>
                            <span style={{fontSize: '3rem'}}>👤</span>
                        </div>
                        <h4 style={{color: '#FFCC00'}}>{livenessStatus}</h4>
                        <p style={{fontSize: '0.8rem', color: '#888'}}>Keep your head within the circle and follow the prompts.</p>
                        <button onClick={startVerification} className="btn-mtn" style={{marginTop: '10px'}}>Start Camera</button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="card-ui">
                        <span style={{fontSize: '4rem'}}>✅</span>
                        <h3>Identity Verified</h3>
                        <p>Your biometric map matches your ID perfectly. Your account is now active.</p>
                        <button onClick={() => setStep('calculate')} className="btn-mtn" style={{width: '100%'}}>Back to Dashboard</button>
                    </div>
                )}

            </div>
        </header>
    </div>
  );
}

export default App;
