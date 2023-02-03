const Machine = require("../models/Machine");
const { checkLoginAndAdmin ,checkLogin} = require("./userMidelWare");
const Task = require("../models/Task");
const Ligne = require("../models/Ligne");
const Type = require("../models/Type");
const router = require("express").Router();


router.get("/",checkLogin, async (req, res) => {  
    try {
      const savedTypes = await Type.find();  
      res.status(200).json(savedTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.post("/",checkLoginAndAdmin, async (req, res) => {
    const newType = new Type(req.body);
  
    try {
      const savedType = await newType.save();  
      res.status(200).json(savedType);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/search/:s",checkLoginAndAdmin, async (req, res) => {  
    try {
      const Types = await Type.find({ name: { $regex: new RegExp(req.params.s, "i") } }).limit(10);  
      res.status(200).json(Types);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/edit/:id",checkLoginAndAdmin, async (req, res) => {  
    try {
      const savedType = await Type.findById(req.params.id).populate("tasks");  
      const savedTask = await Task.find();
      res.status(200).json({type:savedType,tasks:savedTask});
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.put("/:id",checkLoginAndAdmin, async (req, res) => {
    
  
    try {
      const savedType = await Type.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(savedType);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;