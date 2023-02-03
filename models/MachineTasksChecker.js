const mongoose = require("mongoose");

const MachineTasksCheckerSchema = new mongoose.Schema(
  {
    user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    machine: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine"
      },
    tasks:[
        {
            status:{ type: Boolean,default: false,},
            task:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        }
    ],
    active:{type: Boolean,default : false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("MachineTasksChecker", MachineTasksCheckerSchema);