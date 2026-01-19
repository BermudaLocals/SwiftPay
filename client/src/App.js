import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Bermuda');
  const [service, setService] = useState('MTN');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [waitlist, setWaitlist] = useState([]);
  const [pass, setPass] = useState('');
  
  // Track Float (Local Cash) and Settlements (Card money coming in)
  const [float, setFloat] = useState({ Ghana: '10000', Nigeria: '500000', Bermuda: '5000' });
  const [pendingSettlement, setPendingSettlement] = useState('1250.00'); 
  const [isEditing, setIsEditing] = useState(false);

  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  useEffect(() => {
    if (isAdmin && pass === "SwiftPay2026") {
      fetch('/api/admin/list')
        .then(res => res.json())
        .then(data => setWaitlist(data))
        .catch(err => console.log("Error loading list"));
    }
  }, [isAdmin, pass]);

  const handleFloatChange = (loc, value) => {
    setFloat(prev => ({ ...prev, [loc]: value }));
  };

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
        setMessage(`🎉 Registered! You'll be notified for ${country} transfers.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
    setLoading(false);
  };

  if (isAdmin) {
    if (pass !== "SwiftPay2026") {
      return (
        <div style={{padding: '100px', textAlign: 'center', background: '#111', color: 'white', height: '100vh'}}>
          <h2>SwiftPay Admin Login</h2>
          <input type="password" placeholder="Admin Key" onChange={(e) => setPass(e.target.value)} style={{padding: '10px'}} />
        </div>
      );
    }
    return (
      <div className="admin-panel" style={{padding: '40px', color: 'white', background: '#1a1a1a', minHeight: '100vh'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <h2>Liquidity & Settlement</h2>
            <div style={{textAlign: 'right'}}>
                <span style={{color: '#aaa', fontSize: '12px'}}>PENDING FROM CARDS (USD):</span>
                <h3 style={{color: '#28a745', margin: '0'}}>${pendingSettlement}</h3>
            </div>
        </div>
        
        <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
            {Object.keys(float).map(loc => (
                <div key={loc} style={{background: '#333', padding: '15px', borderRadius: '10px', flex: '1'}}>
                    <div style={{fontSize: '12px', color: '#888'}}>{loc.toUpperCase()} FLOAT:</div>
                    {isEditing ? 
                        <input style={{width: '80%', background: '#444', color: 'white', border: 'none', fontSize: '18px'}} 
                               value={float[loc]} onChange={(e) => handleFloatChange(loc, e.target.value)} 
                        /> : <div style={{fontSize: '20px', fontWeight: 'bold'}}>{float[loc]}</div>}
                </div>
            ))}
            <button onClick={() => setIsEditing(!isEditing)} style={{background: '#FFCC00', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>
                {isEditing ? 'Save Balances' : 'Edit Float'}
            </button>
        </div>

        <h3>Waitlist Signups ({waitlist.length})</h3>
        <table style={{width: '100%', borderCollapse: 'collapse', background: '#222', borderRadius: '10px', overflow: 'hidden'}}>
          <thead><tr style={{background: '#333', textAlign: 'left'}}><th style={{padding: '12px'}}>User Email</th><th style={{padding: '12px'}}>Target Country</th><th style={{padding: '12px'}}>Provider</th></tr></thead>
          <tbody>
            {waitlist.map((u, i) => (
              <tr key={i} style={{borderBottom: '1px solid #333'}}><td style={{padding: '12px'}}>{u.email}</td><td style={{padding: '12px'}}>{u.country}</td><td style={{padding: '12px'}}>{u.preferred_service}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="App">
        <nav className="navbar"><img src={logo} alt="Logo" style={{height: '40px'}}/></nav>
        <header className="hero">
            <div className="container">
                <img src={mascot} className="mascot" alt="Mascot" style={{height: '140px'}} />
                <h1>Card to Mobile Money <br/><span>Made Easy.</span></h1>
                <p>We bridge the gap between Bermuda cards and African wallets.</p>
                <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <div className="row">
                        <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                            <option value="Bermuda">Bermuda 🇧🇲</option>
                            <option value="Ghana">Ghana 🇬🇭</option>
                            <option value="Nigeria">Nigeria 🇳🇬</option>
                        </select>
                        <select value={service} onChange={(e)=>setService(e.target.value)}>
                            <option value="MTN">MTN MoMo</option>
                            <option value="Vodafone">Vodafone Cash</option>
                            <option value="OPay">OPay/PalmPay</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-mtn">{loading ? "Wait..." : "Join the Waitlist"}</button>
                </form>
            </div>
        </header>
    </div>
  );
}

export default App;
