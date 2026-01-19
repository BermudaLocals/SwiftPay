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
  
  // Editable Float State
  const [float, setFloat] = useState({ Ghana: '5000', Nigeria: '2500', Bermuda: '10000' });
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

  const handleFloatChange = (country, value) => {
    setFloat(prev => ({ ...prev, [country]: value }));
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
        setMessage(`🎉 Added to ${country} waitlist!`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Error."); }
    setLoading(false);
  };

  if (isAdmin) {
    if (pass !== "SwiftPay2026") {
      return (
        <div style={{padding: '100px', textAlign: 'center', background: '#111', color: 'white', height: '100vh'}}>
          <h2>SwiftPay Secure Admin</h2>
          <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} style={{padding: '10px'}} />
        </div>
      );
    }
    return (
      <div className="admin-panel" style={{padding: '40px', color: 'white', background: '#1a1a1a', minHeight: '100vh'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center'}}>
            <h2>Global Waitlist ({waitlist.length})</h2>
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                {Object.keys(float).map(loc => (
                    <div key={loc} style={{background: '#333', padding: '10px', borderRadius: '8px', fontSize: '14px'}}>
                        {loc}: {isEditing ? 
                            <input 
                                style={{width: '60px', background: '#444', color: 'white', border: 'none'}} 
                                value={float[loc]} 
                                onChange={(e) => handleFloatChange(loc, e.target.value)} 
                            /> : <strong>{float[loc]}</strong>}
                    </div>
                ))}
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    style={{width: 'auto', padding: '5px 15px', fontSize: '12px', background: isEditing ? '#28a745' : '#007cc0'}}
                >
                    {isEditing ? 'Save Balances' : 'Update Float'}
                </button>
            </div>
        </div>
        
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead><tr style={{background: '#333', textAlign: 'left'}}>
            <th style={{padding: '12px'}}>Email</th><th style={{padding: '12px'}}>Country</th><th style={{padding: '12px'}}>Service</th>
          </tr></thead>
          <tbody>
            {waitlist.map((u, i) => (
              <tr key={i} style={{borderBottom: '1px solid #444'}}>
                <td style={{padding: '12px'}}>{u.email}</td><td style={{padding: '12px'}}>{u.country}</td><td style={{padding: '12px'}}>{u.preferred_service}</td>
              </tr>
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
          <h1>Everywhere You Need <br/><span>To Send Money.</span></h1>
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <div className="row">
              <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                <option value="Bermuda">Bermuda 🇧🇲</option>
                <option value="Ghana">Ghana 🇬🇭</option>
                <option value="Nigeria">Nigeria 🇳🇬</option>
                <option value="Kenya">Kenya 🇰🇪</option>
              </select>
              <select value={service} onChange={(e)=>setService(e.target.value)}>
                <option value="MTN">MTN MoMo</option>
                <option value="Vodafone">Vodafone Cash</option>
                <option value="Airtel">Airtel Money</option>
                <option value="MPesa">M-Pesa</option>
              </select>
            </div>
            <button type="submit" className="btn-mtn">{loading ? "Wait..." : "Join Global List"}</button>
            {message && <p className="msg">{message}</p>}
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
