const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Wejscie = require("../models/wejscie");
const checkAuth = require("../middleware/check-auth")

router.get("/", (req,res,next)=>{
    Wejscie.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post("/", (req,res,next)=>{
    const wejscie = new Wejscie({
        _id: new mongoose.Types.WejscieId(),
        PESEL: req.body.PESEL,
        Date: req.body.Date,
    });
    wejscie.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowe wejście",
            createdProduct: wejscie
        });
    })
    .catch(err => res.status(500).json({error: err})); 
});

router.get("/:id_wejscie", checkAuth, (req,res,next) =>{
    const id = req.params.id_wejscie;
    Wejscie.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => res.status(500).json({error: err}));
});
router.delete("/:id_wejscie", checkAuth, (req,res,next) =>{
    const id = req.params.id_wejscie;
    Wejscie.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "usunięcie wejścia o nr "+id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});
module.exports = router;
