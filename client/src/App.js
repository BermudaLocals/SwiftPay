import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Ghana');
  const [amount, setAmount] = useState(250);
  const [message, setMessage] = useState('');

  const marketRates = { Jamaica: 158.00, Philippines: 59.40, Ghana: 15.10 };
  const fee = (amount * 0.10).toFixed(2);
  const familyGets = ((amount - fee) * marketRates[country]).toLocaleString(undefined, {maximumFractionDigits: 0});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const txId = "SWIFT-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, tx_id: txId }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`✅ Registered! Your Beta ID is ${txId}. We'll contact you for ID verification.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
  };

  return (
    <div className="App">
        <div style={{background: '#006B3F', color: '#fff', padding: '5px', fontSize: '0.7rem', textAlign: 'center'}}>
            🇬🇭 COMPLIANT WITH GHANA PAYMENT SYSTEMS & SERVICES ACT (ACT 987)
        </div>
        
        <nav className="navbar"><img src={logo} alt="Logo" style={{height: '35px'}}/></nav>
        
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '80px'}} />
                <h1>SwiftPay 10% <br/><span>Ghana & Diaspora</span></h1>
                
                <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '15px', border: '2px solid #FFCC00'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span>From Bermuda:</span>
                        <strong>${amount} BMD</strong>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontSize: '0.9rem'}}>
                        <span>10% Service Fee:</span>
                        <span>-${fee} BMD</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px', borderTop: '1px solid #333', paddingTop: '15px'}}>
                        <span>Family Receives:</span>
                        <strong style={{color: '#FFCC00', fontSize: '1.4rem'}}>{familyGets} {country === 'Ghana' ? 'GHS' : country === 'Jamaica' ? 'JMD' : 'PHP'}</strong>
                    </div>
                    <input type="range" min="50" max="1000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', accentColor: '#FFCC00'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option value="Ghana">Ghana 🇬🇭</option>
                        <option value="Jamaica">Jamaica 🇯🇲</option>
                        <option value="Philippines">Philippines 🇵🇭</option>
                    </select>
                    <button type="submit" className="btn-mtn">Join Secure Beta</button>
                    {message && <p className="msg" style={{color: '#FFCC00', fontWeight: 'bold'}}>{message}</p>}
                </form>

                <div style={{fontSize: '0.6rem', color: '#777', marginTop: '30px', textAlign: 'left', borderTop: '1px solid #333', paddingTop: '10px'}}>
                    <strong>LEGAL NOTICE:</strong> SwiftPay is an International Money Transfer technology provider. All funds are settled via BoG-licensed partner banks and mobile money issuers in Ghana. We strictly adhere to AML/CFT guidelines.
                </div>
            </div>
        </header>
    </div>
  );
}

export default App;
