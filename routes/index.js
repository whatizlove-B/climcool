const express = require('express')
const router = express.Router()
const db = require('../models/db')
const bcrypt = require('bcrypt')
const uuid = require('uuid-token-generator')

let auth = function(req, res, next) {
    db
      .getToken(req.headers.authorization)
      .then((results)=>{
        if (results.length == 0) {
          const err = new Error('Не авторизован!');
          err.status = 401;
          next(err); 
        } else {
          next()
        }
      })
      .catch((err)=>{
        next(err);
      })
  }
  
  const isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  
  router.get('/', (req, res)=>{
    res.json({
      message: 'Добро пожаловать!'
    })       
  });
  
  router.get('/secret', auth, (req, res)=>{
    res.json({
      message: 'Секретная страница!'
    })   
  });
  
  router.post('/registration', (req, res, next)=>{
    if(req.body.password === req.body.repeatPassword){
      db
        .getUser(req.body.email)
        .then((results)=>{
          if (results.length == 0){
            data = {
              email: req.body.email,
              password: req.body.password
            }
            db
              .add('users', data)
              .then((results)=>{
                res.json({
                  message: 'Пользователь добавлен: ' + results[0]
                })
              })
              .catch((err)=>{
                next(err);
              })
          } else {
            const err = new Error('Такой пользователь уже есть!');
            err.status = 400
              next(err);
          }
        })
        .catch((err)=>{
          next(err);
        })
    } else {
      const err = new Error('Не совпадает пароль и подтверждение пароля!');
      err.status = 400;
        next(err);        
    }
  })
  
  router.post('/login', (req, res, next)=>{
    db
      .getUser(req.body.email)
      .then((results)=>{
        if (isValidPassword(results[0], req.body.password)) {
          data ={};
          data.login=req.body.email;
          data.token=uuid();
          db
            .delete(req.body.email)
            .then((results)=>{
              db
                .add('token', data)
                .then((results)=>{
                  res.json({
                    token: results.token
                  })                            
                })
                .catch((err)=>{
                  next(err)
                })
            })
            .catch((err)=>{
              next(err)
            })
        } else {
          const err = new Error('Не верный логин или пароль!');
          err.status = 400
          next(err); 
        }
      })
      .catch((err)=>{
        next(err)
      })
  })
  
  module.exports = router