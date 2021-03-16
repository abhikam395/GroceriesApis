var express = require('express');
var router = express.Router();
var Category = require('./../models').Category;

//register user
router.post('/categories', async function(req, res, next) {
  let {name} = req.body;
  try {
    let category = await Category.create({
      name: name,
    })
    res.status(200).json({
      status: 'ok',
      category: category,
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Category already exists'
    })
  }
});

//register user
router.get('/categories', async function(req, res, next) {
  try {
    let categories = await Category.findAll({
      attributes: ['id', 'name']
    });
    res.status(200).json({
      status: 'ok',
      categories: categories
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Categories not found'
    })
  }
});

module.exports = router;
