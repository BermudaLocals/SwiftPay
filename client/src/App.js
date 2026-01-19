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
    if (amt <= 100) return amt * 0.10; // 10%
    if (amt <= 500) return amt * 0.12; // 12%
    return amt * 0.15; // 15% (Office & Staff Funding)
  };

  const currentFee = calculateFee(Number(amount));
  const totalCharge = (Number(amount) + currentFee).toFixed(2);

  const handleSignup = (e) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <div className="App">
        {/* Solo Founder Control */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>SwiftPay App</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>Founder Dashboard</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '480px'}}>
                    <img src={mascot} alt="Mascot" style={{height: '80px'}} />
                    
                    {!joined ? (
                        <div className="card-ui">
                            <h1>SwiftPay <span style={{color: '#FFCC00'}}>Global</span></h1>
                            
                            <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '20px'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                    <span>You Send:</span>
                                    <strong style={{color: '#fff'}}>${amount} BMD</strong>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#FFCC00', fontSize: '0.9rem'}}>
                                    <span>Security & Support Fee:</span>
                                    <span>+${currentFee.toFixed(2)}</span>
                                </div>
                                <div style={{height: '1px', background: '#333', margin: '15px 0'}}></div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span>Total:</span>
                                    <strong style={{fontSize: '1.8rem', color: '#FFCC00'}}>${totalCharge}</strong>
                                </div>
                                <input type="range" min="50" max="2500" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', accentColor: '#FFCC00'}} />
                            </div>

                            {/* Security Certificate Section */}
                            <div style={{background: 'rgba(255, 204, 0, 0.05)', border: '1px solid rgba(255, 204, 0, 0.2)', padding: '15px', borderRadius: '15px', marginBottom: '20px', textAlign: 'left', display: 'flex', gap: '15px', alignItems: 'center'}}>
                                <div style={{fontSize: '2rem'}}>🛡️</div>
                                <div style={{fontSize: '0.75rem'}}>
                                    <strong style={{color: '#FFCC00'}}>2026 BIOMETRIC SECURITY CERTIFIED</strong><br/>
                                    Your fee funds 100% Bermuda-based compliance and Active Liveness ID Matching.
                                </div>
                            </div>

                            <form onSubmit={handleSignup}>
                                <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '15px'}} />
                                <button type="submit" className="btn-mtn" style={{width: '100%', padding: '18px', fontWeight: 'bold'}}>Join the Alpha List</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-ui">
                            <h2 style={{color: '#FFCC00'}}>Verified Spot Secured!</h2>
                            <p>We've reserved your <strong>${amount} BMD</strong> transfer slot.</p>
                            <p style={{fontSize: '0.8rem', color: '#888', marginTop: '20px'}}>When we go live, you'll receive a secure link to perform your <strong>Head-Turn Identity Match</strong>. Your safety is our #1 priority.</p>
                            <button onClick={()=>setJoined(false)} style={{marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}>Change Amount</button>
                        </div>
                    )}
                </div>
            </header>
        ) : (
            <div className="admin-portal" style={{padding: '50px', background: '#0a0a0a', minHeight: '100vh', color: '#fff'}}>
                <h1 style={{color: '#FFCC00'}}>Founder's Expansion Dashboard</h1>
                <div style={{display: 'flex', gap: '20px', marginBottom: '40px'}}>
                    <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '15px', flex: 1}}>
                        <p style={{color: '#888'}}>Office Rent Reserve</p>
                        <h2 style={{fontSize: '2rem'}}>$4,580.00</h2>
                    </div>
                    <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '15px', flex: 1, border: '1px solid #FFCC00'}}>
                        <p style={{color: '#888'}}>Premium Compliance Fees Collected</p>
                        <h2 style={{fontSize: '2rem'}}>+$720.00</h2>
                    </div>
                </div>
                <div style={{background: '#1a1a1a', padding: '30px', borderRadius: '20px', textAlign: 'left'}}>
                    <h3>Bermuda Office Roadmap</h3>
                    <p style={{color: '#ccc'}}>The 12% and 15% tiers are designed to cover the overhead of a physical service desk in Hamilton. This allows for walk-in verification and physical document support, separating SwiftPay from purely digital-only apps.</p>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
