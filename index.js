require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const TRACKER_API_KEY = process.env.TRACKER_API_KEY;

app.use(cors());
app.use(express.json());

app.get('/valorant/profile/:tag', async (req, res) => {
    try {
        const { tag } = req.params;
        const apiUrl = `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${encodeURIComponent(tag)}?forceCollect=true`;

        const response = await axios.get(apiUrl, {
            headers: { 'TRN-Api-Key': TRACKER_API_KEY }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
