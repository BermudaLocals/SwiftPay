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
  
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  // Currency Map for "Everywhere"
  const currencyMap = {
    'Bermuda': '$',
    'Ghana': 'GH₵',
    'Nigeria': '₦',
    'Kenya': 'KSh',
    'South Africa': 'R'
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
        setMessage(`🎉 Success! You're on the ${country} list.`);
        setEmail('');
      }
    } catch (err) { setMessage("❌ Connection error."); }
    setLoading(false);
  };

  if (isAdmin) {
    /* ... (Admin code remains the same as previous) ... */
    return <div className="admin-view">Admin Panel Active (Use Password)</div>;
  }

  return (
    <div className="App">
      <nav className="navbar"><img src={logo} alt="SwiftPay" style={{height: '40px'}}/></nav>
      <header className="hero">
        <div className="container">
          <img src={mascot} className="mascot" alt="Mascot" style={{height: '140px'}} />
          <h1>Global Mobile Transfers <br/><span>Made Simple.</span></h1>
          <p>Sending to {country}? Use {currencyMap[country] || '$'} with SwiftPay.</p>
          
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <div className="row">
              <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                <option value="Bermuda">Bermuda 🇧🇲</option>
                <option value="Ghana">Ghana 🇬🇭</option>
                <option value="Nigeria">Nigeria 🇳🇬</option>
                <option value="Kenya">Kenya 🇰🇪</option>
                <option value="South Africa">South Africa 🇿🇦</option>
              </select>
              <select value={service} onChange={(e)=>setService(e.target.value)}>
                <option value="MTN">MTN MoMo</option>
                <option value="Vodafone">Vodafone Cash</option>
                <option value="Airtel">AirtelTigo / Airtel Money</option>
                <option value="MPesa">M-Pesa</option>
                <option value="OPay">OPay / PalmPay</option>
              </select>
            </div>
            <button type="submit" className="btn-mtn">{loading ? "Processing..." : "Join Global Waitlist"}</button>
            {message && <p className="msg">{message}</p>}
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
