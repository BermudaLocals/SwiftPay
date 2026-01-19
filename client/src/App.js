import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Ghana');
  const [amount, setAmount] = useState(250);
  const [message, setMessage] = useState('');

  const marketRates = { Ghana: 15.10, Jamaica: 158.00, Philippines: 59.40 };
  const fee = (amount * 0.10).toFixed(2);
  const totalReceiving = ((amount - fee) * marketRates[country]).toLocaleString(undefined, {maximumFractionDigits: 0});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, intent: 'Sandbox_Alpha_User' }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`🚀 You're on the Alpha List! We'll contact you when our BMA Sandbox opens.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
  };

  return (
    <div className="App">
        {/* Investor-Ready Compliance Header */}
        <div style={{background: '#FFCC00', color: '#000', padding: '10px', fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold'}}>
            FUTURE OF REMITTANCE: PREPARING FOR BMA REGULATORY SANDBOX (CLASS T)
        </div>
        
        <nav className="navbar" style={{padding: '20px'}}><img src={logo} alt="Logo" style={{height: '35px'}}/></nav>
        
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '90px'}} />
                <h1 style={{fontSize: '2.5rem', marginBottom: '10px'}}>SwiftPay <span style={{color: '#FFCC00'}}>10%</span></h1>
                <p style={{fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9}}>Bermuda's first fair-fee digital bridge to Africa & the Caribbean.</p>
                
                <div style={{background: '#1a1a1a', padding: '30px', borderRadius: '24px', border: '1px solid #333', marginBottom: '25px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                        <span>Send BMD:</span>
                        <strong style={{fontSize: '1.2rem'}}>${amount}</strong>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '15px'}}>
                        <span>Standard 10% Fee:</span>
                        <span>-${fee}</span>
                    </div>
                    <div style={{height: '1px', background: '#333', marginBottom: '15px'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontSize: '1.1rem'}}>Family Receives:</span>
                        <strong style={{color: '#FFCC00', fontSize: '1.8rem'}}>{totalReceiving} {country === 'Ghana' ? 'GHS' : 'PHP'}</strong>
                    </div>
                    <input type="range" min="100" max="1000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '25px', accentColor: '#FFCC00'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option value="Ghana">Ghana 🇬🇭</option>
                        <option value="Jamaica">Jamaica 🇯🇲</option>
                        <option value="Philippines">Philippines 🇵🇭</option>
                    </select>
                    <button type="submit" className="btn-mtn" style={{fontSize: '1.1rem', padding: '15px'}}>Reserve Alpha Access</button>
                    {message && <p className="msg" style={{color: '#FFCC00', marginTop: '20px', fontWeight: 'bold'}}>{message}</p>}
                </form>

                <div className="footer-legal" style={{marginTop: '50px', fontSize: '0.7rem', color: '#666', textAlign: 'left', borderTop: '1px solid #222', paddingTop: '20px'}}>
                    <p><strong>TRANSPARENCY:</strong> SwiftPay is a technology platform, not a bank. We are currently in the pre-operational phase and are not accepting customer funds. We intend to operate under the Bermuda Monetary Authority (BMA) Regulatory Sandbox framework to ensure 100% legal compliance and consumer protection.</p>
                </div>
            </div>
        </header>
    </div>
  );
}

export default App;
