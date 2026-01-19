import React, { useState } from 'react';
import './App.css';
import logo from './logo.png'; 
import mascot from './mascot.png';

function App() {
  const [view, setView] = useState('user'); // Toggle between 'user' and 'admin'
  const [step, setStep] = useState('calculate');
  const [livenessStatus, setLivenessStatus] = useState('Ready');

  // Mock Data for Admin Dashboard
  const [kycQueue, setKycQueue] = useState([
    { id: 'TX990', email: 'sender1@gmail.com', country: 'Ghana', liveness: '98%', status: 'Success', date: 'Jan 19' },
    { id: 'TX991', email: 'test@bmd.com', country: 'Philippines', liveness: '42%', status: 'Failed (Head Turn)', date: 'Jan 19' }
  ]);

  const handleLiveness = () => {
    setStep('verify');
    setLivenessStatus('Tracking Eye Movement...');
    setTimeout(() => setLivenessStatus('Turn Left...'), 1500);
    setTimeout(() => setLivenessStatus('Turn Right...'), 3000);
    setTimeout(() => {
        setStep('success');
        // Add current user to admin queue for simulation
        setKycQueue([...kycQueue, { id: 'TX'+Math.floor(Math.random()*1000), email: 'newuser@bmd.com', country: 'Ghana', liveness: 'Pass', status: 'Pending Review', date: 'Now' }]);
    }, 5000);
  };

  return (
    <div className="App">
        {/* Navigation for Solo Founder */}
        <div style={{background: '#111', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
            <button onClick={() => setView('user')} style={{background: view === 'user' ? '#FFCC00' : 'none', color: view === 'user' ? '#000' : '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>Customer View</button>
            <button onClick={() => setView('admin')} style={{background: view === 'admin' ? '#FFCC00' : 'none', color: view === 'admin' ? '#000' : '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer'}}>Admin Dashboard</button>
        </div>

        {view === 'user' ? (
            <header className="hero">
                <div className="container" style={{maxWidth: '450px'}}>
                    {step === 'calculate' && (
                        <div className="card-ui">
                            <img src={mascot} alt="SwiftPay" style={{height: '80px'}} />
                            <h2>Verified Transfer</h2>
                            <p>Verify your identity once to unlock 10% transfers.</p>
                            <button onClick={() => setStep('verify')} className="btn-mtn" style={{width: '100%', marginTop: '20px'}}>Verify My Identity</button>
                        </div>
                    )}

                    {step === 'verify' && (
                        <div className="card-ui">
                            <div style={{width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #FFCC00', margin: '0 auto', background: '#000', overflow: 'hidden', position: 'relative'}}>
                                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '4rem'}}>👤</div>
                                <div className="scanning-bar"></div>
                            </div>
                            <h3 style={{color: '#FFCC00', marginTop: '20px'}}>{livenessStatus}</h3>
                            <button onClick={handleLiveness} className="btn-mtn" style={{marginTop: '20px'}}>Start Biometric Scan</button>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="card-ui">
                            <h2 style={{color: '#FFCC00'}}>✅ Verified</h2>
                            <p>Head movement and ID match successful. You are now authorized to send.</p>
                            <button onClick={() => setStep('calculate')} className="btn-mtn" style={{width: '100%'}}>Back</button>
                        </div>
                    )}
                </div>
            </header>
        ) : (
            <div className="admin-panel" style={{padding: '40px', background: '#121212', minHeight: '100vh', color: '#fff'}}>
                <h2 style={{color: '#FFCC00'}}>SwiftPay Admin: KYC Queue</h2>
                <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'left'}}>
                    <thead>
                        <tr style={{borderBottom: '2px solid #333', color: '#888'}}>
                            <th style={{padding: '10px'}}>Date</th>
                            <th>User Email</th>
                            <th>Target</th>
                            <th>Liveness Score</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kycQueue.map((user, index) => (
                            <tr key={index} style={{borderBottom: '1px solid #222'}}>
                                <td style={{padding: '15px'}}>{user.date}</td>
                                <td>{user.email}</td>
                                <td>{user.country}</td>
                                <td style={{color: parseFloat(user.liveness) < 50 ? '#ff4d4d' : '#4CAF50'}}>{user.liveness}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button style={{background: '#4CAF50', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px'}}>Approve</button>
                                    <button style={{background: '#ff4d4d', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'}}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  );
}

export default App;
