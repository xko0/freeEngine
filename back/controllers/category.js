const Categorie = require('../models/categorie');

exports.createCategory =  (req, res, next) => {
  delete req.body._id;
  const categorie = new Categorie({
      ...req.body
  });
  categorie.save()
  .then(() => res.status(201).json({ message: 'catégorie enregistrée' }))
  .catch(error => res.status(400).json({ error }));
};

exports.getCategory = (req, res, next) => {
  Categorie.find()
  .then(categories => res.status(200).json(categories))
  .catch(error => res.status(400).json({ error }));
};

exports.updateCategory = (req, res, next) => {
  Categorie.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'catégorie modifiée' }))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteCategory =  (req, res, next) => {
  Categorie.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'catégorie supprimée' }))
  .catch(error => res.status(400).json({ error }));
};



