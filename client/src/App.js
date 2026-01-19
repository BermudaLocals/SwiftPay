import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Ghana');
  const [amount, setAmount] = useState(250);
  const [purpose, setPurpose] = useState('Family Support');
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
        body: JSON.stringify({ email, country, purpose, phase: 'Solo_Founder_Beta' }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`✅ Application received! We will verify your ID for the ${purpose} transfer.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
  };

  return (
    <div className="App">
        <div style={{background: '#006B3F', color: '#fff', padding: '10px', fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold'}}>
            🇬🇭 DIRECT-TO-MOMO PAYOUTS: SETTLED VIA REGISTERED GHANA MERCHANTS
        </div>
        
        <nav className="navbar" style={{padding: '20px'}}><img src={logo} alt="Logo" style={{height: '35px'}}/></nav>
        
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '90px'}} />
                <h1>SwiftPay 10% <br/><span style={{fontSize: '0.7em', color: '#FFCC00'}}>Direct to Mobile Money</span></h1>
                
                <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '25px', border: '1px solid #333', marginBottom: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span>Amount (BMD):</span>
                        <strong>${amount}</strong>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontSize: '0.85rem'}}>
                        <span>10% Fee:</span>
                        <span>-${fee}</span>
                    </div>
                    <div style={{height: '1px', background: '#444', margin: '15px 0'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>Family Receives:</span>
                        <strong style={{color: '#FFCC00', fontSize: '1.8rem'}}>{totalReceiving} {country === 'Ghana' ? 'GHS' : 'PHP'}</strong>
                    </div>
                    <input type="range" min="50" max="1500" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '25px', accentColor: '#FFCC00'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    
                    <select value={purpose} onChange={(e)=>setPurpose(e.target.value)} style={{margin: '10px 0', padding: '10px', width: '100%', borderRadius: '8px', background: '#222', color: '#fff'}}>
                        <option value="Family Support">Family Support</option>
                        <option value="School Fees">School Fees</option>
                        <option value="Medical Bills">Medical Bills</option>
                        <option value="Business Investment">Business Investment</option>
                    </select>

                    <select value={country} onChange={(e)=>setCountry(e.target.value)} style={{marginBottom: '10px'}}>
                        <option value="Ghana">Ghana 🇬🇭</option>
                        <option value="Jamaica">Jamaica 🇯🇲</option>
                        <option value="Philippines">Philippines 🇵🇭</option>
                    </select>

                    <button type="submit" className="btn-mtn">Apply for Transfer Access</button>
                    {message && <p className="msg" style={{color: '#FFCC00', marginTop: '15px'}}>{message}</p>}
                </form>

                <div style={{fontSize: '0.65rem', color: '#777', marginTop: '40px', textAlign: 'left', borderTop: '1px solid #222', paddingTop: '20px'}}>
                    <strong>SOLO FOUNDER NOTICE:</strong> SwiftPay is a Bermuda-based technology project. Payouts in Ghana are facilitated through registered MTN MoMo Merchants. We comply with all Bermuda Monetary Authority (BMA) reporting requirements for digital remittances.
                </div>
            </div>
        </header>
    </div>
  );
}

export default App;
