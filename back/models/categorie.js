const mongoose = require("mongoose");

const categorie = mongoose.Schema({
    nom: {
      type: String,
      required: false
    }
});
module.exports = mongoose.model("Categorie", categorie);