import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [view, setView] = useState('user'); 
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(100);
  const [joined, setJoined] = useState(false);

  // Growth-Based Fee Engine
  const calculateFee = (amt) => {
    if (amt <= 100) return amt * 0.10; 
    if (amt <= 500) return amt * 0.12; 
    return amt * 0.15; 
  };

  const currentFee = calculateFee(Number(amount));
  const totalCharge = (Number(amount) + currentFee).toFixed(2);

  const handleSignup = (e) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <div className="App">
        {/* Navigation */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #333'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>SwiftPay Public</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Founder Dashboard</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '480px'}}>
                    <img src={mascot} alt="Mascot" style={{height: '90px'}} />
                    {!joined ? (
                        <div className="card-ui">
                            <h1 style={{fontSize: '2.5rem', marginBottom: '10px'}}>SwiftPay <span style={{color: '#FFCC00'}}>Global</span></h1>
                            <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '25px', textAlign: 'left'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>Send Amount:</span>
                                    <strong>${amount} BMD</strong>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#FFCC00', fontSize: '0.85rem', marginTop: '5px'}}>
                                    <span>Security & Office Fee:</span>
                                    <span>+${currentFee.toFixed(2)}</span>
                                </div>
                                <div style={{height: '1px', background: '#333', margin: '15px 0'}}></div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span>Total Pay:</span>
                                    <strong style={{fontSize: '2rem', color: '#FFCC00'}}>${totalCharge}</strong>
                                </div>
                                <input type="range" min="50" max="2500" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px'}} />
                            </div>
                            <form onSubmit={handleSignup}>
                                <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '15px'}} />
                                <button type="submit" className="btn-mtn" style={{width: '100%', padding: '18px', fontWeight: 'bold'}}>Join the Alpha Waitlist</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-ui" style={{border: '2px solid #FFCC00'}}>
                            <h2 style={{color: '#FFCC00'}}>Success!</h2>
                            <p>You're on the list. We'll be in touch regarding the <strong>Biometric Verification</strong> steps.</p>
                            <button onClick={()=>setJoined(false)} style={{marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}>Back to Home</button>
                        </div>
                    )}
                </div>
            </header>
        ) : (
            <div style={{padding: '40px', background: '#0a0a0a', minHeight: '100vh', color: '#fff'}}>
                <h1 style={{color: '#FFCC00'}}>Weekly Operational View</h1>
                
                <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
                    <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '15px', flex: 1, border: '1px solid #333'}}>
                        <h3>$8,140.00</h3>
                        <p style={{color: '#888'}}>Projected Office Fund</p>
                    </div>
                    <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '15px', flex: 1, border: '1px solid #FFCC00'}}>
                        <h3>14</h3>
                        <p style={{color: '#888'}}>New Signups This Week</p>
                    </div>
                </div>

                <div style={{background: '#1a1a1a', padding: '30px', borderRadius: '20px', textAlign: 'left', border: '1px solid #333'}}>
                    <h3 style={{color: '#FFCC00'}}>Founder's Weekly Checklist</h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        <li style={{padding: '10px 0', borderBottom: '1px solid #222'}}>⬜ Recruit 5 new waitlist users via social/word-of-mouth</li>
                        <li style={{padding: '10px 0', borderBottom: '1px solid #222'}}>⬜ Review BMA "Digital Asset Business" guidance notes</li>
                        <li style={{padding: '10px 0', borderBottom: '1px solid #222'}}>⬜ Update Ghana Merchant Payout docs with Spouse</li>
                        <li style={{padding: '10px 0'}}>⬜ Monitor Render server logs for uptime</li>
                    </ul>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
