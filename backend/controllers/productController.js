const asyncHandler = require('express-async-handler')
const Product = require('../models/product.model.js');

exports.create = (req, res) => {
  if (!req.body.name || !req.body.quantity || !req.body.price || !req.body.category || !req.body.images) {
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }

  const product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    category: req.body.category,
    images: req.body.images
  });

  product.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }res.send(product);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message: 'Product not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  if (!req.body.name || !req.body.quantity || !req.body.price || !req.body.category) {
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }

  Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({ message: 'Product not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.send({ message: 'Product deleted successfully' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({ message: 'Product not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};