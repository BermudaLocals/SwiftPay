const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// --- HOLIDAY & SURGE CONFIGURATION ---
const HOLIDAYS = [
    "12-25", // Christmas
    "12-26", // Boxing Day
    "01-01", // New Year's Day
    "03-06", // Ghana Independence Day
    "10-01", // Nigeria Independence Day
    "05-24", // Bermuda Day
];

const getGlobalPricing = () => {
    const now = new Date();
    const monthDay = `${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const hour = now.getHours();
    const day = now.getDay();

    // Check if today is a Holiday
    const isHoliday = HOLIDAYS.includes(monthDay);
    
    // Check if it's a Weekend or Peak Hour (5 PM - 11 PM)
    const isPeakTime = (day === 0 || day === 5 || day === 6 || (hour >= 17 && hour <= 23));

    if (isHoliday || isPeakTime) {
        return { rate: 0.08, status: "SURGE", reason: isHoliday ? "Holiday Traffic" : "Peak Hours" };
    }
    
    return { rate: 0.03, status: "NORMAL", reason: "Standard Rate" };
};

// API: Get Live Quote (Used by the frontend status bar)
app.get('/api/global-quote', (req, res) => {
    const pricing = getGlobalPricing();
    res.json(pricing);
});

app.post('/api/waitlist', async (req, res) => {
    const { email, country, preferred_service } = req.body;
    const { data, error } = await supabase.from('waitlist').insert([{ email, country, preferred_service }]);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
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
app.listen(PORT, () => console.log("SwiftPay Global Hub with Holiday Logic Active"));
