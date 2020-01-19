const mongoose = require("mongoose");

const wejscieSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    PESEL: String,
    Date: String,
});

module.exports = mongoose.model("Wejscie", wejscieSchema);