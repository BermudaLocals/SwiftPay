const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GLOBAL SURGE CALCULATION (Applies to all countries)
const getGlobalPricing = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // High Traffic: Friday (5), Saturday (6), Sunday (0) OR Weekdays after 5 PM
    const isPeak = (day === 0 || day === 5 || day === 6 || (hour >= 17 && hour <= 23));
    
    return {
        rate: isPeak ? 0.08 : 0.03, // 8% Surge vs 3% Standard
        status: isPeak ? "HIGH_TRAFFIC" : "NORMAL"
    };
};

// API: Get Live Fee for ANY Country
app.get('/api/global-quote', (req, res) => {
    const amount = parseFloat(req.query.amount) || 0;
    const pricing = getGlobalPricing();
    res.json({
        fee: (amount * pricing.rate).toFixed(2),
        total: (amount + (amount * pricing.rate)).toFixed(2),
        surge: pricing.status === "HIGH_TRAFFIC"
    });
});

// API: Admin List (Access for your global dashboard)
app.get('/api/admin/list', async (req, res) => {
    const { data, error } = await supabase.from('waitlist').select('*').order('joined_at', { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
});

app.post('/api/waitlist', async (req, res) => {
    const { email, country, preferred_service } = req.body;
    const { data, error } = await supabase.from('waitlist').insert([{ email, country, preferred_service }]);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("SwiftPay Global Hub Active"));
