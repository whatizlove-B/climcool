const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const url = config.MONGO_URL
const baza = 'user';

module.exports.getUser = function(login) {
  return new Promise((resolve, reject)=>{
    MongoClient
      .connect(url, function(err, client){
        if (err) {
          reject(err);
        }
        client
          .db(baza)
          .collection('users')
          .find({ "login": login})
          .toArray(function(err, results){
            if (err) {
              reject(err)
            }
            client.close();
            resolve(results);
          })
          
    }, {useUnifieldTopology:true}
   )
  })
}

module.exports.getToken = function(token) {
  return new Promise((resolve, reject)=>{
    MongoClient
      .connect(url, function(err, client){
        if (err) {
          reject(err);
        }
        client
          .db(baza)
          .collection('token')
          .find({ "token": token})
          .toArray(function(err, results){
            if (err) {
              reject(err)
            }
            client.close();
            resolve(results);
      })
    }, {useUnifieldTopology:true})
  })
}

module.exports.add = function(tabl, data) {
  return new Promise((resolve, reject) => {
    MongoClient
      .connect(url, function(err, client) {
        if (err) {
          reject(err);
        }
        client
          .db(MONGO_URL)
          .collection(users)
          .insertOne(data, function(err, results){
            if (err) {
              reject(err);
            }
            client.close();
            resolve(results.ops[0]);
      })
    }, {useUnifieldTopology:true});         
  })
}

module.exports.delete = function(login) {
  return new Promise((resolve, reject) => {
    //const id = new ObjectID(zadacaId);
    MongoClient
      .connect(url, function(err, client) {
        if (err) {
          reject(err);
        }
        client
          .db(baza)
          .collection('token')
          .deleteMany({ "login": login},
            function(err, results){
              if (err) {
                reject(err);
              }
              client.close();
              resolve(results);
      })            
    }, {useUnifieldTopology:true});         
  })
}