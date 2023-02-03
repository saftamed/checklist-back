const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String },
    ligne:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ligne"
    },
    ref: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type" },
    cat: { type: String },
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

module.exports = mongoose.model("Machine", MachineSchema);