var express = require('express');
var router = express.Router();
var Favourite = require('./../models').Favourite;
var Product = require('./../models').Product;

//register user
router.post('/favourites', async function(req, res, next) {
  let {productId, userId} = req.body;
  try {
    let [data, created] = await Favourite.findOrCreate({
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
        message: 'Already added in favourte list'
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
router.delete('/unfavourites', async function(req, res, next) {
  let {productId, userId} = req.body;

  try {
    let favourte = await Favourite.destroy({
      where: {
        productId: productId,
        userId: userId
      }
    });
    if(favourte){
      res.status(200).json({
        status: 'ok',
        message: 'Removed from favourite list'
      })
    }
    else{
      res.status(401).json({
        status: 'error',
        message: 'Model not found'
      })
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Model not found'
    })
  }
});

router.get('/users/:id/favourites', async function(req, res, next) {
  let {id} = req.params;
  try {
    let favourtes = await Favourite.findAll({
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
    if(favourtes){
      res.status(200).json({
        status: 'ok',
        favourtes: favourtes
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
