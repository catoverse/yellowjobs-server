const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, default: null },
    tweet_id: { type: String, default: null },
    action: { type: String },
    value: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Feedback || mongoose.model("feedback", schema, "feedback");
