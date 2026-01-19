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
  
  // Liquidity and Revenue State
  const [float, setFloat] = useState({ Ghana: '10000', Nigeria: '500000', Bermuda: '5000' });
  const [isEditing, setIsEditing] = useState(false);
  const [totalVolume, setTotalVolume] = useState(5000); // Example total money moved ($)

  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  useEffect(() => {
    if (isAdmin && pass === "SwiftPay2026") {
      fetch('/api/admin/list')
        .then(res => res.json())
        .then(data => setWaitlist(data))
        .catch(err => console.log("Error loading list"));
    }
  }, [isAdmin, pass]);

  // Logic: Calculate profit based on a mix of 3% and 8% fees (Average ~5%)
  const estimatedProfit = (totalVolume * 0.05).toFixed(2);

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
        setMessage(`🎉 Success! You're on the list.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Error."); }
    setLoading(false);
  };

  if (isAdmin) {
    if (pass !== "SwiftPay2026") {
      return (
        <div style={{padding: '100px', textAlign: 'center', background: '#111', color: 'white', height: '100vh'}}>
          <h2>Admin Login</h2>
          <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} style={{padding: '10px'}} />
        </div>
      );
    }
    return (
      <div className="admin-panel" style={{padding: '40px', color: 'white', background: '#1a1a1a', minHeight: '100vh'}}>
        {/* --- REVENUE CALCULATOR SECTION --- */}
        <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
            <div style={{flex: 1, background: 'linear-gradient(45deg, #111, #222)', padding: '20px', borderRadius: '15px', border: '1px solid #333'}}>
                <div style={{color: '#888', fontSize: '12px'}}>TOTAL VOLUME MOVED</div>
                <h2 style={{margin: '5px 0'}}>${totalVolume.toLocaleString()}</h2>
            </div>
            <div style={{flex: 1, background: 'linear-gradient(45deg, #1a3a1a, #111)', padding: '20px', borderRadius: '15px', border: '1px solid #28a745'}}>
                <div style={{color: '#28a745', fontSize: '12px'}}>ESTIMATED PROFIT (FEES)</div>
                <h2 style={{margin: '5px 0', color: '#28a745'}}>${estimatedProfit}</h2>
            </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3>Global Liquidity</h3>
            <button onClick={() => setIsEditing(!isEditing)} className="btn-mtn" style={{width: 'auto', padding: '10px 20px'}}>
                {isEditing ? 'Save Balances' : 'Edit Float'}
            </button>
        </div>

        <div style={{display: 'flex', gap: '15px', marginBottom: '40px'}}>
            {Object.keys(float).map(loc => (
                <div key={loc} style={{background: '#222', padding: '15px', borderRadius: '10px', flex: 1, border: '1px solid #333'}}>
                    <div style={{fontSize: '11px', color: '#666'}}>{loc}</div>
                    {isEditing ? 
                        <input style={{width: '100%', background: 'transparent', color: 'white', border: 'none', borderBottom: '1px solid #FFCC00', fontSize: '18px'}} 
                               value={float[loc]} onChange={(e) => setFloat({...float, [loc]: e.target.value})} />
                        : <div style={{fontSize: '18px', fontWeight: 'bold'}}>{float[loc]}</div>
                    }
                </div>
            ))}
        </div>

        <h3>Waitlist Signups ({waitlist.length})</h3>
        <table style={{width: '100%', borderCollapse: 'collapse', background: '#222'}}>
          <thead><tr style={{background: '#333', textAlign: 'left'}}><th style={{padding: '12px'}}>Email</th><th style={{padding: '12px'}}>Country</th><th style={{padding: '12px'}}>Service</th></tr></thead>
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
                <h1>Card-to-Mobile <br/><span>Swift & Secure.</span></h1>
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
                    <button type="submit" className="btn-mtn">{loading ? "Wait..." : "Join Waitlist"}</button>
                </form>
            </div>
        </header>
    </div>
  );
}

export default App;
