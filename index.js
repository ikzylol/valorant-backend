const express = require('express');
const axios = require('axios');
require('dotenv').config();  // To load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Route to fetch Valorant stats
app.get('/api/valorant/stats/:playerId', async (req, res) => {
  const { playerId } = req.params;  // Player's Riot ID or Tracker.gg ID
  
  try {
    const response = await axios.get(`https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${playerId}`, {
      headers: {
        'TRN-Api-Key': process.env.TRACKER_API_KEY,  // API Key from .env
      },
    });

    const stats = {
      player: response.data.data.platformInfo.platformUserId,
      currentRank: response.data.data.segments[0].stats.rank.displayValue,
      peakRank: response.data.data.segments[0].stats.highestRank.displayValue,
      matchesPlayed: response.data.data.segments[0].stats.matchesPlayed.value,
      kills: response.data.data.segments[0].stats.kills.value,
      deaths: response.data.data.segments[0].stats.deaths.value,
      kdRatio: response.data.data.segments[0].stats.kdRatio.value,
      winRate: response.data.data.segments[0].stats.winRate.value,
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).send('Error fetching stats.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
