var express = require('express');
var router = express.Router();
var Product = require('./../models').Product;
var Category = require('./../models').Category;
var Image = require('./../models').Image;

//create product
router.post('/products', async function(req, res, next) {
  let {name, description, price, categoryId} = req.body;
  try {
    let product = await Product.create({
      name: name,
      description: description,
      price: price,
      categoryId: categoryId,
    });
    let object = {
      url: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06539618.png',
      productId: product.id
    };

    let image = await Image.bulkCreate([object, object, object, object]);

    if(image){
      res.status(200).json({
        status: 'ok',
        user: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: price,
        }
      })
    }
    else
      throw new Error('Unable to create product');
      
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
        limit: 1,
        model: Image,
        attributes: ['id', 'url'],
        as: 'images',
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
        attributes: ['id', 'name', 'description', 'price'],
        where: {
          id: id
        },
        include: {
          attributes: ['id', 'url'],
          model: Image,
          as: 'images',
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
