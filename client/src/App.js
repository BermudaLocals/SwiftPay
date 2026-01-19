import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Jamaica');
  const [amount, setAmount] = useState(200);
  const [message, setMessage] = useState('');

  // Real-time "Mid-Market" Rates (Approx Jan 2026)
  // We apply the 10% fee to the BMD amount, NOT the rate.
  const marketRates = {
    Jamaica: 158.00,
    Philippines: 59.40,
    Ghana: 15.10
  };

  const fee = (amount * 0.10).toFixed(2);
  const sendAmount = (amount - fee).toFixed(2);
  const familyGets = (sendAmount * marketRates[country]).toLocaleString(undefined, {maximumFractionDigits: 0});

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
        setMessage(`🙏 Blessed! You're saving ~$15 vs the Money Shop.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
  };

  return (
    <div className="App">
        <nav className="navbar"><img src={logo} alt="Logo" style={{height: '40px'}}/></nav>
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '100px'}} />
                <h1>The 10% Tithe. <br/><span>Real Rates. No Traps.</span></h1>
                
                <div style={{background: '#222', padding: '25px', borderRadius: '15px', marginBottom: '20px', border: '2px solid #FFCC00'}}>
                    <div style={{fontSize: '0.9rem', marginBottom: '20px', color: '#aaa'}}>Send money from your phone:</div>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span>You Pay:</span>
                        <strong>${amount} BMD</strong>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#ff4d4d'}}>
                        <span>Flat 10% Fee:</span>
                        <span>-${fee} BMD</span>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '15px 0', borderTop: '1px solid #333'}}>
                        <span style={{fontSize: '1.1rem'}}>Family Receives:</span>
                        <strong style={{color: '#FFCC00', fontSize: '1.5rem'}}>{familyGets} {country === 'Jamaica' ? 'JMD' : 'PHP'}</strong>
                    </div>
                    
                    <div style={{fontSize: '0.7rem', color: '#28a745', marginTop: '10px', textAlign: 'center'}}>
                        ✅ Using Real Market Exchange Rate (1:{marketRates[country]})
                    </div>

                    <input type="range" min="50" max="1000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', accentColor: '#FFCC00'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <div className="row">
                        <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                            <option value="Jamaica">Jamaica 🇯🇲</option>
                            <option value="Philippines">Philippines 🇵🇭</option>
                            <option value="Ghana">Ghana 🇬🇭</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-mtn">Join the 10% Movement</button>
                    {message && <p className="msg">{message}</p>}
                </form>
            </div>
        </header>
    </div>
  );
}

export default App;
