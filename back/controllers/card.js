const Card = require('../models/card');

exports.createCard = (req, res, next) => {
  delete req.body._id;
  const card = new Card({
      ...req.body
  });
  card.save()
  .then(() => res.status(201).json({ message: 'objet enregistré' }))
  .catch(error => res.status(400).json({ error }));
};

exports.getOneCard = (req, res, next) => {
  Card.findOne({ _id: req.params.id })
  .then(card => res.status(200).json(card))
  .catch(error => res.status(404).json({ error }));
};

exports.updateCard = (req, res, next) => {
  Card.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'objet modifié' }))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteCard = (req, res, next) => {
  Card.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'objet supprimé' }))
  .catch(error => res.status(400).json({ error }));
};

exports.getAllCard = (req, res, next) => {
  Card.find()
  .then(cards => res.status(200).json(cards))
  .catch(error => res.status(400).json({ error }));
};
