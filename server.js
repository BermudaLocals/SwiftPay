// Add these to your existing Express server
app.get('/api/v1/meta/corridors', (req, res) => {
  res.json({
    active: true,
    regions: [
      { id: 'africa', name: 'West Africa', multiplier: 15.25, currency: 'GHS', status: 'Optimal' },
      { id: 'philippines', name: 'Philippines', multiplier: 55.80, currency: 'PHP', status: 'High Yield' },
      { id: 'caribbean', name: 'Jamaica', multiplier: 154.20, currency: 'JMD', status: 'Optimal' }
    ],
    timestamp: new Date().toISOString(),
    system_load: "0.04ms"
  });
});

app.get('/api/v1/pulse', (req, res) => {
    // Simulated live settlement pulse
    res.json({
        total_volume_today: Math.floor(Math.random() * 50000) + 120000,
        active_nodes: 14,
        bermuda_settlement_status: "Operational"
    });
});


const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- SWIFTPAY CORRIDOR METADATA ---
const REGION_MAP = {
  GH: { name: 'Ghana', rate: 15.25, partner: 'MTN Money', branding: "#FDCC00" },
  PH: { name: 'Philippines', rate: 55.80, partner: 'GCash', branding: "#007CFF" },
  JM: { name: 'Jamaica', rate: 154.20, partner: 'Digicel', branding: "#E5002B" },
  BM: { name: 'Bermuda', rate: 1.00, partner: 'SwiftPay Rail', branding: "#D4AF37" }
};

// 1. Live Pulse Endpoint (For Dashboard Meters)
app.get('/api/v1/pulse', (req, res) => {
  res.json({
    total_volume_today: Math.floor(Math.random() * 50000) + 120000,
    active_nodes: 14,
    bermuda_settlement_status: "Operational",
    timestamp: new Date().toISOString()
  });
});

// 2. Regional Config Endpoint
app.get('/api/v1/config/:region', (req, res) => {
  const region = req.params.region.toUpperCase();
  const config = REGION_MAP[region] || REGION_MAP['BM'];
  res.json({
    status: "online",
    ...config,
    bridge_status: "Bermuda-Secured"
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SwiftPay Backend Rail Active on Port ${PORT}`);
});
