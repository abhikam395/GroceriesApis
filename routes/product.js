var express = require('express');
var router = express.Router();
var Product = require('./../models').Product;
var Category = require('./../models').Category;

//create product
router.post('/products', async function(req, res, next) {
  let {name, description, price, categoryId} = req.body;
  try {
    let product = await Product.create({
      name: name,
      description: description,
      price: price,
      categoryId: categoryId,
    })
    res.status(200).json({
      status: 'ok',
      user: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price,
      }
    })
  } catch (error) {
    let {errno} = error.parent;
    if(errno == 1452){
      res.status(401).json({
        status: 'error',
        message: 'Category not found'
      })
    }
    else{
      res.status(401).json({
        status: 'error',
        message: 'Unable to add product'
      })
    }
  }
});

//get products
router.get('/products', async function(req, res, next) {
  try {
    let products = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price'],
      include: {
        model: Category,
        as: 'category',
      }
    });
    res.status(200).json({
      status: 'ok',
      products: products
    })
  } catch (error) {
    res.status(401).json({
      status: error,
      message: 'Products not found'
    })
  }
});

//get product
router.get('/products/:id', async function(req, res, next) {
  let {id} = req.params;
  try {
      let product = await Product.findOne({
        where: {
          id: id
        }
      })
      res.status(200).json({
        status: 'ok',
        product: product
      })
  } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Product not found'
      })
  }
})



module.exports = router;
