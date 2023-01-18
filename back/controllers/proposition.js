const Proposition = require("../models/proposition");

exports.createProposition = (req, res, next) => {
  delete req.body._id;
  const proposition = new Proposition({
    ...req.body,
  });
  proposition
    .save()
    .then(() => res.status(201).json({ message: "proposition enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProposition = (req, res, next) => {
  Proposition.findOne({ _id: req.params.id })
    .then((proposition) => res.status(200).json(proposition))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteProposition = (req, res, next) => {
  Proposition.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "proposition supprimée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPropositions = (req, res, next) => {
  Proposition.find()
    .then((propositions) => res.status(200).json(propositions))
    .catch((error) => res.status(400).json({ error }));
};
