const Sequelize = require('sequelize');


module.exports =  new Sequelize('enercomp_db_tmia','enercomp_admin','Enerdb@2587', {
  host: 'www.enerty.in',
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