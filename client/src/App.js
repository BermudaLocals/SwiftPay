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
        body: JSON.stringify({ email, country, phase: 'BMA_Sandbox_Pre-Alpha' }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`✨ Slot Reserved! You are # ${Math.floor(Math.random() * 200) + 1} on the Alpha list.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
  };

  return (
    <div className="App">
        {/* Compliance Progress Bar */}
        <div style={{background: '#111', color: '#FFCC00', padding: '12px', fontSize: '0.8rem', textAlign: 'center', borderBottom: '1px solid #333'}}>
            🚀 <strong>BMA SANDBOX PROGRESS:</strong> 45% towards Class T License Application
        </div>
        
        <nav className="navbar" style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
            <img src={logo} alt="SwiftPay" style={{height: '40px'}}/>
        </nav>
        
        <header className="hero" style={{paddingTop: '20px'}}>
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '100px', marginBottom: '10px'}} />
                <h1 style={{fontSize: '2.8rem', fontWeight: '800'}}>SwiftPay <span style={{color: '#FFCC00'}}>10%</span></h1>
                <p style={{fontSize: '1.2rem', marginBottom: '30px', color: '#ccc'}}>The Professional Bridge from Bermuda to the World.</p>
                
                <div style={{background: 'linear-gradient(145deg, #1e1e1e, #141414)', padding: '30px', borderRadius: '30px', border: '1px solid #444', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', marginBottom: '30px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem'}}>
                        <span>Sending from Bermuda:</span>
                        <strong style={{color: '#fff'}}>${amount} BMD</strong>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '20px'}}>
                        <span>Flat Startup Fee:</span>
                        <span>-${fee} BMD</span>
                    </div>
                    <div style={{height: '2px', background: 'rgba(255,204,0,0.2)', marginBottom: '20px'}}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '1.2rem'}}>Recipient Gets:</span>
                        <strong style={{color: '#FFCC00', fontSize: '2.2rem', textShadow: '0 0 10px rgba(255,204,0,0.3)'}}>{totalReceiving} {country === 'Ghana' ? 'GHS' : country === 'Jamaica' ? 'JMD' : 'PHP'}</strong>
                    </div>
                    <input type="range" min="100" max="2000" step="100" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '30px', accentColor: '#FFCC00', cursor: 'pointer'}} />
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto'}}>
                    <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{flex: 2, borderRadius: '12px', padding: '15px', border: '1px solid #333', background: '#222', color: '#fff'}} />
                        <select value={country} onChange={(e)=>setCountry(e.target.value)} style={{flex: 1, borderRadius: '12px', padding: '10px', border: '1px solid #333', background: '#222', color: '#fff'}}>
                            <option value="Ghana">Ghana 🇬🇭</option>
                            <option value="Jamaica">Jamaica 🇯🇲</option>
                            <option value="Philippines">Philippines 🇵🇭</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-mtn" style={{width: '100%', padding: '18px', borderRadius: '12px', background: '#FFCC00', color: '#000', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none'}}>Join the Regulated Beta</button>
                    {message && <p className="msg" style={{color: '#FFCC00', marginTop: '20px', fontWeight: 'bold'}}>{message}</p>}
                </form>

                <div style={{marginTop: '60px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', textAlign: 'left', fontSize: '0.75rem', color: '#888', border: '1px solid #222'}}>
                    <h4 style={{color: '#FFCC00', marginTop: '0'}}>REGULATORY DISCLOSURE</h4>
                    SwiftPay is currently a pre-operational technology concept. We are in the process of preparing our <strong>Class T (Test) Licence</strong> application under the Bermuda <em>Digital Asset Business Act 2018</em>. No funds are currently being accepted or transmitted. Our goal is to provide a 100% compliant, secure alternative to informal money transfer methods.
                </div>
            </div>
        </header>
    </div>
  );
}

export default App;
