const mongoose = require("mongoose");

const LigneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true ,unique: true},
    position: { type: String },
    ref: { type: String },
    cat: { type: String } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ligne", LigneSchema);