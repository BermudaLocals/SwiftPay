import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Jamaica');
  const [amount, setAmount] = useState(200);
  const [message, setMessage] = useState('');

  const marketRates = { Jamaica: 158.00, Philippines: 59.40, Ghana: 15.10 };
  const fee = (amount * 0.10).toFixed(2);
  const familyGets = ((amount - fee) * marketRates[country]).toLocaleString(undefined, {maximumFractionDigits: 0});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`✅ You're on the list! We'll email you for KYC verification.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
  };

  return (
    <div className="App">
        {/* Compliance Banner */}
        <div style={{background: '#FFCC00', color: '#000', padding: '5px', fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'center'}}>
            PROTOTYPE PHASE: NOT YET OPEN TO THE GENERAL PUBLIC
        </div>
        
        <nav className="navbar"><img src={logo} alt="Logo" style={{height: '35px'}}/></nav>
        
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '80px'}} />
                <h1>The 10% Tithe. <br/><span style={{fontSize: '0.8em', opacity: 0.8}}>Remittance for the People.</span></h1>
                
                <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #333'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem'}}>
                        <span>Sending from Bermuda:</span>
                        <strong>${amount} BMD</strong>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontSize: '0.8rem'}}>
                        <span>Transparent 10% Fee:</span>
                        <span>-${fee} BMD</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px', borderTop: '1px solid #444', paddingTop: '15px'}}>
                        <span>Family Receives:</span>
                        <strong style={{color: '#FFCC00', fontSize: '1.4rem'}}>{familyGets} {country === 'Jamaica' ? 'JMD' : 'PHP'}</strong>
                    </div>
                    <input type="range" min="50" max="1000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', accentColor: '#FFCC00'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <select value={country} onChange={(e)=>setCountry(e.target.value)} style={{marginBottom: '10px'}}>
                        <option value="Jamaica">Jamaica 🇯🇲</option>
                        <option value="Philippines">Philippines 🇵🇭</option>
                        <option value="Ghana">Ghana 🇬🇭</option>
                    </select>
                    
                    <button type="submit" className="btn-mtn">Apply for Beta Access</button>
                    {message && <p className="msg" style={{color: '#FFCC00', fontSize: '0.8rem', marginTop: '10px'}}>{message}</p>}
                </form>

                <p style={{fontSize: '0.65rem', color: '#666', marginTop: '20px', lineHeight: '1.4'}}>
                    SwiftPay is currently in development. We are preparing for licensing under the Bermuda Money Service Business Act. No funds are currently being accepted or transmitted.
                </p>
            </div>
        </header>
    </div>
  );
}

export default App;
