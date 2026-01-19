import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [view, setView] = useState('user'); 
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(100);
  const [joined, setJoined] = useState(false);
  const [showLegal, setShowLegal] = useState(null); // 'privacy' or 'terms'

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

  // Legal Content Components
  const LegalModal = ({ title, content, onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, padding: '40px 20px', overflowY: 'scroll' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
        <h2 style={{ color: '#FFCC00' }}>{title}</h2>
        <div style={{ color: '#ccc', textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{content}</div>
        <button onClick={onClose} style={{ marginTop: '30px', padding: '12px 30px', background: '#FFCC00', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );

  const privacyContent = `Last Updated: Jan 2026\n\n1. DATA COLLECTION: We collect your email address solely to notify you of SwiftPay's launch and regulatory milestones. \n\n2. DATA USAGE: Your data is never sold. It is used to gauge market demand for the BMA Regulatory Sandbox application.\n\n3. SECURITY: We use industry-standard encryption to protect your information.`;
  
  const termsContent = `1. PRE-LICENSE STATUS: SwiftPay is currently in a pre-operational phase. We do not transmit funds at this time.\n\n2. WAITLIST: Joining the waitlist does not guarantee immediate access to services.\n\n3. COMPLIANCE: All future operations will be subject to the Digital Asset Business Act 2018 regulations in Bermuda.`;

  return (
    <div className="App" style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
        {showLegal === 'privacy' && <LegalModal title="Privacy Policy" content={privacyContent} onClose={() => setShowLegal(null)} />}
        {showLegal === 'terms' && <LegalModal title="Terms of Service" content={termsContent} onClose={() => setShowLegal(null)} />}

        {/* Navigation */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #333'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>SwiftPay Public</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Founder Dashboard</button>
        </div>

        {view === 'user' ? (
            <header className="hero" style={{ paddingBottom: '60px' }}>
                <div className="container" style={{maxWidth: '480px', margin: '0 auto', padding: '40px 20px'}}>
                    <img src={mascot} alt="Mascot" style={{height: '90px'}} />
                    {!joined ? (
                        <div className="card-ui" style={{ background: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222' }}>
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
                                <button type="submit" className="btn-mtn" style={{width: '100%', padding: '18px', fontWeight: 'bold', background: '#FFCC00', color: '#000', borderRadius: '12px', border: 'none', cursor: 'pointer'}}>Join the Alpha Waitlist</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-ui" style={{border: '2px solid #FFCC00', background: '#111', padding: '40px', borderRadius: '24px'}}>
                            <h2 style={{color: '#FFCC00'}}>Success!</h2>
                            <p>You're on the list. We'll be in touch regarding the <strong>Biometric Verification</strong> steps.</p>
                            <button onClick={()=>setJoined(false)} style={{marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}>Back to Home</button>
                        </div>
                    )}
                    
                    {/* Legal Footer */}
                    <div style={{ marginTop: '40px', fontSize: '0.75rem', color: '#555' }}>
                        <span onClick={() => setShowLegal('privacy')} style={{ cursor: 'pointer', margin: '0 10px' }}>Privacy Policy</span> | 
                        <span onClick={() => setShowLegal('terms')} style={{ cursor: 'pointer', margin: '0 10px' }}>Terms of Service</span>
                    </div>
                </div>
            </header>
        ) : (
            <div style={{padding: '40px', background: '#0a0a0a', minHeight: '100vh', color: '#fff'}}>
                <h1 style={{color: '#FFCC00'}}>Founder's Hub</h1>
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
                    <h3 style={{color: '#FFCC00'}}>Compliance Roadmap</h3>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>Next Step: Finalize BMA Sandbox Application documents including the Privacy and Terms policies generated today.</p>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
