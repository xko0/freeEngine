const mongoose = require("mongoose");

const cardResume = mongoose.Schema({
    titre: {
      type: String,
      required: false,
      default: 'NC'
    },
    resumeMarketPlace: {
      type: String,
      required: false,
      default: 'NC'
    },
    anneeCreation: {
      type: Number,
      required: false,
      default: 0
    },
    localisation: {
      type: String,
      required: false,
      default: 'NC'
    },
    leveeFonds: {
      type: Array,
      required: false,
      montant: {
        type: Number
      },
      annee: {
        type: Number
      }
    },
    categorie: {
      type: String,
      required: false,
      default: 'NC'
    },
    urlMarketPlace: {
      type: String,
      required: false,
      default: 'NC'
    },
    logo: {
      type: String,
      required: false,
      default: 'NC'
    },
    imgSite1: {
      type: String,
      required: false,
      default: 'NC'
    },
    imgSite2: {
      type: String,
      required: false,
      default: 'NC'
    }
});
module.exports = mongoose.model("Card", cardResume);