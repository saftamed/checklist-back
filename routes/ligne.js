const Ligne = require("../models/Ligne");
const { checkLoginAndAdmin ,checkLogin} = require("./userMidelWare");
const router = require("express").Router();

router.post("/",checkLoginAndAdmin, async (req, res) => {
    const newLigne = new Ligne(req.body);
  
    try {
      const savedLigne = await newLigne.save();  
      res.status(200).json(savedLigne);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.put("/:id",checkLoginAndAdmin, async (req, res) => {
    
  
    try {
      const savedLigne = await Ligne.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(savedLigne);
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.get("/",checkLogin, async (req, res) => {  
    try {
      const savedLigne = await Ligne.find().select('name');  
      res.status(200).json(savedLigne);
    } catch (err) {
      res.status(500).json(err);
    }
  });




  router.get("/last",checkLogin, async (req, res) => {  
    try {
      const savedLigne = await Ligne.find().limit(10).sort({createdAt: -1});  
      res.status(200).json(savedLigne);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/search/:s",checkLogin, async (req, res) => {  
    try {
      const savedLigne = await Ligne.find({ name: { $regex: new RegExp(req.params.s, "i") } }).limit(10);  
      res.status(200).json(savedLigne);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/:id",checkLogin, async (req, res) => {  
    try {
      const savedLigne = await Ligne.findById(req.params.id);
      const machines = await Machine.find({linge: req.params.id})  
      res.status(200).json({savedLigne,machines});
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get("/edit/:id",checkLoginAndAdmin, async (req, res) => {  
    try {
      const savedLigne = await Ligne.findById(req.params.id);  
      res.status(200).json({Ligne:savedLigne});
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;

