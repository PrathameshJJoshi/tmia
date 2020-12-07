const Sequelize = require('sequelize');


module.exports =  new Sequelize('sql12380709','sql12380709','cmhmztHaVv', {
  host: 'sql12.freemysqlhosting.net',
  // port:3306,
  dialect: 'mysql',
  // operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});