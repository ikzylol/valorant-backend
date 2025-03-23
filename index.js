const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

app.get("/api/valorant-stats", async (req, res) => {
    try {
        // Replace this with your actual Valorant username or Riot ID
        const playerName = "MEX Ikzy#ONU"; // Your Riot username

        // Access the API_KEY from the environment variables
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            return res.status(500).json({ error: "API key is missing from environment variables" });
        }

        // Make the API request to Tracker.gg Valorant stats endpoint
        const response = await axios.get(`https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${playerName}`, {
            headers: { "TRN-API-KEY": API_KEY }
        });

        const playerStats = response.data.data.segments[0].stats;

        // Extract relevant stats
        const stats = {
            current_rank: playerStats["current-tier"].displayValue,
            peak_rank: playerStats["peak-tier"].displayValue,
            kd_ratio: playerStats.kdRatio.displayValue,
            win_rate: playerStats.winRate.displayValue,
            matches_played: playerStats.matchesPlayed.displayValue,
        };

        // Return the stats as a JSON response
        res.json(stats);
    } catch (error) {
        console.error("Error fetching Valorant stats:", error);
        res.status(500).json({ error: "Failed to fetch Valorant stats" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
