const Machine = require("../models/Machine");
const { checkLoginAndAdmin ,checkLogin} = require("./userMidelWare");
const Task = require("../models/Task");
const Ligne = require("../models/Ligne");
const Type = require("../models/Type");
const router = require("express").Router();

router.post("/",checkLoginAndAdmin, async (req, res) => {
    const newMachine = new Machine(req.body);
  
    try {
      const savedMachine = await newMachine.save();  
      res.status(200).json(savedMachine);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.put("/:id",checkLoginAndAdmin, async (req, res) => {
    
  
    try {
      const savedMachine = await Machine.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(savedMachine);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/",checkLogin, async (req, res) => {  
    try {
      const savedMachine = await Machine.find().select('name');  
      res.status(200).json(savedMachine);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/m",checkLogin, async (req, res) => {  
    try {
      const machines = await Machine.find().select('name').populate("ligne");  
      const lignes = await Ligne.find();  
      res.status(200).json({machines,lignes});
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/qrs",checkLogin, async (req, res) => {  
    try {
      console.log("qrs");
      const machines = await Machine.find().populate("ligne").populate("ref");  
      res.status(200).json({machines});
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/last",checkLogin, async (req, res) => {  
    try {
      const savedMachine = await Machine.find().limit(10).sort({createdAt: -1}).populate("ligne").populate("ref");  
      res.status(200).json(savedMachine);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/search/:s",checkLogin, async (req, res) => {  
    try {
      const savedMachine = await Machine.find({ name: { $regex: new RegExp(req.params.s, "i") } }).limit(10);  
      res.status(200).json(savedMachine);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/:id",checkLogin, async (req, res) => {  
    try {
      const savedMachine = await Machine.findById(req.params.id).populate("tasks").populate("ligne");  
      res.status(200).json(savedMachine);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/edit/:id",checkLoginAndAdmin, async (req, res) => {  
    try {
      const savedMachine = await Machine.findById(req.params.id).populate("tasks").populate("ligne");  
      const lignes = await Ligne.find();
      const savedTask = await Task.find();
      const savedTypes = await Type.find();
      res.status(200).json({machine:savedMachine,tasks:savedTask,lignes:lignes,types:savedTypes});
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;

