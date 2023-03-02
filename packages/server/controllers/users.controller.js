const users = require("express").Router();
const cors = require("cors");
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/Users");
const {db_password, secret_key} = require("../config/envvars");
// require('dotenv').config();
users.use(cors());
var secret = secret_key;

exports.create = (req, res) => {
  const today = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    createAt: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        User.create(userData)
        .then(user => {
          let token = jwt.sign(user.dataValues, secret, {
            expiresIn: 1400
          })
          res.json({ token: token})
        })
        .catch(err => {
          res.send("error: "+err);
        })
      })
    } else {
      res.json({error: 'User already exists'});
    }
  })
  .catch(err => {
    res.send('error: ' + err);
  })
}

// Login logic
exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, secret, {
          expiresIn: 1440
        })
        res.json({token: token})
      } else {
        res.send('Wrong email/password!');
      }
    } else {
      res.status(400).json({error: 'User does not exist'});
    }
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
}

// Update user Details logic
exports.updateUserByEmail = (req, res) => {
  var decode = jwt.verify(req.headers['authorization'], secret)
  User.findOne({
    where: {
      id: decode.id
    }
  })
  .then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send('User does not exist')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
}

