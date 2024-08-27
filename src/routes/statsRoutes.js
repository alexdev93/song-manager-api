const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const sendResponse = require("../utils/responseHelper");

// Total counts
router.get("/stats", async (req, res, next) => {
  try {
    const totalSongs = await Song.countDocuments({});
    const totalArtists = (await Song.distinct("artist")).length;
    const totalAlbums = (await Song.distinct("album")).length;
    const totalGenres = (await Song.distinct("genre")).length;

    const transformedData = {
      totalSongs: Number(totalSongs),
      totalArtists: Number(totalArtists),
      totalAlbums: Number(totalAlbums),
      totalGenres: Number(totalGenres),
    };

    sendResponse(
      res,
      200,
      transformedData,
      "Statistics retrieved successfully"
    );
  } catch (e) {
    next(e);
  }
});

// Songs by genre
router.get("/stats/genre", async (req, res, next) => {
  try {
    const genres = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);
    sendResponse(res, 200, genres, "Genres statistics retrieved successfully");
  } catch (e) {
    next(e);
  }
});

// Songs and albums by artist
router.get("/stats/artist", async (req, res, next) => {
  try {
    const artists = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          totalSongs: { $sum: 1 },
          totalAlbums: { $addToSet: "$album" },
        },
      },
      { $project: { totalAlbums: { $size: "$totalAlbums" } } },
    ]);
    sendResponse(
      res,
      200,
      artists,
      "Artists statistics retrieved successfully"
    );
  } catch (e) {
    next(e);
  }
});

// Songs by album
router.get("/stats/album", async (req, res, next) => {
  try {
    const albums = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);
    sendResponse(res, 200, albums, "Albums statistics retrieved successfully");
  } catch (e) {
    next(e);
  }
});

// Get the number of songs in each album
router.get("/stats/songs-in-album", async (req, res, next) => {
  try {
    const songsInAlbum = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          album: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    sendResponse(
      res,
      200,
      { songsInAlbum },
      "Number of songs in each album retrieved successfully"
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
