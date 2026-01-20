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
