// used by fecther service

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    event: String,
    value: String,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Category || mongoose.model("Log", schema);
