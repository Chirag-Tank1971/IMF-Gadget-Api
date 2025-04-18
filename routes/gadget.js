const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model")  
const {
    generateCode,
    setCode,
    getCode,
    clearCode
  } = require('../controllers/startSequence.js');
const gadgetModel = require("../models/gadgets_model")
const StartSequence = require("../controllers/startSequence.js")
require("dotenv").config();
const {generateCodename , generateProbo} = require("../controllers/generateRandom")

router.get("/"  ,async (req,res)=>{
  const { status } = req.query;

      try {
        let gadget;
        status === " " || !status || status === "All" ? gadget = await gadgetModel.find({}) : gadget = await gadgetModel.find({status:status})
        res.render("gadgets", { gadget, filter: status || "All" });
      } catch (error) {
      }
})

router.get("/create" , async (req,res)=>{
    try {
        const codeName = generateCodename() 
        res.render("createGadget" , {codeName})
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/addGadget" , async (req,res)=>{
    try {
        const {gadgetName ,gadgetStatus , gadgetDescription} = req.body;
        let gadget = await gadgetModel.findOne({name:gadgetName});
        if(gadget)return res.status(401).send("Gadget Already Registered With This Name")
        else{
            const gadget = await gadgetModel.create({
                name : gadgetName,
                status : gadgetStatus,
                description : gadgetDescription,
                codename:generateCodename(),
                successProbability:generateProbo()
            })
            console.log(gadget)
            res.redirect("/gadget")
        }
    } catch (error) {
        res.send(error.message)
    }
});

router.get("/edit/:id" , async (req,res)=>{
    try {
        const gadget = await gadgetModel.findById(req.params.id)
        res.render("editGadget" , {gadget})
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/edit/:id" , async (req,res)=>{
    const {gadgetName ,gadgetStatus , gadgetDescription , gadgetCodeName} = req.body;
    try {
        const gadget = await gadgetModel.findByIdAndUpdate(req.params.id ,{
            name : gadgetName,
            status : gadgetStatus,
            description : gadgetDescription,
            codename: gadgetCodeName,
        }, {new:true})
        console.log(gadget)
        res.redirect("/gadget")
    } catch (error) {
        res.send(error.message)
    }
})

router.get("/getCodeName" ,  (req,res)=>{
    try {
        const codeName = generateCodename() 
        res.json({codeName})
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/:id/decommission" , async (req,res)=>{
    const gadget = await gadgetModel.findById(req.params.id)
    if(!gadget) return res.status(404).send("Gadget Not Found")
    if(gadget.status === "Decommissioned") {
        req.flash("error" , "Gadget Already Decommissioned")
        return res.redirect("/gadget")
    }else{
        try {
            const decommissionedGadget = await gadgetModel.findByIdAndUpdate(req.params.id , {
                status : "Decommissioned",
                decommissionedAt : new Date()
            }, {new:true})
            req.flash("error" , "Gadget Decommissioned Successfully")
            res.redirect("/gadget")
        } catch (error) {
            res.send(error.message)
        }
    }
       
    
})

router.get("/:id/delete" , async (req,res)=>{
  const gadget = await gadgetModel.findById(req.params.id)
  if(!gadget) return res.status(404).send("Gadget Not Found")
 
      try {
          const deleteGadget = await gadgetModel.findByIdAndDelete(req.params.id , {new:true})
          req.flash("error" , "Gadget Deleted Successfully")
          res.redirect("/gadget")
      } catch (error) {
          res.send(error.message)
      } 
})

router.post("/:id/deploy", async (req, res) => {
    try {
      const gadget = await gadgetModel.findById(req.params.id);
      if (!gadget) {
        req.flash("error", "Gadget not found.");
        return res.redirect("/gadget");
      }
  
      if (gadget.status === "Deployed") {
        req.flash("error", "Gadget is already deployed.");
        return res.redirect("/gadget");
      }
  
      await gadgetModel.findByIdAndUpdate(req.params.id, {
        status: "Deployed",
        decommissionedAt: ""
      });
  
      req.flash("success", "Gadget deployed successfully.");
      res.redirect("/gadget");
    } catch (error) {
      req.flash("error", "Something went wrong.");
      res.redirect("/gadget");
    }
});

router.get('/:id/self-destruct', async (req, res) => {
    const gadget = await gadgetModel.findById(req.params.id);
    if (!gadget) {
      req.flash("error", "Gadget not found.");
      return res.redirect("/gadget");
    }
  
    const code = generateCode();
    setCode(gadget.id, code);
  
    // Simulate showing the code in the UI
    res.render('confirmDestruct', { gadget, code });
  });

  router.post('/:id/self-destruct', async (req, res) => {
    const enteredCode = req.body.confirmationCode;
    const gadget = await gadgetModel.findById(req.params.id);
  
    if (!gadget) {
      req.flash("error", "Gadget not found.");
      return res.redirect("/gadget");
    }
  
    const savedCode = getCode(gadget.id);
  
    if (enteredCode !== savedCode) {
      req.flash("error", "Invalid confirmation code.");
      return res.redirect(`/gadget/${gadget.id}/self-destruct`);
    }
  
    // Proceed to destroy
    await gadgetModel.findByIdAndUpdate(gadget.id, {
      status: "Destroyed",
      decommissionedAt: new Date()
    });
  
    clearCode(gadget.id);
    req.flash("success", "Gadget self-destructed successfully.");
    res.redirect("/gadget");
  });
  



module.exports = router;