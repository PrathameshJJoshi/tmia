const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const client = db.define('industry', {
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  pincode: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
});

// user.pre('save',function(next){
//   const use = this;
//   if(!use.isModified('password')){
//       return next()
//   }
//   const hash=base.encode(use.password)
//        use.password = hash;
//        next()
//    });


client.sync().then(() => {
  console.log('table created');
});
module.exports = client;
