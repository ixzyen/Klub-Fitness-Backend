const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Czlonek = require("../models/czlonek");
const checkAuth = require("../middleware/check-auth")

router.get("/", checkAuth, (req, res, next)=> {
    Czlonek.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    console.log(req.file);
    const czlonek = new Czlonek({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        PESEL: req.body.PESEL,
        
    });
    Czlonek.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowego członka",
            createdProduct: czlonek
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:czlonekId", (req, res, next)=> {
    const id = req.params.czlonekId;
    Czlonek.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:czlonekId", (req, res, next)=> {
    const id = req.params.czlonekId;
    console.log(req.file);
    Czlonek.update({_id:id}, { $set: {
        name: req.body.name,
        surname: req.body.surname,
        PESEL: req.body.PESEL,
        
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana członka o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:czlonekId", checkAuth, (req, res, next)=> {
    const id = req.params.czlonekId;
    Czlonek.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie członka o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;