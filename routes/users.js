var express = require('express');
var router = express.Router();
var User = require('./../models').User;

//register user
router.post('/register', async function(req, res, next) {
  let {name, email, password} = req.body;
  try {
    let user = await User.create({
      name: name,
      email: email,
      password: password
    })
    res.status(200).json({
      status: 'ok',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'User already registered'
    })
  }
});

//login user
router.post('/login', async function(req, res, next) {
  let {email, password} = req.body;
  let user;
  try {
    user = await User.findOne({
      where: {
        email: email,
        password: password
      }
    })
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'User already registered'
    })
  }
  if(user){
    res.status(200).json({
      status: 'ok',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })
  }
  else{
    res.status(401).json({
      status: 'error',
      message: 'User not registered'
    })
  }
});

module.exports = router;
