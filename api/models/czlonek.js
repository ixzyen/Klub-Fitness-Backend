const mongoose = require("mongoose");

const czlonekSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    surname: String,
    PESEL: Number
});

module.exports = mongoose.model("Czlonek", czlonekSchema);