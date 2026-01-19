import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Ghana');
  const [amount, setAmount] = useState(300);
  const [message, setMessage] = useState('');

  const marketRates = { Ghana: 15.15, Jamaica: 158.50, Philippines: 59.45 };
  const fee = (amount * 0.10).toFixed(2);
  const totalReceiving = ((amount - fee) * marketRates[country]).toLocaleString(undefined, {maximumFractionDigits: 0});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, status: 'KYC_Pre_Check' }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`🛡️ Verification Started! Check your email for next steps.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Error connecting to server."); }
  };

  return (
    <div className="App">
        {/* Compliance Progress Bar */}
        <div style={{background: '#000', color: '#FFCC00', padding: '12px', fontSize: '0.8rem', textAlign: 'center', borderBottom: '1px solid #FFCC00'}}>
            🏛️ <strong>BMA STATUS:</strong> Pre-Alpha Phase (Class T Sandbox Roadmap)
        </div>
        
        <nav className="navbar" style={{padding: '15px'}}><img src={logo} alt="Logo" style={{height: '35px'}}/></nav>
        
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '90px'}} />
                <h1>SwiftPay 10% <br/><span style={{fontSize: '0.6em', opacity: 0.8}}>The 100% Legal Way to Send.</span></h1>
                
                <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '25px', border: '1px solid #333', marginBottom: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span>Bermuda Amount:</span>
                        <strong>${amount} BMD</strong>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontSize: '0.85rem'}}>
                        <span>Standard 10% Fee:</span>
                        <span>-${fee} BMD</span>
                    </div>
                    <div style={{height: '1px', background: '#444', margin: '15px 0'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>Family Receives:</span>
                        <strong style={{color: '#FFCC00', fontSize: '1.6rem'}}>{totalReceiving} {country === 'Ghana' ? 'GHS' : country === 'Jamaica' ? 'JMD' : 'PHP'}</strong>
                    </div>
                    <input type="range" min="100" max="2000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '25px', accentColor: '#FFCC00'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Work Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option value="Ghana">Ghana 🇬🇭</option>
                        <option value="Jamaica">Jamaica 🇯🇲</option>
                        <option value="Philippines">Philippines 🇵🇭</option>
                    </select>
                    <button type="submit" className="btn-mtn">Reserve Your Beta ID</button>
                    {message && <p className="msg" style={{color: '#FFCC00', marginTop: '15px', fontWeight: 'bold'}}>{message}</p>}
                </form>

                <div style={{fontSize: '0.7rem', color: '#777', marginTop: '40px', textAlign: 'left', borderTop: '1px solid #222', paddingTop: '20px', lineHeight: '1.5'}}>
                    <strong>IMPORTANT:</strong> SwiftPay is committed to full BMA and AML/ATF compliance. We are building our platform within the Regulatory Sandbox framework. This ensures your money is always protected by licensed Bermudian and Ghanaian financial standards. 
                </div>
            </div>
        </header>
    </div>
  );
}

export default App;
