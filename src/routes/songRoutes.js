const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const sendResponse = require("../utils/responseHelper");

// Create a new song
router.post("/songs", async (req, res, next) => {
  try {
    const song = new Song(req.body);
    await song.save();
    sendResponse(res, 201, song, "Song created successfully");
  } catch (e) {
    next(e); // Pass errors to the global error handler
  }
});

// List all songs
router.get("/songs", async (req, res, next) => {
  try {
    const songs = await Song.find({});
    sendResponse(res, 200, songs, "Songs retrieved successfully");
  } catch (e) {
    next(e); // Pass errors to the global error handler
  }
});

// Get a song by ID
router.get("/songs/:id", async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    sendResponse(res, 200, song, "Song retrieved successfully");
  } catch (e) {
    next(e); // Pass errors to the global error handler
  }
});

// Update a song by ID
router.patch("/songs/:id", async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    sendResponse(res, 200, song, "Song updated successfully");
  } catch (e) {
    next(e); // Pass errors to the global error handler
  }
});

// Remove a song by ID
router.delete("/songs/:id", async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      const error = new Error("Song not found");
      error.statusCode = 404;
      throw error;
    }
    sendResponse(res, 200, song, "Song deleted successfully");
  } catch (e) {
    next(e); // Pass errors to the global error handler
  }
});

module.exports = router;
