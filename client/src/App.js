import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [email, setEmail] = useState('');
  const [view, setView] = useState('user');
  const [waitlistStatus, setWaitlistStatus] = useState('idle'); // idle, joined
  const [amount, setAmount] = useState(250);

  const marketRates = { Ghana: 15.15, Jamaica: 158.50, Philippines: 59.45 };
  const fee = (amount * 0.10).toFixed(2);
  const receiving = ((amount - fee) * marketRates['Ghana']).toLocaleString(undefined, {maximumFractionDigits: 0});

  const handleWaitlist = async (e) => {
    e.preventDefault();
    // Simulate API call
    setWaitlistStatus('joined');
  };

  return (
    <div className="App">
        {/* Navigation */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>Customer View</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>Founder Dashboard</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '450px'}}>
                    <img src={mascot} alt="SwiftPay" style={{height: '80px', marginBottom: '10px'}} />
                    
                    {waitlistStatus === 'idle' ? (
                        <div className="card-ui">
                            <h2 style={{fontSize: '2rem'}}>SwiftPay <span style={{color: '#FFCC00'}}>10%</span></h2>
                            <p style={{color: '#888', marginBottom: '20px'}}>The digital bridge from Bermuda to Africa.</p>
                            
                            <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '15px', textAlign: 'left', marginBottom: '20px'}}>
                                <p style={{margin: '5px 0'}}>Send <strong>${amount} BMD</strong></p>
                                <p style={{margin: '5px 0', fontSize: '1.4rem', color: '#FFCC00'}}>Get <strong>{receiving} GHS</strong></p>
                                <input type="range" min="100" max="1000" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '15px'}} />
                            </div>

                            <form onSubmit={handleWaitlist}>
                                <input type="email" placeholder="Enter email for early access" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '10px'}} />
                                <button type="submit" className="btn-mtn" style={{width: '100%', padding: '15px', background: '#FFCC00', border: 'none', borderRadius: '10px', fontWeight: 'bold'}}>Join 2026 Alpha Waitlist</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-ui" style={{border: '1px solid #FFCC00', animation: 'fadeIn 0.5s'}}>
                            <span style={{fontSize: '3rem'}}>🚀</span>
                            <h3>You're on the list!</h3>
                            <p style={{fontSize: '0.9rem', color: '#ccc'}}>We'll email you soon to complete your <strong>Biometric Verification</strong> (ID & Selfie) to unlock transfers.</p>
                            <div style={{background: '#222', padding: '15px', borderRadius: '10px', marginTop: '20px', textAlign: 'left'}}>
                                <p style={{fontSize: '0.75rem', color: '#888'}}><strong>WHY VERIFY LATER?</strong> To keep your data safe, we only request ID documents right before your first transfer. No unnecessary data storage.</p>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        ) : (
            <div style={{padding: '50px', background: '#000', minHeight: '100vh', color: '#fff'}}>
                <h2 style={{color: '#FFCC00'}}>SwiftPay Founder Dashboard</h2>
                <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
                    <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '10px', flex: 1}}>
                        <h3>842</h3>
                        <p style={{color: '#888'}}>Waitlist Signups</p>
                    </div>
                    <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '10px', flex: 1, border: '1px solid #FFCC00'}}>
                        <h3>$10,000</h3>
                        <p style={{color: '#888'}}>Target Cap (Class T)</p>
                    </div>
                </div>
                <p>New emails will appear here. You can manually invite them to the "Head-Turn" selfie stage once your BMA application is ready.</p>
            </div>
        )}
    </div>
  );
}

export default App;
