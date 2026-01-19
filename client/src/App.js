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
    <div className="App" style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
        {/* Navigation */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #333', position: 'sticky', top: 0, zIndex: 100}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'}}>SwiftPay Public</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'}}>Founder Dashboard</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '480px', margin: '0 auto', padding: '40px 20px'}}>
                    <img src={mascot} alt="Mascot" style={{height: '90px', marginBottom: '20px'}} />
                    {!joined ? (
                        <div className="card-ui" style={{ background: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                            <h1 style={{fontSize: '2.5rem', marginBottom: '10px', fontWeight: '800'}}>SwiftPay <span style={{color: '#FFCC00'}}>Global</span></h1>
                            <p style={{ color: '#888', marginBottom: '25px' }}>Premium Remittance. Bermuda-Powered Support.</p>
                            
                            <div style={{background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '25px', textAlign: 'left'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                    <span style={{color: '#aaa'}}>Send Amount:</span>
                                    <strong style={{fontSize: '1.2rem'}}>${amount} BMD</strong>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#FFCC00', fontSize: '0.85rem'}}>
                                    <span>Compliance & Office Fee:</span>
                                    <span>+${currentFee.toFixed(2)}</span>
                                </div>
                                <div style={{height: '1px', background: '#333', margin: '15px 0'}}></div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span style={{fontSize: '1.1rem'}}>Total To Pay:</span>
                                    <strong style={{fontSize: '2.2rem', color: '#FFCC00'}}>${totalCharge}</strong>
                                </div>
                                <input type="range" min="50" max="2500" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', accentColor: '#FFCC00', cursor: 'pointer'}} />
                            </div>

                            <form onSubmit={handleSignup}>
                                <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #333', background: '#000', color: '#fff', marginBottom: '15px', boxSizing: 'border-box'}} />
                                <button type="submit" className="btn-mtn" style={{width: '100%', padding: '18px', fontWeight: 'bold', background: '#FFCC00', color: '#000', border: 'none', borderRadius: '12px', fontSize: '1.1rem', cursor: 'pointer'}}>Reserve My Spot</button>
                            </form>
                            <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '20px' }}>*Fees support local Bermuda operations and regulatory compliance.</p>
                        </div>
                    ) : (
                        <div className="card-ui" style={{border: '2px solid #FFCC00', background: '#111', padding: '40px', borderRadius: '24px'}}>
                            <div style={{fontSize: '3rem', marginBottom: '20px'}}>✅</div>
                            <h2 style={{color: '#FFCC00', fontSize: '2rem'}}>You're on the list!</h2>
                            <p style={{lineHeight: '1.6', color: '#ccc'}}>We will contact you via <strong>{email}</strong> when the BMA Sandbox window opens for your first transfer.</p>
                            <button onClick={()=>setJoined(false)} style={{marginTop: '30px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline'}}>Back to Calculator</button>
                        </div>
                    )}
                </div>
            </header>
        ) : (
            <div style={{padding: '60px 20px', maxWidth: '900px', margin: '0 auto', textAlign: 'left'}}>
                <h1 style={{color: '#FFCC00', fontSize: '2.5rem', marginBottom: '40px'}}>Founder's Expansion Hub</h1>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px'}}>
                    <div style={{background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222'}}>
                        <p style={{color: '#888', fontSize: '0.9rem', marginBottom: '10px'}}>Office Fund Goal</p>
                        <h3 style={{fontSize: '2rem', margin: 0}}>$8,140.00</h3>
                        <div style={{width: '100%', height: '8px', background: '#222', borderRadius: '10px', marginTop: '15px'}}>
                            <div style={{width: '81%', height: '100%', background: '#FFCC00', borderRadius: '10px'}}></div>
                        </div>
                    </div>
                    <div style={{background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #FFCC00'}}>
                        <p style={{color: '#888', fontSize: '0.9rem', marginBottom: '10px'}}>Weekly Engagement</p>
                        <h3 style={{fontSize: '2rem', margin: 0, color: '#FFCC00'}}>14 Signups</h3>
                        <p style={{color: '#00FF7F', fontSize: '0.8rem', marginTop: '10px'}}>↑ 12% from last week</p>
                    </div>
                </div>

                <div style={{background: '#111', padding: '40px', borderRadius: '24px', border: '1px solid #222'}}>
                    <h3 style={{color: '#FFCC00', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <span>📋</span> Founder's Weekly Checklist
                    </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        <li style={{padding: '15px 0', borderBottom: '1px solid #222', display: 'flex', gap: '15px'}}>
                           <span style={{color: '#555'}}>⬜</span> <span>Recruit 5 new waitlist users via social/word-of-mouth</span>
                        </li>
                        <li style={{padding: '15px 0', borderBottom: '1px solid #222', display: 'flex', gap: '15px'}}>
                           <span style={{color: '#555'}}>⬜</span> <span>Review BMA "Digital Asset Business" guidance notes</span>
                        </li>
                        <li style={{padding: '15px 0', borderBottom: '1px solid #222', display: 'flex', gap: '15px'}}>
                           <span style={{color: '#555'}}>⬜</span> <span>Update Ghana Merchant Payout docs with Spouse</span>
                        </li>
                        <li style={{padding: '15px 0', display: 'flex', gap: '15px'}}>
                           <span style={{color: '#555'}}>⬜</span> <span>Monitor Render server logs for uptime</span>
                        </li>
                    </ul>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
