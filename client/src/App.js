import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import mascot from './mascot.png';

// --- SWIFTPAY DATABASE CONFIG ---
// Get these from your Supabase Dashboard > Settings > API
const SUPABASE_URL = "YOUR_SUPABASE_URL"; 
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function App() {
  const [view, setView] = useState('user'); 
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(100);
  const [joined, setJoined] = useState(false);
  const [showLegal, setShowLegal] = useState(null);

  // SwiftPay Tiered Fee Engine
  const calculateFee = (amt) => {
    if (amt <= 100) return amt * 0.10; 
    if (amt <= 500) return amt * 0.12; 
    return amt * 0.15; 
  };

  const currentFee = calculateFee(Number(amount));
  const totalCharge = (Number(amount) + currentFee).toFixed(2);

  // Database Submission to 'waitlist' table
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('waitlist') 
      .insert([
        { 
          email: email, 
          amount: Number(amount), 
          fee: Number(currentFee.toFixed(2)), 
          total: Number(totalCharge) 
        },
      ]);

    if (!error) {
      setJoined(true);
    } else {
      console.error("Supabase Error:", error);
      alert("Registration Error: " + error.message);
    }
  };

  const LegalModal = ({ title, content, onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, padding: '40px 20px', overflowY: 'scroll' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #333' }}>
        <h2 style={{ color: '#FFCC00' }}>{title}</h2>
        <div style={{ color: '#ccc', textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{content}</div>
        <button onClick={onClose} style={{ marginTop: '30px', padding: '12px 30px', background: '#FFCC00', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );

  const privacyContent = `SWIFTPAY PRIVACY POLICY\n\n1. DATA COLLECTION: We collect email addresses to notify users of SwiftPay's launch.\n2. USAGE: Data is used to support our BMA Regulatory Sandbox application.\n3. PROTECTION: We use industry-standard encryption for all stored data.`;
  
  const termsContent = `SWIFTPAY TERMS OF SERVICE\n\n1. STATUS: SwiftPay is currently in a pre-operational/waitlist phase.\n2. NO TRANSFERS: No funds are being transmitted or accepted for transfer at this time.\n3. REGULATION: Operations are subject to Bermuda's Digital Asset Business Act.`;

  return (
    <div className="App" style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
        {showLegal === 'privacy' && <LegalModal title="Privacy Policy" content={privacyContent} onClose={() => setShowLegal(null)} />}
        {showLegal === 'terms' && <LegalModal title="Terms of Service" content={termsContent} onClose={() => setShowLegal(null)} />}

        {/* Top Navigation */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #333'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>SwiftPay App</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Founder Portal</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '480px', margin: '0 auto', padding: '40px 20px', textAlign: 'center'}}>
                    <img src={mascot} alt="Mascot" style={{height: '90px', marginBottom: '20px'}} />
                    {!joined ? (
                        <div className="card-ui" style={{ background: '#111', padding: '30px', borderRadius: '24px', border: '1px solid #222', textAlign: 'center' }}>
                            <h1 style={{fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold'}}>SwiftPay <span style={{color: '#FFCC00'}}>Global</span></h1>
                            <p style={{color: '#888', marginBottom: '25px'}}>Bermuda's Premium Remittance Bridge</p>
                            
                            <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '20px', border: '1px solid #333', marginBottom: '25px', textAlign: 'left'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>Send Amount:</span>
                                    <strong>${amount} BMD</strong>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', color: '#FFCC00', fontSize: '0.85rem', marginTop: '5px'}}>
                                    <span>Compliance & Office Fee:</span>
                                    <span>+${currentFee.toFixed(2)}</span>
                                </div>
                                <div style={{height: '1px', background: '#333', margin: '15px 0'}}></div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span>Total Pay:</span>
                                    <strong style={{fontSize: '2.2rem', color: '#FFCC00'}}>${totalCharge}</strong>
                                </div>
                                <input type="range" min="50" max="2500" step="50" value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width: '100%', marginTop: '20px', cursor: 'pointer'}} />
                            </div>

                            <form onSubmit={handleSignup}>
                                <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #333', background: '#222', color: '#fff', marginBottom: '15px', boxSizing: 'border-box'}} />
                                <button type="submit" style={{width: '100%', padding: '18px', fontWeight: 'bold', background: '#FFCC00', color: '#000', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '1rem'}}>Secure My Alpha Spot</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-ui" style={{border: '2px solid #FFCC00', background: '#111', padding: '40px', borderRadius: '24px'}}>
                            <h2 style={{color: '#FFCC00'}}>Registration Confirmed</h2>
                            <p>You have been added to the secure SwiftPay database. We will contact you for **Head-Turn Biometric** onboarding soon.</p>
                            <button onClick={()=>setJoined(false)} style={{marginTop: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}>Back</button>
                        </div>
                    )}
                    
                    <div style={{ marginTop: '40px', fontSize: '0.75rem', color: '#555' }}>
                        <span onClick={() => setShowLegal('privacy')} style={{ cursor: 'pointer', margin: '0 10px' }}>Privacy Policy</span> | 
                        <span onClick={() => setShowLegal('terms')} style={{ cursor: 'pointer', margin: '0 10px' }}>Terms of Service</span>
                    </div>
                </div>
            </header>
        ) : (
            <div style={{padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'left'}}>
                <h1 style={{color: '#FFCC00'}}>Founder's Portal</h1>
                <div style={{background: '#1a1a1a', padding: '25px', borderRadius: '20px', border: '1px solid #333', marginBottom: '30px'}}>
                   <h3>Live Database: Supabase</h3>
                   <p style={{color: '#888'}}>Every "Alpha Spot" reserved is logged here for BMA compliance reporting.</p>
                </div>
                <div style={{background: '#111', padding: '30px', borderRadius: '20px', border: '1px solid #222'}}>
                    <h4 style={{color: '#FFCC00'}}>Weekly Goal Progress</h4>
                    <p>Office Fund Target: **$8,140.00**</p>
                    <div style={{width: '100%', height: '10px', background: '#333', borderRadius: '5px'}}>
                        <div style={{width: '45%', height: '100%', background: '#FFCC00', borderRadius: '5px'}}></div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default App;
