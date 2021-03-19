var express = require('express');
var router = express.Router();
var Cart = require('./../models').Cart;
var Product = require('./../models').Product;

//register user
router.post('/carts', async function(req, res, next) {
  let {productId, userId} = req.body;
  try {
    let [data, created] = await Cart.findOrCreate({
      where: {
        productId: productId,
        userId: userId
      },
      defaults: {
        productId: productId,
        userId: userId
      }
    });
    if(created){
      res.status(200).json({
        status: 'ok',
        data: data,
      })
    }
    else{
      res.status(401).json({
        status: 'error',
        message: 'Already added in cart list'
      })
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Product or user not found'
    })
  }
});

//register user
router.delete('/carts', async function(req, res, next) {
  let {productId, userId} = req.body;

  try {
    let cart = await Cart.destroy({
      where: {
        productId: productId,
        userId: userId
      }
    });
    if(cart){
      res.status(200).json({
        status: 'ok',
        message: 'Removed from cart list'
      })
    }
    else{
      throw new Error('Product not found')
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Product not found'
    })
  }
});

router.get('/users/:id/carts', async function(req, res, next) {
  let {id} = req.params;
  try {
    let carts = await Cart.findAll({
      attributes: ['id'],
      where: {
        userId: id
      },
      include: {
        attributes: ['id', 'name', 'description', 'price'],
        model: Product,
        as: 'product',
      }
    });
    if(carts){
      res.status(200).json({
        status: 'ok',
        carts: carts
      })
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Model not found'
    })
  }
});



module.exports = router;
