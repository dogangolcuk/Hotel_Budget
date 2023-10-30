require('dotenv').config({ path: __dirname + '/../../.env' })
// require('dotenv').config()

const sequelize = require('sequelize')
const hooksModels = require('./models/Hooks')

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
}

const db = new sequelize({
  ...config,
  logging: false,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    charset: 'utf-8',
    dialectOptions: { collate: 'utf-8_general_ci' },
    hooks: hooksModels,
  },
})

function sync(force = false) {
  return db
    .sync({ force })
    .then(() => {
      console.log('SUCCESS: Models synced to DB...')
    })
    .catch((err) => {})
}

db.didSync = sync()

module.exports = db
