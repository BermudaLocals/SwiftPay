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
  
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';

  useEffect(() => {
    if (isAdmin && pass === "SwiftPay2026") { // SET YOUR PASSWORD HERE
      fetch('/api/admin/list')
        .then(res => res.json())
        .then(data => setWaitlist(data))
        .catch(err => console.log("Error loading list"));
    }
  }, [isAdmin, pass]);

  const downloadCSV = () => {
    const headers = ["Email", "Country", "Service", "Joined At"];
    const rows = waitlist.map(u => [u.email, u.country, u.preferred_service, u.joined_at]);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SwiftPay_List.csv`);
    document.body.appendChild(link);
    link.click();
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
        setMessage("🎉 You're on the list!");
        setEmail('');
      } else { setMessage("❌ Error."); }
    } catch (err) { setMessage("❌ Server error."); }
    setLoading(false);
  };

  // ADMIN VIEW WITH PASSWORD PROTECTION
  if (isAdmin) {
    if (pass !== "SwiftPay2026") {
        return (
            <div className="admin-login" style={{padding: '100px', textAlign: 'center', background: '#1a1a1a', height: '100vh', color: 'white'}}>
                <h2>SwiftPay Admin Access</h2>
                <input type="password" placeholder="Enter Admin Password" onChange={(e) => setPass(e.target.value)} style={{width: '300px', padding: '10px'}} />
                <p>Enter the master password to view the {waitlist.length} signups.</p>
            </div>
        );
    }
    return (
      <div className="admin-panel" style={{padding: '40px', color: 'white', background: '#1a1a1a', minHeight: '100vh'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2>Waitlist Data ({waitlist.length})</h2>
            <button onClick={downloadCSV} className="btn-mtn" style={{width: 'auto', padding: '10px 20px'}}>Download CSV</button>
        </div>
        <table style={{width: '100%', marginTop: '20px', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead><tr style={{background: '#333'}}><th>Email</th><th>Country</th><th>Service</th></tr></thead>
          <tbody>
            {waitlist.map((u, i) => (
              <tr key={i} style={{borderBottom: '1px solid #444'}}>
                <td>{u.email}</td><td>{u.country}</td><td>{u.preferred_service}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar"><img src={logo} alt="Logo" style={{height: '50px'}}/></nav>
      <header className="hero">
        <div className="container">
          <img src={mascot} className="mascot" alt="Swift" style={{height: '150px'}} />
          <h1>Send Mobile to Mobile <br/><span>Instantly.</span></h1>
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
                <option value="Airtel">AirtelTigo</option>
                <option value="OPay">OPay</option>
              </select>
            </div>
            <button type="submit" className="btn-mtn">{loading ? "Wait..." : "Join the Waitlist"}</button>
            {message && <p className="msg">{message}</p>}
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
