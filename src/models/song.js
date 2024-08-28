const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence");

const AutoIncrement = mongooseSequence(mongoose);

const songSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true, // Ensure uniqueness
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character long"],
      maxlength: [100, "Title cannot be more than 100 characters long"],
    },
    artist: {
      type: String,
      required: [true, "Artist is required"],
      trim: true,
      minlength: [1, "Artist must be at least 1 character long"],
      maxlength: [100, "Artist cannot be more than 100 characters long"],
    },
    album: {
      type: String,
      trim: true,
      minlength: [1, "Album must be at least 1 character long"],
      maxlength: [100, "Album cannot be more than 100 characters long"],
    },
    genre: {
      type: String,
      trim: true,
      minlength: [1, "Genre must be at least 1 character long"],
      maxlength: [50, "Genre cannot be more than 50 characters long"],
      enum: {
        values: [
          "Pop",
          "Rock",
          "Jazz",
          "Classical",
          "Hip-Hop",
          "Country",
          "Electronic",
          "Synthwave",
          "Reggae",
        ],
        message: "Invalid genre",
      },
    },
    releaseDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v <= Date.now();
        },
        message: "Release date cannot be in the future",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Apply the auto-increment plugin to the schema
songSchema.plugin(AutoIncrement, {
  inc_field: "id", // Field to be auto-incremented
  start_seq: 1, // Starting sequence value
});

// Create the Song model from the schema
const Song = mongoose.model("Song", songSchema);

module.exports = Song;
