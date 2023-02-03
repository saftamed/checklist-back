const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tasks:
    [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Type", TypeSchema);