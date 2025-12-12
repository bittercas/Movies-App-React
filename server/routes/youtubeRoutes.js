// server/routes/youtubeRoutes.js
import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/trailer/:query", async (req, res) => {
  const { query } = req.params;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${query} official trailer`,
        key: apiKey,
        maxResults: 1,
        type: "video",
      },
    });

    const video = response.data.items[0];
    res.json({
      title: video.snippet.title,
      videoId: video.id.videoId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trailer" });
  }
});

export default router;
