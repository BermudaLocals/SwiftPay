import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Philippines');
  const [service, setService] = useState('GCash');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, preferred_service: service }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(` Mabuhay! You're on the list for ${country} transfers.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
    setLoading(false);
  };

  return (
    <div className="App">
        <nav className="navbar"><img src={logo} alt="Logo" style={{height: '40px'}}/></nav>
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '140px'}} />
                <h1>Bermuda to the World. <br/><span>Fast & Affordable.</span></h1>
                <p>SwiftPay is coming. Send money from Bermuda to the Philippines, Ghana, and Nigeria for less.</p>
                
                <div style={{background: 'rgba(0,124,192,0.1)', border: '1px solid #007cc0', padding: '15px', borderRadius: '10px', marginBottom: '20px', textAlign: 'left'}}>
                    <strong>🇵🇭 Philippine Beta Special:</strong><br/>
                    Direct transfers to <strong>GCash</strong> and <strong>Maya</strong>. No more waiting in line at the bank.
                </div>

                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <div className="row">
                        <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                            <option value="Philippines">Philippines 🇵🇭</option>
                            <option value="Ghana">Ghana 🇬🇭</option>
                            <option value="Nigeria">Nigeria 🇳🇬</option>
                            <option value="Bermuda">Bermuda 🇧🇲</option>
                        </select>
                        <select value={service} onChange={(e)=>setService(e.target.value)}>
                            {country === 'Philippines' && (
                                <>
                                    <option value="GCash">GCash</option>
                                    <option value="Maya">Maya (PayMaya)</option>
                                    <option value="Bank">Bank Transfer</option>
                                </>
                            )}
                            {country === 'Ghana' && (
                                <>
                                    <option value="MTN">MTN MoMo</option>
                                    <option value="Vodafone">Vodafone Cash</option>
                                </>
                            )}
                            {country === 'Nigeria' && (
                                <>
                                    <option value="OPay">OPay/PalmPay</option>
                                    <option value="Bank">Nigerian Bank</option>
                                </>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="btn-mtn">{loading ? "Saving..." : "Join the Global Beta"}</button>
                    {message && <p className="msg">{message}</p>}
                </form>
            </div>
        </header>
    </div>
  );
}

export default App;
