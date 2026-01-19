const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// API: Public Waitlist Signup
app.post('/api/waitlist', async (req, res) => {
    const { email, country, preferred_service } = req.body;
    const { data, error } = await supabase.from('waitlist').insert([{ email, country, preferred_service }]);
    
    if (error) return res.status(500).json(error);
    
    // Logic for instant notification would go here
    console.log(`New Signup: ${email} from ${country}`);
    res.json({ success: true });
});

// API: Admin Test Notification
app.post('/api/admin/test-notify', (req, res) => {
    // This simulates an alert to your phone/email
    console.log("TEST ALERT: System is successfully sending notifications.");
    res.json({ success: true, message: "Test alert sent to server logs!" });
});

app.get('/api/admin/list', async (req, res) => {
    const { data, error } = await supabase.from('waitlist').select('*').order('joined_at', { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("SwiftPay Global Hub Live"));
