import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [view, setView] = useState('user'); 
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(100);
  const [joined, setJoined] = useState(false);

  // Growth-Oriented Fee Engine
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
        {/* Toggle for Solo Founder */}
        <div style={{background: '#000', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #333'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Public Site</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Founder View</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '500px'}}>
                    <img src={mascot} alt="Mascot" style={{height: '80px'}} />
                    
                    {!joined ? (
                        <div className="card-ui">
                            <h1 style={{fontSize: '2.5rem', marginBottom: '10px'}}>SwiftPay <span style={{color: '#FFCC00'}}>Global</span></h1>
                            
                            {/* Calculator */}
                            <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '25px', textAlign: 'left'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                    <span>Sending:</span>
                                    <strong style={{color: '#fff'}}>${amount} BMD</strong>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#FFCC00', fontSize: '0.85rem'}}>
                                    <span>Bermuda Support Fee:</span>
                                    <span>+${currentFee.toFixed(2)}</span>
                                </div>
                                <div style={{height: '1px', background: '#333', margin: '15px 0'}}></div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span>Total:</span>
                                    <strong style={{fontSize: '2rem', color: '#FFCC00'}}>${totalCharge}</strong>
                                </div>
                                <input type="range" min="50" max="2500" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', accentColor: '#FFCC00'}} />
                            </div>

                            {/* Vision Statement */}
                            <div style={{textAlign: 'left', borderLeft: '3px solid #FFCC00', paddingLeft: '15px', marginBottom: '25px'}}>
                                <h4 style={{margin: '0 0 5px 0', color: '#FFCC00'}}>The Founder's Vision</h4>
                                <p style={{fontSize: '0.85rem', color: '#ccc', lineHeight: '1.4', margin: 0}}>
                                    "We aren't just an app; we are a Bermuda-based bridge. Your fees stay on the island, helping us build a local office and hire local staff to support your family's needs."
                                </p>
                            </div>

                            <form onSubmit={handleSignup}>
                                <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '15px'}} />
                                <button type="submit" className="btn-mtn" style={{width: '100%', padding: '18px', fontWeight: 'bold'}}>Join the Alpha Waitlist</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-ui" style={{border: '2px solid #FFCC00'}}>
                            <h2 style={{color: '#FFCC00'}}>Welcome to the Community</h2>
                            <p>You're officially on the waitlist for a <strong>${amount} BMD</strong> transfer.</p>
                            <p style={{fontSize: '0.8rem', color: '#888', marginTop: '20px'}}>Keep an eye on your inbox. We'll be sending out updates on our Hamilton office location and our <strong>Head-Turn Verification</strong> launch.</p>
                            <button onClick={()=>setJoined(false)} style={{marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}>Back to Calculator</button>
                        </div>
                    )}
                </div>
            </header>
        ) : (
            <div className="admin-view" style={{padding: '50px', background: '#0a0a0a', minHeight: '100vh', color: '#fff'}}>
                <h1 style={{color: '#FFCC00'}}>Founder's Expansion Hub</h1>
                
                {/* Visual Roadmap */}
                
                
                <div style={{display: 'flex', gap: '20px', marginTop: '30px', marginBottom: '40px'}}>
                    <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '15px', flex: 1}}>
                        <p style={{color: '#888'}}>Office Fund (15% Allocation)</p>
                        <h2 style={{fontSize: '2.5rem'}}>$7,420.00</h2>
                    </div>
                    <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '15px', flex: 1, border: '1px solid #FFCC00'}}>
                        <p style={{color: '#888'}}>Next Hire: Compliance Officer</p>
                        <h2 style={{fontSize: '2.5rem'}}>78% Funded</h2>
                    </div>
                </div>

                <div style={{background: '#1a1a1a', padding: '30px', borderRadius: '20px', textAlign: 'left'}}>
                    <h3 style={{color: '#FFCC00'}}>Why This Vision Works</h3>
                    <p style={{color: '#ccc'}}>By being transparent about the 15% fee, you show customers that they are stakeholders in a Bermuda company. You aren't just taking a fee; you are building a physical service desk that they can visit if they have an issue.</p>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
